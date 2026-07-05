// ปุ่ม ← ย้อนกลับ ในหน้า (game) full screen · ถ้ามี onClick ให้เรียก (เช่นเปิด PauseMenu ก่อน)
"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/src/presentation/lib/cn";

export function BackButton({
  href,
  onClick,
  className,
  label = "ย้อนกลับ",
}: {
  href?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  const handle = () => {
    if (onClick) return onClick();
    if (href) return router.push(href);
    router.back();
  };
  return (
    <button
      type="button"
      onClick={handle}
      aria-label={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full bg-card/90 text-xl text-card-foreground shadow-sm active:translate-y-0.5",
        className,
      )}
    >
      ←
    </button>
  );
}
