// สลับธีม + dark · ธีม candy/galaxy ต้องซื้อด้วยเพชรก่อน (ล็อก = เทา + 🔒 → ลิงก์ /shop)
"use client";

import Link from "next/link";
import {
  useThemeStore,
  type ThemeTemplate,
} from "@/src/presentation/stores/theme.store";
import { useDiamondStore } from "@/src/presentation/stores/diamond.store";
import { useMounted } from "@/src/presentation/lib/use-mounted";
import { cn } from "@/src/presentation/lib/cn";

const TEMPLATES: {
  value: ThemeTemplate;
  label: string;
  emoji: string;
  cosmeticId?: string;
}[] = [
  { value: "universe", label: "จักรวาล", emoji: "🌈" },
  { value: "candy", label: "ลูกอม", emoji: "🍬", cosmeticId: "theme-candy" },
  { value: "galaxy", label: "กาแล็กซี่", emoji: "🌌", cosmeticId: "theme-galaxy" },
];

export function ThemeSwitcher() {
  const mounted = useMounted();
  const template = useThemeStore((s) => s.template);
  const dark = useThemeStore((s) => s.dark);
  const setTemplate = useThemeStore((s) => s.setTemplate);
  const toggleDark = useThemeStore((s) => s.toggleDark);
  const owned = useDiamondStore((s) => s.owned);

  const isOwned = (cosmeticId?: string) =>
    !cosmeticId || (mounted && owned.includes(cosmeticId));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {TEMPLATES.map((t) => {
          const unlocked = isOwned(t.cosmeticId);
          const active = mounted && template === t.value;
          if (!unlocked) {
            return (
              <Link
                key={t.value}
                href="/shop"
                className="flex flex-col items-center gap-1 rounded-2xl border-2 border-border bg-muted-surface p-3 text-muted opacity-70"
              >
                <span className="text-2xl grayscale">{t.emoji}</span>
                <span className="text-xs font-medium">🔒 {t.label}</span>
              </Link>
            );
          }
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setTemplate(t.value)}
              aria-pressed={active}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl border-2 p-3 transition",
                active
                  ? "border-brand-500 bg-brand-500 text-on-brand"
                  : "border-border bg-card text-card-foreground",
              )}
            >
              <span className="text-2xl">{t.emoji}</span>
              <span className="text-xs font-medium">{t.label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={toggleDark}
        aria-pressed={mounted && dark}
        className="flex w-full items-center justify-between rounded-2xl border-2 border-border bg-card px-4 py-3 text-card-foreground"
      >
        <span className="font-medium">โหมดมืด</span>
        <span className="text-xl">{mounted && dark ? "🌙" : "☀️"}</span>
      </button>
    </div>
  );
}
