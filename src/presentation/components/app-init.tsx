// รันตอนเปิดแอป — sync energy + ของขวัญรายวัน (ครั้งเดียว) · ไม่ render อะไร
"use client";

import { useEffect, useRef } from "react";
import { claimDailyGiftIfNew } from "@/src/presentation/lib/economy";

export function AppInit() {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    void claimDailyGiftIfNew();
  }, []);
  return null;
}
