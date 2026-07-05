import type { CosmeticDef } from "@/src/domain/ports/cosmetic.port";

// ของแต่งใน Diamond Shop — ซื้อด้วยเพชร (earn-only) · แพนด้า 🐼 เป็น buddy เริ่มต้นฟรี (ไม่อยู่ในร้าน)
export const COSMETICS: CosmeticDef[] = [
  {
    id: "theme-candy",
    kind: "theme",
    nameTh: "ธีมลูกอม",
    descTh: "โทนพาสเทลชมพูหวานๆ",
    emoji: "🍬",
    priceDiamonds: 80,
    themeTemplate: "candy",
  },
  {
    id: "theme-galaxy",
    kind: "theme",
    nameTh: "ธีมกาแล็กซี่",
    descTh: "ท่องอวกาศสีน้ำเงินม่วง",
    emoji: "🌌",
    priceDiamonds: 120,
    themeTemplate: "galaxy",
  },
  {
    id: "buddy-bunny",
    kind: "buddy",
    nameTh: "บันนี่ กระต่าย",
    descTh: "เพื่อนซี้กระต่ายน้อย",
    emoji: "🐰",
    priceDiamonds: 40,
    characterId: "bunny",
  },
  {
    id: "buddy-cat",
    kind: "buddy",
    nameTh: "มีมี่ แมวเหมียว",
    descTh: "เพื่อนซี้แมวจอมซน",
    emoji: "🐱",
    priceDiamonds: 40,
    characterId: "cat",
  },
  {
    id: "buddy-dino",
    kind: "buddy",
    nameTh: "ไดโน่ ไดโนน้อย",
    descTh: "เพื่อนซี้ไดโนสุดแกร่ง",
    emoji: "🦖",
    priceDiamonds: 40,
    characterId: "dino",
  },
];
