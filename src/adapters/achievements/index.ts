import { ACHIEVEMENTS } from "@/src/data/achievements.master";
import { createStaticAchievementRepo } from "@/src/adapters/achievements/static.adapter";
import type { AchievementRepository } from "@/src/domain/ports/achievement.port";

export function createAchievementRepo(): AchievementRepository {
  return createStaticAchievementRepo(ACHIEVEMENTS);
}
