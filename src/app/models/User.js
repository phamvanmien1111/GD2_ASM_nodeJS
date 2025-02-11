// const db = require('../../config/db');
// class User {
//     static async nguoidung(username){
//         return new Promise((resolve, reject) =>{
//             const sql = ' SELECT * FROM users WHERE username= ?';
//             db.query(sql, [username], (err, result) => {
//                 if (err) reject(err);
//                 resolve(result[0]); // Trả về user đầu tiên
//             });
//         })
//     }
// }
const db = require('../../config/db'); // Kết nối DB

class User {
    // Tìm người dùng theo username
    static async findByUsername(username) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
            db.query(query, [username], (err, results) => {
                if (err) reject(err);
                resolve(results[0]); // Trả về user đầu tiên tìm thấy
            });
        });
    }
}

module.exports = User;
