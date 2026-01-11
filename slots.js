const { getUser, addBalance, subBalance } = require('../utils/economy');

const symbols = ['🍒','🍋','⭐','🔔','🍀'];

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

module.exports = {
  async execute(message, rawBet) {
    const user = getUser(message.author.id);
    if (!user || user.balance <= 0) return message.reply('Bạn không có xu để chơi. Hãy kiếm xu bằng lệnh `daica daily`');

    // support `all` keyword
    let bet;
    if (typeof rawBet === 'string' && rawBet.toLowerCase() === 'all') {
      bet = user.balance;
    } else {
      bet = parseInt(rawBet, 10);
    }

    if (isNaN(bet) || bet <= 0) return message.reply('Cược không hợp lệ. Ví dụ: `daica slots 100`');
    if (bet > user.balance) return message.reply('Số dư không đủ để cược.');

    // Send initial spinning message
    const spinMsg = await message.reply('🎰 Đang quay: ▫ | ▫ | ▫');

    // simulate smoother spinning animation with staggered stops
    // target total spin ~5-6 seconds
    const steps = 20;
    const final = [randomSymbol(), randomSymbol(), randomSymbol()];
    const stopOffsets = [Math.floor(steps * 0.55), Math.floor(steps * 0.75), steps - 1];
    stopOffsets[0] += Math.floor(Math.random() * 3);
    stopOffsets[1] += Math.floor(Math.random() * 2);

    const minDelay = 50; // ms
    const maxDelay = 800; // ms (gives total around 5-6s)

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const delay = Math.floor(minDelay + (maxDelay - minDelay) * (t * t));

      const a = i >= stopOffsets[0] ? final[0] : randomSymbol();
      const b = i >= stopOffsets[1] ? final[1] : randomSymbol();
      const c = i >= stopOffsets[2] ? final[2] : randomSymbol();

      try {
        await spinMsg.edit(`🎰 ${a} | ${b} | ${c}`);
      } catch (e) {
        // ignore edit errors
      }

      await new Promise(res => setTimeout(res, delay));
    }

    // Determine payout based on final
    const [r1, r2, r3] = final;
    let payout = 0;
    if (r1 === r2 && r2 === r3) payout = bet * 5;
    else if (r1 === r2 || r2 === r3 || r1 === r3) payout = Math.floor(bet * 1.5);
    else payout = -bet;

    // Apply balance change
    if (payout >= 0) addBalance(message.author.id, payout);
    else subBalance(message.author.id, bet);

    // Build unified result message
    const net = payout >= 0 ? payout : -bet;
    const sign = payout >= 0 ? `+${net}` : `-${net}`;
    const outcome = payout > 0 ? 'Thắng' : (payout === 0 ? 'Hòa' : 'Thua');

    try {
      await spinMsg.edit(
        `🎰 Kết quả: ${r1} | ${r2} | ${r3}\n` +
        `Đặt cược: ${bet} coins\n` +
        `Kết quả: ${outcome}\n` +
        `Thay đổi: ${sign}`
      );
    } catch (e) {}

    return;
  }
};