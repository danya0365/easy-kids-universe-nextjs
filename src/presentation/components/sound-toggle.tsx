// ปุ่มสลับเสียง sfx / อ่านออกเสียง (แยกกัน) — ใช้ในหน้าเกม/ตั้งค่า
"use client";

import { useSettingsStore } from "@/src/presentation/stores/settings.store";
import { useMounted } from "@/src/presentation/lib/use-mounted";
import { cn } from "@/src/presentation/lib/cn";

export function SfxToggle({ className }: { className?: string }) {
  const mounted = useMounted();
  const muted = useSettingsStore((s) => s.sfxMuted);
  const toggle = useSettingsStore((s) => s.toggleSfx);
  const on = mounted ? !muted : true;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "ปิดเสียงเอฟเฟกต์" : "เปิดเสียงเอฟเฟกต์"}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full bg-card/90 text-xl shadow-sm active:translate-y-0.5",
        className,
      )}
    >
      {on ? "🔊" : "🔇"}
    </button>
  );
}
