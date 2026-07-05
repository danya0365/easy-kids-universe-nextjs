import type { Result } from "@/src/domain/shared/result";
import type { GameId } from "@/src/domain/ports/game.port";

// ── โครงด่าน (generic ต่อเนื้อหาของแต่ละเกม) ──────────────────────────────
export interface LevelDef<TContent> {
  gameId: GameId;
  level: number;
  titleTh: string;
  rounds: TContent[];
}

export interface LevelRepository<TContent> {
  listLevels(): Promise<Result<LevelDef<TContent>[]>>;
  getLevel(level: number): Promise<Result<LevelDef<TContent>>>;
}

// ── เนื้อหาต่อเกม ────────────────────────────────────────────────────────

// Easy ABC — ดูรูป → เรียงตัวอักษรสะกดคำ
export interface AbcRound {
  word: string;
  emoji: string;
  meaningTh: string;
  /** จำนวนตัวอักษรหลอกที่ไม่อยู่ในคำ */
  decoys: number;
}

// Easy Math — นับ/บวก/ลบ แล้วเลือกคำตอบจากปุ่ม
export type MathRound =
  | { kind: "count"; emoji: string; count: number; choices: number[] }
  | { kind: "add"; a: number; b: number; choices: number[] }
  | { kind: "sub"; a: number; b: number; choices: number[] };

// Easy Colors — สีในระบบ (hex เป็น content ของเกม ไม่ใช่ theme token)
export type ColorId =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "purple"
  | "pink"
  | "brown";

export interface ColorDef {
  id: ColorId;
  nameTh: string;
  nameEn: string;
  hex: string;
}

export type ColorsRound =
  | {
      kind: "find-color";
      promptTh: string;
      answerId: ColorId;
      optionIds: ColorId[];
    }
  | {
      kind: "object-color";
      emoji: string;
      promptTh: string;
      answerId: ColorId;
      optionIds: ColorId[];
    };
