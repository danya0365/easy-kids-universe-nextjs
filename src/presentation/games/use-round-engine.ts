// State machine ร่วมทุกเกม: idle → (submit) → correct/wrong → idle/complete
// นับ mistakes · จบครบทุกรอบ → เรียก onComplete(mistakes) ครั้งเดียว
"use client";

import { useCallback, useEffect, useState } from "react";
import { playChime } from "@/src/presentation/lib/sound";

export type RoundPhase = "idle" | "correct" | "wrong" | "complete";

const CORRECT_DELAY_MS = 900;
const WRONG_DELAY_MS = 700;

export interface RoundEngine {
  phase: RoundPhase;
  roundIndex: number;
  mistakes: number;
  totalRounds: number;
  /** เกมเรียกเมื่อผู้เล่นตอบ (true = ถูก) */
  submit: (correct: boolean) => void;
  reset: () => void;
}

export function useRoundEngine(
  totalRounds: number,
  onComplete: (mistakes: number) => void,
): RoundEngine {
  const [roundIndex, setRoundIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [phase, setPhase] = useState<RoundPhase>("idle");

  const submit = useCallback(
    (correct: boolean) => {
      setPhase((cur) => {
        if (cur !== "idle") return cur;
        if (correct) {
          playChime("correct");
          return "correct";
        }
        playChime("wrong");
        setMistakes((m) => m + 1);
        return "wrong";
      });
    },
    [],
  );

  // จัดการ transition หลัง feedback (setState อยู่ใน setTimeout callback — ไม่ใช่ effect body)
  useEffect(() => {
    if (phase === "correct") {
      const id = setTimeout(() => {
        const next = roundIndex + 1;
        if (next >= totalRounds) {
          playChime("complete");
          setPhase("complete");
        } else {
          setRoundIndex(next);
          setPhase("idle");
        }
      }, CORRECT_DELAY_MS);
      return () => clearTimeout(id);
    }
    if (phase === "wrong") {
      const id = setTimeout(() => setPhase("idle"), WRONG_DELAY_MS);
      return () => clearTimeout(id);
    }
  }, [phase, roundIndex, totalRounds]);

  // จบเกม → แจ้ง onComplete ครั้งเดียว (onComplete ต้อง memoize จากฝั่งผู้เรียก)
  useEffect(() => {
    if (phase === "complete") onComplete(mistakes);
  }, [phase, mistakes, onComplete]);

  const reset = useCallback(() => {
    setRoundIndex(0);
    setMistakes(0);
    setPhase("idle");
  }, []);

  return { phase, roundIndex, mistakes, totalRounds, submit, reset };
}
