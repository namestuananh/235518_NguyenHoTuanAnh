require('dotenv').config();
const mongoose = require('mongoose');
const Device = require('./models/Device');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  if ((await Device.countDocuments()) > 0) {
    console.log('Đã có dữ liệu, bỏ qua.');
  } else {
    await Device.insertMany([
      { deviceId: 'TB001', name: 'Máy chiếu Epson', deviceType: 'Máy chiếu', room: 'A101', brand: 'Epson', model: 'EB-X06', quantity: 1, status: 'Đang sử dụng', purchaseDate: '2023-08-15', description: 'Máy chiếu phòng A101' },
      { deviceId: 'TB002', name: 'Máy tính Dell', deviceType: 'Máy tính', room: 'B202', brand: 'Dell', model: 'OptiPlex 3080', quantity: 30, status: 'Đang sửa chữa', purchaseDate: '2022-09-01', description: 'Phòng máy B202' },
      { deviceId: 'TB003', name: 'Loa Bose', deviceType: 'Âm thanh', room: 'C303', brand: 'Bose', model: 'S1 Pro', quantity: 2, status: 'Hư hỏng', purchaseDate: '2021-05-20', description: 'Loa phòng hội thảo' },
    ]);
    console.log('Đã thêm 3 thiết bị mẫu.');
  }
  await mongoose.disconnect();
})();
