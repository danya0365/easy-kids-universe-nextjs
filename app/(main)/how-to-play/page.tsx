import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "วิธีเล่น",
  description: "วิธีเล่นเกมในจักรวาล Easy Kids Universe และระบบดาว เพชร พลังงาน",
};

const GAMES_HOW = [
  {
    emoji: "🔤",
    name: "Easy ABC",
    steps: "ดูรูป → แตะตัวอักษรเรียงให้เป็นคำที่ถูกต้อง",
  },
  {
    emoji: "🔢",
    name: "Easy Math",
    steps: "นับจำนวน หรือคิดเลขบวกลบ → แตะเลขคำตอบที่ถูก",
  },
  {
    emoji: "🎨",
    name: "Easy Colors",
    steps: "อ่านโจทย์ → แตะสีที่ถูกต้อง",
  },
];

const ECONOMY = [
  { emoji: "⭐", name: "ดาว", desc: "ผ่านด่านได้ดาว ยิ่งผิดน้อยยิ่งได้ดาวเยอะ (สูงสุด 3 ดาว)" },
  { emoji: "💎", name: "เพชร", desc: "ได้จากการผ่านด่านและความสำเร็จ ใช้ซื้อธีมและเพื่อนซี้ในร้านเพชร" },
  { emoji: "❤️", name: "พลังงาน", desc: "เริ่มด่านใหม่ใช้ 1 หัวใจ เล่นซ้ำด่านเก่าฟรี! หัวใจเติมเองทุก 5 นาที" },
  { emoji: "🏆", name: "ความสำเร็จ", desc: "ทำภารกิจข้ามเกมเพื่อปลดล็อกและรับเพชรโบนัส" },
];

export default function HowToPlayPage() {
  return (
    <div className="mx-auto w-full max-w-lg px-4">
      <div className="mb-4 flex items-center gap-3 pt-2">
        <Link
          href="/settings"
          aria-label="กลับ"
          className="inline-flex size-10 items-center justify-center rounded-full bg-card/90 text-xl text-card-foreground shadow-sm"
        >
          ←
        </Link>
        <h1 className="font-heading text-2xl font-extrabold text-on-brand drop-shadow">
          วิธีเล่น
        </h1>
      </div>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-on-brand drop-shadow">
          เกมในจักรวาล
        </h2>
        {GAMES_HOW.map((g) => (
          <div key={g.name} className="chunky flex items-center gap-3 bg-card p-3">
            <span className="text-3xl">{g.emoji}</span>
            <div>
              <p className="font-heading font-bold text-card-foreground">{g.name}</p>
              <p className="text-sm text-muted">{g.steps}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="font-heading text-lg font-bold text-on-brand drop-shadow">
          ของรางวัลในจักรวาล
        </h2>
        {ECONOMY.map((e) => (
          <div key={e.name} className="chunky flex items-center gap-3 bg-card p-3">
            <span className="text-3xl">{e.emoji}</span>
            <div>
              <p className="font-heading font-bold text-card-foreground">{e.name}</p>
              <p className="text-sm text-muted">{e.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
