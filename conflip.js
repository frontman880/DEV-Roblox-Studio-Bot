const { getUser, addBalance, subBalance } = require('../utils/economy');

module.exports = {
  async execute(message, side, bet) {
    if (!side || !['heads','tails'].includes(side.toLowerCase()))
      return message.reply('Chọn mặt: `heads` hoặc `tails`. Ví dụ: `daica coinflip heads 100`');

    if (isNaN(bet) || bet <= 0) return message.reply('Cược không hợp lệ.');

    const user = getUser(message.author.id);
    if (!user || user.balance <= 0) return message.reply('Bạn không có xu để chơi. Hãy kiếm xu bằng lệnh `daica daily`.');
    if (bet > user.balance) return message.reply('Số dư không đủ để cược.');

    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    if (result === side.toLowerCase()) {
      addBalance(message.author.id, bet);
      message.reply(`🪙 Kết quả: ${result}. Bạn thắng ${bet} coins!`);
    } else {
      subBalance(message.author.id, bet);
      message.reply(`🪙 Kết quả: ${result}. Bạn thua ${bet} coins.`);
    }
  }
};