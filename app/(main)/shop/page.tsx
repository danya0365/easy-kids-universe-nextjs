import type { Metadata } from "next";
import { createCosmeticRepo } from "@/src/adapters/cosmetics";
import { CosmeticCard } from "@/src/presentation/components/shop/cosmetic-card";

export const metadata: Metadata = {
  title: "ร้านเพชร",
  description: "ใช้เพชรที่สะสมได้แลกธีมและเพื่อนซี้ในจักรวาล Easy Kids Universe",
};

export default async function ShopPage() {
  const res = await createCosmeticRepo().listCosmetics();
  const items = res.ok ? res.value : [];
  const themes = items.filter((i) => i.kind === "theme");
  const buddies = items.filter((i) => i.kind === "buddy");

  return (
    <div className="mx-auto w-full max-w-lg px-4">
      <h1 className="pt-2 text-center font-heading text-2xl font-extrabold text-on-brand drop-shadow">
        💎 ร้านเพชร
      </h1>
      <p className="mb-4 text-center text-sm text-on-brand/90 drop-shadow">
        เก็บเพชรจากการเล่นเกม แล้วมาแลกของเจ๋งๆ กัน!
      </p>

      <section className="mb-6">
        <h2 className="mb-2 font-heading text-lg font-bold text-on-brand drop-shadow">
          🎨 ธีม
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((item) => (
            <CosmeticCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-heading text-lg font-bold text-on-brand drop-shadow">
          🐾 เพื่อนซี้
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {buddies.map((item) => (
            <CosmeticCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
