// Dashboard หน้าแรก — ทักทาย + การ์ด "เล่นต่อ" + สรุปสถิติ + ความคืบหน้าต่อเกม
"use client";

import Link from "next/link";
import type { GameDef } from "@/src/domain/ports/game.port";
import { recommendedLevel } from "@/src/domain/services/unlock";
import { useProgressStore } from "@/src/presentation/stores/progress.store";
import { useDiamondStore } from "@/src/presentation/stores/diamond.store";
import { useAchievementStore } from "@/src/presentation/stores/achievement.store";
import { useSettingsStore } from "@/src/presentation/stores/settings.store";
import { useMounted } from "@/src/presentation/lib/use-mounted";
import { CharacterAvatar } from "@/src/presentation/components/character-avatar";
import { ChunkyButton } from "@/src/presentation/components/chunky-button";
import { AppVersion } from "@/src/presentation/components/app-version";

function StatTile({
  emoji,
  value,
  label,
}: {
  emoji: string;
  value: string;
  label: string;
}) {
  return (
    <div className="chunky flex flex-1 flex-col items-center gap-0.5 bg-card p-3">
      <span className="text-2xl">{emoji}</span>
      <span className="font-heading text-xl font-extrabold tabular-nums text-card-foreground">
        {value}
      </span>
      <span className="text-[11px] text-muted">{label}</span>
    </div>
  );
}

export function Dashboard({
  playableGames,
  totalAchievements,
}: {
  playableGames: GameDef[];
  totalAchievements: number;
}) {
  const mounted = useMounted();
  const starsByGame = useProgressStore((s) => s.starsByGame);
  const lastPlayed = useProgressStore((s) => s.lastPlayed);
  const balance = useDiamondStore((s) => s.balance);
  const unlocked = useAchievementStore((s) => s.unlocked);
  const buddyId = useSettingsStore((s) => s.buddyId);

  const totalStars = mounted
    ? Object.values(starsByGame).reduce(
        (sum, levels) =>
          sum + Object.values(levels ?? {}).reduce((a, b) => a + b, 0),
        0,
      )
    : 0;
  const unlockedCount = mounted ? Object.keys(unlocked).length : 0;

  // การ์ดเล่นต่อ: เกมล่าสุด (ถ้ามีและยัง playable) ไม่งั้นเกมแรก
  const lastGame =
    mounted && lastPlayed
      ? playableGames.find((g) => g.id === lastPlayed.gameId)
      : undefined;
  const continueGame = lastGame ?? playableGames[0];
  const continueLevel = continueGame
    ? recommendedLevel(starsByGame[continueGame.id] ?? {}, continueGame.levelCount)
    : 1;
  const isResuming = Boolean(lastGame);

  return (
    <div className="mx-auto w-full max-w-lg px-4">
      {/* ทักทาย */}
      <section className="flex items-center gap-3 pt-2">
        <CharacterAvatar characterId={buddyId} size="lg" />
        <div>
          <p className="font-heading text-xl font-extrabold text-on-brand drop-shadow">
            สวัสดี! 👋
          </p>
          <p className="text-sm text-on-brand/90 drop-shadow">วันนี้เล่นอะไรดี?</p>
        </div>
      </section>

      {/* การ์ดเล่นต่อ (เด่นสุด) */}
      {continueGame && (
        <section className="mt-4">
          <div className="chunky flex items-center gap-3 bg-card p-4">
            <span className="text-5xl">{continueGame.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-muted">
                {isResuming ? "เล่นต่อ" : "เริ่มเล่นเลย"}
              </p>
              <p className="truncate font-heading text-lg font-extrabold text-card-foreground">
                {continueGame.nameTh}
              </p>
              <p className="text-xs text-muted">ด่าน {continueLevel}</p>
            </div>
            <Link href={`/play/${continueGame.id}/${continueLevel}`}>
              <ChunkyButton size="lg">▶ เล่น</ChunkyButton>
            </Link>
          </div>
        </section>
      )}

      {/* สรุปสถิติ */}
      <section className="mt-4 flex gap-3">
        <StatTile emoji="⭐" value={String(totalStars)} label="ดาวรวม" />
        <StatTile emoji="💎" value={String(mounted ? balance : 0)} label="เพชร" />
        <StatTile
          emoji="🏆"
          value={`${unlockedCount}/${totalAchievements}`}
          label="ความสำเร็จ"
        />
      </section>

      {/* ความคืบหน้าต่อเกม */}
      <section className="mt-5">
        <h2 className="mb-2 font-heading text-lg font-bold text-on-brand drop-shadow">
          ความคืบหน้า
        </h2>
        <div className="space-y-2">
          {playableGames.map((game) => {
            const earned = mounted
              ? Object.values(starsByGame[game.id] ?? {}).reduce(
                  (a, b) => a + b,
                  0,
                )
              : 0;
            const max = game.levelCount * 3;
            const pct = max > 0 ? Math.min(100, Math.round((earned / max) * 100)) : 0;
            return (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="chunky flex items-center gap-3 bg-card p-3"
              >
                <span className="text-3xl">{game.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-bold text-card-foreground">
                    {game.nameTh}
                  </p>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted-surface">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className="shrink-0 text-sm font-bold text-card-foreground tabular-nums">
                  <span className="text-star">⭐</span> {earned}/{max}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="mt-4 flex justify-center">
        <Link href="/games">
          <ChunkyButton variant="secondary">ดูเกมทั้งหมด →</ChunkyButton>
        </Link>
      </div>

      <AppVersion className="mt-6" />
    </div>
  );
}
