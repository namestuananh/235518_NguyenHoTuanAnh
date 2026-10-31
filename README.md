# Hệ thống quản lý thiết bị phòng học

Sinh viên: Nguyễn Hồ Tuấn Anh – MSSV: 235518
Học phần: Điện toán đám mây

## Mô tả đề tài
Ứng dụng web quản lý thiết bị phòng học: xem, thêm, sửa, xóa, tìm kiếm thiết bị và theo dõi tình trạng sử dụng.

## Công nghệ sử dụng
React (Vite), Node.js, Express, MongoDB Atlas, Git/GitHub, Docker, Docker Hub, Render.

## Cấu trúc dự án
```
235518_NguyenHoTuanAnh/
├── backend/    # API Node.js + Express
├── frontend/   # Giao diện React
└── README.md
```

## Hướng dẫn cài đặt và chạy
### Backend
```bash
cd backend
npm install
cp .env.example .env   # rồi điền thông tin thật vào .env
npm run dev            # chạy tại http://localhost:5000
```
### Frontend
```bash
cd frontend
npm install
npm run dev            # chạy tại http://localhost:5173
```
