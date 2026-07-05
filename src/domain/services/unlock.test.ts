import { describe, it, expect } from "vitest";
import { isLevelUnlocked } from "@/src/domain/services/unlock";

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
