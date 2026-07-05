// สุ่ม — เรียกเฉพาะใน effect/handler เท่านั้น (กัน hydration mismatch)
import type { AbcRound } from "@/src/domain/ports/level.port";

/** Fisher-Yates — คืน array ใหม่ (ไม่แก้ต้นฉบับ) */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export interface LetterTile {
  id: string;
  letter: string;
}

/**
 * สร้างถาด tile สำหรับ Easy ABC — ตัวอักษรของคำ + ตัวหลอก (decoys) ที่ไม่อยู่ในคำ
 * แต่ละ tile มี id ไม่ซ้ำ (รองรับคำที่มีตัวอักษรซ้ำ เช่น EGG/BEE)
 */
export function buildTray(round: AbcRound): LetterTile[] {
  const wordLetters = round.word.toUpperCase().split("");
  const inWord = new Set(wordLetters);
  const decoyPool = shuffle(ALPHABET.filter((l) => !inWord.has(l)));
  const decoys = decoyPool.slice(0, Math.max(0, round.decoys));
  const all = shuffle([...wordLetters, ...decoys]);
  return all.map((letter, i) => ({ id: `${letter}-${i}`, letter }));
}

/** สลับลำดับตัวเลือก (Math/Colors) — คำตอบถูกอยู่ index ไหนก็ได้ */
export function shuffleChoices<T>(choices: readonly T[]): T[] {
  return shuffle(choices);
}
