// TabBar ล่าง 5 แท็บ — 🎮 เกม อยู่กลางเป็นปุ่มกลมนูนเด้งขึ้น (FAB) · fixed + safe-area · ไฮไลต์ตาม pathname
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/presentation/lib/cn";

interface Tab {
  href: string;
  label: string;
  emoji: string;
  /** prefix เพิ่มเติมที่ถือว่า active */
  match: (path: string) => boolean;
  /** true = ปุ่มกลาง FAB */
  prominent?: boolean;
}

const TABS: Tab[] = [
  { href: "/", label: "หน้าแรก", emoji: "🏠", match: (p) => p === "/" },
  {
    href: "/achievements",
    label: "ความสำเร็จ",
    emoji: "🏆",
    match: (p) => p.startsWith("/achievements"),
  },
  {
    href: "/games",
    label: "เกม",
    emoji: "🎮",
    match: (p) => p.startsWith("/games"),
    prominent: true,
  },
  {
    href: "/shop",
    label: "ร้านเพชร",
    emoji: "💎",
    match: (p) => p.startsWith("/shop"),
  },
  {
    href: "/settings",
    label: "ตั้งค่า",
    emoji: "⚙️",
    match: (p) => p.startsWith("/settings") || p.startsWith("/how-to-play"),
  },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg items-end justify-around">
        {TABS.map((tab) => {
          const active = tab.match(pathname);

          if (tab.prominent) {
            return (
              <li key={tab.href} className="flex-1">
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className="flex flex-col items-center justify-end gap-0.5 pb-1.5"
                >
                  <span
                    className={cn(
                      "-mt-7 flex size-16 items-center justify-center rounded-full border-4 border-card bg-brand-500 text-3xl text-on-brand shadow-lg transition active:translate-y-0.5",
                      active && "ring-4 ring-brand-300",
                    )}
                  >
                    {tab.emoji}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-bold",
                      active ? "text-brand-600" : "text-muted",
                    )}
                  >
                    {tab.label}
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[56px] flex-col items-center justify-center gap-0.5 py-1.5 text-xs font-medium transition",
                  active ? "text-brand-600" : "text-muted",
                )}
              >
                <span className={cn("text-2xl transition", active && "scale-110")}>
                  {tab.emoji}
                </span>
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
