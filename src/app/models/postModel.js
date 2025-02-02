// src/app/models/postModel.js
const connection = require('../../config/db');

const Post = {
  // Hàm lấy tất cả bài viết
  fetchAll: (callback) => {
    const query = 'SELECT * FROM posts';
    connection.query(query, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // Hàm lấy bài viết theo ID
  getPostById: (id, callback) => {
    const query = 'SELECT * FROM posts WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  }
};

module.exports = Post;