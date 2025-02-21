import express from 'express';
import ProfileMeController from '../app/controllers/profileMeControllers.js';

const router = express.Router();

// Trang profile cá nhân
router.get('/', ProfileMeController.index);

// Trang chỉnh sửa profile cá nhân
router.get('/edit', ProfileMeController.editProfileMe); 
// API lấy thông tin cá nhân của user đang đăng nhập
router.get('/api/profile', ProfileMeController.getProfileMe);
// API cập nhật thông tin cá nhân
router.put('/update', ProfileMeController.updateProfileMe); 
router.post('/update', ProfileMeController.updateProfileMe); 
export default router;
