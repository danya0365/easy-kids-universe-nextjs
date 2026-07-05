// Economy orchestrator — จุดเดียวที่ประสานเศรษฐกิจตอนจบด่าน/รับของขวัญ
//   saveStars → grant เพชร → energy bonus → evaluate achievements (cascade) → queue toast
// ห้ามกระจาย logic เศรษฐกิจไปตาม component — ให้เรียกผ่านที่นี่
import { createGameRepo } from "@/src/adapters/games";
import { createAchievementRepo } from "@/src/adapters/achievements";
import type { GameId } from "@/src/domain/ports/game.port";
import type { AchievementDef } from "@/src/domain/ports/achievement.port";
import {
  buildAchievementSnapshot,
  evaluateAchievements,
  type PlayableLevelCounts,
} from "@/src/domain/services/achievements";
import {
  levelDiamondReward,
  DIAMONDS_DAILY_GIFT,
} from "@/src/domain/services/diamonds";
import { useProgressStore } from "@/src/presentation/stores/progress.store";
import { useDiamondStore } from "@/src/presentation/stores/diamond.store";
import { useEnergyStore } from "@/src/presentation/stores/energy.store";
import { useAchievementStore } from "@/src/presentation/stores/achievement.store";
import { useToastStore } from "@/src/presentation/stores/toast.store";

/** วันที่ท้องถิ่น YYYY-MM-DD สำหรับ daily gift */
export function getTodayKey(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

let playableCountsCache: PlayableLevelCounts | null = null;

async function getPlayableLevelCounts(): Promise<PlayableLevelCounts> {
  if (playableCountsCache) return playableCountsCache;
  const res = await createGameRepo().listGames();
  const counts: PlayableLevelCounts = {};
  if (res.ok) {
    for (const g of res.value) {
      if (g.status === "playable") counts[g.id] = g.levelCount;
    }
  }
  playableCountsCache = counts;
  return counts;
}

/**
 * ประเมิน achievement ใหม่ (cascade: รางวัลเพชรอาจปลด achievement เพชรต่อ)
 * — grant รางวัล + unlock + push toast · คืนรายการที่เพิ่งปลดทั้งหมด
 */
async function awardNewAchievements(): Promise<AchievementDef[]> {
  const defsRes = await createAchievementRepo().listAchievements();
  if (!defsRes.ok) return [];
  const defs = defsRes.value;
  const playableCounts = await getPlayableLevelCounts();

  const achievementStore = useAchievementStore.getState();
  const diamondStore = useDiamondStore.getState();
  const progressStore = useProgressStore.getState();
  const toast = useToastStore.getState();

  const unlockedSet = new Set(Object.keys(achievementStore.unlocked));
  const awarded: AchievementDef[] = [];

  for (let guard = 0; guard <= defs.length; guard++) {
    const snapshot = buildAchievementSnapshot(
      useProgressStore.getState().starsByGame,
      playableCounts,
      useDiamondStore.getState().earnedTotal,
    );
    const newly = evaluateAchievements(snapshot, defs, unlockedSet);
    if (newly.length === 0) break;

    const nowIso = new Date().toISOString();
    for (const def of newly) {
      unlockedSet.add(def.id);
      achievementStore.unlock(def.id, nowIso);
      if (def.rewardDiamonds > 0) diamondStore.grant(def.rewardDiamonds);
      toast.push({
        kind: "achievement",
        emoji: def.emoji,
        title: `ปลดล็อก: ${def.nameTh}`,
        subtitle: `+${def.rewardDiamonds} 💎`,
      });
      awarded.push(def);
    }
  }
  void progressStore; // referenced เพื่อความชัดเจนของ dependency
  return awarded;
}

export interface LevelOutcome {
  stars: number;
  prevStars: number;
  improved: boolean;
  diamondsFromLevel: number;
  energyBonus: number;
  newAchievements: AchievementDef[];
}

/** เรียกตอนจบด่าน — คืนผลรวมให้ LevelComplete overlay แสดง */
export async function completeLevel(
  gameId: GameId,
  level: number,
  stars: number,
): Promise<LevelOutcome> {
  const progress = useProgressStore.getState();
  const diamond = useDiamondStore.getState();
  const energy = useEnergyStore.getState();

  const prevStars = progress.getStars(gameId, level);
  const improved = progress.saveStars(gameId, level, stars);

  const diamondsFromLevel = levelDiamondReward(prevStars, stars as 1 | 2 | 3);
  if (diamondsFromLevel > 0) diamond.grant(diamondsFromLevel);

  // 3⭐ ครั้งแรกของด่าน → โบนัสพลังงาน +1 ❤️
  let energyBonus = 0;
  if (stars === 3 && prevStars < 3) {
    energy.gain(1);
    energyBonus = 1;
  }

  const newAchievements = await awardNewAchievements();

  return {
    stars,
    prevStars,
    improved,
    diamondsFromLevel,
    energyBonus,
    newAchievements,
  };
}

export interface DailyGiftOutcome {
  gifted: boolean;
  diamonds: number;
}

/** เรียกตอนเปิดแอป — sync energy + ให้ของขวัญรายวันถ้าเป็นวันใหม่ */
export async function claimDailyGiftIfNew(): Promise<DailyGiftOutcome> {
  const energy = useEnergyStore.getState();
  energy.sync();
  const gifted = energy.claimDailyGift(getTodayKey());
  if (!gifted) return { gifted: false, diamonds: 0 };

  useDiamondStore.getState().grant(DIAMONDS_DAILY_GIFT);
  useToastStore.getState().push({
    kind: "daily-gift",
    emoji: "🎁",
    title: "ของขวัญรายวัน!",
    subtitle: `พลังงานเต็มหลอด + ${DIAMONDS_DAILY_GIFT} 💎`,
  });
  await awardNewAchievements();
  return { gifted: true, diamonds: DIAMONDS_DAILY_GIFT };
}

/** ล้างความคืบหน้าทั้งหมด (ใช้ในหน้า settings) */
export function resetAllProgress() {
  useProgressStore.getState().resetProgress();
  useDiamondStore.getState().resetDiamonds();
  useEnergyStore.getState().resetEnergy();
  useAchievementStore.getState().resetAchievements();
}
