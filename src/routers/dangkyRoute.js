const express = require('express');
const router = express.Router();
const DangkyController = require('../app/controllers/dangkyController'); 
// Route cho trang đăng nhập
router.get('/', DangkyController.index); // Sử dụng router.get thay vì router.use

router.post('/', DangkyController.register);


module.exports = router;