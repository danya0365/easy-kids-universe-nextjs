// แผนที่ด่านของเกม — ปลดตามดาว (best-of) จาก progress store
"use client";

import type { GameId } from "@/src/domain/ports/game.port";
import { isLevelUnlocked } from "@/src/domain/services/unlock";
import { LevelButton } from "@/src/presentation/components/level-button";
import { useProgressStore } from "@/src/presentation/stores/progress.store";
import { useMounted } from "@/src/presentation/lib/use-mounted";

export function LevelMap({
  gameId,
  levelCount,
}: {
  gameId: GameId;
  levelCount: number;
}) {
  const mounted = useMounted();
  const starsOfGame = useProgressStore((s) => s.starsByGame[gameId]) ?? {};

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {Array.from({ length: levelCount }, (_, i) => {
        const level = i + 1;
        const stars = mounted ? (starsOfGame[level] ?? 0) : 0;
        const unlocked = mounted ? isLevelUnlocked(level, starsOfGame) : level === 1;
        return (
          <LevelButton
            key={level}
            gameId={gameId}
            level={level}
            stars={stars}
            unlocked={unlocked}
          />
        );
      })}
    </div>
  );
}
