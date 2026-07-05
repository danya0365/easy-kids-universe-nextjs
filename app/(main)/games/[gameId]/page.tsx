import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createGameRepo } from "@/src/adapters/games";
import type { GameId } from "@/src/domain/ports/game.port";
import { CharacterAvatar } from "@/src/presentation/components/character-avatar";
import { LevelMap } from "@/src/presentation/components/level-map";
import { ChunkyButton } from "@/src/presentation/components/chunky-button";

export async function generateStaticParams() {
  const res = await createGameRepo().listGames();
  return res.ok ? res.value.map((g) => ({ gameId: g.id })) : [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gameId: string }>;
}): Promise<Metadata> {
  const { gameId } = await params;
  const res = await createGameRepo().getGame(gameId as GameId);
  if (!res.ok) return { title: "ไม่พบเกม" };
  return { title: res.value.nameTh, description: res.value.tagline };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const res = await createGameRepo().getGame(gameId as GameId);
  if (!res.ok) notFound();
  const game = res.value;

  return (
    <div className="mx-auto w-full max-w-lg px-4">
      <div className="mb-4 flex items-center gap-3 pt-2">
        <Link
          href="/"
          aria-label="กลับหน้าแรก"
          className="inline-flex size-10 items-center justify-center rounded-full bg-card/90 text-xl text-card-foreground shadow-sm"
        >
          ←
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-on-brand drop-shadow">
            {game.nameTh}
          </h1>
          <p className="text-sm text-on-brand/90 drop-shadow">{game.tagline}</p>
        </div>
      </div>

      {game.status === "playable" ? (
        <>
          <div className="chunky mb-4 flex items-center gap-3 bg-card p-3">
            <CharacterAvatar characterId={game.characterId} size="lg" />
            <p className="text-sm text-card-foreground">
              เลือกด่านที่อยากเล่นได้เลย! ผ่านด่านเพื่อปลดด่านถัดไป
              เก็บ ⭐ และ 💎 ไปเรื่อยๆ นะ
            </p>
          </div>
          <LevelMap gameId={game.id} levelCount={game.levelCount} />
        </>
      ) : (
        <div className="chunky flex flex-col items-center gap-4 bg-card p-8 text-center">
          <CharacterAvatar characterId={game.characterId} size="xl" />
          <div className="text-3xl">🔜</div>
          <h2 className="font-heading text-xl font-bold text-card-foreground">
            เกมนี้กำลังจะมา เร็วๆ นี้!
          </h2>
          <p className="text-muted">
            น้อง{game.emoji}กำลังเตรียมเกม &ldquo;{game.nameTh}&rdquo; อยู่
            ระหว่างนี้ไปเล่นเกมอื่นในจักรวาลก่อนนะ
          </p>
          <Link href="/">
            <ChunkyButton>← กลับไปเลือกเกม</ChunkyButton>
          </Link>
        </div>
      )}
    </div>
  );
}
