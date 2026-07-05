// Easy Colors — อ่านโจทย์ → แตะสีที่ถูก · สลับลำดับตัวเลือกตอน mount
"use client";

import { useMemo, useState } from "react";
import type { ColorId, ColorsRound } from "@/src/domain/ports/level.port";
import type { GameRoundProps } from "@/src/presentation/games/types";
import { COLOR_PALETTE } from "@/src/data/colors.master";
import { shuffleChoices } from "@/src/presentation/lib/shuffle";
import { ColorChip } from "@/src/presentation/games/colors/color-chip";

export function ColorsRoundView({ round, onSubmit, disabled }: GameRoundProps) {
  const r = round as ColorsRound;
  // สุ่มครั้งเดียวตอน mount (remount ต่อรอบผ่าน key ใน PlayScreen)
  const [options] = useState<ColorId[]>(() => shuffleChoices(r.optionIds));

  const paletteById = useMemo(
    () => new Map(COLOR_PALETTE.map((c) => [c.id, c])),
    [],
  );

  return (
    <div className="flex flex-col items-center gap-8">
      {/* โจทย์ */}
      <div className="flex flex-col items-center gap-2">
        {r.kind === "object-color" && (
          <span className="text-7xl" aria-hidden>
            {r.emoji}
          </span>
        )}
        <p className="chunky bg-card px-5 py-3 font-heading text-2xl font-extrabold text-card-foreground">
          {r.promptTh}
        </p>
      </div>

      {/* ชิปสี */}
      <div className="flex flex-wrap justify-center gap-4">
        {options.map((id) => {
          const color = paletteById.get(id);
          if (!color) return null;
          return (
            <ColorChip
              key={id}
              hex={color.hex}
              label={color.nameTh}
              disabled={disabled}
              onClick={() => onSubmit(id === r.answerId)}
            />
          );
        })}
      </div>
    </div>
  );
}
