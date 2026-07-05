import { CHARACTERS, type CharacterDef } from "@/src/data/characters.master";
import type { CharacterId } from "@/src/domain/ports/game.port";

// ตัวละครเป็น constant presentational (emoji + ชื่อ) — เข้าถึงแบบ sync ผ่านตัวนี้
// (UI ไม่ import characters.master ตรง ตาม convention)
export function listCharacters(): CharacterDef[] {
  return CHARACTERS;
}

export function getCharacter(id: CharacterId): CharacterDef | undefined {
  return CHARACTERS.find((c) => c.id === id);
}
