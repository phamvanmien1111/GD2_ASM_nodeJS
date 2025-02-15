const Post = require('../models/postModel');
const homeController = {
  async index(req, res) {
    try {
      const posts = await Post.fetchAll();
      // res.json(posts);
      posts.forEach(post => {
        const date = new Date(post.CreatedAt);
        post.FormattedTime = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      });
      res.render('home', { posts, title: 'Home',showHeaderFooter: true  });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ' });
    }
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
  },
  createPost: async (req, res) => {
    try {
        console.log("Body nhận được:", req.body); // Debug dữ liệu form

        const Content = req.body.Content;
        const UserID = req.body["UserID"]; // Lấy UserID chính xác từ body
        const image = req.file ? req.file.filename : null;

        // Kiểm tra UserID
        if (!UserID) {
            console.error("❌ Lỗi: Không tìm thấy UserID trong request body");
            return res.status(400).json({ error: "UserID không hợp lệ" });
        }

        const userId = parseInt(UserID, 10); // Chuyển UserID về dạng số
        if (isNaN(userId)) {
            console.error("❌ Lỗi: UserID không hợp lệ:", UserID);
            return res.status(400).json({ error: "UserID không hợp lệ" });
        }
        console.log("File nhận được:", req.file);
        // Gọi model để tạo bài viết (SỬA `postModel` thành `Post`)
        const postId = await Post.createPost(Content, image, userId);
        res.redirect("/home");
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error.message);
      res.status(500).json({ error: error.message });
  }
  }
  
};

module.exports = homeController;