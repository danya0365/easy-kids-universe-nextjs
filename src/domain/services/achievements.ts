// ระบบ Achievements 🏆 — ข้ามเกม · evaluate เป็น pure fn (ไม่ปลดซ้ำ) + รางวัลเพชร
import type { GameId } from "@/src/domain/ports/game.port";
import type { AchievementDef } from "@/src/domain/ports/achievement.port";

/** ดาวต่อด่านต่อเกม (best-of) — โครงเดียวกับ progress.store */
export type StarsByGame = Partial<Record<GameId, Record<number, number>>>;

/** จำนวนด่านของเกมที่ playable — ใช้ตัดสิน game-complete / all-perfect */
export type PlayableLevelCounts = Partial<Record<GameId, number>>;

export interface AchievementSnapshot {
  levelsCompleted: number; // ด่านที่ผ่าน (ดาว ≥ 1) รวมทุกเกม
  totalStars: number; // ดาวรวมทุกเกม
  threeStarCount: number; // จำนวนด่านที่ได้ 3⭐
  gamesPlayed: number; // เกมที่ผ่านอย่างน้อย 1 ด่าน
  diamondsEarned: number; // เพชรสะสมทั้งหมด (earnedTotal)
  perGame: Partial<Record<GameId, { total: number; completed: number; perfect: number }>>;
}

export function buildAchievementSnapshot(
  starsByGame: StarsByGame,
  playableLevelCounts: PlayableLevelCounts,
  diamondsEarned: number,
): AchievementSnapshot {
  let levelsCompleted = 0;
  let totalStars = 0;
  let threeStarCount = 0;
  let gamesPlayed = 0;

  for (const levels of Object.values(starsByGame)) {
    if (!levels) continue;
    let gameHasProgress = false;
    for (const stars of Object.values(levels)) {
      if (stars >= 1) {
        levelsCompleted += 1;
        gameHasProgress = true;
      }
      totalStars += stars;
      if (stars >= 3) threeStarCount += 1;
    }
    if (gameHasProgress) gamesPlayed += 1;
  }

  const perGame: AchievementSnapshot["perGame"] = {};
  for (const [gameId, total] of Object.entries(playableLevelCounts) as [
    GameId,
    number,
  ][]) {
    const levels = starsByGame[gameId] ?? {};
    let completed = 0;
    let perfect = 0;
    for (let lvl = 1; lvl <= total; lvl++) {
      const stars = levels[lvl] ?? 0;
      if (stars >= 1) completed += 1;
      if (stars >= 3) perfect += 1;
    }
    perGame[gameId] = { total, completed, perfect };
  }

  return {
    levelsCompleted,
    totalStars,
    threeStarCount,
    gamesPlayed,
    diamondsEarned,
    perGame,
  };
}

/** เงื่อนไข achievement นี้ผ่านหรือยัง (เทียบ snapshot) */
export function isAchievementMet(
  def: AchievementDef,
  snapshot: AchievementSnapshot,
): boolean {
  const c = def.condition;
  switch (c.kind) {
    case "levels-completed":
      return snapshot.levelsCompleted >= c.threshold;
    case "total-stars":
      return snapshot.totalStars >= c.threshold;
    case "three-star-count":
      return snapshot.threeStarCount >= c.threshold;
    case "games-played":
      return snapshot.gamesPlayed >= c.threshold;
    case "diamonds-earned":
      return snapshot.diamondsEarned >= c.threshold;
    case "game-complete": {
      const g = snapshot.perGame[c.gameId];
      return !!g && g.total > 0 && g.completed >= g.total;
    }
    case "all-perfect": {
      const games = Object.values(snapshot.perGame);
      return (
        games.length > 0 && games.every((g) => g.total > 0 && g.perfect >= g.total)
      );
    }
    default:
      return false;
  }
}

/**
 * คืน achievement ที่ "เพิ่งปลดใหม่" (ผ่านเงื่อนไข + ยังไม่อยู่ใน unlockedIds)
 * — orchestrator เอาไป grant เพชร + queue toast แล้วบันทึกลง store
 */
export function evaluateAchievements(
  snapshot: AchievementSnapshot,
  defs: AchievementDef[],
  unlockedIds: Iterable<string>,
): AchievementDef[] {
  const already = new Set(unlockedIds);
  return defs.filter(
    (def) => !already.has(def.id) && isAchievementMet(def, snapshot),
  );
}
