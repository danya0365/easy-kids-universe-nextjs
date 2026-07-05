import Image from "next/image";
import { createGameRepo } from "@/src/adapters/games";
import { GameCard } from "@/src/presentation/components/game-card";
import { AppVersion } from "@/src/presentation/components/app-version";

export default async function HomePage() {
  const res = await createGameRepo().listGames();
  const games = res.ok ? res.value : [];

  return (
    <div className="mx-auto w-full max-w-lg px-4">
      <section className="flex flex-col items-center pt-2 text-center">
        <Image
          src="/easy-kid-universe/logo.png"
          alt="Easy Kids Universe"
          width={320}
          height={213}
          priority
          className="h-auto w-56 drop-shadow-lg sm:w-64"
        />
        <p className="mt-1 font-heading text-lg font-bold text-on-brand drop-shadow">
          เลือกเกมที่อยากเล่นเลย! 🎉
        </p>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </section>

      <AppVersion className="mt-8" />
    </div>
  );
}
