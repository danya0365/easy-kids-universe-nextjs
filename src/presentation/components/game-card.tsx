// การ์ดเกมบน Home — playable โชว์ดาวสะสม · coming-soon โชว์ badge "เร็วๆ นี้"
"use client";

import Link from "next/link";
import type { GameDef } from "@/src/domain/ports/game.port";
import { CharacterAvatar } from "@/src/presentation/components/character-avatar";
import { useProgressStore } from "@/src/presentation/stores/progress.store";
import { useMounted } from "@/src/presentation/lib/use-mounted";
import { cn } from "@/src/presentation/lib/cn";

// map colorIndex → static class (Tailwind ต้องเห็น class ตรงๆ ห้ามต่อ string dynamic)
const TILE_BG: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "bg-tile-1",
  2: "bg-tile-2",
  3: "bg-tile-3",
  4: "bg-tile-4",
  5: "bg-tile-5",
};

export function GameCard({ game }: { game: GameDef }) {
  const mounted = useMounted();
  const starsByGame = useProgressStore((s) => s.starsByGame);

  const isPlayable = game.status === "playable";
  const earned =
    mounted && isPlayable
      ? Object.values(starsByGame[game.id] ?? {}).reduce((a, b) => a + b, 0)
      : 0;
  const maxStars = game.levelCount * 3;

  return (
    <Link
      href={`/games/${game.id}`}
      className={cn(
        "chunky relative flex flex-col overflow-hidden bg-card p-0 transition active:translate-y-0.5",
        !isPlayable && "opacity-95",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center py-5 text-5xl text-on-brand",
          TILE_BG[game.colorIndex],
        )}
      >
        <span aria-hidden>{game.emoji}</span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="flex items-center gap-2">
          <CharacterAvatar characterId={game.characterId} size="sm" />
          <span className="font-heading text-base font-bold leading-tight text-card-foreground">
            {game.nameTh}
          </span>
        </div>
        <p className="line-clamp-2 text-xs text-muted">{game.tagline}</p>

        {isPlayable ? (
          <div className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-card-foreground">
            <span className="text-star">⭐</span>
            <span className="tabular-nums">
              {earned}/{maxStars}
            </span>
          </div>
        ) : (
          <span className="mt-1 inline-flex w-fit items-center rounded-full bg-muted-surface px-2 py-0.5 text-xs font-bold text-muted">
            🔜 เร็วๆ นี้
          </span>
        )}
      </div>
    </Link>
  );
}
