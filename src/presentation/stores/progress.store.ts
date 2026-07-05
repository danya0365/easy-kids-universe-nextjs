// ดาว ⭐ ต่อด่านต่อเกม (best-of) — key "eku-progress"
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameId } from "@/src/domain/ports/game.port";
import type { StarsByGame } from "@/src/domain/services/achievements";

export interface LastPlayed {
  gameId: GameId;
  level: number;
}

interface ProgressState {
  starsByGame: StarsByGame;
  /** ด่านล่าสุดที่เข้าเล่น (ใช้บน dashboard "เล่นต่อ") */
  lastPlayed?: LastPlayed;
  /** ดาวของด่าน (0 = ยังไม่ผ่าน) */
  getStars: (gameId: GameId, level: number) => number;
  /** บันทึกแบบ best-of — คืน true ถ้าเป็นสถิติใหม่ (ดีขึ้น) */
  saveStars: (gameId: GameId, level: number, stars: number) => boolean;
  setLastPlayed: (gameId: GameId, level: number) => void;
  resetProgress: () => void;
  /** merge จาก server (best-of) เผื่อ backend ภายหลัง */
  mergeFromServer: (incoming: StarsByGame) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      starsByGame: {},

      getStars: (gameId, level) => get().starsByGame[gameId]?.[level] ?? 0,

      saveStars: (gameId, level, stars) => {
        const prev = get().starsByGame[gameId]?.[level] ?? 0;
        if (stars <= prev) return false;
        set((s) => ({
          starsByGame: {
            ...s.starsByGame,
            [gameId]: { ...(s.starsByGame[gameId] ?? {}), [level]: stars },
          },
        }));
        return true;
      },

      setLastPlayed: (gameId, level) => set({ lastPlayed: { gameId, level } }),

      resetProgress: () => set({ starsByGame: {}, lastPlayed: undefined }),

      mergeFromServer: (incoming) =>
        set((s) => {
          const merged: StarsByGame = { ...s.starsByGame };
          for (const [gameId, levels] of Object.entries(incoming) as [
            GameId,
            Record<number, number>,
          ][]) {
            const cur = { ...(merged[gameId] ?? {}) };
            for (const [lvl, stars] of Object.entries(levels)) {
              const n = Number(lvl);
              cur[n] = Math.max(cur[n] ?? 0, stars);
            }
            merged[gameId] = cur;
          }
          return { starsByGame: merged };
        }),
    }),
    { name: "eku-progress", version: 1 },
  ),
);
