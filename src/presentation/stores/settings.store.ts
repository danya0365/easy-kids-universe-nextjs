// การตั้งค่า — เสียง sfx/speech แยกกัน + buddy ที่เลือก — key "eku-settings"
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CharacterId } from "@/src/domain/ports/game.port";
import { DEFAULT_BUDDY_ID } from "@/src/data/characters.master";

interface SettingsStore {
  sfxMuted: boolean;
  speechMuted: boolean;
  buddyId: CharacterId;
  toggleSfx: () => void;
  toggleSpeech: () => void;
  setBuddy: (id: CharacterId) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      sfxMuted: false,
      speechMuted: false,
      buddyId: DEFAULT_BUDDY_ID,
      toggleSfx: () => set((s) => ({ sfxMuted: !s.sfxMuted })),
      toggleSpeech: () => set((s) => ({ speechMuted: !s.speechMuted })),
      setBuddy: (id) => set({ buddyId: id }),
    }),
    { name: "eku-settings", version: 1 },
  ),
);
