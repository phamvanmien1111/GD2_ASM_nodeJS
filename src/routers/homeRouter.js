import express from 'express';
import homeController from '../app/controllers/homeController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Route cho trang chủ
router.get('/', homeController.index);

// Route API cho bài viết
router.get('/api/posts', homeController.getAllPosts);
router.get('/api/posts/:id', homeController.getPostById);
router.post('/', upload.single('ImageURL'), homeController.createPost);
export default router;