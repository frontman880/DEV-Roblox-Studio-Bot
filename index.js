const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = 'daica';

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  try {
    console.log(`[MSG] ${message.author.tag}: ${message.content}`);
    if (command === 'bj') {
      const bet = parseInt(args[0]);
      return require('./commands/bj').execute(message, bet);
    }

    if (command === 'slots') {
      const bet = parseInt(args[0]);
      return require('./commands/slots').execute(message, bet);
    }

    if (command === 'coinflip') {
      const side = args[0]; // heads/tails
      const bet = parseInt(args[1]);
      // file in repo is named `conflip.js` so require that file
      return require('./commands/conflip').execute(message, side, bet);
    }

    if (command === 'balance') {
      return require('./commands/balance').execute(message);
    }

    if (command === 'daily') {
      return require('./commands/daily').execute(message);
    }

    if (command === 'leaderboard') {
      return require('./commands/leaderboard').execute(message);
    }

    if (command === 'give') {
      const target = message.mentions.users.first();
      const amount = args[1];
      if (!target) return message.reply('❌ Bạn phải tag người nhận.');
      return require('./commands/give').execute(message, target, amount);
    }

  } catch (e) {
    console.error('Error handling command', command, e.stack || e);
    message.reply('Có lỗi xảy ra khi xử lý lệnh. (' + (e.message || 'unknown') + ')');
  }
});

client.once('ready', () => {
  console.log(`✅ Bot đã đăng nhập: ${client.user.tag}`);
});

client.login(process.env.TOKEN);