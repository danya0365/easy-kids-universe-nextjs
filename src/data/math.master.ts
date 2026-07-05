import type { MathRound, LevelDef } from "@/src/domain/ports/level.port";

// Easy Math — 5 ด่าน × 5 รอบ · choices[0] = คำตอบถูก (runtime สลับลำดับก่อนแสดง)
export const MATH_LEVELS: LevelDef<MathRound>[] = [
  {
    gameId: "math",
    level: 1,
    titleTh: "นับ 1 ถึง 5",
    rounds: [
      { kind: "count", emoji: "🍎", count: 3, choices: [3, 2, 4] },
      { kind: "count", emoji: "🐟", count: 5, choices: [5, 3, 4] },
      { kind: "count", emoji: "⭐", count: 2, choices: [2, 1, 3] },
      { kind: "count", emoji: "🎈", count: 4, choices: [4, 5, 3] },
      { kind: "count", emoji: "🐤", count: 1, choices: [1, 2, 3] },
    ],
  },
  {
    gameId: "math",
    level: 2,
    titleTh: "นับ 6 ถึง 10",
    rounds: [
      { kind: "count", emoji: "🍓", count: 6, choices: [6, 5, 7] },
      { kind: "count", emoji: "🐝", count: 8, choices: [8, 7, 9] },
      { kind: "count", emoji: "🌸", count: 10, choices: [10, 9, 8] },
      { kind: "count", emoji: "🐢", count: 7, choices: [7, 6, 8] },
      { kind: "count", emoji: "🍇", count: 9, choices: [9, 10, 8] },
    ],
  },
  {
    gameId: "math",
    level: 3,
    titleTh: "บวกไม่เกิน 5",
    rounds: [
      { kind: "add", a: 1, b: 1, choices: [2, 3, 1] },
      { kind: "add", a: 2, b: 1, choices: [3, 4, 2] },
      { kind: "add", a: 2, b: 2, choices: [4, 5, 3] },
      { kind: "add", a: 1, b: 3, choices: [4, 3, 5] },
      { kind: "add", a: 3, b: 2, choices: [5, 4, 6] },
    ],
  },
  {
    gameId: "math",
    level: 4,
    titleTh: "บวกไม่เกิน 10",
    rounds: [
      { kind: "add", a: 3, b: 3, choices: [6, 7, 5] },
      { kind: "add", a: 4, b: 2, choices: [6, 5, 8] },
      { kind: "add", a: 5, b: 2, choices: [7, 8, 6] },
      { kind: "add", a: 4, b: 4, choices: [8, 9, 7] },
      { kind: "add", a: 5, b: 5, choices: [10, 9, 8] },
    ],
  },
  {
    gameId: "math",
    level: 5,
    titleTh: "ลบภายใน 10",
    rounds: [
      { kind: "sub", a: 5, b: 2, choices: [3, 2, 4] },
      { kind: "sub", a: 6, b: 1, choices: [5, 4, 6] },
      { kind: "sub", a: 8, b: 3, choices: [5, 6, 4] },
      { kind: "sub", a: 9, b: 4, choices: [5, 3, 6] },
      { kind: "sub", a: 10, b: 5, choices: [5, 4, 7] },
    ],
  },
];
