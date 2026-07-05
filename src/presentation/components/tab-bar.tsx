// TabBar ล่าง 4 แท็บ — fixed + safe-area · ไฮไลต์ตาม pathname
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
}

const TABS: Tab[] = [
  { href: "/", label: "หน้าแรก", emoji: "🏠", match: (p) => p === "/" || p.startsWith("/games") },
  { href: "/shop", label: "ร้านเพชร", emoji: "💎", match: (p) => p.startsWith("/shop") },
  { href: "/achievements", label: "ความสำเร็จ", emoji: "🏆", match: (p) => p.startsWith("/achievements") },
  { href: "/settings", label: "ตั้งค่า", emoji: "⚙️", match: (p) => p.startsWith("/settings") || p.startsWith("/how-to-play") },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
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
