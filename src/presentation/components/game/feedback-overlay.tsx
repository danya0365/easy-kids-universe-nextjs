// overlay ถูก/ผิด ทับหน้าเกมสั้นๆ — ปลอบเมื่อผิด ไม่ลงโทษ
"use client";

import type { RoundPhase } from "@/src/presentation/games/use-round-engine";

const CHEERS = ["เก่งมาก!", "เยี่ยม!", "สุดยอด!", "ถูกต้อง!", "ดีมากเลย!"];

export function FeedbackOverlay({ phase }: { phase: RoundPhase }) {
  if (phase !== "correct" && phase !== "wrong") return null;
  const correct = phase === "correct";
  // เลือกคำเชียร์แบบคงที่ต่อการ mount (ไม่สุ่มตอน render กัน mismatch)
  const cheer = correct ? CHEERS[0] : "ลองใหม่นะ";

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
      <div className="flex animate-pop flex-col items-center gap-2">
        <span className="text-8xl">{correct ? "🎉" : "💪"}</span>
        <span
          className={`chunky px-5 py-2 font-heading text-2xl font-extrabold ${
            correct
              ? "bg-success-surface text-success"
              : "bg-warning-surface text-warning"
          }`}
        >
          {cheer}
        </span>
      </div>
    </div>
  );
}
