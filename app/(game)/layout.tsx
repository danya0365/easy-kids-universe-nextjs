import { ToastHost } from "@/src/presentation/components/toast-host";

// (game) = full screen ไม่มี TabBar · ปุ่ม back/pause อยู่ในหน้าเกมเอง
export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-bg min-h-dvh">
      {children}
      <ToastHost />
    </div>
  );
}
