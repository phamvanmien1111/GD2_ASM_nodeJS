// // // src/routers/postRouter.js
// // const express = require('express');
// // const router = express.Router();
// // const postController = require('../app/controllers/postController'); // Import controller

// // // Route để lấy tất cả bài viết
// // router.get('/posts', postController.getAllPosts);

// // // Route để lấy bài viết theo ID
// // router.get('/posts/:id', postController.getPostById);

// // module.exports = router
// // src/routers/apiRouter.js
// const express = require('express');
// const router = express.Router();
// const Post = require('../app/models/postModel'); // Import model

// // Route để lấy tất cả bài viết dưới dạng JSON
// router.get('/posts', (req, res) => {
//   Post.fetchAll((err, posts) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to fetch posts' });
//     }
//     res.json(posts); // Trả về dữ liệu dưới dạng JSON
//   });
// });

// // Route để lấy bài viết theo ID dưới dạng JSON
// router.get('/posts/:id', (req, res) => {
//   const postId = req.params.id;
//   Post.getPostById(postId, (err, post) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to fetch post' });
//     }
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.json(post); // Trả về dữ liệu dưới dạng JSON
//   });
// });

// module.exports = router;