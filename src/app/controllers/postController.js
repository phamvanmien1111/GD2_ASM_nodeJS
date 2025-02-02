// // src/app/controllers/homeController.js
// newFunction();

// function newFunction() {
//   const Post = require('../models/postModel');

//   const homePageController = {
//     index: (req, res) => {
//       Post.getAllPosts((err, posts) => {
//         if (err) {
//           console.error('Lỗi khi lấy bài viết:', err.stack);
//           return res.status(500).send('Lỗi server');
//         }
//         console.log('Dữ liệu truyền đến view:', posts);
//         res.render('home', { posts });
//       });
//     }
//   };

//   module.exports = homePageController;
// }
