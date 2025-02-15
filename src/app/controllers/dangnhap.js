const User = require('../models/User');
const bcrypt = require('bcrypt');

class LoginController {
    index(req, res) {
        res.render('auth/dangnhap', { showHeaderFooter: false });
    }

    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findByUsername(username);
            console.log('User tìm thấy:', user);

            if (!user) {
                return res.render('auth/dangnhap', { error: 'Sai tài khoản hoặc mật khẩu!' });
            }

            // Kiểm tra mật khẩu (nếu đã được mã hóa)
            const isMatch = await bcrypt.compare(password, user.PasswordHash);
            console.log('Mật khẩu đúng:', isMatch);

            if (!isMatch) {
                return res.render('auth/dangnhap', { error: 'Sai tài khoản hoặc mật khẩu!' });
            }

            // Lưu session
            req.session.user = {
                UserID: user.UserID,
                Username: user.Username,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                Avatar: user.Avatar,
                Location: user.Location || "Chưa cập nhật",  // Thêm Location
                Bio: user.Bio || "Không có thông tin",
            };

            res.redirect('/home');
        } catch (err) {
            console.error('Lỗi server:', err);
            res.status(500).send('Lỗi server');
        }
    }
}

module.exports = new LoginController();
