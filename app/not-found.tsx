import Link from "next/link";
import { ChunkyButton } from "@/src/presentation/components/chunky-button";

export default function NotFound() {
  return (
    <div className="app-bg flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="text-7xl">🚀</div>
      <h1 className="font-heading text-3xl font-extrabold text-foreground">
        หลงทางในจักรวาล!
      </h1>
      <p className="max-w-xs text-muted">
        ไม่พบหน้านี้นะ กลับไปที่บ้านของเราแล้วเลือกเกมสนุกๆ กันดีกว่า
      </p>
      <Link href="/">
        <ChunkyButton size="lg">🏠 กลับหน้าแรก</ChunkyButton>
      </Link>
    </div>
  );
}
