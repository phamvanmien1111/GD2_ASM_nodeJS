import ProfileMe from '../models/Profile.js';

class ProfileMeController {
    // Hiển thị trang ProfileMe
    static async index(req, res) {
        try {
            console.log("🔴 Session khi truy cập profileMe:", req.session);
    
            if (!req.session.user) {
                console.log("⛔ Không tìm thấy user trong session, chuyển hướng đăng nhập");
                return res.redirect('/dangnhap');
            }
    
            const userId = req.session.user.UserID;
            
            // 🔍 Lấy thông tin user từ database
            const user = await ProfileMe.getProfileMe(userId);
    
            // 🔍 Lấy danh sách bài viết của user
            const posts = await ProfileMe.getPost(userId);
            console.log("📝 Bài viết của user:", posts);
    
            res.render('profile/profileMe', { 
                showHeaderFooter: true, 
                profile: user, 
                posts 
            });
        } catch (error) {
            console.error("❌ Lỗi khi lấy dữ liệu profile:", error);
            res.status(500).send("Lỗi server");
        }
    }
    static async editProfileMe(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/dangnhap'); // Nếu chưa đăng nhập thì chuyển hướng
            }
    
            res.render('profile/editProfileMe', { 
                showHeaderFooter: true, 
                profile: req.session.user 
            });
        } catch (error) {
            res.status(500).send('Lỗi server');
        }
    }
    // Lấy thông tin cá nhân của user đang đăng nhập
    static async getProfileMe(req, res) {
        console.log("🟢 Đang chạy getProfileMe()..."); 
        try {
            const userId = req.session.user?.UserID;  
            console.log("🔴 Session hiện tại:", req.session);
            
            if (!userId) return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
    
            // Lấy thông tin user
            const user = await ProfileMe.getProfileMe(userId); 
    
            // Lấy bài viết của user
            const posts = await ProfileMe.getPost(userId);
            console.log("📌 Bài viết của user:", posts); // 🟢 In ra để kiểm tra
    
            if (!posts || posts.length === 0) {
                console.log("⚠️ Không có bài viết nào được tìm thấy!");
            }
    
            return res.render('profile/profileMe', { user, posts, showHeaderFooter: true });
        } catch (error) {
            console.error('Lỗi khi lấy thông tin hồ sơ:', error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
    
    
    

    // Cập nhật thông tin cá nhân
    static async updateProfileMe(req, res) {
        try {
            const userId = req.session.user?.UserID; // Lấy ID từ session
            if (!userId) {
                return res.status(401).json({ success: false, message: "Bạn chưa đăng nhập!" });
            }
    
            const { Username, Email, phone, Location } = req.body;
            if (!Username || !Email || !phone || !Location) {
                return res.status(400).json({ success: false, message: "Vui lòng điền đầy đủ thông tin!" });
            }
    
            const updated = await ProfileMe.updateProfile(userId, { Username, Email, phone, Location });
    
            if (updated) {
                req.session.user = { ...req.session.user, Username, Email, phone, Location };
                return res.redirect('/profileMe'); 
            } else {
                return res.status(400).json({ success: false, message: "Không thể cập nhật!" });
            }
        } catch (error) {
            console.error("Lỗi cập nhật profile:", error);
            res.status(500).json({ success: false, message: "Lỗi server!" });
        }
    } 
      async getProfile(req, res) {
        const userId = req.params.id;
    
        try {
            // Lấy thông tin user
            const user = await Profile.getProfile(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });
    
            // Lấy bài viết của user
            const posts = await Profile.getPost(userId);
    
            console.log('User:', user);
            console.log('Posts:', posts.Avatar);
            return res.render('profile/profile', { user, posts, showHeaderFooter: true });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }   
}

export default  ProfileMeController;
