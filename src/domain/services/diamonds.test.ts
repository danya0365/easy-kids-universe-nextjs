import { describe, it, expect } from "vitest";
import {
  levelDiamondReward,
  canAfford,
  grantDiamonds,
  applyPurchase,
  type DiamondState,
} from "@/src/domain/services/diamonds";

describe("levelDiamondReward", () => {
  it("ผ่านด่านครั้งแรก → +5", () => {
    expect(levelDiamondReward(0, 1)).toBe(5);
    expect(levelDiamondReward(0, 2)).toBe(5);
  });

  it("ผ่านด่านครั้งแรกได้ 3⭐ เลย → +10 (first clear + first 3⭐)", () => {
    expect(levelDiamondReward(0, 3)).toBe(10);
  });

  it("เคยผ่านแล้ว (2⭐) มาอัปเป็น 3⭐ ครั้งแรก → +5 (โบนัส 3⭐ อย่างเดียว)", () => {
    expect(levelDiamondReward(2, 3)).toBe(5);
  });

  it("เล่นซ้ำที่ไม่ทำสถิติใหม่ → 0 (กัน farming)", () => {
    expect(levelDiamondReward(3, 3)).toBe(0);
    expect(levelDiamondReward(2, 2)).toBe(0);
    expect(levelDiamondReward(2, 1)).toBe(0);
  });
});

describe("canAfford", () => {
  it("พอ / ไม่พอ", () => {
    expect(canAfford(80, 80)).toBe(true);
    expect(canAfford(79, 80)).toBe(false);
  });
});

describe("grantDiamonds", () => {
  it("เพิ่มทั้ง balance และ earnedTotal", () => {
    expect(grantDiamonds({ balance: 10, earnedTotal: 30 }, 5)).toEqual({
      balance: 15,
      earnedTotal: 35,
    });
  });
  it("จำนวนติดลบถือเป็น 0", () => {
    expect(grantDiamonds({ balance: 10, earnedTotal: 30 }, -5)).toEqual({
      balance: 10,
      earnedTotal: 30,
    });
  });
});

describe("applyPurchase", () => {
  const base: DiamondState = { balance: 100, earnedTotal: 100, spentTotal: 0, owned: [] };

  it("ซื้อสำเร็จ → หัก balance, เพิ่ม spentTotal, เพิ่ม owned", () => {
    const res = applyPurchase(base, "theme-candy", 80);
    expect(res.purchased).toBe(true);
    expect(res.state.balance).toBe(20);
    expect(res.state.spentTotal).toBe(80);
    expect(res.state.owned).toEqual(["theme-candy"]);
  });

  it("เพชรไม่พอ → ไม่ซื้อ, state เดิม", () => {
    const res = applyPurchase({ ...base, balance: 50 }, "theme-galaxy", 120);
    expect(res.purchased).toBe(false);
    expect(res.reason).toBe("insufficient");
    expect(res.state.balance).toBe(50);
  });

  it("ซื้อซ้ำของที่มีแล้ว → ไม่หักเพชร", () => {
    const owned: DiamondState = { ...base, owned: ["theme-candy"] };
    const res = applyPurchase(owned, "theme-candy", 80);
    expect(res.purchased).toBe(false);
    expect(res.reason).toBe("already-owned");
    expect(res.state.balance).toBe(100);
  });
});
