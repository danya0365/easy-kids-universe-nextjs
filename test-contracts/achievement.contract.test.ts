import { describe, it, expect } from "vitest";
import { createStaticAchievementRepo } from "@/src/adapters/achievements/static.adapter";
import { ACHIEVEMENTS } from "@/src/data/achievements.master";
import type { AchievementRepository } from "@/src/domain/ports/achievement.port";

const adapters: { name: string; make: () => AchievementRepository }[] = [
  { name: "static", make: () => createStaticAchievementRepo(ACHIEVEMENTS) },
];

describe.each(adapters)("AchievementRepository contract: $name", ({ make }) => {
  it("listAchievements คืนรายการไม่ว่าง + id ไม่ซ้ำ", async () => {
    const res = await make().listAchievements();
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.value.length).toBeGreaterThan(0);
      const ids = res.value.map((a) => a.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("รางวัลเพชรทุกใบเป็นบวก", async () => {
    const res = await make().listAchievements();
    if (res.ok) {
      for (const a of res.value) expect(a.rewardDiamonds).toBeGreaterThan(0);
    }
  });
});
