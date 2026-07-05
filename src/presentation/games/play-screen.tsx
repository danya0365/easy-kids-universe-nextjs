// จอเล่นเกม (full screen) — ประกอบ engine + RoundComponent + overlays · ใช้ร่วมทุกเกม
"use client";

import { useCallback, useState } from "react";
import type { GameId } from "@/src/domain/ports/game.port";
import { computeStars } from "@/src/domain/services/stars";
import { completeLevel, type LevelOutcome } from "@/src/presentation/lib/economy";
import { useRoundEngine } from "@/src/presentation/games/use-round-engine";
import { GAME_COMPONENTS } from "@/src/presentation/games/registry";
import { BackButton } from "@/src/presentation/components/back-button";
import { SfxToggle } from "@/src/presentation/components/sound-toggle";
import { FeedbackOverlay } from "@/src/presentation/components/game/feedback-overlay";
import { LevelComplete } from "@/src/presentation/components/game/level-complete";
import { PauseMenu } from "@/src/presentation/components/game/pause-menu";

export function PlayScreen({
  gameId,
  level,
  levelCount,
  title,
  rounds,
}: {
  gameId: GameId;
  level: number;
  levelCount: number;
  title: string;
  rounds: unknown[];
}) {
  const [outcome, setOutcome] = useState<LevelOutcome | null>(null);
  const [paused, setPaused] = useState(false);
  const [runId, setRunId] = useState(0);

  const handleComplete = useCallback(
    (mistakes: number) => {
      const stars = computeStars(mistakes);
      void completeLevel(gameId, level, stars).then(setOutcome);
    },
    [gameId, level],
  );

  const engine = useRoundEngine(rounds.length, handleComplete);

  const restart = useCallback(() => {
    engine.reset();
    setOutcome(null);
    setPaused(false);
    setRunId((r) => r + 1);
  }, [engine]);

  const RoundComponent = GAME_COMPONENTS[gameId];
  const done = engine.phase === "complete";

  return (
    <div className="relative flex min-h-dvh flex-col">
      {/* header */}
      <header className="flex items-center justify-between gap-2 px-4 py-3">
        <BackButton onClick={() => setPaused(true)} />
        <div className="text-center">
          <p className="font-heading text-sm font-bold text-on-brand drop-shadow">
            {title}
          </p>
          <p className="text-xs text-on-brand/80 drop-shadow">
            รอบ {Math.min(engine.roundIndex + 1, rounds.length)}/{rounds.length}
          </p>
        </div>
        <SfxToggle />
      </header>

      {/* เนื้อเกม */}
      <main className="flex flex-1 items-center justify-center px-4 pb-8">
        {RoundComponent && !done ? (
          <RoundComponent
            key={`${runId}-${engine.roundIndex}`}
            round={rounds[engine.roundIndex]}
            onSubmit={engine.submit}
            disabled={engine.phase !== "idle"}
          />
        ) : !RoundComponent ? (
          <p className="text-on-brand drop-shadow">เกมนี้ยังไม่พร้อมเล่น 🔧</p>
        ) : null}
      </main>

      <FeedbackOverlay phase={engine.phase} />

      {done && (
        <LevelComplete
          outcome={outcome}
          gameId={gameId}
          level={level}
          levelCount={levelCount}
          onReplay={restart}
        />
      )}

      <PauseMenu
        open={paused}
        gameId={gameId}
        onResume={() => setPaused(false)}
        onRestart={restart}
      />
    </div>
  );
}
