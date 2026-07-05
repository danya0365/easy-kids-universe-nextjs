import type { Metadata } from "next";
import { createGameRepo } from "@/src/adapters/games";
import { GameCard } from "@/src/presentation/components/game-card";

export const metadata: Metadata = {
  title: "เลือกเกม",
  description: "เลือกเล่นมินิเกมในจักรวาล Easy Kids Universe",
};

export default async function GamesPage() {
  const res = await createGameRepo().listGames();
  const games = res.ok ? res.value : [];

  return (
    <div className="mx-auto w-full max-w-lg px-4">
      <h1 className="pt-2 pb-4 text-center font-heading text-2xl font-extrabold text-on-brand drop-shadow">
        🎮 เลือกเกม
      </h1>
      <section className="grid grid-cols-2 gap-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </section>
    </div>
  );
}
