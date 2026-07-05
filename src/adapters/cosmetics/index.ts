import { COSMETICS } from "@/src/data/cosmetics.master";
import { createStaticCosmeticRepo } from "@/src/adapters/cosmetics/static.adapter";
import type { CosmeticRepository } from "@/src/domain/ports/cosmetic.port";

export function createCosmeticRepo(): CosmeticRepository {
  return createStaticCosmeticRepo(COSMETICS);
}
