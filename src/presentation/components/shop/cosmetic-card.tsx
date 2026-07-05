// การ์ด cosmetic ในร้านเพชร — ซื้อ/เป็นเจ้าของแล้ว · ซื้อธีม/buddy แล้วปรับใช้ทันที
"use client";

import { useState } from "react";
import type { CosmeticDef } from "@/src/domain/ports/cosmetic.port";
import { canAfford } from "@/src/domain/services/diamonds";
import { useDiamondStore } from "@/src/presentation/stores/diamond.store";
import { useThemeStore } from "@/src/presentation/stores/theme.store";
import { useSettingsStore } from "@/src/presentation/stores/settings.store";
import { useToastStore } from "@/src/presentation/stores/toast.store";
import { useMounted } from "@/src/presentation/lib/use-mounted";
import { ChunkyButton } from "@/src/presentation/components/chunky-button";
import { PurchaseConfirm } from "@/src/presentation/components/shop/purchase-confirm";
import { cn } from "@/src/presentation/lib/cn";

export function CosmeticCard({ item }: { item: CosmeticDef }) {
  const mounted = useMounted();
  const balance = useDiamondStore((s) => s.balance);
  const owned = useDiamondStore((s) => s.owned);
  const purchase = useDiamondStore((s) => s.purchase);
  const setTemplate = useThemeStore((s) => s.setTemplate);
  const setBuddy = useSettingsStore((s) => s.setBuddy);
  const pushToast = useToastStore((s) => s.push);
  const [confirming, setConfirming] = useState(false);

  const isOwned = mounted && owned.includes(item.id);
  const affordable = mounted && canAfford(balance, item.priceDiamonds);

  const handleBuy = () => {
    const res = purchase(item.id, item.priceDiamonds);
    setConfirming(false);
    if (!res.purchased) return;
    // ปรับใช้ทันที
    if (item.kind === "theme" && item.themeTemplate) setTemplate(item.themeTemplate);
    if (item.kind === "buddy" && item.characterId) setBuddy(item.characterId);
    pushToast({
      kind: "info",
      emoji: item.emoji,
      title: `ได้ ${item.nameTh} แล้ว!`,
      subtitle: item.kind === "theme" ? "เปลี่ยนธีมให้เลย ✨" : "เปลี่ยนเพื่อนซี้ให้เลย ✨",
    });
  };

  return (
    <>
      <div className="chunky flex flex-col items-center gap-2 bg-card p-4 text-center">
        <div className="text-5xl">{item.emoji}</div>
        <p className="font-heading font-bold text-card-foreground">{item.nameTh}</p>
        <p className="text-xs text-muted">{item.descTh}</p>

        {isOwned ? (
          <span className="mt-1 inline-flex items-center rounded-full bg-success-surface px-3 py-1 text-sm font-bold text-success">
            เป็นเจ้าของแล้ว ✓
          </span>
        ) : (
          <ChunkyButton
            size="md"
            className={cn("mt-1 w-full", !affordable && "opacity-50")}
            disabled={!affordable}
            onClick={() => setConfirming(true)}
          >
            💎 {item.priceDiamonds}
          </ChunkyButton>
        )}
        {!isOwned && !affordable && (
          <p className="text-xs text-muted">เก็บเพชรอีกนิดนะ!</p>
        )}
      </div>

      {confirming && (
        <PurchaseConfirm
          item={item}
          onConfirm={handleBuy}
          onCancel={() => setConfirming(false)}
        />
      )}
    </>
  );
}
