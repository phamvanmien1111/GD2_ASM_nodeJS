

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
    async register(req, res) {
        try {
            const { username, email, phone, password, confirm_password, firstName, lastName } = req.body;
            console.log("Dữ liệu nhận được từ req.body:", req.body);
    
            // Kiểm tra các trường không được để trống
            if (!username || !email || !password || !confirm_password || !phone || !firstName || !lastName) {
                return res.render('auth/dangky', { 
                    showHeaderFooter: false, 
                    errorMessage: 'Vui lòng điền đầy đủ thông tin' 
                });
            }
    
            // Kiểm tra số điện thoại có đúng định dạng không (10-11 số)
            if (!/^\d{10,11}$/.test(phone)) {
                return res.render('auth/dangky', { 
                    showHeaderFooter: false, 
                    errorMessage: 'Số điện thoại không hợp lệ, phải có 10-11 chữ số' 
                });
            }
    
            // Kiểm tra username đã tồn tại chưa
            const existingUser = await User.findByUsername(username);
            if (existingUser) {
                return res.render('auth/dangky', { 
                    showHeaderFooter: false, 
                    errorMessage: 'Tên đăng nhập đã tồn tại' 
                });
            }
    
            // Băm mật khẩu
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
    
            // Tạo tài khoản mới (bổ sung FirstName & LastName)
            await User.create(username, passwordHash, email, parseInt(phone), firstName, lastName);
    
            // Chuyển hướng đến trang đăng nhập với thông báo thành công
            res.render('auth/dangnhap', { 
                showHeaderFooter: false, 
                successMessage: 'Đăng ký thành công! Vui lòng đăng nhập.' 
            });
    
        } catch (error) {
            console.error("Lỗi trong quá trình đăng ký:", error);
            return res.render('auth/dangky', { 
                showHeaderFooter: false, 
                errorMessage: 'Lỗi máy chủ, vui lòng thử lại sau' 
            });
        }
    }
    
}

export default new DangKyController();
