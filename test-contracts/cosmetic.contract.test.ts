import { describe, it, expect } from "vitest";
import { createStaticCosmeticRepo } from "@/src/adapters/cosmetics/static.adapter";
import { COSMETICS } from "@/src/data/cosmetics.master";
import type { CosmeticRepository } from "@/src/domain/ports/cosmetic.port";

const adapters: { name: string; make: () => CosmeticRepository }[] = [
  { name: "static", make: () => createStaticCosmeticRepo(COSMETICS) },
];

describe.each(adapters)("CosmeticRepository contract: $name", ({ make }) => {
  it("listCosmetics คืนรายการไม่ว่าง + id ไม่ซ้ำ", async () => {
    const res = await make().listCosmetics();
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.value.length).toBeGreaterThan(0);
      const ids = res.value.map((c) => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("ราคาทุกชิ้นเป็นบวก + theme มี themeTemplate / buddy มี characterId", async () => {
    const res = await make().listCosmetics();
    if (res.ok) {
      for (const c of res.value) {
        expect(c.priceDiamonds).toBeGreaterThan(0);
        if (c.kind === "theme") expect(c.themeTemplate).toBeTruthy();
        if (c.kind === "buddy") expect(c.characterId).toBeTruthy();
      }
    }
  });
});
