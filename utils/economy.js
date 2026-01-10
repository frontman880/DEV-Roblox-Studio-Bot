const db = require('../db/database');

function getUser(userId) {
  const row = db.prepare('SELECT * FROM users WHERE user_id = ?').get(userId);
  if (row) return row;
  db.prepare('INSERT INTO users (user_id) VALUES (?)').run(userId);
  return db.prepare('SELECT * FROM users WHERE user_id = ?').get(userId);
}

function addBalance(userId, amount) {
  db.prepare('UPDATE users SET balance = balance + ? WHERE user_id = ?').run(amount, userId);
}

function subBalance(userId, amount) {
  db.prepare('UPDATE users SET balance = balance - ? WHERE user_id = ?').run(amount, userId);
}

function setLastDaily(userId, timestamp) {
  db.prepare('UPDATE users SET last_daily = ? WHERE user_id = ?').run(timestamp, userId);
}

function topUsers(limit = 10) {
  return db.prepare('SELECT user_id, balance FROM users ORDER BY balance DESC LIMIT ?').all(limit);
}

module.exports = { getUser, addBalance, subBalance, setLastDaily, topUsers };