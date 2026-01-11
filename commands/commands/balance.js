const { getUser } = require('../utils/economy');

module.exports = {
  async execute(message) {
    const user = getUser(message.author.id);
    message.reply(`💰 Số dư của bạn: ${user.balance} coins`);
  }
};