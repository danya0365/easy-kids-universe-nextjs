import Image from "next/image";
import Link from "next/link";
import { TabBar } from "@/src/presentation/components/tab-bar";
import { EnergyHud } from "@/src/presentation/components/hud/energy-hud";
import { DiamondHud } from "@/src/presentation/components/hud/diamond-hud";
import { ToastHost } from "@/src/presentation/components/toast-host";
import { AppInit } from "@/src/presentation/components/app-init";
import { SceneDecor } from "@/src/presentation/components/scene-decor";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-bg relative flex min-h-dvh flex-col">
      <SceneDecor />

      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 px-4 py-2">
        <Link href="/" aria-label="Easy Kids Universe" className="shrink-0">
          <Image
            src="/easy-kid-universe/logo.png"
            alt="Easy Kids Universe"
            width={120}
            height={80}
            priority
            className="h-9 w-auto drop-shadow"
          />
        </Link>
        <div className="flex items-center gap-2">
          <EnergyHud />
          <DiamondHud />
        </div>
      </header>

      <main className="relative z-10 flex-1 pb-24">{children}</main>

      <TabBar />
      <ToastHost />
      <AppInit />
    </div>
  );
}
