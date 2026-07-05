// Easy ABC — ดูรูป → แตะตัวอักษรเรียงเป็นคำ · ตรวจเทียบ "ตัวอักษร" (รองรับ EGG/BEE)
"use client";

import { useState } from "react";
import type { AbcRound } from "@/src/domain/ports/level.port";
import type { GameRoundProps } from "@/src/presentation/games/types";
import { buildTray, type LetterTile as Tile } from "@/src/presentation/lib/shuffle";
import { playChime, speak } from "@/src/presentation/lib/sound";
import { WordImage } from "@/src/presentation/games/abc/word-image";
import { LetterTile } from "@/src/presentation/games/abc/letter-tile";

export function SpellingRound({ round, onSubmit, disabled }: GameRoundProps) {
  const r = round as AbcRound;
  const target = r.word.toUpperCase();

  // สร้างถาดครั้งเดียวตอน mount (remount ต่อรอบผ่าน key ใน PlayScreen — กัน hydration mismatch)
  const [tray] = useState<Tile[]>(() => buildTray(r));
  const [usedIds, setUsedIds] = useState<string[]>([]);

  const letterOf = (id: string) => tray.find((t) => t.id === id)?.letter ?? "";

  const slots: (string | null)[] = Array.from({ length: target.length }, (_, i) =>
    usedIds[i] ? usedIds[i] : null,
  );

  const placeTile = (tile: Tile) => {
    if (disabled) return;
    if (usedIds.includes(tile.id)) return;
    if (usedIds.length >= target.length) return;

    playChime("tap");
    speak(tile.letter, "en-US");
    const nextUsed = [...usedIds, tile.id];
    setUsedIds(nextUsed);

    if (nextUsed.length === target.length) {
      const guess = nextUsed.map(letterOf).join("");
      if (guess === target) {
        speak(r.word, "en-US");
        onSubmit(true);
      } else {
        onSubmit(false);
        setTimeout(() => setUsedIds([]), 700); // คืนถาดให้ลองใหม่หลัง feedback
      }
    }
  };

  const removeSlot = (index: number) => {
    if (disabled) return;
    if (!usedIds[index]) return;
    playChime("tap");
    setUsedIds(usedIds.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* รูป + คำแปล */}
      <div className="flex flex-col items-center gap-1">
        <div className="chunky flex size-40 items-center justify-center bg-card">
          <WordImage word={r.word} emoji={r.emoji} />
        </div>
        <p className="text-sm text-on-brand drop-shadow">{r.meaningTh}</p>
      </div>

      {/* ช่องเรียงตัวอักษร */}
      <div className="flex flex-wrap justify-center gap-2">
        {slots.map((id, i) => (
          <button
            key={i}
            type="button"
            onClick={() => removeSlot(i)}
            className="flex size-14 items-center justify-center rounded-2xl border-4 border-dashed border-card bg-card/40 font-heading text-2xl font-extrabold text-on-brand"
          >
            {id ? letterOf(id) : ""}
          </button>
        ))}
      </div>

      {/* ถาดตัวอักษร */}
      <div className="flex flex-wrap justify-center gap-2">
        {tray.map((tile) => (
          <LetterTile
            key={tile.id}
            letter={tile.letter}
            used={usedIds.includes(tile.id)}
            disabled={disabled}
            onClick={() => placeTile(tile)}
          />
        ))}
      </div>
    </div>
  );
}
