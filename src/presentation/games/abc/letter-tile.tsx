// ตัวอักษร tile — ปุ่มใหญ่ chunky สำหรับแตะ
"use client";

import { cn } from "@/src/presentation/lib/cn";

export function LetterTile({
  letter,
  onClick,
  disabled,
  used,
}: {
  letter: string;
  onClick?: () => void;
  disabled?: boolean;
  used?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || used}
      className={cn(
        "chunky flex size-14 items-center justify-center font-heading text-2xl font-extrabold transition active:translate-y-0.5",
        used
          ? "bg-muted-surface text-locked opacity-40"
          : "bg-brand-500 text-on-brand",
      )}
    >
      {letter}
    </button>
  );
}
