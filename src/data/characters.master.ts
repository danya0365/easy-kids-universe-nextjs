import type { CharacterId } from "@/src/domain/ports/game.port";

// แก๊งตัวละครประจำจักรวาล — โผล่ทุกเกม (fallback เป็น emoji, รูปจริงเติมทีหลังที่ /easy-kid-universe/characters/<id>.png)
export interface CharacterDef {
  id: CharacterId;
  nameTh: string;
  emoji: string;
}

export const CHARACTERS: CharacterDef[] = [
  { id: "panda", nameTh: "โคซี่ แพนด้า", emoji: "🐼" },
  { id: "bunny", nameTh: "บันนี่ กระต่าย", emoji: "🐰" },
  { id: "cat", nameTh: "มีมี่ แมวเหมียว", emoji: "🐱" },
  { id: "dino", nameTh: "ไดโน่ ไดโนน้อย", emoji: "🦖" },
];

export const DEFAULT_BUDDY_ID: CharacterId = "panda";
