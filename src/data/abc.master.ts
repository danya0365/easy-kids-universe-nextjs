import type { AbcRound, LevelDef } from "@/src/domain/ports/level.port";

// Easy ABC — 5 ด่าน × 5 คำ (decoys = ตัวอักษรหลอกที่ไม่อยู่ในคำ)
// รูปคำ fallback เป็น emoji · รองรับไฟล์จริงที่ /easy-kid-universe/words/<word>.png ทีหลัง
export const ABC_LEVELS: LevelDef<AbcRound>[] = [
  {
    gameId: "abc",
    level: 1,
    titleTh: "คำ 3 ตัวอักษร",
    rounds: [
      { word: "DOG", emoji: "🐶", meaningTh: "หมา", decoys: 2 },
      { word: "CAT", emoji: "🐱", meaningTh: "แมว", decoys: 2 },
      { word: "SUN", emoji: "☀️", meaningTh: "พระอาทิตย์", decoys: 2 },
      { word: "BEE", emoji: "🐝", meaningTh: "ผึ้ง", decoys: 2 },
      { word: "EGG", emoji: "🥚", meaningTh: "ไข่", decoys: 2 },
    ],
  },
  {
    gameId: "abc",
    level: 2,
    titleTh: "คำ 4 ตัวอักษร",
    rounds: [
      { word: "FISH", emoji: "🐟", meaningTh: "ปลา", decoys: 2 },
      { word: "BIRD", emoji: "🐦", meaningTh: "นก", decoys: 2 },
      { word: "CAKE", emoji: "🍰", meaningTh: "เค้ก", decoys: 2 },
      { word: "MILK", emoji: "🥛", meaningTh: "นม", decoys: 2 },
      { word: "STAR", emoji: "⭐", meaningTh: "ดาว", decoys: 2 },
    ],
  },
  {
    gameId: "abc",
    level: 3,
    titleTh: "สัตว์กับธรรมชาติ",
    rounds: [
      { word: "FROG", emoji: "🐸", meaningTh: "กบ", decoys: 3 },
      { word: "DUCK", emoji: "🦆", meaningTh: "เป็ด", decoys: 3 },
      { word: "BEAR", emoji: "🐻", meaningTh: "หมี", decoys: 3 },
      { word: "MOON", emoji: "🌙", meaningTh: "พระจันทร์", decoys: 3 },
      { word: "TREE", emoji: "🌳", meaningTh: "ต้นไม้", decoys: 3 },
    ],
  },
  {
    gameId: "abc",
    level: 4,
    titleTh: "คำ 5 ตัวอักษร",
    rounds: [
      { word: "APPLE", emoji: "🍎", meaningTh: "แอปเปิล", decoys: 3 },
      { word: "HORSE", emoji: "🐴", meaningTh: "ม้า", decoys: 3 },
      { word: "HOUSE", emoji: "🏠", meaningTh: "บ้าน", decoys: 3 },
      { word: "TIGER", emoji: "🐯", meaningTh: "เสือ", decoys: 3 },
      { word: "BREAD", emoji: "🍞", meaningTh: "ขนมปัง", decoys: 3 },
    ],
  },
  {
    gameId: "abc",
    level: 5,
    titleTh: "คำ 6 ตัวอักษร",
    rounds: [
      { word: "RABBIT", emoji: "🐰", meaningTh: "กระต่าย", decoys: 4 },
      { word: "MONKEY", emoji: "🐵", meaningTh: "ลิง", decoys: 4 },
      { word: "FLOWER", emoji: "🌸", meaningTh: "ดอกไม้", decoys: 4 },
      { word: "BANANA", emoji: "🍌", meaningTh: "กล้วย", decoys: 4 },
      { word: "ROCKET", emoji: "🚀", meaningTh: "จรวด", decoys: 4 },
    ],
  },
];
