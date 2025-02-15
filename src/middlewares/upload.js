const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images'); // Đường dẫn thư mục lưu ảnh
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file theo thời gian
    }
});

const upload = multer({ storage: storage });

module.exports = upload;