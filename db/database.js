const Database = require('better-sqlite3');
const db = new Database('casino.db'); // tạo file casino.db trong thư mục dự án

// Tạo bảng nếu chưa có
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    balance INTEGER DEFAULT 1000,
    last_daily INTEGER DEFAULT 0
  );
`);

module.exports = db;