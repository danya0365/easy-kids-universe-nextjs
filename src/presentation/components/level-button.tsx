// ปุ่มด่านบนแผนที่ — ปลดแล้ว = link ไปเล่น · ล็อก = เทา + 🔒
"use client";

import Link from "next/link";
import type { GameId } from "@/src/domain/ports/game.port";
import { StarRow } from "@/src/presentation/components/star-row";
import { cn } from "@/src/presentation/lib/cn";

export function LevelButton({
  gameId,
  level,
  stars,
  unlocked,
}: {
  gameId: GameId;
  level: number;
  stars: number;
  unlocked: boolean;
}) {
  const inner = (
    <>
      <span className="font-heading text-3xl font-extrabold">{level}</span>
      {unlocked ? (
        <StarRow earned={stars} size="sm" />
      ) : (
        <span className="text-xl">🔒</span>
      )}
    </>
  );

  const base =
    "chunky flex aspect-square w-full flex-col items-center justify-center gap-1";

  if (!unlocked) {
    return (
      <div
        className={cn(base, "bg-muted-surface text-locked opacity-70")}
        aria-disabled
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/play/${gameId}/${level}`}
      className={cn(
        base,
        "bg-card text-card-foreground transition active:translate-y-0.5",
      )}
    >
      {inner}
    </Link>
  );
}
