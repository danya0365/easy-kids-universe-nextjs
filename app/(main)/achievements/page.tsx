import type { Metadata } from "next";
import { createAchievementRepo } from "@/src/adapters/achievements";
import { createGameRepo } from "@/src/adapters/games";
import type { PlayableLevelCounts } from "@/src/domain/services/achievements";
import { AchievementsView } from "@/src/presentation/components/achievements/achievements-view";

export const metadata: Metadata = {
  title: "ความสำเร็จ",
  description: "ภารกิจข้ามเกมในจักรวาล Easy Kids Universe — ปลดล็อกเพื่อรับเพชรโบนัส",
};

export default async function AchievementsPage() {
  const [achRes, gameRes] = await Promise.all([
    createAchievementRepo().listAchievements(),
    createGameRepo().listGames(),
  ]);
  const achievements = achRes.ok ? achRes.value : [];

  const playableCounts: PlayableLevelCounts = {};
  if (gameRes.ok) {
    for (const g of gameRes.value) {
      if (g.status === "playable") playableCounts[g.id] = g.levelCount;
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4">
      <h1 className="pt-2 text-center font-heading text-2xl font-extrabold text-on-brand drop-shadow">
        🏆 ความสำเร็จ
      </h1>
      <AchievementsView
        achievements={achievements}
        playableCounts={playableCounts}
      />
    </div>
  );
}
