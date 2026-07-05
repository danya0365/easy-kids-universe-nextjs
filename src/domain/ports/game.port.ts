import type { Result } from "@/src/domain/shared/result";

// รายชื่อเกมทั้งจักรวาล (v1 เล่นได้ 3: abc, math, colors — ที่เหลือ coming-soon)
export type GameId =
  | "abc"
  | "math"
  | "colors"
  | "shapes"
  | "animals"
  | "fruits"
  | "music"
  | "memory"
  | "logic"
  | "puzzle"
  | "coding"
  | "quran"
  | "english";

// ตัวละครแก๊งเดียวกันที่โผล่ทุกเกม (แต่ละเกมมีตัวเป็น "เจ้าภาพ")
export type CharacterId = "panda" | "bunny" | "cat" | "dino";

export type GameStatus = "playable" | "coming-soon";

export interface GameDef {
  id: GameId;
  nameTh: string;
  nameEn: string;
  tagline: string;
  emoji: string;
  characterId: CharacterId;
  /** วนสีการ์ดผ่าน game token --tile-1..5 */
  colorIndex: 1 | 2 | 3 | 4 | 5;
  status: GameStatus;
  /** จำนวนด่าน (coming-soon = 0) */
  levelCount: number;
}

export interface GameRepository {
  listGames(): Promise<Result<GameDef[]>>;
  getGame(id: GameId): Promise<Result<GameDef>>;
}
