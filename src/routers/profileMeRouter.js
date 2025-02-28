import express from 'express';
import ProfileMeController from '../app/controllers/profileMeControllers.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Trang profile cá nhân
router.get('/', ProfileMeController.index);

// Trang chỉnh sửa profile cá nhân
router.get('/edit', ProfileMeController.editProfileMe); 
router.get('/Postedit', ProfileMeController.editPostMe);
// API lấy thông tin cá nhân của user đang đăng nhập
router.get('/api/profile', ProfileMeController.getProfileMe);

// 🛠 CHỈ GIỮ route `POST /update` có multer
router.post('/update', upload.single('Avatar'), ProfileMeController.updateProfileMe); 
router.get('/editPost/:id', ProfileMeController.showEditPost);
// Xử lý cập nhật bài viết
router.post('/editPost/:id', upload.single('image'), ProfileMeController.updatePost);
// 🔥 Không cần PUT vì bạn đang dùng `_method=PUT` trong form
export default router;
