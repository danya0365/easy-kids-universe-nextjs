import { ok, err, type Result } from "@/src/domain/shared/result";
import type { GameDef, GameId, GameRepository } from "@/src/domain/ports/game.port";

// Static adapter — อ่าน master data ในหน่วยความจำ (สลับเป็น DB/API adapter ภายหลังได้โดยไม่แตะ UI)
export function createStaticGameRepo(games: GameDef[]): GameRepository {
  return {
    async listGames(): Promise<Result<GameDef[]>> {
      return ok(games);
    },
    async getGame(id: GameId): Promise<Result<GameDef>> {
      const found = games.find((g) => g.id === id);
      return found ? ok(found) : err(`ไม่พบเกม "${id}"`);
    },
  };
}
