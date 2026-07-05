// ระบบ Energy ❤️ — หลอดเดียวใช้ร่วมทุกเกม (Candy Crush-inspired แต่ออกแบบให้ "ไม่กดดัน")
// pure ทั้งหมด: regen คำนวณ lazy จาก elapsed time (ไม่ต้องมี timer ฝั่ง server)

export const MAX_ENERGY = 10;
export const REGEN_INTERVAL_MS = 5 * 60 * 1000; // +1 ❤️ ทุก 5 นาที

export interface EnergyState {
  energy: number;
  /** epoch ms ของจุดอ้างอิงล่าสุดที่ใช้คำนวณ regen */
  lastRegenAt: number;
}

/**
 * คำนวณพลังงานใหม่จากเวลาที่ผ่านไป (lazy regen)
 * - เต็มหลอดแล้ว → เลื่อน lastRegenAt = now (นาฬิกา regen ไม่เดินตอนเต็ม)
 * - ยังไม่เต็ม → เพิ่มตามจำนวนช่วง 5 นาทีที่ผ่าน, เก็บเศษเวลาไว้ใน lastRegenAt
 */
export function regenEnergy(now: number, state: EnergyState): EnergyState {
  if (state.energy >= MAX_ENERGY) {
    return { energy: MAX_ENERGY, lastRegenAt: now };
  }
  const elapsed = now - state.lastRegenAt;
  if (elapsed < REGEN_INTERVAL_MS) return state;

  const gained = Math.floor(elapsed / REGEN_INTERVAL_MS);
  const newEnergy = Math.min(MAX_ENERGY, state.energy + gained);
  if (newEnergy >= MAX_ENERGY) {
    return { energy: MAX_ENERGY, lastRegenAt: now };
  }
  // คงเศษเวลาที่ยังไม่ครบ 1 ช่วง เพื่อไม่ให้เวลา regen หาย
  return {
    energy: newEnergy,
    lastRegenAt: state.lastRegenAt + gained * REGEN_INTERVAL_MS,
  };
}

/** เวลาที่เหลือ (ms) ก่อนได้ ❤️ แท่งถัดไป — เต็มหลอดคืน 0 */
export function nextRegenInMs(now: number, state: EnergyState): number {
  if (state.energy >= MAX_ENERGY) return 0;
  const elapsed = now - state.lastRegenAt;
  const remainder = elapsed % REGEN_INTERVAL_MS;
  return Math.max(0, REGEN_INTERVAL_MS - remainder);
}

/**
 * ค่าพลังงานที่ต้องจ่ายเพื่อเริ่มด่าน
 * - เล่นซ้ำด่านที่ผ่านแล้ว → ฟรี (0) — จุดสำคัญกันเครียด
 * - มี unlimited (เผื่ออนาคต) → ฟรี
 * - ด่านใหม่ที่ยังไม่เคยผ่าน → 1
 */
export function energyCostToStart(opts: {
  isReplay: boolean;
  hasUnlimited?: boolean;
}): number {
  if (opts.hasUnlimited) return 0;
  if (opts.isReplay) return 0;
  return 1;
}

export function canStartLevel(energy: number, cost: number): boolean {
  return energy >= cost;
}

export interface DailyGiftResult {
  gifted: boolean;
  energy: number;
  lastDailyGiftDate: string;
}

/**
 * ของขวัญรายวัน 🎁 — เปิดแอปครั้งแรกของวัน (todayKey เช่น "2026-07-05") → เติมเต็มหลอด
 * ถ้าเป็นวันเดิม → ไม่ทำอะไร (gifted = false)
 * (เพชร +2 ของ daily gift ถูก grant ที่ orchestrator ไม่ปนใน energy)
 */
export function applyDailyGift(
  state: { energy: number; lastDailyGiftDate: string },
  todayKey: string,
): DailyGiftResult {
  if (state.lastDailyGiftDate === todayKey) {
    return { gifted: false, energy: state.energy, lastDailyGiftDate: todayKey };
  }
  return { gifted: true, energy: MAX_ENERGY, lastDailyGiftDate: todayKey };
}
