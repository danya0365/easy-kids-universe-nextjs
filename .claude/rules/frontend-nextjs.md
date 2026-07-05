---
paths:
  - "app/**"
  - "src/presentation/**"
---

# Frontend Rules — Next.js (Easy Kids Universe)

> โหลดตอนแตะ UI · มาตรฐาน CSS/token/test ดู [code-standards](code-standards.md)

## ⚠️ Next.js 16 — อ่านก่อนเขียน

- **เวอร์ชันนี้มี breaking changes จากที่คุ้นเคย** — อ่าน guide ใน `node_modules/next/dist/docs/`
  ก่อนเขียนโค้ด Next เสมอ อย่าเดาจากความจำ (กฎนี้มาจาก `AGENTS.md`)
- `params`/`searchParams` เป็น **Promise** ต้อง `await` (ดู `app/(game)/play/[gameId]/[level]/page.tsx`)
- `useRouter` มาจาก `next/navigation` (ไม่ใช่ `next/router`) · ไม่มี `next lint` แล้ว (ใช้ `npm run lint`)
- Turbopack เป็น default · แก้หน้าใหม่แล้ว type เพี้ยน → `rm -rf .next && npx next typegen`

## Route groups (ตกลงแล้ว — ห้ามย้ายหน้าออกนอก group โดยไม่คุยก่อน)

- `app/(main)/` = มี **TabBar 4 แท็บ** (`src/presentation/components/tab-bar.tsx`):
  🏠 `/` (+`/games/*`) · 💎 `/shop` · 🏆 `/achievements` · ⚙️ `/settings` (+`/how-to-play`)
  — layout ใส่ `pb-24` กัน TabBar ทับเนื้อหา + EnergyHUD/DiamondHUD มุมบน
- `app/(game)/` = **full screen ไม่มี TabBar**: `/play/[gameId]/[level]`
  — ปุ่ม ⏸ เปิด PauseMenu (ห้ามให้เด็กหลุดกลางด่านโดยไม่ตั้งใจ) + ปุ่ม ← back
- หน้า page.tsx = server component (metadata + โหลด data ผ่าน repo factory) → render client component

## โครงหน้าเกม (reuse ก่อนสร้างใหม่ — pluggable registry)

- **engine กลาง = `games/use-round-engine.ts`** (state machine: loading→idle→checking→correct/wrong→complete +
  นับ mistakes) — เกมใหม่ให้ห่อ hook นี้ ไม่เขียน state machine ซ้ำ
- เพิ่มเกมใหม่แตะแค่ 3 จุด: `data/games.master.ts` (GameDef) + `data/<game>.master.ts` + adapter +
  `games/registry.tsx` (map `gameId → RoundComponent`) — **core ไม่ต้องแตะ**
- **ABC:** ตรวจถูก/ผิดเทียบ**ตัวอักษร** ไม่ใช่ tile id (รองรับ EGG/BEE) · รูปคำ `WordImage` `<img>`+onError→emoji
  (ใส่ `key={word}`) · **Math/Colors:** เลือกจากปุ่ม ตรวจเทียบ answer id/ค่า
- ด่าน: `PlayGate` (เช็คปลดล็อกจาก progress.store — เข้า URL ตรงได้แต่เล่นไม่ได้ถ้ายังล็อก) +
  energy gate ตอนกด "เริ่ม" (ด่านใหม่หัก 1 ❤️ · replay ฟรี)

## Zustand stores (`src/presentation/stores/` — persist ทุกตัว, key prefix `eku-`)

`progress` (ดาว best-of ต่อเกม) · `diamond` (balance/earnedTotal/owned — **earn-only**) ·
`energy` (❤️ sync/spend/gain — กติกาอยู่ domain, หลอดเดียวใช้ร่วมทุกเกม) ·
`achievement` (unlocked map) · `settings` (sfx/speech/buddy) ·
`theme` (key `"eku-theme"` ต้องตรงกับ ThemeScript ใน layout)

## UX เด็ก (เลนส์หลักของ Cosmo)

- touch target ≥56px · ตัวหนังสือใหญ่ · feedback ทันทีทุกแตะ (เสียง+animation)
- ผิดแล้ว**ปลอบ** ("ลองใหม่นะ 💪") ไม่ลงโทษ · energy หมด = modal ปลอบใจ+countdown ไม่บล็อกการเล่นซ้ำ
- ธีม `universe` (default) ต้องคงลุคตามโลโก้ `public/easy-kid-universe/logo.png` (จักรวาลฟ้าใส การ์ด chunky ดาวทอง)
- ตัวละครแก๊งเดียวกัน (🐼🐰🐱🦖) โผล่ทุกเกม — เกมละตัวเป็น "เจ้าภาพ"
