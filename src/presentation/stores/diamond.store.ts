// เพชร 💎 — earn-only · balance/earnedTotal/spentTotal + owned cosmetics — key "eku-diamonds"
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  applyPurchase,
  grantDiamonds,
  type DiamondState as DiamondValues,
} from "@/src/domain/services/diamonds";

interface DiamondStore extends DiamondValues {
  /** เพิ่มเพชร (balance + earnedTotal) */
  grant: (amount: number) => void;
  /** ซื้อ cosmetic — คืนผลลัพธ์ (purchased/reason) */
  purchase: (
    itemId: string,
    price: number,
  ) => { purchased: boolean; reason?: "already-owned" | "insufficient" };
  owns: (itemId: string) => boolean;
  resetDiamonds: () => void;
}

export const useDiamondStore = create<DiamondStore>()(
  persist(
    (set, get) => ({
      balance: 0,
      earnedTotal: 0,
      spentTotal: 0,
      owned: [],

      grant: (amount) =>
        set((s) => ({ ...s, ...grantDiamonds(s, amount) })),

      purchase: (itemId, price) => {
        const res = applyPurchase(get(), itemId, price);
        if (res.purchased) {
          set({
            balance: res.state.balance,
            spentTotal: res.state.spentTotal,
            owned: res.state.owned,
          });
        }
        return { purchased: res.purchased, reason: res.reason };
      },

      owns: (itemId) => get().owned.includes(itemId),

      resetDiamonds: () =>
        set({ balance: 0, earnedTotal: 0, spentTotal: 0, owned: [] }),
    }),
    { name: "eku-diamonds", version: 1 },
  ),
);
