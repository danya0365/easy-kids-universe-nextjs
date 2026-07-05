// ปุ่ม chunky มนหนา เงา 3D กดแล้วเด้ง — touch target ใหญ่สำหรับเด็ก
"use client";

import { cn } from "@/src/presentation/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-500 text-on-brand border-brand-600",
  secondary: "bg-card text-card-foreground border-border",
  ghost: "bg-muted-surface text-foreground border-transparent",
};

const SIZES: Record<Size, string> = {
  md: "min-h-[56px] px-5 text-lg",
  lg: "min-h-[64px] px-7 text-xl",
};

export function ChunkyButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl border-b-4 font-heading font-bold",
        "shadow-sm transition active:translate-y-0.5 active:border-b-2",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
