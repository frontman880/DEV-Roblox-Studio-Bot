
# DEV-Roblox-Studio-Bot

Bot trò chơi nhỏ cho Discord (Blackjack / Slots / Coinflip) — prefix: `daica` hoặc ngắn gọn `d`.

## Lệnh (tóm tắt)
- `daica bj <số>` hoặc `d bj <số>` — Blackjack. Ví dụ: `d bj 100`.
- `daica slots <số>` hoặc `d slots <số>` — Slots. Ví dụ: `d slots 50`.
- `daica coinflip <heads|tails> <số>` hoặc `d coinflip heads 30` — Coinflip (alias `conflip`).
- `daica balance` hoặc `d balance` — Xem số dư.
- `daica daily` hoặc `d daily` — Nhận tiền hằng ngày.
- `daica leaderboard` hoặc `d leaderboard` — Bảng xếp hạng.
- `daica give @user <số|infinity>` hoặc `d give @user 100` — (Admin) cấp xu.
- `dhelp` / `d help` / `daica help` — Hiển thị trợ giúp (embed đẹp).

## Quy tắc chơi
- Mặc định tài khoản mới có `balance = 0` → cần dùng `daily` hoặc admin cấp `give` để có xu.
- Sau mỗi ván game (`bj`, `slots`, `coinflip`) người chơi sẽ bị cooldown 10 giây — nếu cố gửi lệnh trong thời gian chờ, bot sẽ tag và báo số giây còn phải đợi.

## Cài đặt & chạy (local)
1. Cài Node.js (phiên bản LTS).
2. Clone repo và cài phụ thuộc:
```powershell
cd DEV-Roblox-Studio-Bot
npm install
```
3. Tạo file `.env` (không push file này):
```
TOKEN=your_discord_bot_token_here
```
4. Chạy bot:
```powershell
node index.js
```

## Giữ bot luôn chạy (Windows)
- Cách đơn giản: dùng PM2 + Scheduled Task để phục hồi sau khi đăng nhập:
```powershell
npm install -g pm2
cd DEV-Roblox-Studio-Bot
pm2 start index.js --name dev-roblox-bot
pm2 save
# Tạo task để tự resurrect lúc login (chạy với quyền admin)
schtasks /Create /SC ONLOGON /RL HIGHEST /TN "PM2 Resurrect" /TR ""%APPDATA%\\npm\\pm2.cmd" resurrect" /F
```

## Triển khai lên dịch vụ (gợi ý)
- Render / Railway: connect GitHub repo → Build: `npm install` → Start: `npm start` → set env var `TOKEN`.

## Lưu ý bảo mật
- Tuyệt đối không commit token (`.env` đã được `.gitignore`). Nếu token lộ, hãy vào Discord Developer Portal → Bot → Regenerate Token ngay.

---
Nếu cần mình cập nhật README thêm ví dụ chi tiết, ảnh chụp màn hình, hoặc hướng dẫn deploy cụ thể sang Render/Railway thì nói mình biết.
