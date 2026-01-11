const { topUsers } = require('../utils/economy');

module.exports = {
  async execute(message) {
    const rows = topUsers(10);
    if (!rows || rows.length === 0) return message.reply('Không có dữ liệu leaderboard.');

    const lines = rows.map((r, i) => `${i + 1}. <@${r.user_id}> — ${r.balance} coins`);
    message.reply(`🏆 Leaderboard\n${lines.join('\n')}`);
  }
};
