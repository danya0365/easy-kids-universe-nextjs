// แสดง toast ทีละใบจากคิว (achievement / daily gift) — auto dismiss
"use client";

import { useEffect } from "react";
import { useToastStore } from "@/src/presentation/stores/toast.store";

export function ToastHost() {
  const queue = useToastStore((s) => s.queue);
  const dismiss = useToastStore((s) => s.dismiss);
  const current = queue[0];

  useEffect(() => {
    if (!current) return;
    const id = setTimeout(() => dismiss(current.id), 2800);
    return () => clearTimeout(id);
  }, [current, dismiss]);

  if (!current) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[60] flex justify-center px-4">
      <div
        key={current.id}
        className="chunky pointer-events-auto flex animate-bounce-in items-center gap-3 bg-card px-4 py-3 text-card-foreground"
        role="status"
      >
        <span className="text-3xl">{current.emoji}</span>
        <div className="text-left">
          <p className="font-heading text-sm font-bold">{current.title}</p>
          {current.subtitle && (
            <p className="text-xs text-muted">{current.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
