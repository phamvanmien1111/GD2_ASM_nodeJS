// config/constants.js
module.exports = {
    PORT: process.env.PORT || 3000,               // Cổng mặc định
    SECRET_KEY: process.env.SECRET_KEY || 'your-secret-key', // Khóa bí mật
    DB_CONFIG: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'nodeasm'
    }
  };