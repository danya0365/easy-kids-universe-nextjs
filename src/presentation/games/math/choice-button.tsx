// ปุ่มตัวเลือก (ตัวเลข) chunky ใหญ่
"use client";

import { cn } from "@/src/presentation/lib/cn";

export function ChoiceButton({
  label,
  onClick,
  disabled,
}: {
  label: string | number;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "chunky flex size-20 items-center justify-center bg-brand-500 font-heading text-4xl font-extrabold text-on-brand transition active:translate-y-0.5",
        "disabled:opacity-60",
      )}
    >
      {label}
    </button>
  );
}
