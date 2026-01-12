const { getUser, addBalance, removeBalance } = require('../utils/economy');
const db = require('../db/database');
const { PermissionsBitField } = require('discord.js');

module.exports = {
  async execute(message, targetUser, amount) {
    const userId = targetUser.id;
    const senderId = message.author.id;

    // Nếu người gửi là admin
    const isAdmin = message.member && message.member.permissions.has(PermissionsBitField.Flags.Administrator);

    // Trường hợp admin muốn cấp vô hạn
    if (isAdmin && (amount === 'infinity' || amount === '-1')) {
      db.prepare('UPDATE users SET balance = ? WHERE user_id = ?')
        .run(999999999, userId); // hoặc một số cực lớn
      return message.reply(`💎 Đã cấp coin vô hạn cho <@${userId}>`);
    }

    // Nếu amount là số bình thường
    const num = parseInt(amount);
    if (isNaN(num) || num <= 0) {
      return message.reply('❌ Số tiền không hợp lệ.');
    }

    if (isAdmin) {
      // Admin có thể tặng mà không bị trừ tiền
      addBalance(userId, num);
      return message.reply(`✅ Admin đã cấp ${num} coins cho <@${userId}>`);
    } else {
      // Người thường phải trừ tiền từ balance của chính họ
      const sender = getUser(senderId);
      if (!sender || sender.balance < num) {
        return message.reply('❌ Bạn không đủ coins để tặng.');
      }

      // Trừ tiền người gửi, cộng tiền người nhận
      removeBalance(senderId, num);
      addBalance(userId, num);

      return message.reply(`✅ Bạn đã tặng ${num} coins cho <@${userId}>`);
    }
  }
};
