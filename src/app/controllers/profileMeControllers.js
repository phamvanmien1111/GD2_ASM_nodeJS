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
            posts.forEach(post => {
                if (post.CreatedAt) {
                    const date = new Date(post.CreatedAt); // Chuyển chuỗi ISO thành Date object
                    post.CreatedAt = date.toLocaleTimeString("vi-VN", { 
                        hour: "2-digit", 
                        minute: "2-digit", 
                        hour12: false // Định dạng 24h
                    });
                }
            });
            console.log("📝 Bài viết:", posts); // 🟢 Debug xem có dữ liệu không
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
    // static async editProfileMe(req, res) {
    //     try {
    //         if (!req.session.user) {
    //             return res.redirect('/dangnhap'); // Nếu chưa đăng nhập thì chuyển hướng
    //         }
    //         console.log('User:', req.session.user);
    //         res.render('profile/editProfileMe', { 
    //             showHeaderFooter: true, 
    //             profile: req.session.user 
    //         });
    //     } catch (error) {
    //         res.status(500).send('Lỗi server');
    //     }
    // }
    static async editProfileMe(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/dangnhap');
            }
            
            const userId = req.session.user.UserID;
            const user = await ProfileMe.getProfileMe(userId); 
    
            res.render('profile/editProfileMe', { 
                showHeaderFooter: true, 
                profile: user 
            });
        } catch (error) {
            console.error('❌ Lỗi khi mở trang chỉnh sửa:', error);
            res.status(500).send('Lỗi server');
        }
    }
    static async editPostMe(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/dangnhap');
            }
            
            const userId = req.session.user.UserID;
            const user = await ProfileMe.getPost(userId); 
    
           res.render('profile/editpostMe', { 
    showHeaderFooter: true, 
    profile: user 
});
        } catch (error) {
            console.error('❌ Lỗi khi mở trang chỉnh sửa:', error);
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
            const userId = req.session.user?.UserID;
            if (!userId) {
                return res.status(401).json({ success: false, message: "Bạn chưa đăng nhập!" });
            }
    
            console.log("🟢 Dữ liệu nhận được:", req.body);
            console.log("📌 File nhận được:", req.file);
    
            // Kiểm tra xem dữ liệu có bị rỗng không
            if (Object.keys(req.body).length === 0 && !req.file) {
                return res.status(400).json({ success: false, message: "Không có dữ liệu gửi lên!" });
            }
    
            let { Username, Email, phone, Location, Bio } = req.body;
            let Avatar = req.session.user.Avatar || null;
    
            // Nếu có file upload, cập nhật Avatar
            if (req.file) {
                Avatar = '/images/' + req.file.filename;
                console.log("📌 Ảnh mới được cập nhật:", Avatar);
            }
    
            // Tránh trường hợp undefined gây lỗi SQL
            const updatedData = {
                Username: Username ?? null,
                Email: Email ?? null,
                phone: phone ?? null,
                Location: Location ?? null,
                Avatar: Avatar ?? null,
                Bio: Bio ?? null
            };
    
            console.log("📌 Dữ liệu cập nhật:", updatedData);
    
            // Gửi dữ liệu vào model để cập nhật
            const updated = await ProfileMe.updateProfile(userId, updatedData);
    
            // Kiểm tra kết quả cập nhật    
            if (updated) {
                req.session.user = { ...req.session.user, ...updatedData };
                console.log("✅ Cập nhật thành công!");
    
                return res.redirect('/profileMe'); 
            } else {
                console.error("❌ Lỗi: Không thể cập nhật!");
                return res.status(400).json({ success: false, message: "Không thể cập nhật!" });
            }
    
        } catch (error) {
            console.error("❌ Lỗi cập nhật profile:", error);
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

            console.log('Posts:', posts.Avatar);
            return res.render('profile/profile', { user, posts, showHeaderFooter: true });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    } 
    static async showEditPost(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/dangnhap');
            }

            const postId = req.params.id;
            const userId = req.session.user.UserID;

            const post = await ProfileMe.getPostById(userId, postId);

            if (!post) {
                return res.status(404).send('Bài viết không tồn tại hoặc không có quyền chỉnh sửa.');
            }

            res.render('profile/editPost', { showHeaderFooter: true, post });
        } catch (error) {
            console.error('❌ Lỗi khi mở trang chỉnh sửa:', error);
            res.status(500).send('Lỗi server');
        }
    }

    // Xử lý cập nhật bài viết
    static async updatePost(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/dangnhap');
            }

            const postId = req.params.id;
            const userId = req.session.user.UserID;
            const { content } = req.body;
            let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

            // Lấy bài viết cũ
            const post = await ProfileMe.getPostById(userId, postId);

            if (!post) {
                return res.status(404).send('Bài viết không tồn tại hoặc không có quyền chỉnh sửa.');
            }

            // Nếu không có ảnh mới, giữ nguyên ảnh cũ
            if (!imageUrl) {
                imageUrl = post.ImageURL;
            }

            // Cập nhật bài viết
            await ProfileMe.updatePost(userId, postId, content, imageUrl);

            res.redirect('/profile');
        } catch (error) {
            console.error('❌ Lỗi khi cập nhật bài viết:', error);
            res.status(500).send('Lỗi server');
        }
    }  
}

export default  ProfileMeController;
