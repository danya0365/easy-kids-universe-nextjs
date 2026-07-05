// สรุปจบด่าน — ดาว + เพชรที่ได้ + โบนัสพลังงาน + achievement ใหม่ + ปุ่มไปต่อ/เล่นซ้ำ/แผนที่
"use client";

import Link from "next/link";
import type { GameId } from "@/src/domain/ports/game.port";
import type { LevelOutcome } from "@/src/presentation/lib/economy";
import { StarRow } from "@/src/presentation/components/star-row";
import { ChunkyButton } from "@/src/presentation/components/chunky-button";

export function LevelComplete({
  outcome,
  gameId,
  level,
  levelCount,
  onReplay,
}: {
  outcome: LevelOutcome | null;
  gameId: GameId;
  level: number;
  levelCount: number;
  onReplay: () => void;
}) {
  const hasNext = level < levelCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="chunky w-full max-w-sm animate-bounce-in bg-card p-6 text-center">
        <h2 className="font-heading text-2xl font-extrabold text-card-foreground">
          จบด่านแล้ว! 🎊
        </h2>

        {!outcome ? (
          <div className="py-8 text-4xl">⏳</div>
        ) : (
          <>
            <div className="my-4 flex justify-center">
              <StarRow earned={outcome.stars} size="lg" />
            </div>

            <div className="flex flex-col items-center gap-1 text-card-foreground">
              {outcome.diamondsFromLevel > 0 && (
                <p className="font-bold">
                  <span className="text-diamond">💎</span> +
                  {outcome.diamondsFromLevel} เพชร
                </p>
              )}
              {outcome.energyBonus > 0 && (
                <p className="font-bold">
                  <span className="text-energy">❤️</span> +{outcome.energyBonus}{" "}
                  พลังงาน (โบนัส 3 ดาว!)
                </p>
              )}
              {outcome.diamondsFromLevel === 0 && outcome.energyBonus === 0 && (
                <p className="text-sm text-muted">เล่นซ้ำได้ไม่จำกัดเลยนะ 💪</p>
              )}
            </div>

            {outcome.newAchievements.length > 0 && (
              <div className="mt-3 rounded-2xl bg-muted-surface p-3">
                <p className="text-xs font-bold text-muted">ปลดล็อกความสำเร็จ!</p>
                {outcome.newAchievements.map((a) => (
                  <p key={a.id} className="text-sm font-bold text-card-foreground">
                    {a.emoji} {a.nameTh}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2">
              {hasNext && (
                <Link href={`/play/${gameId}/${level + 1}`} className="w-full">
                  <ChunkyButton className="w-full" size="lg">
                    ด่านต่อไป →
                  </ChunkyButton>
                </Link>
              )}
              <div className="flex gap-2">
                <ChunkyButton
                  variant="secondary"
                  className="flex-1"
                  onClick={onReplay}
                >
                  🔁 เล่นซ้ำ
                </ChunkyButton>
                <Link href={`/games/${gameId}`} className="flex-1">
                  <ChunkyButton variant="secondary" className="w-full">
                    🗺 แผนที่
                  </ChunkyButton>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
