// modal ยืนยันซื้อด้วยเพชร
"use client";

import type { CosmeticDef } from "@/src/domain/ports/cosmetic.port";
import { ChunkyButton } from "@/src/presentation/components/chunky-button";

export function PurchaseConfirm({
  item,
  onConfirm,
  onCancel,
}: {
  item: CosmeticDef;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="chunky w-full max-w-xs animate-bounce-in bg-card p-6 text-center">
        <div className="text-5xl">{item.emoji}</div>
        <h3 className="mt-2 font-heading text-xl font-bold text-card-foreground">
          {item.nameTh}
        </h3>
        <p className="mt-1 text-muted">{item.descTh}</p>
        <p className="mt-3 font-heading text-lg font-bold text-card-foreground">
          ราคา <span className="text-diamond">💎 {item.priceDiamonds}</span>
        </p>
        <div className="mt-5 flex gap-2">
          <ChunkyButton variant="secondary" className="flex-1" onClick={onCancel}>
            ยกเลิก
          </ChunkyButton>
          <ChunkyButton className="flex-1" onClick={onConfirm}>
            ซื้อเลย!
          </ChunkyButton>
        </div>
      </div>
    </div>
  );
}
