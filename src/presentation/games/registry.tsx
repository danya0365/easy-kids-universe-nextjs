// Registry เกม → RoundComponent · เพิ่มเกมใหม่ = เพิ่ม 1 บรรทัดที่นี่ (core ไม่ต้องแตะ)
import type { ComponentType } from "react";
import type { GameId } from "@/src/domain/ports/game.port";
import type { GameRoundProps } from "@/src/presentation/games/types";
import { SpellingRound } from "@/src/presentation/games/abc/spelling-round";
import { MathRoundView } from "@/src/presentation/games/math/math-round";
import { ColorsRoundView } from "@/src/presentation/games/colors/colors-round";

export const GAME_COMPONENTS: Partial<
  Record<GameId, ComponentType<GameRoundProps>>
> = {
  abc: SpellingRound,
  math: MathRoundView,
  colors: ColorsRoundView,
};
