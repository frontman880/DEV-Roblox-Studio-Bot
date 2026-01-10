const { getUser, addBalance, subBalance } = require('../utils/economy');

const symbols = ['🍒','🍋','⭐','🔔','🍀'];

module.exports = {
  async execute(message, bet) {
    if (isNaN(bet) || bet <= 0) return message.reply('Cược không hợp lệ. Ví dụ: `daica slots 100`');

    const user = getUser(message.author.id);
    if (bet > user.balance) return message.reply('Số dư không đủ để cược.');

    const roll = () => symbols[Math.floor(Math.random() * symbols.length)];
    const r1 = roll(), r2 = roll(), r3 = roll();

    let payout = 0;
    if (r1 === r2 && r2 === r3) payout = bet * 5;
    else if (r1 === r2 || r2 === r3 || r1 === r3) payout = Math.floor(bet * 1.5);
    else payout = -bet;

    if (payout >= 0) addBalance(message.author.id, payout);
    else subBalance(message.author.id, bet);

    message.reply(
      `🎰 Slots: ${r1} | ${r2} | ${r3}\n` +
      `${payout >= 0 ? `Bạn thắng ${payout} coins!` : `Bạn thua ${bet} coins.`}`
    );
  }
};