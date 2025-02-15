const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/homeController'); // Import controller đã gộp
const upload = require('../middlewares/upload');
// Route cho trang chủ
router.get('/', homeController.index);

// Route API cho bài viết
router.get('/api/posts', homeController.getAllPosts); 
router.get('/api/posts/:id', homeController.getPostById);
router.post('/', upload.single('ImageURL'), homeController.createPost);

module.exports = router;
