const express = require('express');
const router = express.Router();
const DangkyController = require('../app/controllers/dangkyController'); 
// Route cho trang đăng nhập
router.get('/', DangkyController.index); // Sử dụng router.get thay vì router.use

// Route cho trang home
// router.get('/home', homeController.home); // Thêm route cho trang home

module.exports = router;