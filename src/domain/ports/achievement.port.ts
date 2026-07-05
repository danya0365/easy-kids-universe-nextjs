import type { Result } from "@/src/domain/shared/result";
import type { GameId } from "@/src/domain/ports/game.port";

// เงื่อนไข achievement — evaluate เทียบกับ snapshot (ดู services/achievements.ts)
export type AchievementCondition =
  | {
      kind:
        | "levels-completed"
        | "total-stars"
        | "three-star-count"
        | "games-played"
        | "diamonds-earned";
      threshold: number;
    }
  | { kind: "game-complete"; gameId: GameId }
  | { kind: "all-perfect" };

export interface AchievementDef {
  id: string;
  nameTh: string;
  descTh: string;
  emoji: string;
  condition: AchievementCondition;
  rewardDiamonds: number;
}

export interface AchievementRepository {
  listAchievements(): Promise<Result<AchievementDef[]>>;
}
