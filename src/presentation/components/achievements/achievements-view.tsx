// รายการ achievement ทั้งหมด — คำนวณ progress จาก snapshot (client, อ่าน stores)
"use client";

import type { AchievementDef } from "@/src/domain/ports/achievement.port";
import {
  buildAchievementSnapshot,
  type AchievementSnapshot,
  type PlayableLevelCounts,
} from "@/src/domain/services/achievements";
import { useProgressStore } from "@/src/presentation/stores/progress.store";
import { useDiamondStore } from "@/src/presentation/stores/diamond.store";
import { useAchievementStore } from "@/src/presentation/stores/achievement.store";
import { useMounted } from "@/src/presentation/lib/use-mounted";
import { AchievementCard } from "@/src/presentation/components/achievements/achievement-card";

function progressFor(
  def: AchievementDef,
  snap: AchievementSnapshot,
): { current: number; target: number } {
  const c = def.condition;
  switch (c.kind) {
    case "levels-completed":
      return { current: snap.levelsCompleted, target: c.threshold };
    case "total-stars":
      return { current: snap.totalStars, target: c.threshold };
    case "three-star-count":
      return { current: snap.threeStarCount, target: c.threshold };
    case "games-played":
      return { current: snap.gamesPlayed, target: c.threshold };
    case "diamonds-earned":
      return { current: snap.diamondsEarned, target: c.threshold };
    case "game-complete": {
      const g = snap.perGame[c.gameId];
      return { current: g?.completed ?? 0, target: g?.total ?? 1 };
    }
    case "all-perfect": {
      const games = Object.values(snap.perGame);
      const perfectGames = games.filter((g) => g.total > 0 && g.perfect >= g.total).length;
      return { current: perfectGames, target: games.length || 1 };
    }
  }
}

export function AchievementsView({
  achievements,
  playableCounts,
}: {
  achievements: AchievementDef[];
  playableCounts: PlayableLevelCounts;
}) {
  const mounted = useMounted();
  const starsByGame = useProgressStore((s) => s.starsByGame);
  const earnedTotal = useDiamondStore((s) => s.earnedTotal);
  const unlocked = useAchievementStore((s) => s.unlocked);

  const snap = buildAchievementSnapshot(
    mounted ? starsByGame : {},
    playableCounts,
    mounted ? earnedTotal : 0,
  );

  const unlockedCount = mounted ? Object.keys(unlocked).length : 0;

  return (
    <div>
      <p className="mb-3 text-center text-sm text-on-brand/90 drop-shadow">
        ปลดล็อกแล้ว {unlockedCount}/{achievements.length}
      </p>
      <div className="space-y-2">
        {achievements.map((def) => {
          const { current, target } = progressFor(def, snap);
          return (
            <AchievementCard
              key={def.id}
              def={def}
              unlocked={mounted && def.id in unlocked}
              current={current}
              target={target}
            />
          );
        })}
      </div>
    </div>
  );
}
