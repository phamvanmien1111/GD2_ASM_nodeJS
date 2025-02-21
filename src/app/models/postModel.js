// // src/app/models/postModel.js
// const connection = require('../../config/db');

// const Post = {
//   // Hàm lấy tất cả bài viết
//   fetchAll: (callback) => {
//     const query = 'SELECT * FROM posts';
//     connection.query(query, (err, results) => {
//       if (err) return callback(err, null);
//       callback(null, results);
//     });
//   },

//   // Hàm lấy bài viết theo ID
//   getPostById: (id, callback) => {
//     const query = 'SELECT * FROM posts WHERE id = ?';
//     connection.query(query, [id], (err, results) => {
//       if (err) return callback(err, null);
//       callback(null, results[0]);
//     });
//   }
// };

// module.exports = Post;
// const db = require('../../config/db'); // Import kết nối DB đã dùng .promise()
// const Post = {
//   // Hàm lấy tất cả bài viết
//   fetchAll: async () => {
//     try {
//         const [rows] = await db.query(`
//             SELECT posts1.*, users.FirstName, users.LastName, users.Avatar 
//             FROM posts1
//             JOIN users ON posts1.UserID = users.UserID
//             ORDER BY posts1.CreatedAt DESC
//         `);
//         return rows;
//     } catch (error) {
//         console.error('❌ Lỗi khi lấy danh sách bài viết:', error);
//         throw error;
//     }
// },

//   // Hàm lấy bài viết theo ID
//   getPostById: async (id) => {
//     try {
//       const [rows] = await db.query('SELECT * FROM posts1 WHERE id = ?', [id]);
//       return rows.length ? rows[0] : null;
//     } catch (error) {
//       console.error(`❌ Lỗi khi lấy bài viết ID ${id}:`, error);
//       throw error;
//     }
//   },
//   createPost: async (Content, imageUrl, userID) => {
//     try {
//       const query = `INSERT INTO posts1 (UserID, Content, ImageURL, CreatedAt) VALUES (?, ?, ?, NOW())`;
//       const [result] = await db.execute(query, [userID, Content, imageUrl || null]); // Xử lý null nếu imageUrl là undefined
//       return result.insertId;
//     } catch (error) {
//       console.error('Lỗi khi tạo bài viết:', error);
//       throw error;
//     }
//   }
// };


// module.exports = Post;
import db from "../../config/db.js"; 

class Post {
  // Lấy tất cả bài viết
  static async fetchAll() {
    try {
      const [rows] = await db.query(`
        SELECT posts1.*, users.FirstName, users.LastName, users.Avatar 
        FROM posts1
        JOIN users ON posts1.UserID = users.UserID
        ORDER BY posts1.CreatedAt DESC
      `);
      return rows;
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách bài viết:", error);
      throw error;
    }
  }

  // Lấy bài viết theo ID
  static async getPostById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM posts1 WHERE id = ?", [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error(`❌ Lỗi khi lấy bài viết ID ${id}:`, error);
      throw error;
    }
  }

  // Tạo bài viết mới
  static async createPost(Content, imageUrl, userID) {
    try {
      const query = `
        INSERT INTO posts1 (UserID, Content, ImageURL, CreatedAt) 
        VALUES (?, ?, ?, NOW())
      `;
      const [result] = await db.execute(query, [userID, Content, imageUrl || null]); // Xử lý null nếu imageUrl là undefined
      return result.insertId;
    } catch (error) {
      console.error("❌ Lỗi khi tạo bài viết:", error);
      throw error;
    }
  }

  // 🔍 Tìm kiếm bài viết theo tiêu đề, nội dung, tác giả, hoặc ngày đăng
  static async search({ content, author, date }) {
    try {
        let sql = `
            SELECT posts1.*, users.FirstName, users.LastName, users.Avatar 
            FROM posts1
            JOIN users ON posts1.UserID = users.UserID
            WHERE 1=1
        `;
        const params = [];
        if (content) {
            sql += " AND posts1.Content LIKE ?";
            params.push(`%${content}%`);
        }
        if (author) {
            sql += " AND CONCAT(users.FirstName, ' ', users.LastName) LIKE ?";
            params.push(`%${author}%`);
        }
        if (date) {
            sql += " AND DATE(posts1.CreatedAt) = ?";
            params.push(date);
        }

        sql += " ORDER BY posts1.CreatedAt DESC"; // Sắp xếp bài viết mới nhất lên trên

        console.log("🔍 SQL Query:", sql, params); // Debug SQL
        const [rows] = await db.query(sql, params);
        return rows;
    } catch (error) {
        console.error("❌ Lỗi khi tìm kiếm bài viết:", error);
        throw error;
    }
  }
}

export default Post;
