// // config/db.js
// const mysql = require('mysql2');

// // Tạo kết nối đến cơ sở dữ liệu
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost',     
//   user: process.env.DB_USER || 'root',        
//   password: process.env.DB_PASSWORD || '',      
//   database: process.env.DB_NAME || 'nodeasm'    
// });

// // Kết nối đến cơ sở dữ liệu
// connection.connect((err) => {
//   if (err) {
//     console.error('Lỗi kết nối đến cơ sở dữ liệu:', err.stack);
//     return;
//   }
//   console.log('Kết nối đến cơ sở dữ liệu thành công ahihi!');
// });

// module.exports = connection;
import mysql from 'mysql2/promise'; // Dùng promise để hỗ trợ async/await

// Tạo pool kết nối với .promise()
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nodeasm',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Sử dụng `pool.promise()` để hỗ trợ async/await
const db = pool;

// Kiểm tra kết nối
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Kết nối đến cơ sở dữ liệu thành công ahihi!');
    connection.release(); // Giải phóng kết nối sau khi kiểm tra
  } catch (err) {
    console.error('❌ Lỗi kết nối đến cơ sở dữ liệu:', err);
  }
})();

export default db; // Xuất db thay vì pool
