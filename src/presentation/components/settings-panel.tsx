// แผงตั้งค่า — เสียง / ธีม / เพื่อนซี้ / ล้างข้อมูล / เวอร์ชัน
"use client";

import { useState } from "react";
import Link from "next/link";
import { listCharacters } from "@/src/adapters/characters";
import { useSettingsStore } from "@/src/presentation/stores/settings.store";
import { useDiamondStore } from "@/src/presentation/stores/diamond.store";
import { resetAllProgress } from "@/src/presentation/lib/economy";
import { useMounted } from "@/src/presentation/lib/use-mounted";
import { ThemeSwitcher } from "@/src/presentation/components/theme-switcher";
import { ChunkyButton } from "@/src/presentation/components/chunky-button";
import { AppVersion } from "@/src/presentation/components/app-version";
import { cn } from "@/src/presentation/lib/cn";

function ToggleRow({
  label,
  on,
  onToggle,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className="flex w-full items-center justify-between rounded-2xl border-2 border-border bg-card px-4 py-3 text-card-foreground"
    >
      <span className="font-medium">{label}</span>
      <span
        className={cn(
          "flex h-7 w-12 items-center rounded-full p-0.5 transition",
          on ? "bg-brand-500" : "bg-muted-surface",
        )}
      >
        <span
          className={cn(
            "size-6 rounded-full bg-card shadow transition",
            on && "translate-x-5",
          )}
        />
      </span>
    </button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="font-heading text-lg font-bold text-on-brand drop-shadow">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SettingsPanel() {
  const mounted = useMounted();
  const sfxMuted = useSettingsStore((s) => s.sfxMuted);
  const speechMuted = useSettingsStore((s) => s.speechMuted);
  const buddyId = useSettingsStore((s) => s.buddyId);
  const toggleSfx = useSettingsStore((s) => s.toggleSfx);
  const toggleSpeech = useSettingsStore((s) => s.toggleSpeech);
  const setBuddy = useSettingsStore((s) => s.setBuddy);
  const owned = useDiamondStore((s) => s.owned);
  const [confirmReset, setConfirmReset] = useState(false);

  const characters = listCharacters();
  const isBuddyOwned = (id: string) =>
    id === "panda" || (mounted && owned.includes(`buddy-${id}`));

  return (
    <div className="space-y-6">
      <Section title="🔊 เสียง">
        <ToggleRow
          label="เสียงเอฟเฟกต์"
          on={mounted ? !sfxMuted : true}
          onToggle={toggleSfx}
        />
        <ToggleRow
          label="อ่านออกเสียง"
          on={mounted ? !speechMuted : true}
          onToggle={toggleSpeech}
        />
      </Section>

      <Section title="🎨 ธีม">
        <ThemeSwitcher />
      </Section>

      <Section title="🐾 เพื่อนซี้">
        <div className="grid grid-cols-4 gap-2">
          {characters.map((c) => {
            const ownedBuddy = isBuddyOwned(c.id);
            const active = mounted && buddyId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                disabled={!ownedBuddy}
                onClick={() => setBuddy(c.id)}
                aria-pressed={active}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl border-2 p-2 transition",
                  active
                    ? "border-brand-500 bg-brand-500 text-on-brand"
                    : "border-border bg-card text-card-foreground",
                  !ownedBuddy && "opacity-50",
                )}
              >
                <span className="text-3xl">{ownedBuddy ? c.emoji : "🔒"}</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted">ปลดเพื่อนซี้เพิ่มได้ที่ร้านเพชร 💎</p>
      </Section>

      <Section title="ℹ️ อื่นๆ">
        <Link href="/how-to-play">
          <ChunkyButton variant="secondary" className="w-full">
            📖 วิธีเล่น
          </ChunkyButton>
        </Link>
        <ChunkyButton
          variant="ghost"
          className="w-full text-error"
          onClick={() => setConfirmReset(true)}
        >
          🗑 ล้างความคืบหน้าทั้งหมด
        </ChunkyButton>
      </Section>

      <AppVersion />

      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="chunky w-full max-w-xs animate-bounce-in bg-card p-6 text-center">
            <div className="text-5xl">🗑</div>
            <h3 className="mt-2 font-heading text-xl font-bold text-card-foreground">
              ล้างข้อมูลทั้งหมด?
            </h3>
            <p className="mt-1 text-sm text-muted">
              ดาว เพชร และความสำเร็จทั้งหมดจะหายไป กู้คืนไม่ได้นะ
            </p>
            <div className="mt-5 flex gap-2">
              <ChunkyButton
                variant="secondary"
                className="flex-1"
                onClick={() => setConfirmReset(false)}
              >
                ยกเลิก
              </ChunkyButton>
              <ChunkyButton
                className="flex-1 bg-error border-error"
                onClick={() => {
                  resetAllProgress();
                  setConfirmReset(false);
                }}
              >
                ล้างเลย
              </ChunkyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
