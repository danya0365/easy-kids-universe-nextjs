import { GAMES } from "@/src/data/games.master";
import { createStaticGameRepo } from "@/src/adapters/games/static.adapter";
import type { GameRepository } from "@/src/domain/ports/game.port";

// Factory — UI เรียกผ่านตัวนี้เท่านั้น (ห้าม import games.master ตรง)
export function createGameRepo(): GameRepository {
  return createStaticGameRepo(GAMES);
}
