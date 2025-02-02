const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/dangnhap'); 
// Route cho trang đăng nhập
router.use('/', loginController.index); 
module.exports = router;