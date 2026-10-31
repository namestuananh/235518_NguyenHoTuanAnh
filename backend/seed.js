require("dotenv").config();
const mongoose = require("mongoose");

const now = new Date();
const devices = [
  { deviceId: "TB001", name: "Máy chiếu Projector Epson EB-X06", deviceType: "Máy chiếu", room: "A101", brand: "Epson", model: "EB-X06", quantity: 1, status: "Đang sử dụng", purchaseDate: new Date("2023-08-15"), description: "Máy chiếu chính của phòng A101" },
  { deviceId: "TB002", name: "Máy tính để bàn Dell OptiPlex 3080", deviceType: "Máy tính", room: "A101", brand: "Dell", model: "OptiPlex 3080", quantity: 20, status: "Đang sử dụng", purchaseDate: new Date("2022-09-01"), description: "Máy tính phòng thực hành" },
  { deviceId: "TB003", name: "Loa JBL EON715", deviceType: "Thiết bị âm thanh", room: "B203", brand: "JBL", model: "EON715", quantity: 2, status: "Hư hỏng", purchaseDate: new Date("2021-03-20"), description: "Loa bị rè, cần kiểm tra" },
  { deviceId: "TB004", name: "Máy chiếu Projector Sony VPL-DX221", deviceType: "Máy chiếu", room: "B203", brand: "Sony", model: "VPL-DX221", quantity: 1, status: "Đang sửa chữa", purchaseDate: new Date("2020-11-10"), description: "Đang thay bóng đèn" },
].map((d) => ({ ...d, createdAt: now, updatedAt: now }));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const col = mongoose.connection.collection("devices");
  for (const d of devices) {
    await col.updateOne({ deviceId: d.deviceId }, { $setOnInsert: d }, { upsert: true });
  }
  console.log("Đã nạp dữ liệu mẫu vào collection devices");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Lỗi:", err.message);
  process.exit(1);
});
