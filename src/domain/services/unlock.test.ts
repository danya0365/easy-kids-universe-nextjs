import { describe, it, expect } from "vitest";
import {
  isLevelUnlocked,
  recommendedLevel,
} from "@/src/domain/services/unlock";

describe("isLevelUnlocked", () => {
  it("ด่าน 1 เปิดเสมอ แม้ยังไม่มีดาว", () => {
    expect(isLevelUnlocked(1, {})).toBe(true);
  });

  it("ด่านถัดไปเปิดเมื่อด่านก่อนหน้ามีดาว ≥ 1", () => {
    expect(isLevelUnlocked(2, { 1: 1 })).toBe(true);
    expect(isLevelUnlocked(3, { 1: 3, 2: 2 })).toBe(true);
  });

  it("ด่านถัดไปยังล็อกถ้าด่านก่อนหน้าไม่มีดาว", () => {
    expect(isLevelUnlocked(2, {})).toBe(false);
    expect(isLevelUnlocked(3, { 1: 3 })).toBe(false);
  });
});

describe("recommendedLevel", () => {
  it("ยังไม่เคยเล่น → ด่าน 1", () => {
    expect(recommendedLevel({}, 5)).toBe(1);
  });

  it("ผ่านด่าน 1-2 แล้ว → ด่าน 3 (ด่านแรกที่ปลดแต่ยังไม่ผ่าน)", () => {
    expect(recommendedLevel({ 1: 3, 2: 2 }, 5)).toBe(3);
  });

  it("ผ่านครบแต่ยังไม่ 3 ดาวหมด → ด่านแรกที่ยังไม่ 3 ดาว", () => {
    expect(recommendedLevel({ 1: 3, 2: 2, 3: 3, 4: 1, 5: 3 }, 5)).toBe(2);
  });

  it("3 ดาวครบทุกด่าน → ด่าน 1 (เล่นซ้ำ)", () => {
    expect(recommendedLevel({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 }, 5)).toBe(1);
  });
});
