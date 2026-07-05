// พลังงาน ❤️ — หลอดเดียวใช้ร่วมทุกเกม · regen lazy จากเวลา — key "eku-energy"
// กติกาทั้งหมดเป็น pure fn ใน domain/services/energy.ts — store แค่เรียกใช้ + persist
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  MAX_ENERGY,
  regenEnergy,
  applyDailyGift,
} from "@/src/domain/services/energy";

interface EnergyStore {
  energy: number;
  lastRegenAt: number;
  lastDailyGiftDate: string;
  /** คำนวณ regen ตามเวลาปัจจุบัน (เรียกตอนเปิดหน้า/interval) */
  sync: () => void;
  /** หักพลังงาน (คืน true ถ้าพอ) — ควร sync ก่อน */
  spend: (cost: number) => boolean;
  /** เพิ่มพลังงาน (ไม่เกิน MAX) */
  gain: (amount: number) => void;
  /** ของขวัญรายวัน — คืน true ถ้าเพิ่งได้รับวันนี้ครั้งแรก */
  claimDailyGift: (todayKey: string) => boolean;
  resetEnergy: () => void;
}

export const useEnergyStore = create<EnergyStore>()(
  persist(
    (set, get) => ({
      energy: MAX_ENERGY,
      lastRegenAt: 0,
      lastDailyGiftDate: "",

      sync: () => {
        const now = Date.now();
        const next = regenEnergy(now, {
          energy: get().energy,
          lastRegenAt: get().lastRegenAt,
        });
        set({ energy: next.energy, lastRegenAt: next.lastRegenAt });
      },

      spend: (cost) => {
        if (cost <= 0) return true;
        if (get().energy < cost) return false;
        set((s) => ({ energy: s.energy - cost }));
        return true;
      },

      gain: (amount) =>
        set((s) => ({ energy: Math.min(MAX_ENERGY, s.energy + Math.max(0, amount)) })),

      claimDailyGift: (todayKey) => {
        const res = applyDailyGift(
          { energy: get().energy, lastDailyGiftDate: get().lastDailyGiftDate },
          todayKey,
        );
        if (res.gifted) {
          set({ energy: res.energy, lastDailyGiftDate: res.lastDailyGiftDate });
        }
        return res.gifted;
      },

      resetEnergy: () =>
        set({ energy: MAX_ENERGY, lastRegenAt: Date.now(), lastDailyGiftDate: "" }),
    }),
    { name: "eku-energy", version: 1 },
  ),
);
