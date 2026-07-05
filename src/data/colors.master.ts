import type { ColorDef, ColorsRound, LevelDef } from "@/src/domain/ports/level.port";

// พาเลตต์สีของเกม (hex = content ของเกม วางผ่าน inline style — ไม่ใช่ theme token)
export const COLOR_PALETTE: ColorDef[] = [
  { id: "red", nameTh: "สีแดง", nameEn: "Red", hex: "#E8384F" },
  { id: "blue", nameTh: "สีน้ำเงิน", nameEn: "Blue", hex: "#1F6FE0" },
  { id: "green", nameTh: "สีเขียว", nameEn: "Green", hex: "#4CAF50" },
  { id: "yellow", nameTh: "สีเหลือง", nameEn: "Yellow", hex: "#FFC72C" },
  { id: "orange", nameTh: "สีส้ม", nameEn: "Orange", hex: "#FF8A34" },
  { id: "purple", nameTh: "สีม่วง", nameEn: "Purple", hex: "#8A4FD6" },
  { id: "pink", nameTh: "สีชมพู", nameEn: "Pink", hex: "#F0509B" },
  { id: "brown", nameTh: "สีน้ำตาล", nameEn: "Brown", hex: "#8D5A3C" },
];

// Easy Colors — 5 ด่าน × 5 รอบ
export const COLORS_LEVELS: LevelDef<ColorsRound>[] = [
  {
    gameId: "colors",
    level: 1,
    titleTh: "สีพื้นฐาน",
    rounds: [
      { kind: "find-color", promptTh: "แตะสีแดง", answerId: "red", optionIds: ["red", "blue", "green"] },
      { kind: "find-color", promptTh: "แตะสีน้ำเงิน", answerId: "blue", optionIds: ["blue", "yellow", "red"] },
      { kind: "find-color", promptTh: "แตะสีเขียว", answerId: "green", optionIds: ["green", "red", "yellow"] },
      { kind: "find-color", promptTh: "แตะสีเหลือง", answerId: "yellow", optionIds: ["yellow", "green", "blue"] },
      { kind: "find-color", promptTh: "แตะสีน้ำเงิน", answerId: "blue", optionIds: ["blue", "green", "red"] },
    ],
  },
  {
    gameId: "colors",
    level: 2,
    titleTh: "สีครบ 8 สี",
    rounds: [
      { kind: "find-color", promptTh: "แตะสีส้ม", answerId: "orange", optionIds: ["orange", "red", "yellow"] },
      { kind: "find-color", promptTh: "แตะสีม่วง", answerId: "purple", optionIds: ["purple", "blue", "pink"] },
      { kind: "find-color", promptTh: "แตะสีชมพู", answerId: "pink", optionIds: ["pink", "purple", "red"] },
      { kind: "find-color", promptTh: "แตะสีน้ำตาล", answerId: "brown", optionIds: ["brown", "orange", "green"] },
      { kind: "find-color", promptTh: "แตะสีเขียว", answerId: "green", optionIds: ["green", "blue", "yellow"] },
    ],
  },
  {
    gameId: "colors",
    level: 3,
    titleTh: "สีของสิ่งของ",
    rounds: [
      { kind: "object-color", emoji: "🍎", promptTh: "แอปเปิลสีอะไร?", answerId: "red", optionIds: ["red", "green", "yellow"] },
      { kind: "object-color", emoji: "🍌", promptTh: "กล้วยสีอะไร?", answerId: "yellow", optionIds: ["yellow", "orange", "green"] },
      { kind: "object-color", emoji: "🐸", promptTh: "กบสีอะไร?", answerId: "green", optionIds: ["green", "blue", "brown"] },
      { kind: "object-color", emoji: "🍇", promptTh: "องุ่นสีอะไร?", answerId: "purple", optionIds: ["purple", "pink", "blue"] },
      { kind: "object-color", emoji: "🌊", promptTh: "ทะเลสีอะไร?", answerId: "blue", optionIds: ["blue", "green", "purple"] },
    ],
  },
  {
    gameId: "colors",
    level: 4,
    titleTh: "สีของสิ่งของ (ยากขึ้น)",
    rounds: [
      { kind: "object-color", emoji: "🍊", promptTh: "ส้มสีอะไร?", answerId: "orange", optionIds: ["orange", "red", "yellow", "brown"] },
      { kind: "object-color", emoji: "🐷", promptTh: "หมูสีอะไร?", answerId: "pink", optionIds: ["pink", "red", "purple", "brown"] },
      { kind: "object-color", emoji: "🍫", promptTh: "ช็อกโกแลตสีอะไร?", answerId: "brown", optionIds: ["brown", "orange", "red", "purple"] },
      { kind: "object-color", emoji: "🍅", promptTh: "มะเขือเทศสีอะไร?", answerId: "red", optionIds: ["red", "orange", "pink", "green"] },
      { kind: "object-color", emoji: "🌻", promptTh: "ดอกทานตะวันสีอะไร?", answerId: "yellow", optionIds: ["yellow", "orange", "green", "brown"] },
    ],
  },
  {
    gameId: "colors",
    level: 5,
    titleTh: "คละทุกแบบ",
    rounds: [
      { kind: "find-color", promptTh: "แตะสีม่วง", answerId: "purple", optionIds: ["purple", "pink", "blue"] },
      { kind: "object-color", emoji: "🥕", promptTh: "แครอทสีอะไร?", answerId: "orange", optionIds: ["orange", "red", "yellow", "brown"] },
      { kind: "find-color", promptTh: "แตะสีชมพู", answerId: "pink", optionIds: ["pink", "purple", "red"] },
      { kind: "object-color", emoji: "🌿", promptTh: "ใบไม้สีอะไร?", answerId: "green", optionIds: ["green", "yellow", "brown", "blue"] },
      { kind: "find-color", promptTh: "แตะสีน้ำตาล", answerId: "brown", optionIds: ["brown", "orange", "red", "purple"] },
    ],
  },
];
