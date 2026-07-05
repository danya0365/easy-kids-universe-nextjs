// HUD เพชร 💎 — แสดง balance ปัจจุบัน
"use client";

import { useDiamondStore } from "@/src/presentation/stores/diamond.store";
import { useMounted } from "@/src/presentation/lib/use-mounted";
import { cn } from "@/src/presentation/lib/cn";

export function DiamondHud({ className }: { className?: string }) {
  const mounted = useMounted();
  const balance = useDiamondStore((s) => s.balance);
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-card-foreground shadow-sm",
        className,
      )}
    >
      <span className="text-lg text-diamond">💎</span>
      <span className="font-heading font-bold tabular-nums">
        {mounted ? balance : 0}
      </span>
    </div>
  );
}
