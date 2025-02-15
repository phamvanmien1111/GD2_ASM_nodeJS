const db = require('../../config/db'); // Kết nối DB

// class User {
//     // Tìm người dùng theo username
//     static async findByUsername(username) {
//         return new Promise((resolve, reject) => {
//             const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
//             db.query(query, [username], (err, results) => {
//                 if (err) reject(err);
//                 resolve(results[0]); // Trả về user đầu tiên tìm thấy
//             });
//         });
//     }
//     //đăng ký tài khoản
//     static async create(username, passwordHash, email) {
//         try {
//             const query = `INSERT INTO users (Username, PasswordHash, Email, CreatedAt) VALUES (?, ?, ?, NOW())`;
            
//             const [result] = await db.query(query, [username, passwordHash, email]); // Dùng await
            
//             console.log('✅ Insert thành công:', result);
//             return result.insertId; // Trả về ID của user vừa tạo
//         } catch (error) {
//             console.error('❌ Lỗi khi tạo user:', error);
//             throw error;
//         }
//     }
// }

// module.exports = User;
class User {
    static async findByUsername(username) {
        try {
            const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
            const [results] = await db.execute(query, [username]); // Thay query() -> execute()
            return results[0]; // Trả về user đầu tiên nếu có
        } catch (error) {
            console.error('Lỗi truy vấn findByUsername:', error);
            throw error;
        }
    }

    static async create(username, passwordHash, email,LastName,FirstName,Gender) {
        try {
            const query = `INSERT INTO users (Username, PasswordHash, Email,LastName,FirstName,Gender, CreatedAt) VALUES (?, ?, ?,?,?,?, NOW())`;
            const [result] = await db.execute(query, [username, passwordHash,email,LastName,FirstName,Gender]);// execute()
            return result.insertId;
        } catch (error) {
            console.error('Lỗi khi tạo user:', error);
            throw error;
        }
    }
}

module.exports = User;
