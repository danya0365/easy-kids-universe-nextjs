import Link from "next/link";
import { TabBar } from "@/src/presentation/components/tab-bar";
import { EnergyHud } from "@/src/presentation/components/hud/energy-hud";
import { DiamondHud } from "@/src/presentation/components/hud/diamond-hud";
import { ToastHost } from "@/src/presentation/components/toast-host";
import { AppInit } from "@/src/presentation/components/app-init";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-bg flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 px-4 py-2">
        <Link href="/" className="font-heading text-lg font-extrabold text-on-brand drop-shadow">
          ✨ Kids Universe
        </Link>
        <div className="flex items-center gap-2">
          <EnergyHud />
          <DiamondHud />
        </div>
      </header>

      <main className="flex-1 pb-24">{children}</main>

      <TabBar />
      <ToastHost />
      <AppInit />
    </div>
  );
}
