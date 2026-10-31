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

## Chạy backend bằng Docker

    cd backend
    docker build -t tuananh235518/backend:latest .
    docker run -d -p 5000:5000 \
      -e PORT=5000 \
      -e MONGODB_URI="<chuoi_ket_noi_mongodb_atlas>" \
      -e CORS_ORIGIN="*" \
      tuananh235518/backend:latest

Docker Hub: https://hub.docker.com/r/tuananh235518/backend

## Chạy frontend bằng Docker

    cd frontend
    docker build -t tuananh235518/frontend:latest .
    docker run -d -p 3000:80 -e API_URL="http://localhost:5000" tuananh235518/frontend:latest

Mở http://localhost:3000. Biến `API_URL` là địa chỉ backend API.

Docker Hub: https://hub.docker.com/r/tuananh235518/frontend

## Triển khai

- Frontend (Render): URL_FRONTEND

## Triển khai

- Frontend (Render): URL_FRONTEND

## Triển khai

- Frontend (Render): https://web-235518.onrender.com
- Backend API (Render): https://api-235518.onrender.com
- Kiểm tra backend: https://api-235518.onrender.com/health

Lưu ý: gói Free của Render sẽ ngủ đông sau một thời gian không hoạt động, lần truy cập đầu có thể chậm.

## Triển khai

- Frontend (Render): https://web-235518.onrender.com
- Backend API (Render): https://api-235518.onrender.com
- Kiểm tra backend: https://api-235518.onrender.com/health

Lưu ý: gói Free của Render sẽ ngủ đông sau một thời gian không hoạt động, lần truy cập đầu có thể chậm.

## Thông tin nộp bài

| Trường | Nội dung |
|---|---|
| Link_GitHub | https://github.com/namestuananh/235518_NguyenHoTuanAnh |
| Link_Docker_Backend | https://hub.docker.com/r/tuananh235518/backend |
| Link_Docker_Frontend | https://hub.docker.com/r/tuananh235518/frontend |
| Link_Render_App | https://web-235518.onrender.com |
| Link_Render_API | https://api-235518.onrender.com |
| Link_Data_MongoDB | Cluster0 (cluster0.bztq4fp.mongodb.net), database 235518_NguyenHoTuanAnh, collection devices |
