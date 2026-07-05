import { ok, type Result } from "@/src/domain/shared/result";
import type {
  CosmeticDef,
  CosmeticRepository,
} from "@/src/domain/ports/cosmetic.port";

export function createStaticCosmeticRepo(
  cosmetics: CosmeticDef[],
): CosmeticRepository {
  return {
    async listCosmetics(): Promise<Result<CosmeticDef[]>> {
      return ok(cosmetics);
    },
  };
}
