// Zustand + persist — เก็บ template (ธีม) + dark (โหมดมืด) ใน localStorage
// key "eku-theme" (ต้องตรงกับ ThemeScript ที่อ่านตอน boot เพื่อกัน FOUC)
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeTemplate = "universe" | "candy" | "galaxy";

export const THEME_TEMPLATES: ThemeTemplate[] = ["universe", "candy", "galaxy"];
export const DEFAULT_TEMPLATE: ThemeTemplate = "universe";

interface ThemeState {
  template: ThemeTemplate;
  dark: boolean;
  setTemplate: (template: ThemeTemplate) => void;
  toggleDark: () => void;
  setDark: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      template: DEFAULT_TEMPLATE,
      dark: false,
      setTemplate: (template) => set({ template }),
      toggleDark: () => set((s) => ({ dark: !s.dark })),
      setDark: (dark) => set({ dark }),
    }),
    { name: "eku-theme", version: 1 },
  ),
);
