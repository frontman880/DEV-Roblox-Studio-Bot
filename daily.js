const { getUser, addBalance, setLastDaily } = require('../utils/economy');

module.exports = {
  async execute(message) {
    const user = getUser(message.author.id);
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;

    if (now - user.last_daily < cooldown) {
      const remainingMs = cooldown - (now - user.last_daily);
      const hours = Math.floor(remainingMs / (60 * 60 * 1000));
      const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
      return message.reply(`⏳ Bạn đã nhận daily rồi. Thử lại sau ${hours}h ${minutes}m.`);
    }

    const reward = 500;
    addBalance(message.author.id, reward);
    setLastDaily(message.author.id, now);
    message.reply(`🎁 Bạn nhận được ${reward} coins từ daily!`);
  }
};