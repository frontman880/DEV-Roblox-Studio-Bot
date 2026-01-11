const { getUser, addBalance } = require('../utils/economy');
const db = require('../db/database');
const { PermissionsBitField } = require('discord.js');

module.exports = {
  async execute(message, targetUser, amount) {
    // Kiểm tra quyền admin
    if (!message.member || !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply('❌ Bạn không có quyền dùng lệnh này.');
    }

    // Lấy ID người được nhận
    const userId = targetUser.id;

    // Nếu amount là "infinity" hoặc "-1" → coin vô hạn
    if (amount === 'infinity' || amount === '-1') {
      db.prepare('UPDATE users SET balance = ? WHERE user_id = ?')
        .run(999999999, userId); // hoặc một số cực lớn
      return message.reply(`💎 Đã cấp coin vô hạn cho <@${userId}>`);
    }

    // Nếu amount là số bình thường
    const num = parseInt(amount);
    if (isNaN(num) || num <= 0) {
      return message.reply('❌ Số tiền không hợp lệ.');
    }

    addBalance(userId, num);
    message.reply(`✅ Đã cấp ${num} coins cho <@${userId}>`);
  }
};