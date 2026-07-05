import type { Metadata } from "next";
import { SettingsPanel } from "@/src/presentation/components/settings-panel";

export const metadata: Metadata = {
  title: "ตั้งค่า",
  description: "ตั้งค่าเสียง ธีม เพื่อนซี้ ในจักรวาล Easy Kids Universe",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-lg px-4">
      <h1 className="pt-2 pb-4 text-center font-heading text-2xl font-extrabold text-on-brand drop-shadow">
        ⚙️ ตั้งค่า
      </h1>
      <SettingsPanel />
    </div>
  );
}
