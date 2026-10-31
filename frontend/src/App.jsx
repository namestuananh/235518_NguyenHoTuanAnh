import { useEffect, useState } from 'react';
import './App.css';

const API = (window.APP_CONFIG && window.APP_CONFIG.API_URL) || 'http://localhost:5000';
const STATUSES = ['Đang sử dụng', 'Hư hỏng', 'Đang sửa chữa', 'Ngừng sử dụng'];
const BADGE = { 'Đang sử dụng': 'ok', 'Hư hỏng': 'bad', 'Đang sửa chữa': 'warn', 'Ngừng sử dụng': 'off' };
const FIELDS = [
  ['deviceId', 'Mã thiết bị', 'text'],
  ['name', 'Tên thiết bị', 'text'],
  ['deviceType', 'Loại thiết bị', 'text'],
  ['room', 'Phòng học', 'text'],
  ['brand', 'Hãng sản xuất', 'text'],
  ['model', 'Model', 'text'],
  ['quantity', 'Số lượng', 'number'],
  ['purchaseDate', 'Ngày mua/tiếp nhận', 'date'],
];
const EMPTY = {
  deviceId: '', name: '', deviceType: '', room: '', brand: '', model: '',
  quantity: 1, status: 'Đang sử dụng', purchaseDate: '', description: '',
};

async function request(path, options = {}) {
  const res = await fetch(API + path, { headers: { 'Content-Type': 'application/json' }, ...options });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Có lỗi xảy ra');
  return data;
}
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('vi-VN') : '—');
const netError = (e) => (e.message === 'Failed to fetch' ? 'Không kết nối được tới backend' : e.message);

export default function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');

  async function load(search = '') {
    setLoading(true);
    setError('');
    try {
      setDevices(await request('/api/devices' + (search ? `?search=${encodeURIComponent(search)}` : '')));
    } catch (e) {
      setError(netError(e));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  function show(msg) {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  }

  async function view(id) {
    try { setDetail(await request(`/api/devices/${id}`)); } catch (e) { setError(netError(e)); }
  }
  function openAdd() { setForm({ ...EMPTY }); setEditingId(null); setFormError(''); }
  function openEdit(d) {
    setForm({ ...EMPTY, ...d, purchaseDate: d.purchaseDate ? d.purchaseDate.slice(0, 10) : '' });
    setEditingId(d._id);
    setFormError('');
  }

  async function save(e) {
    e.preventDefault();
    setFormError('');
    const body = {};
    Object.keys(EMPTY).forEach((k) => (body[k] = form[k]));
    body.quantity = Number(body.quantity);
    body.purchaseDate = body.purchaseDate || null;
    try {
      await request(editingId ? `/api/devices/${editingId}` : '/api/devices', {
        method: editingId ? 'PUT' : 'POST',
        body: JSON.stringify(body),
      });
      show(editingId ? 'Cập nhật thiết bị thành công' : 'Thêm thiết bị thành công');
      setForm(null);
      load(keyword);
    } catch (err) {
      setFormError(netError(err));
    }
  }

  async function remove(d) {
    if (!window.confirm(`Xóa thiết bị "${d.name}"?`)) return;
    try {
      await request(`/api/devices/${d._id}`, { method: 'DELETE' });
      show('Đã xóa thiết bị');
      load(keyword);
    } catch (err) {
      setError(netError(err));
    }
  }

  const visible = devices.filter((d) => !statusFilter || d.status === statusFilter);
  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="container">
      <h1>Quản lý thiết bị phòng học</h1>

      <div className="toolbar">
        <form onSubmit={(e) => { e.preventDefault(); load(keyword); }}>
          <input placeholder="Tìm theo mã, tên, loại, phòng..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <button type="submit">Tìm kiếm</button>
          <button type="button" className="secondary" onClick={() => { setKeyword(''); load(''); }}>Xóa tìm</button>
        </form>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Tất cả tình trạng</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAdd}>+ Thêm thiết bị</button>
      </div>

      {notice && <div className="msg success">{notice}</div>}
      {error && <div className="msg error">{error}</div>}
      {loading && <p>Đang tải dữ liệu...</p>}

      <table>
        <thead>
          <tr><th>Mã</th><th>Tên</th><th>Loại</th><th>Phòng</th><th>SL</th><th>Tình trạng</th><th>Thao tác</th></tr>
        </thead>
        <tbody>
          {visible.map((d) => (
            <tr key={d._id}>
              <td>{d.deviceId}</td><td>{d.name}</td><td>{d.deviceType}</td><td>{d.room}</td><td>{d.quantity}</td>
              <td><span className={`badge ${BADGE[d.status]}`}>{d.status}</span></td>
              <td className="actions">
                <button className="secondary" onClick={() => view(d._id)}>Xem</button>
                <button onClick={() => openEdit(d)}>Sửa</button>
                <button className="danger" onClick={() => remove(d)}>Xóa</button>
              </td>
            </tr>
          ))}
          {!loading && visible.length === 0 && <tr><td colSpan="7" className="center">Không có thiết bị</td></tr>}
        </tbody>
      </table>

      {detail && (
        <div className="overlay" onClick={() => setDetail(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Chi tiết thiết bị</h2>
            {FIELDS.map(([k, label]) => (
              <p key={k}><b>{label}:</b> {k === 'purchaseDate' ? fmtDate(detail[k]) : detail[k] ?? '—'}</p>
            ))}
            <p><b>Tình trạng:</b> <span className={`badge ${BADGE[detail.status]}`}>{detail.status}</span></p>
            <p><b>Mô tả:</b> {detail.description || '—'}</p>
            <button onClick={() => setDetail(null)}>Đóng</button>
          </div>
        </div>
      )}

      {form && (
        <div className="overlay">
          <form className="modal" onSubmit={save}>
            <h2>{editingId ? 'Cập nhật thiết bị' : 'Thêm thiết bị'}</h2>
            {formError && <div className="msg error">{formError}</div>}
            {FIELDS.map(([k, label, type]) => (
              <label key={k}>{label}
                <input type={type} value={form[k]} onChange={change(k)} min={type === 'number' ? 0 : undefined} />
              </label>
            ))}
            <label>Tình trạng
              <select value={form.status} onChange={change('status')}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label>Mô tả
              <textarea rows="3" value={form.description} onChange={change('description')} />
            </label>
            <div className="actions">
              <button type="submit">Lưu</button>
              <button type="button" className="secondary" onClick={() => setForm(null)}>Hủy</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
