// เมนูหยุดพัก — เล่นต่อ / เริ่มด่านใหม่ / กลับแผนที่ · กัน back หลุดกลางด่าน
"use client";

import Link from "next/link";
import type { GameId } from "@/src/domain/ports/game.port";
import { ChunkyButton } from "@/src/presentation/components/chunky-button";
import { SfxToggle } from "@/src/presentation/components/sound-toggle";

export function PauseMenu({
  open,
  gameId,
  onResume,
  onRestart,
}: {
  open: boolean;
  gameId: GameId;
  onResume: () => void;
  onRestart: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="chunky w-full max-w-xs animate-bounce-in bg-card p-6 text-center">
        <h2 className="font-heading text-2xl font-bold text-card-foreground">
          พักก่อนนะ ⏸
        </h2>
        <div className="mt-5 flex flex-col gap-2">
          <ChunkyButton size="lg" onClick={onResume}>
            ▶️ เล่นต่อ
          </ChunkyButton>
          <ChunkyButton variant="secondary" onClick={onRestart}>
            🔁 เริ่มด่านใหม่
          </ChunkyButton>
          <Link href={`/games/${gameId}`}>
            <ChunkyButton variant="secondary" className="w-full">
              🗺 กลับแผนที่ด่าน
            </ChunkyButton>
          </Link>
          <div className="mt-1 flex justify-center">
            <SfxToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
