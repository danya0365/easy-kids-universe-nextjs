import { describe, it, expect } from "vitest";
import { computeStars } from "@/src/domain/services/stars";

describe("computeStars", () => {
  it("ผิด 0-1 ครั้ง → 3 ดาว", () => {
    expect(computeStars(0)).toBe(3);
    expect(computeStars(1)).toBe(3);
  });

  it("ผิด 2-4 ครั้ง → 2 ดาว", () => {
    expect(computeStars(2)).toBe(2);
    expect(computeStars(4)).toBe(2);
  });

  it("ผิด 5 ครั้งขึ้นไป → 1 ดาว (จบด่านได้อย่างน้อย 1 ดาวเสมอ)", () => {
    expect(computeStars(5)).toBe(1);
    expect(computeStars(20)).toBe(1);
  });
});
