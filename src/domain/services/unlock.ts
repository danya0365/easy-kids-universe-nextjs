// ปลดด่าน: ด่าน 1 เปิดเสมอ · ด่าน n เปิดเมื่อด่าน n-1 มีดาว ≥ 1 (ทุกด่านฟรี)
// starsOfGame = แผนที่ดาวของ "เกมนั้น" (ต่อเกม แยกกัน)
export function isLevelUnlocked(
  level: number,
  starsOfGame: Record<number, number>,
): boolean {
  if (level <= 1) return true;
  return (starsOfGame[level - 1] ?? 0) >= 1;
}

// ด่านที่ควร "เล่นต่อ" ในเกมหนึ่ง (ใช้บน dashboard):
//  1) ด่านแรกที่ปลดล็อกแล้วแต่ยังไม่ผ่าน (stars === 0)
//  2) ถ้าผ่านหมดแล้ว → ด่านแรกที่ยังไม่ได้ 3 ดาว (stars < 3)
//  3) ถ้า 3 ดาวครบทุกด่าน → ด่าน 1 (เล่นซ้ำได้)
export function recommendedLevel(
  starsOfGame: Record<number, number>,
  levelCount: number,
): number {
  if (levelCount <= 0) return 1;
  for (let lvl = 1; lvl <= levelCount; lvl++) {
    if (isLevelUnlocked(lvl, starsOfGame) && (starsOfGame[lvl] ?? 0) === 0) {
      return lvl;
    }
  }
  for (let lvl = 1; lvl <= levelCount; lvl++) {
    if ((starsOfGame[lvl] ?? 0) < 3) return lvl;
  }
  return 1;
}
