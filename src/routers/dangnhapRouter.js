import express from 'express';
import loginController from '../app/controllers/dangnhap.js';

const router = express.Router();

// Hiển thị trang đăng nhập
router.get('/', loginController.index);

// Xử lý đăng nhập
router.post('/', loginController.login);

export default router;
