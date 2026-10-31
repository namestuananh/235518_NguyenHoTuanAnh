require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const deviceRoutes = require('./routes/devices');

const app = express();
const PORT = process.env.PORT || 5000;
const origins = (process.env.CORS_ORIGIN || '*').split(',').map((s) => s.trim());

app.use(cors({ origin: origins.includes('*') ? '*' : origins }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
  });
});

app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Không kết nối được cơ sở dữ liệu' });
  }
  next();
});

app.use('/api/devices', deviceRoutes);

app.use((req, res) => res.status(404).json({ message: 'Không tìm thấy đường dẫn' }));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: status === 400 ? 'JSON không hợp lệ' : 'Lỗi máy chủ' });
});

if (!process.env.MONGODB_URI) {
  console.error('Thiếu biến môi trường MONGODB_URI');
} else {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Đã kết nối MongoDB Atlas'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err.message));
}

app.listen(PORT, () => console.log(`Backend chạy tại cổng ${PORT}`));
