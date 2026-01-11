const { getUser, addBalance, subBalance } = require('../utils/economy');
const { createDeck, shuffle, calcScore } = require('../utils/deck');

module.exports = {
  async execute(message, rawBet) {
    const user = getUser(message.author.id);
    if (!user || user.balance <= 0) return message.reply('Bạn không có xu để chơi. Hãy kiếm xu bằng lệnh `daica daily`.');

    // support `all` to bet entire balance
    let bet;
    if (typeof rawBet === 'string' && rawBet.toLowerCase() === 'all') {
      bet = user.balance;
    } else {
      bet = parseInt(rawBet);
    }

    if (isNaN(bet) || bet <= 0) return message.reply('Cược không hợp lệ.');
    if (bet > user.balance) return message.reply('Số dư không đủ để cược.');

    const deck = createDeck();
    shuffle(deck);
    const player = [deck.pop(), deck.pop()];
    const dealer = [deck.pop(), deck.pop()];
    const pScore = calcScore(player);
    const dScore = calcScore(dealer);

    let result = '';
    let change = 0; // net change to balance
    if (pScore > 21) {
      subBalance(message.author.id, bet);
      change = -bet;
      result = `Lose — bạn bust!`;
    } else if (dScore > 21 || pScore > dScore) {
      addBalance(message.author.id, bet);
      change = bet;
      result = `Win — bạn thắng!`;
    } else if (pScore < dScore) {
      subBalance(message.author.id, bet);
      change = -bet;
      result = `Lose — bạn thua.`;
    } else {
      result = 'Hòa!';
      change = 0;
    }

    const changeText = change > 0 ? `+${change}` : `${change}`;
    const reply = `🃏 Blackjack\nĐặt cược: ${bet} coins\nKết quả: ${result} (${changeText} coins)\nBạn: ${player.join(', ')} (${pScore})\nDealer: ${dealer.join(', ')} (${dScore})`;

    message.reply(reply);
  }
};