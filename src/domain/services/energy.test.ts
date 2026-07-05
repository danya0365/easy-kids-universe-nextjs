import { describe, it, expect } from "vitest";
import {
  MAX_ENERGY,
  REGEN_INTERVAL_MS,
  regenEnergy,
  nextRegenInMs,
  energyCostToStart,
  canStartLevel,
  applyDailyGift,
} from "@/src/domain/services/energy";

const T0 = 1_000_000_000_000; // จุดอ้างอิงเวลาแบบคงที่ (ไม่พึ่ง Date.now)

describe("regenEnergy", () => {
  it("เต็มหลอดแล้ว → คงที่ + เลื่อน lastRegenAt = now", () => {
    const res = regenEnergy(T0 + 99_999, { energy: MAX_ENERGY, lastRegenAt: T0 });
    expect(res.energy).toBe(MAX_ENERGY);
    expect(res.lastRegenAt).toBe(T0 + 99_999);
  });

  it("ยังไม่ครบ 5 นาที → ไม่เพิ่ม", () => {
    const res = regenEnergy(T0 + REGEN_INTERVAL_MS - 1, { energy: 3, lastRegenAt: T0 });
    expect(res.energy).toBe(3);
    expect(res.lastRegenAt).toBe(T0);
  });

  it("ผ่าน 2 ช่วง → +2 และเก็บเศษเวลา", () => {
    const res = regenEnergy(T0 + REGEN_INTERVAL_MS * 2 + 1234, {
      energy: 3,
      lastRegenAt: T0,
    });
    expect(res.energy).toBe(5);
    expect(res.lastRegenAt).toBe(T0 + REGEN_INTERVAL_MS * 2);
  });

  it("regen ไม่เกิน MAX แล้ว snap lastRegenAt = now", () => {
    const res = regenEnergy(T0 + REGEN_INTERVAL_MS * 50, { energy: 8, lastRegenAt: T0 });
    expect(res.energy).toBe(MAX_ENERGY);
    expect(res.lastRegenAt).toBe(T0 + REGEN_INTERVAL_MS * 50);
  });
});

describe("nextRegenInMs", () => {
  it("เต็มหลอด → 0", () => {
    expect(nextRegenInMs(T0, { energy: MAX_ENERGY, lastRegenAt: T0 })).toBe(0);
  });

  it("นับถอยหลังถึงแท่งถัดไป", () => {
    expect(nextRegenInMs(T0 + 60_000, { energy: 2, lastRegenAt: T0 })).toBe(
      REGEN_INTERVAL_MS - 60_000,
    );
  });
});

describe("energyCostToStart", () => {
  it("เล่นซ้ำด่านที่ผ่านแล้ว → ฟรี", () => {
    expect(energyCostToStart({ isReplay: true })).toBe(0);
  });
  it("มี unlimited → ฟรี", () => {
    expect(energyCostToStart({ isReplay: false, hasUnlimited: true })).toBe(0);
  });
  it("ด่านใหม่ → 1", () => {
    expect(energyCostToStart({ isReplay: false })).toBe(1);
  });
});

describe("canStartLevel", () => {
  it("พลังงานพอ / ไม่พอ", () => {
    expect(canStartLevel(1, 1)).toBe(true);
    expect(canStartLevel(0, 1)).toBe(false);
    expect(canStartLevel(0, 0)).toBe(true); // replay ฟรี เริ่มได้แม้ ❤️ = 0
  });
});

describe("applyDailyGift", () => {
  it("วันใหม่ → เติมเต็มหลอด + gifted = true", () => {
    const res = applyDailyGift(
      { energy: 2, lastDailyGiftDate: "2026-07-04" },
      "2026-07-05",
    );
    expect(res.gifted).toBe(true);
    expect(res.energy).toBe(MAX_ENERGY);
    expect(res.lastDailyGiftDate).toBe("2026-07-05");
  });

  it("วันเดิม → ไม่ทำอะไร", () => {
    const res = applyDailyGift(
      { energy: 4, lastDailyGiftDate: "2026-07-05" },
      "2026-07-05",
    );
    expect(res.gifted).toBe(false);
    expect(res.energy).toBe(4);
  });
});
