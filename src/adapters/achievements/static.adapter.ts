import { ok, type Result } from "@/src/domain/shared/result";
import type {
  AchievementDef,
  AchievementRepository,
} from "@/src/domain/ports/achievement.port";

export function createStaticAchievementRepo(
  achievements: AchievementDef[],
): AchievementRepository {
  return {
    async listAchievements(): Promise<Result<AchievementDef[]>> {
      return ok(achievements);
    },
  };
}
