// กติกาให้ดาวจากจำนวนที่ผิด (เหมือนทุกเกมในจักรวาล)
//   ผิด 0-1 = 3⭐ · 2-4 = 2⭐ · 5+ = 1⭐ (จบด่านได้อย่างน้อย 1 ดาวเสมอ)
export type StarCount = 1 | 2 | 3;

export function computeStars(mistakes: number): StarCount {
  if (mistakes <= 1) return 3;
  if (mistakes <= 4) return 2;
  return 1;
}
