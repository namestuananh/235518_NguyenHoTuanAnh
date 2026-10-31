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

## Cơ sở dữ liệu (MongoDB Atlas)
- Database: `235518_NguyenHoTuanAnh` – Collection: `devices`
- Các trường: deviceId, name, deviceType, room, brand, model, quantity, status, purchaseDate, description
- status: Đang sử dụng | Hư hỏng | Đang sửa chữa | Ngừng sử dụng
- Chuỗi kết nối cấu hình qua biến môi trường `MONGODB_URI` (xem `backend/.env.example`), không đưa lên GitHub.
- Nạp dữ liệu mẫu: `cd backend && node seed.js`

## Chạy backend bằng Docker

    cd backend
    docker build -t tuananh235518/backend:latest .
    docker run -d -p 5000:5000 \
      -e PORT=5000 \
      -e MONGODB_URI="<chuoi_ket_noi_mongodb_atlas>" \
      -e CORS_ORIGIN="*" \
      tuananh235518/backend:latest

Docker Hub: https://hub.docker.com/r/tuananh235518/backend
