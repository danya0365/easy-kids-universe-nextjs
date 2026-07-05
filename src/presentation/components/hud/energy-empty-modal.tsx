// Modal ปลอบใจตอนพลังงานหมด — countdown + ไม่บล็อกการเล่นซ้ำด่านเก่า (ไม่มีปุ่มขายเติม)
"use client";

import { useEffect, useState } from "react";
import { useEnergyStore } from "@/src/presentation/stores/energy.store";
import { nextRegenInMs } from "@/src/domain/services/energy";
import { ChunkyButton } from "@/src/presentation/components/chunky-button";

function formatMs(ms: number): string {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function EnergyEmptyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const energy = useEnergyStore((s) => s.energy);
  const lastRegenAt = useEnergyStore((s) => s.lastRegenAt);
  const sync = useEnergyStore((s) => s.sync);
  const [nowTs, setNowTs] = useState(0);

  useEffect(() => {
    if (!open) return;
    sync();
    const id = setInterval(() => {
      sync();
      setNowTs(Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [open, sync]);

  if (!open) return null;

  const countdown =
    nowTs > 0 ? formatMs(nextRegenInMs(nowTs, { energy, lastRegenAt })) : "…";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="chunky w-full max-w-sm animate-bounce-in bg-card p-6 text-center">
        <div className="text-6xl">😴</div>
        <h2 className="mt-3 font-heading text-2xl font-bold text-card-foreground">
          พักสายตาแป๊บนึงนะ
        </h2>
        <p className="mt-2 text-muted">
          พลังงาน ❤️ กำลังชาร์จอยู่ — อีก{" "}
          <span className="font-bold text-energy tabular-nums">{countdown}</span>{" "}
          ได้อีก 1 หัวใจ
        </p>
        <p className="mt-1 text-sm text-muted">
          ระหว่างนี้เล่นซ้ำด่านที่ผ่านแล้วได้ฟรีไม่จำกัดนะ 💪
        </p>
        <ChunkyButton className="mt-5 w-full" onClick={onClose}>
          โอเค!
        </ChunkyButton>
      </div>
    </div>
  );
}
