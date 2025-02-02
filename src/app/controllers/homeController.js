const Post = require('../models/postModel');

const homeController = {
  index: (req, res) => {
    Post.fetchAll((err, posts) => {
      if (err) {
        console.error('Lỗi khi lấy bài viết:', err.stack);
        return res.status(500).send('Lỗi server');
      }
      console.log('Dữ liệu truyền đến view:', posts);
      res.render('home', { posts, title: 'Home',showHeaderFooter: true  });
    });
  },

  // Lấy tất cả bài viết (API)
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.fetchAll();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  },

  // Lấy bài viết theo ID (API)
  getPostById: async (req, res) => {
    try {
      const post = await Post.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  }
};

module.exports = homeController;