// ปลดด่าน: ด่าน 1 เปิดเสมอ · ด่าน n เปิดเมื่อด่าน n-1 มีดาว ≥ 1 (ทุกด่านฟรี)
// starsOfGame = แผนที่ดาวของ "เกมนั้น" (ต่อเกม แยกกัน)
export function isLevelUnlocked(
  level: number,
  starsOfGame: Record<number, number>,
): boolean {
  if (level <= 1) return true;
  return (starsOfGame[level - 1] ?? 0) >= 1;
}
