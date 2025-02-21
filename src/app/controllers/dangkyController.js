

// const router = express.Router();
// class DangKyController{
//     //GET /products
//     index(req, res){
//         // res.render('dangnhap', { title: 'login' });
//         res.render('auth/dangky', { showHeaderFooter: false });
//     }
    
// }
// module.exports = new DangKyController;
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

class DangKyController {
    // Hiển thị trang đăng ký
    index(req, res) {
        res.render('auth/dangky', { showHeaderFooter: false });
    }

    // Xử lý đăng ký
    async register(req, res) {
        try {
            const { username, email, password, confirm_password, LastName, FirstName, Gender } = req.body;
            console.log("Dữ liệu nhận được từ req.body:", req.body);

            // Kiểm tra mật khẩu xác nhận
            if (password !== confirm_password) {
                return res.status(400).json({ message: 'Mật khẩu xác nhận không khớp' });
            }

            // Kiểm tra username đã tồn tại chưa
            const existingUser = await User.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
            }

            // Băm mật khẩu
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            // Tạo tài khoản mới
            const userId = await User.create(username, passwordHash, email, LastName, FirstName, Gender);

            // res.status(201).json({ message: 'Đăng ký thành công', userId });
            res.render('auth/dangnhap', { 
                showHeaderFooter: false, 
                successMessage: 'Đăng ký thành công! Vui lòng đăng nhập.' 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
}

export default new DangKyController();
