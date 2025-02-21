import Profile from '../models/Profile.js';

class ProfileController {
    // GET /profile
    index(req, res) {
        res.render('profile/profile', { showHeaderFooter: true });
    }

    // GET /api/profile/:id - Lấy thông tin cá nhân
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
    
    // async getProfile(req, res) {
    //     try {
    //         const userId = req.params.id;
    //         const profile = await Profile.getProfile(userId);
    
    //         if (!profile) {
    //             return res.status(404).send('Không tìm thấy người dùng');
    //         }
    
    //         res.render('post/profile', { profile, showHeaderFooter: true }); // Truyền profile vào view
    //     } catch (error) {
    //         console.error("Lỗi khi lấy profile:", error);
    //         res.status(500).json({ message: 'Lỗi server' });
    //     }
    // }
    // async getPost(req,res){
    //     try{
    //         const userId = req.params.id;
    //         const posts = await Profile.getPost(userId);
    //         console.log(posts);
    //         res.render('post/profile', { posts, showHeaderFooter: true });
    //     }catch (error) {
    //         console.error("lỗi khi lấy bài viết:", error);
    //         res.status(500).json({ message: 'Lỗi server' });
    //     }
    // }

    // PUT /api/profile/:id - Cập nhật thông tin cá nhân
    async updateProfile(req, res) {
        try {
            const userId = req.params.id;
            const { name, email, phone, address } = req.body;
            await Profile.updateProfile(userId, name, email, phone, address);
            res.json({ message: 'Cập nhật thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}

// Xuất class dưới dạng instance để dùng trong router
export default new ProfileController();
