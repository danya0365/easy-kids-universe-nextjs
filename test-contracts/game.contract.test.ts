import { describe, it, expect } from "vitest";
import { createStaticGameRepo } from "@/src/adapters/games/static.adapter";
import { GAMES } from "@/src/data/games.master";
import type { GameRepository } from "@/src/domain/ports/game.port";

// Contract — adapter ทุกตัวของ GameRepository ต้องผ่าน suite นี้ (เพิ่ม memory/DB adapter ได้ภายหลัง)
const adapters: { name: string; make: () => GameRepository }[] = [
  { name: "static", make: () => createStaticGameRepo(GAMES) },
];

describe.each(adapters)("GameRepository contract: $name", ({ make }) => {
  it("listGames คืนรายการไม่ว่าง", async () => {
    const res = await make().listGames();
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.value.length).toBeGreaterThan(0);
  });

  it("getGame ที่มีอยู่ → ok", async () => {
    const res = await make().getGame("abc");
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.value.id).toBe("abc");
  });

  it("getGame ที่ไม่มี → err (ไม่ throw)", async () => {
    // @ts-expect-error จงใจส่ง id ที่ไม่มีจริงเพื่อทดสอบ error path
    const res = await make().getGame("does-not-exist");
    expect(res.ok).toBe(false);
  });
});
