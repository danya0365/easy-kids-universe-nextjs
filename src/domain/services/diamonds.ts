// ระบบเพชร 💎 — earn-only (ไม่มีเงินจริงใน v1) · ได้จากการเล่น ใช้ซื้อ cosmetics
import type { StarCount } from "@/src/domain/services/stars";

export const DIAMONDS_FIRST_CLEAR = 5;
export const DIAMONDS_FIRST_THREE_STAR = 5;
export const DIAMONDS_DAILY_GIFT = 2;

export interface DiamondState {
  balance: number;
  earnedTotal: number;
  spentTotal: number;
  owned: string[];
}

/**
 * เพชรที่ได้จากจบด่าน — คิดจาก "ดาวเดิม (best-of)" เทียบกับ "ดาวที่เพิ่งได้"
 * - ผ่านด่านครั้งแรก (prevStars === 0) → +5
 * - ได้ 3⭐ ครั้งแรกของด่าน (prevStars < 3 และรอบนี้ได้ 3) → +5 (โบนัสแยก)
 * เล่นซ้ำที่ไม่ทำสถิติใหม่ → 0 (กัน farming)
 */
export function levelDiamondReward(prevStars: number, newStars: StarCount): number {
  let reward = 0;
  if (prevStars === 0) reward += DIAMONDS_FIRST_CLEAR;
  if (newStars === 3 && prevStars < 3) reward += DIAMONDS_FIRST_THREE_STAR;
  return reward;
}

export function canAfford(balance: number, price: number): boolean {
  return balance >= price;
}

/** เพิ่มเพชร (อัปเดตทั้ง balance และ earnedTotal) */
export function grantDiamonds(
  state: Pick<DiamondState, "balance" | "earnedTotal">,
  amount: number,
): Pick<DiamondState, "balance" | "earnedTotal"> {
  const add = Math.max(0, amount);
  return {
    balance: state.balance + add,
    earnedTotal: state.earnedTotal + add,
  };
}

export interface PurchaseResult {
  purchased: boolean;
  reason?: "already-owned" | "insufficient";
  state: DiamondState;
}

/**
 * ซื้อ cosmetic ด้วยเพชร — pure, ไม่ให้ balance ติดลบ, ไม่ซื้อซ้ำ
 */
export function applyPurchase(
  state: DiamondState,
  itemId: string,
  price: number,
): PurchaseResult {
  if (state.owned.includes(itemId)) {
    return { purchased: false, reason: "already-owned", state };
  }
  if (!canAfford(state.balance, price)) {
    return { purchased: false, reason: "insufficient", state };
  }
  return {
    purchased: true,
    state: {
      ...state,
      balance: state.balance - price,
      spentTotal: state.spentTotal + price,
      owned: [...state.owned, itemId],
    },
  };
}
