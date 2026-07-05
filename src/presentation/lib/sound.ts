// เสียง — WebAudio chimes (sfx) + Web Speech (อ่านออกเสียง) · เคารพ settings store
// เรียกเฉพาะใน handler/effect (user gesture) · AudioContext สร้าง lazy
import { useSettingsStore } from "@/src/presentation/stores/settings.store";

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      audioCtx = new AC();
    }
    if (audioCtx.state === "suspended") void audioCtx.resume();
    return audioCtx;
  } catch {
    return null;
  }
}

function tone(freq: number, startAt: number, duration: number, gain = 0.15) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime + startAt);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + startAt + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startAt + duration);
  osc.connect(g).connect(ctx.destination);
  osc.start(ctx.currentTime + startAt);
  osc.stop(ctx.currentTime + startAt + duration);
}

export type ChimeKind = "tap" | "correct" | "wrong" | "complete" | "reward";

export function playChime(kind: ChimeKind) {
  if (useSettingsStore.getState().sfxMuted) return;
  switch (kind) {
    case "tap":
      tone(660, 0, 0.09, 0.1);
      break;
    case "correct":
      tone(523.25, 0, 0.12);
      tone(783.99, 0.1, 0.16);
      break;
    case "wrong":
      tone(311.13, 0, 0.18, 0.12);
      break;
    case "complete":
      tone(523.25, 0, 0.14);
      tone(659.25, 0.12, 0.14);
      tone(783.99, 0.24, 0.14);
      tone(1046.5, 0.36, 0.24);
      break;
    case "reward":
      tone(880, 0, 0.1);
      tone(1174.66, 0.1, 0.14);
      break;
  }
}

/** อ่านออกเสียง — enhancement (iOS ต้องมี user gesture) · เคารพ speechMuted */
export function speak(text: string, lang: "en-US" | "th-TH" = "en-US") {
  if (typeof window === "undefined") return;
  if (useSettingsStore.getState().speechMuted) return;
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.85;
    u.pitch = 1.1;
    synth.speak(u);
  } catch {
    // เงียบ — เสียงเป็น enhancement ไม่ใช่ core
  }
}
