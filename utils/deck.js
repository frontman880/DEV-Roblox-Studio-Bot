// utils/deck.js

// Tạo bộ bài chuẩn 52 lá
function createDeck() {
  const suits = ['♠','♥','♦','♣']; // chất bài
  const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']; // giá trị
  const deck = [];
  for (const s of suits) {
    for (const v of values) {
      deck.push(`${v}${s}`);
    }
  }
  return deck;
}

// Xáo bài ngẫu nhiên (Fisher-Yates shuffle)
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Tính điểm của một hand
function calcScore(hand) {
  let score = 0;
  let aces = 0;

  for (const card of hand) {
    const value = card.slice(0, -1); // bỏ chất, chỉ lấy giá trị
    if (['J','Q','K'].includes(value)) {
      score += 10;
    } else if (value === 'A') {
      score += 11;
      aces++;
    } else {
      score += parseInt(value);
    }
  }

  // Nếu vượt quá 21 và có A, giảm A từ 11 xuống 1
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
}

module.exports = { createDeck, shuffle, calcScore };