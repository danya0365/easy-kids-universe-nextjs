import { ABC_LEVELS } from "@/src/data/abc.master";
import { MATH_LEVELS } from "@/src/data/math.master";
import { COLORS_LEVELS } from "@/src/data/colors.master";
import { createStaticLevelRepo } from "@/src/adapters/levels/static.adapter";
import type { GameId } from "@/src/domain/ports/game.port";
import type {
  AbcRound,
  ColorsRound,
  LevelRepository,
  MathRound,
} from "@/src/domain/ports/level.port";

// Factory ต่อเกม (typed) — ใช้ใน round component ที่รู้ชนิด content ของตัวเอง
export const createAbcLevelRepo = (): LevelRepository<AbcRound> =>
  createStaticLevelRepo(ABC_LEVELS);
export const createMathLevelRepo = (): LevelRepository<MathRound> =>
  createStaticLevelRepo(MATH_LEVELS);
export const createColorsLevelRepo = (): LevelRepository<ColorsRound> =>
  createStaticLevelRepo(COLORS_LEVELS);

// Factory ทั่วไป (widened) — ใช้ในหน้า play/level map ที่ต้องการแค่จำนวนด่าน/ชื่อ
// เกม coming-soon คืน repo ว่าง (ไม่มีด่าน)
export function createLevelRepo(gameId: GameId): LevelRepository<unknown> {
  switch (gameId) {
    case "abc":
      return createAbcLevelRepo() as LevelRepository<unknown>;
    case "math":
      return createMathLevelRepo() as LevelRepository<unknown>;
    case "colors":
      return createColorsLevelRepo() as LevelRepository<unknown>;
    default:
      return createStaticLevelRepo<unknown>([]);
  }
}
