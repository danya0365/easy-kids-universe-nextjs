import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createGameRepo } from "@/src/adapters/games";
import { createLevelRepo } from "@/src/adapters/levels";
import type { GameId } from "@/src/domain/ports/game.port";
import { PlayGate } from "@/src/presentation/components/play-gate";
import { PlayScreen } from "@/src/presentation/games/play-screen";

export async function generateStaticParams() {
  const res = await createGameRepo().listGames();
  if (!res.ok) return [];
  const params: { gameId: string; level: string }[] = [];
  for (const g of res.value) {
    if (g.status !== "playable") continue;
    for (let l = 1; l <= g.levelCount; l++) {
      params.push({ gameId: g.id, level: String(l) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gameId: string; level: string }>;
}): Promise<Metadata> {
  const { gameId, level } = await params;
  const res = await createGameRepo().getGame(gameId as GameId);
  if (!res.ok) return { title: "เล่นเกม" };
  return { title: `${res.value.nameTh} ด่าน ${level}` };
}

export default async function PlayPage({
  params,
}: {
  params: Promise<{ gameId: string; level: string }>;
}) {
  const { gameId, level: levelStr } = await params;
  const level = Number(levelStr);

  const gameRes = await createGameRepo().getGame(gameId as GameId);
  if (!gameRes.ok || gameRes.value.status !== "playable") notFound();
  const game = gameRes.value;

  if (!Number.isInteger(level) || level < 1 || level > game.levelCount) {
    notFound();
  }

  const levelRes = await createLevelRepo(game.id).getLevel(level);
  if (!levelRes.ok) notFound();
  const lvl = levelRes.value;

  return (
    <PlayGate gameId={game.id} level={level}>
      <PlayScreen
        gameId={game.id}
        level={level}
        levelCount={game.levelCount}
        title={lvl.titleTh}
        rounds={lvl.rounds}
      />
    </PlayGate>
  );
}
