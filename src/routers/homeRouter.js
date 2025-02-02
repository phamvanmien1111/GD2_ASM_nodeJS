const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/homeController'); // Import controller đã gộp

// Route cho trang chủ
router.get('/', homeController.index);

// Route API cho bài viết
router.get('/api/posts', homeController.getAllPosts); 
router.get('/api/posts/:id', homeController.getPostById); 

module.exports = router;
