import type { Result } from "@/src/domain/shared/result";
import type { CharacterId } from "@/src/domain/ports/game.port";

// ของแต่ง (ซื้อด้วยเพชร) — ธีม หรือ buddy (ตัวละครคู่ใจ)
export type CosmeticKind = "theme" | "buddy";

export interface CosmeticDef {
  id: string;
  kind: CosmeticKind;
  nameTh: string;
  descTh: string;
  emoji: string;
  priceDiamonds: number;
  /** ถ้า kind === "theme" ชี้ template ที่ปลดล็อก */
  themeTemplate?: "candy" | "galaxy";
  /** ถ้า kind === "buddy" ชี้ตัวละครที่ปลดล็อก */
  characterId?: CharacterId;
}

export interface CosmeticRepository {
  listCosmetics(): Promise<Result<CosmeticDef[]>>;
}
