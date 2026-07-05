import { createGameRepo } from "@/src/adapters/games";
import { createAchievementRepo } from "@/src/adapters/achievements";
import { Dashboard } from "@/src/presentation/components/dashboard/dashboard";

export default async function HomePage() {
  const [gameRes, achRes] = await Promise.all([
    createGameRepo().listGames(),
    createAchievementRepo().listAchievements(),
  ]);
  const playableGames = gameRes.ok
    ? gameRes.value.filter((g) => g.status === "playable")
    : [];
  const totalAchievements = achRes.ok ? achRes.value.length : 0;

  return (
    <Dashboard
      playableGames={playableGames}
      totalAchievements={totalAchievements}
    />
  );
}
