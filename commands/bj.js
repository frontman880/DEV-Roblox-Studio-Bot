const { getUser, addBalance, subBalance } = require('../utils/economy');
const { createDeck, shuffle, calcScore } = require('../utils/deck');

module.exports = {
  async execute(message, bet) {
    if (isNaN(bet) || bet <= 0) return message.reply('Cược không hợp lệ.');

    const user = getUser(message.author.id);
    if (!user || user.balance <= 0) return message.reply('Bạn không có xu để chơi. Hãy kiếm xu bằng lệnh `daica daily` hoặc nhờ admin cấp.');
    if (bet > user.balance) return message.reply('Số dư không đủ để cược.');

    const deck = createDeck();
    shuffle(deck);
    const player = [deck.pop(), deck.pop()];
    const dealer = [deck.pop(), deck.pop()];
    const pScore = calcScore(player);
    const dScore = calcScore(dealer);

    let result = '';
    if (pScore > 21) {
      subBalance(message.author.id, bet);
      result = `Bạn bust rồi! Thua ${bet} coins.`;
    } else if (dScore > 21 || pScore > dScore) {
      addBalance(message.author.id, bet);
      result = `Bạn thắng ${bet} coins!`;
    } else if (pScore < dScore) {
      subBalance(message.author.id, bet);
      result = `Bạn thua ${bet} coins.`;
    } else {
      result = 'Hòa!';
    }

    message.reply(`🃏 Blackjack\nBạn: ${player.join(', ')} (${pScore})\nDealer: ${dealer.join(', ')} (${dScore})\n${result}`);
  }
};