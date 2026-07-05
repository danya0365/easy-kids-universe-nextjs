// Achievements 🏆 ที่ปลดแล้ว — map id → วันที่ปลด (ISO) — key "eku-achievements"
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AchievementStore {
  unlocked: Record<string, string>;
  isUnlocked: (id: string) => boolean;
  /** บันทึกว่าปลดแล้ว (idempotent — ไม่ทับวันที่เดิม) */
  unlock: (id: string, dateIso: string) => void;
  resetAchievements: () => void;
}

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      unlocked: {},

      isUnlocked: (id) => id in get().unlocked,

      unlock: (id, dateIso) =>
        set((s) =>
          id in s.unlocked
            ? s
            : { unlocked: { ...s.unlocked, [id]: dateIso } },
        ),

      resetAchievements: () => set({ unlocked: {} }),
    }),
    { name: "eku-achievements", version: 1 },
  ),
);
