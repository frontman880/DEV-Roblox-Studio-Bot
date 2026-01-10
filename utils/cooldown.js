// utils/cooldown.js
const cooldowns = new Map(); // Map lưu userId -> timestamp

function checkCooldown(userId, command, delay = 5000, set = true) {
  const key = `${userId}-${command}`;
  const now = Date.now();

  if (cooldowns.has(key)) {
    const last = cooldowns.get(key);
    if (now - last < delay) {
      const remaining = Math.ceil((delay - (now - last)) / 1000);
      return remaining; // trả về số giây còn lại
    }
  }

  if (set) cooldowns.set(key, now);
  return 0; // 0 nghĩa là không bị cooldown
}

module.exports = { checkCooldown };