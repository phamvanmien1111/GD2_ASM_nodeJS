// config/db.js
const mysql = require('mysql2');

// Tạo kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',     
  user: process.env.DB_USER || 'root',        
  password: process.env.DB_PASSWORD || '',      
  database: process.env.DB_NAME || 'nodeasm'    
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', err.stack);
    return;
  }
  console.log('Kết nối đến cơ sở dữ liệu thành công ahihi!');
});

module.exports = connection;