const { EmbedBuilder } = require('discord.js');

module.exports = {
  async execute(message) {
    const embed = new EmbedBuilder()
      .setTitle('📘 Hướng dẫn lệnh của Bot')
      .setColor(0x1abc9c)
      .setDescription('Dưới đây là các lệnh bạn có thể dùng. Prefix: `daica` hoặc `d`. Ví dụ: `d bj 100`')
      .addFields(
        { name: '🎮 Trò chơi', value: '`bj <số>` — Blackjack\n`slots <số>` — Slots\n`coinflip <heads|tails> <số>` — Coinflip', inline: false },
        { name: '💰 Quản lý tiền', value: '`balance` — Xem số dư\n`daily` — Nhận thưởng hằng ngày\n`give @user <số|infinity>` — (Admin) cấp xu', inline: false },
        { name: '🔧 Khác', value: '`leaderboard` — Bảng xếp hạng\n`dhelp` / `d help` — Hiện bảng trợ giúp', inline: false }
      )
      .setFooter({ text: 'DEV-Roblox-Studio-Bot • Gõ lệnh để chơi' })
      .setTimestamp();

    // small visual accent image (optional)
    embed.setThumbnail('https://i.imgur.com/4M34hi2.png');

    try {
      await message.reply({ embeds: [embed] });
    } catch (e) {
      console.error('Failed to send help embed', e);
      message.reply('Hiện không thể gửi embed — hãy thử lại.');
    }
  }
};
