import express from 'express';
import DangkyController from '../app/controllers/dangkyController.js';

const router = express.Router();

// Route cho trang đăng nhập
router.get('/', DangkyController.index); // Sử dụng router.get thay vì router.use
router.post('/', DangkyController.register);

export default router;
