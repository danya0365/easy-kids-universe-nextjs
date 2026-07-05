// Easy Math — นับ/บวก/ลบ แล้วแตะเลขคำตอบ · สลับลำดับตัวเลือกตอน mount
"use client";

import { useState } from "react";
import type { MathRound } from "@/src/domain/ports/level.port";
import type { GameRoundProps } from "@/src/presentation/games/types";
import { shuffleChoices } from "@/src/presentation/lib/shuffle";
import { ChoiceButton } from "@/src/presentation/games/math/choice-button";

function answerOf(r: MathRound): number {
  switch (r.kind) {
    case "count":
      return r.count;
    case "add":
      return r.a + r.b;
    case "sub":
      return r.a - r.b;
  }
}

export function MathRoundView({ round, onSubmit, disabled }: GameRoundProps) {
  const r = round as MathRound;
  const answer = answerOf(r);
  // สุ่มครั้งเดียวตอน mount (component remount ต่อรอบผ่าน key ใน PlayScreen — ปลอดภัยจาก hydration
  // เพราะ PlayGate บล็อกไม่ให้ SSR หน้านี้จนกว่า mounted)
  const [choices] = useState<number[]>(() => shuffleChoices(r.choices));

  return (
    <div className="flex flex-col items-center gap-8">
      {/* โจทย์ */}
      {r.kind === "count" ? (
        <div className="flex flex-col items-center gap-3">
          <div className="grid max-w-xs grid-cols-5 gap-2">
            {Array.from({ length: r.count }, (_, i) => (
              <span key={i} className="text-4xl">
                {r.emoji}
              </span>
            ))}
          </div>
          <p className="font-heading text-xl font-bold text-on-brand drop-shadow">
            มีทั้งหมดกี่อัน?
          </p>
        </div>
      ) : (
        <div className="chunky bg-card px-6 py-4">
          <p className="font-heading text-5xl font-extrabold text-card-foreground">
            {r.a} {r.kind === "add" ? "+" : "−"} {r.b} = ?
          </p>
        </div>
      )}

      {/* ตัวเลือก */}
      <div className="flex flex-wrap justify-center gap-3">
        {choices.map((c, i) => (
          <ChoiceButton
            key={`${c}-${i}`}
            label={c}
            disabled={disabled}
            onClick={() => onSubmit(c === answer)}
          />
        ))}
      </div>
    </div>
  );
}
