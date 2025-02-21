import Post from '../models/postModel.js';

const homeController = {
  async index(req, res) {
    try {
      console.log("🟢 Session sau khi đăng nhập:", req.session);


      const posts = await Post.fetchAll();
      posts.forEach(post => {
        const date = new Date(post.CreatedAt);
        post.FormattedTime = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      });
      res.render('home', { posts, title: 'Home', showHeaderFooter: true });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ' });
    }
  },

  // Lấy tất cả bài viết (API)
  async getAllPosts(req, res) {
    try {
      const posts = await Post.fetchAll();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  },

  // Lấy bài viết theo ID (API)
  async getPostById(req, res) {
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

  async createPost(req, res) {
    try {
      console.log("Body nhận được:", req.body); // Debug dữ liệu form

      const { Content, UserID } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!UserID) {
        console.error("❌ Lỗi: Không tìm thấy UserID trong request body");
        return res.status(400).json({ error: "UserID không hợp lệ" });
      }

      const userId = parseInt(UserID, 10);
      if (isNaN(userId)) {
        console.error("❌ Lỗi: UserID không hợp lệ:", UserID);
        return res.status(400).json({ error: "UserID không hợp lệ" });
      }

      console.log("File nhận được:", req.file);
      const postId = await Post.createPost(Content, image, userId);
      res.redirect("/home");
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async searchPosts(req, res) {
    try {
      console.log("🔍 Query params nhận được:", req.query);

      if (!req.query.title && !req.query.content && !req.query.author && !req.query.date) {
        return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm." });
      }

      const posts = await Post.search(req.query);
      res.render("search", { posts, title: "Kết quả tìm kiếm", showHeaderFooter: true });
    } catch (error) {
      console.error("❌ Lỗi khi tìm kiếm bài viết:", error);
      res.status(500).json({ message: "❌ Lỗi server", error });
    }
  },
};

export default homeController;
