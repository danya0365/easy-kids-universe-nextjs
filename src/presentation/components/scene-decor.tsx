// พื้นหลังจักรวาลสดใส — เมฆ/สายรุ้ง/ดาวประกาย/บอลลูน/จรวด ลอยเบาๆ หลัง content
// presentational ล้วน (ค่าคงที่ทั้งหมด ไม่มี random → ปลอดภัยจาก hydration) · pointer-events-none
const SPARKLES: { top: string; left: string; size: string; delay: string; glyph: string }[] = [
  { top: "8%", left: "18%", size: "text-2xl", delay: "0s", glyph: "✨" },
  { top: "14%", left: "72%", size: "text-xl", delay: "0.6s", glyph: "⭐" },
  { top: "30%", left: "40%", size: "text-lg", delay: "1.2s", glyph: "✨" },
  { top: "44%", left: "85%", size: "text-2xl", delay: "0.3s", glyph: "⭐" },
  { top: "58%", left: "10%", size: "text-xl", delay: "1.6s", glyph: "✨" },
  { top: "68%", left: "60%", size: "text-lg", delay: "0.9s", glyph: "⭐" },
  { top: "80%", left: "30%", size: "text-2xl", delay: "0.2s", glyph: "✨" },
  { top: "88%", left: "78%", size: "text-xl", delay: "1.4s", glyph: "⭐" },
];

const CLOUDS: { style: React.CSSProperties; delay: string }[] = [
  { style: { top: "10%", left: "-4%", width: "7rem", height: "2.5rem" }, delay: "0s" },
  { style: { top: "24%", right: "-6%", width: "9rem", height: "3rem" }, delay: "3s" },
  { style: { top: "52%", left: "5%", width: "6rem", height: "2rem" }, delay: "6s" },
  { style: { bottom: "16%", right: "7%", width: "8rem", height: "2.5rem" }, delay: "2s" },
];

export function SceneDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* สายรุ้งด้านบน */}
      <div className="rainbow-arc absolute left-1/2 top-0 h-[140vw] w-[140vw] max-w-none -translate-x-1/2 -translate-y-[58%]" />

      {/* เมฆ */}
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="decor-cloud absolute animate-drift"
          style={{ ...c.style, animationDelay: c.delay }}
        />
      ))}

      {/* ดาวประกาย */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className={`absolute animate-twinkle ${s.size}`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          {s.glyph}
        </span>
      ))}

      {/* บอลลูน + จรวด */}
      <span
        className="absolute right-[8%] top-[16%] animate-float text-4xl opacity-80 sm:text-5xl"
        style={{ animationDelay: "0.5s" }}
      >
        🎈
      </span>
      <span
        className="absolute bottom-[22%] left-[6%] animate-float text-4xl opacity-80 sm:text-5xl"
        style={{ animationDelay: "1.8s" }}
      >
        🚀
      </span>
    </div>
  );
}
