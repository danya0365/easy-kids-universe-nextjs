import { ok, err, type Result } from "@/src/domain/shared/result";
import type { LevelDef, LevelRepository } from "@/src/domain/ports/level.port";

// Static adapter ทั่วไปสำหรับ LevelRepository ของทุกเกม (generic ตาม content type)
export function createStaticLevelRepo<T>(
  levels: LevelDef<T>[],
): LevelRepository<T> {
  return {
    async listLevels(): Promise<Result<LevelDef<T>[]>> {
      return ok(levels);
    },
    async getLevel(level: number): Promise<Result<LevelDef<T>>> {
      const found = levels.find((l) => l.level === level);
      return found ? ok(found) : err(`ไม่พบด่าน ${level}`);
    },
  };
}
