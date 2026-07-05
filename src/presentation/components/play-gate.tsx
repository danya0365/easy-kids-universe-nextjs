// PlayGate — ยามหน้าเล่น: เช็คด่านปลดล็อก + energy gate (หัก 1 ❤️ สำหรับด่านใหม่, replay ฟรี)
// หักพลังงานครั้งเดียวตอนเข้าเล่นจริง · เข้า URL ตรงได้แต่ถูก gate
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { GameId } from "@/src/domain/ports/game.port";
import { isLevelUnlocked } from "@/src/domain/services/unlock";
import { energyCostToStart } from "@/src/domain/services/energy";
import { useEnergyStore } from "@/src/presentation/stores/energy.store";
import { useProgressStore } from "@/src/presentation/stores/progress.store";
import { useMounted } from "@/src/presentation/lib/use-mounted";
import { ChunkyButton } from "@/src/presentation/components/chunky-button";
import { EnergyHud } from "@/src/presentation/components/hud/energy-hud";

function FullscreenCard({
  emoji,
  title,
  desc,
  backHref,
  backLabel,
  children,
}: {
  emoji: string;
  title: string;
  desc: string;
  backHref: string;
  backLabel: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="text-7xl">{emoji}</div>
      <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
      <p className="max-w-xs text-muted">{desc}</p>
      {children}
      <Link href={backHref}>
        <ChunkyButton variant="secondary">{backLabel}</ChunkyButton>
      </Link>
    </div>
  );
}

export function PlayGate({
  gameId,
  level,
  children,
}: {
  gameId: GameId;
  level: number;
  children: React.ReactNode;
}) {
  const mounted = useMounted();
  const sync = useEnergyStore((s) => s.sync);
  const spend = useEnergyStore((s) => s.spend);
  const energy = useEnergyStore((s) => s.energy);
  const starsByGame = useProgressStore((s) => s.starsByGame);
  // entered = เข้าเล่นแล้ว (หักพลังงานแล้ว) — คงการ render เกมไว้แม้พลังงานลดหลังหัก
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    sync();
  }, [sync]);

  const starsOfGame = starsByGame[gameId] ?? {};
  const unlocked = isLevelUnlocked(level, starsOfGame);
  const isReplay = (starsOfGame[level] ?? 0) >= 1;
  const cost = energyCostToStart({ isReplay });
  const canStart = energy >= cost;
  const allow = mounted && unlocked && canStart;

  // หักพลังงานครั้งเดียวตอนเข้าเล่นจริง (setState/spend ใน setTimeout callback ไม่ใช่ effect body)
  useEffect(() => {
    if (!allow || entered) return;
    const id = setTimeout(() => {
      setEntered(true);
      if (cost > 0) spend(cost);
    }, 0);
    return () => clearTimeout(id);
  }, [allow, entered, cost, spend]);

  if (!mounted) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-4xl">⏳</div>
    );
  }

  if (!unlocked) {
    return (
      <FullscreenCard
        emoji="🔒"
        title={`ต้องผ่านด่านที่ ${level - 1} ก่อนนะ`}
        desc="ไปเก็บดาวด่านก่อนหน้าให้ครบก่อน แล้วค่อยมาลุยด่านนี้กัน!"
        backHref={`/games/${gameId}`}
        backLabel="← กลับแผนที่ด่าน"
      />
    );
  }

  if (!entered && !canStart) {
    return (
      <FullscreenCard
        emoji="😴"
        title="พักสายตาแป๊บนึงนะ"
        desc="พลังงาน ❤️ หมดแล้ว รอชาร์จอีกนิด หรือกลับไปเล่นซ้ำด่านที่ผ่านแล้วได้ฟรีนะ!"
        backHref={`/games/${gameId}`}
        backLabel="← กลับแผนที่ด่าน"
      >
        <EnergyHud />
      </FullscreenCard>
    );
  }

  return <>{children}</>;
}
