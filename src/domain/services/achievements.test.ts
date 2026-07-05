import { describe, it, expect } from "vitest";
import {
  buildAchievementSnapshot,
  isAchievementMet,
  evaluateAchievements,
  type StarsByGame,
} from "@/src/domain/services/achievements";
import type { AchievementDef } from "@/src/domain/ports/achievement.port";

const PLAYABLE = { abc: 5, math: 5, colors: 5 };

describe("buildAchievementSnapshot", () => {
  it("รวมดาว/ด่านที่ผ่าน/3⭐/เกมที่เล่นข้ามทุกเกม", () => {
    const stars: StarsByGame = {
      abc: { 1: 3, 2: 2 },
      math: { 1: 1 },
    };
    const snap = buildAchievementSnapshot(stars, PLAYABLE, 40);
    expect(snap.levelsCompleted).toBe(3);
    expect(snap.totalStars).toBe(6);
    expect(snap.threeStarCount).toBe(1);
    expect(snap.gamesPlayed).toBe(2);
    expect(snap.diamondsEarned).toBe(40);
    expect(snap.perGame.abc).toEqual({ total: 5, completed: 2, perfect: 1 });
    expect(snap.perGame.colors).toEqual({ total: 5, completed: 0, perfect: 0 });
  });
});

describe("isAchievementMet", () => {
  const snap = buildAchievementSnapshot(
    { abc: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 }, math: { 1: 1 } },
    PLAYABLE,
    100,
  );

  const def = (condition: AchievementDef["condition"]): AchievementDef => ({
    id: "x",
    nameTh: "",
    descTh: "",
    emoji: "",
    condition,
    rewardDiamonds: 0,
  });

  it("threshold conditions", () => {
    expect(isAchievementMet(def({ kind: "levels-completed", threshold: 6 }), snap)).toBe(
      true,
    );
    expect(isAchievementMet(def({ kind: "levels-completed", threshold: 7 }), snap)).toBe(
      false,
    );
    expect(isAchievementMet(def({ kind: "total-stars", threshold: 16 }), snap)).toBe(true);
    expect(
      isAchievementMet(def({ kind: "three-star-count", threshold: 5 }), snap),
    ).toBe(true);
    expect(isAchievementMet(def({ kind: "games-played", threshold: 2 }), snap)).toBe(true);
    expect(
      isAchievementMet(def({ kind: "diamonds-earned", threshold: 100 }), snap),
    ).toBe(true);
  });

  it("game-complete: abc ครบทุกด่าน แต่ math ยังไม่ครบ", () => {
    expect(isAchievementMet(def({ kind: "game-complete", gameId: "abc" }), snap)).toBe(
      true,
    );
    expect(isAchievementMet(def({ kind: "game-complete", gameId: "math" }), snap)).toBe(
      false,
    );
  });

  it("all-perfect: false ถ้ายังมีเกม playable ที่ไม่ perfect ครบ", () => {
    expect(isAchievementMet(def({ kind: "all-perfect" }), snap)).toBe(false);
  });

  it("all-perfect: true เมื่อทุกเกม playable ได้ 3⭐ ครบทุกด่าน", () => {
    const perfect = buildAchievementSnapshot(
      {
        abc: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 },
        math: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 },
        colors: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 },
      },
      PLAYABLE,
      500,
    );
    expect(isAchievementMet(def({ kind: "all-perfect" }), perfect)).toBe(true);
  });
});

describe("evaluateAchievements", () => {
  const defs: AchievementDef[] = [
    {
      id: "first-step",
      nameTh: "ก้าวแรก",
      descTh: "",
      emoji: "👣",
      condition: { kind: "levels-completed", threshold: 1 },
      rewardDiamonds: 10,
    },
    {
      id: "star-10",
      nameTh: "ดาว 10",
      descTh: "",
      emoji: "⭐",
      condition: { kind: "total-stars", threshold: 10 },
      rewardDiamonds: 10,
    },
  ];

  it("คืนเฉพาะที่ผ่านเงื่อนไข + ยังไม่เคยปลด", () => {
    const snap = buildAchievementSnapshot({ abc: { 1: 3 } }, PLAYABLE, 0);
    const newly = evaluateAchievements(snap, defs, []);
    expect(newly.map((d) => d.id)).toEqual(["first-step"]);
  });

  it("ไม่ปลดซ้ำของที่อยู่ใน unlockedIds แล้ว", () => {
    const snap = buildAchievementSnapshot({ abc: { 1: 3, 2: 3, 3: 3, 4: 3 } }, PLAYABLE, 0);
    const newly = evaluateAchievements(snap, defs, ["first-step"]);
    expect(newly.map((d) => d.id)).toEqual(["star-10"]);
  });
});
