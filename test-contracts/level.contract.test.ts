import { describe, it, expect } from "vitest";
import {
  createAbcLevelRepo,
  createColorsLevelRepo,
  createMathLevelRepo,
} from "@/src/adapters/levels";
import type { LevelRepository } from "@/src/domain/ports/level.port";

// Contract — ทุกเกม playable ต้องมี repo ที่ผ่าน suite เดียวกัน
const adapters: { name: string; make: () => LevelRepository<unknown> }[] = [
  { name: "abc", make: () => createAbcLevelRepo() as LevelRepository<unknown> },
  { name: "math", make: () => createMathLevelRepo() as LevelRepository<unknown> },
  {
    name: "colors",
    make: () => createColorsLevelRepo() as LevelRepository<unknown>,
  },
];

describe.each(adapters)("LevelRepository contract: $name", ({ make }) => {
  it("listLevels คืน 5 ด่าน เรียง 1..5", async () => {
    const res = await make().listLevels();
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.value).toHaveLength(5);
      expect(res.value.map((l) => l.level)).toEqual([1, 2, 3, 4, 5]);
    }
  });

  it("ทุกด่านมีอย่างน้อย 1 รอบ", async () => {
    const res = await make().listLevels();
    if (res.ok) {
      for (const lvl of res.value) {
        expect(lvl.rounds.length).toBeGreaterThan(0);
      }
    }
  });

  it("getLevel(1) → ok", async () => {
    const res = await make().getLevel(1);
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.value.level).toBe(1);
  });

  it("getLevel(99) → err (ไม่ throw)", async () => {
    const res = await make().getLevel(99);
    expect(res.ok).toBe(false);
  });
});
