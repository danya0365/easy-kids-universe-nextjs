// HUD พลังงาน ❤️ n/10 + นับถอยหลังแท่งถัดไป · sync regen ทุกวินาที
"use client";

import { useEffect, useState } from "react";
import { useEnergyStore } from "@/src/presentation/stores/energy.store";
import {
  MAX_ENERGY,
  nextRegenInMs,
} from "@/src/domain/services/energy";
import { useMounted } from "@/src/presentation/lib/use-mounted";
import { cn } from "@/src/presentation/lib/cn";

function formatMs(ms: number): string {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function EnergyHud({ className }: { className?: string }) {
  const mounted = useMounted();
  const energy = useEnergyStore((s) => s.energy);
  const lastRegenAt = useEnergyStore((s) => s.lastRegenAt);
  const sync = useEnergyStore((s) => s.sync);
  const [nowTs, setNowTs] = useState(0); // อัปเดตจาก interval — ไม่เรียก Date.now() ตอน render

  useEffect(() => {
    sync();
    const id = setInterval(() => {
      sync();
      setNowTs(Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [sync]);

  const shown = mounted ? energy : MAX_ENERGY;
  const countdown =
    mounted && energy < MAX_ENERGY && nowTs > 0
      ? formatMs(nextRegenInMs(nowTs, { energy, lastRegenAt }))
      : null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-card-foreground shadow-sm",
        className,
      )}
    >
      <span className="text-lg text-energy">❤️</span>
      <span className="font-heading font-bold tabular-nums">
        {shown}
        <span className="text-muted">/{MAX_ENERGY}</span>
      </span>
      {countdown && (
        <span className="ml-0.5 text-xs text-muted tabular-nums">{countdown}</span>
      )}
    </div>
  );
}
