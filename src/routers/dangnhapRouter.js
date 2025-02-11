const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/dangnhap');

// Hiển thị trang đăng nhập
router.get('/', loginController.index);

// Xử lý đăng nhập
router.post('/', loginController.login);

module.exports = router;
