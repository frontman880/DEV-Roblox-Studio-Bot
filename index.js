const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { checkCooldown } = require('./utils/cooldown');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefixes = ['daica', 'd']; // allow short prefix 'd' as alias for 'daica'

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const lower = message.content.toLowerCase();
  // Compact help aliases: allow `dhelp` or `daicahelp` without space
  if (lower === 'dhelp' || lower === 'daicahelp') {
    return require('./commands/help').execute(message);
  }
  const matched = prefixes.find(p => lower === p || lower.startsWith(p + ' '));
  if (!matched) return;

  const args = message.content.slice(matched.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  try {
    console.log(`[MSG] ${message.author.tag}: ${message.content}`);
    if (command === 'help') {
      return require('./commands/help').execute(message);
    }
    if (command === 'bj') {
      const bet = parseInt(args[0]);
      const cooldownSec = 10;
      const remaining = checkCooldown(message.author.id, 'global', cooldownSec * 1000, false);
      if (remaining > 0) {
        try {
          const warn = await message.reply(`<@${message.author.id}>, vui lòng đợi ${remaining} giây trước khi chơi tiếp.`);
          setTimeout(() => warn.delete().catch(() => {}), remaining * 1000);
        } catch (e) {}
        return;
      }

      await require('./commands/bj').execute(message, bet);
      checkCooldown(message.author.id, 'global', cooldownSec * 1000, true);
      return;
    }

    if (command === 'slots') {
      const bet = parseInt(args[0]);
      const cooldownSec = 10;
      const remaining = checkCooldown(message.author.id, 'global', cooldownSec * 1000, false);
      if (remaining > 0) {
        try {
          const warn = await message.reply(`<@${message.author.id}>, vui lòng đợi ${remaining} giây trước khi chơi tiếp.`);
          setTimeout(() => warn.delete().catch(() => {}), remaining * 1000);
        } catch (e) {}
        return;
      }

      await require('./commands/slots').execute(message, bet);
      checkCooldown(message.author.id, 'global', cooldownSec * 1000, true);
      return;
    }

    if (command === 'coinflip' || command === 'conflip' ) {
      const side = args[0]; // heads/tails
      const bet = parseInt(args[1]);
      const cooldownSec = 10;
      const remaining = checkCooldown(message.author.id, 'global', cooldownSec * 1000, false);
      if (remaining > 0) {
        try {
          const warn = await message.reply(`<@${message.author.id}>, vui lòng đợi ${remaining} giây trước khi chơi tiếp.`);
          setTimeout(() => warn.delete().catch(() => {}), remaining * 1000);
        } catch (e) {}
        return;
      }

      await require('./commands/conflip').execute(message, side, bet);
      checkCooldown(message.author.id, 'global', cooldownSec * 1000, true);
      return;
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

client.once('clientReady', () => {
  console.log(`✅ Bot đã đăng nhập: ${client.user.tag}`);
});

client.login(process.env.TOKEN);