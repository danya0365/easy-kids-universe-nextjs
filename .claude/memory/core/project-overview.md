---
name: project-overview
description: Easy Kids Universe คืออะไร, stack, สถาปัตยกรรม, จุดสำคัญของ repo (อ่านก่อนเริ่มงานทุกครั้ง หรือเมื่อสงสัยว่าอะไรอยู่ตรงไหน)
metadata:
  type: project
  status: active
  scope: global
---

# Easy Kids Universe — Project Overview

**จักรวาลรวมมินิเกมสำหรับเด็ก** (UI ไทย) เล่นบนเว็บ ไม่ต้องดาวน์โหลด — hub เดียวรวมหลายเกม
**Requirement spec + เป้าหมายดีไซน์ = โลโก้ `public/easy-kid-universe/logo.png`** (จักรวาลฟ้าใส, แก๊งตัวละคร
แพนด้า🐼/กระต่าย🐰/แมว🐱/ไดโน🦖, ดาวทอง, สายรุ้ง, หีบสมบัติ, การ์ด chunky มนขอบขาว)

Easy ABC (เกมสะกดคำ ที่เคยเป็นโปรเจกต์เดี่ยว `~/easy-abc-nextjs`) กลายเป็น **แค่ 1 เกมในจักรวาลนี้** (rebuild ใหม่)

## Stack

Next.js 16.2.10 (App Router, Turbopack) · React 19 · Tailwind v4 (CSS-first `@theme`) ·
zustand (persist ทุก store, key prefix `eku-`) · vitest · **ไม่มี DB/backend — v1 client-only** ทั้งหมด

## สถาปัตยกรรม (hexagonal — ดู `.claude/rules/code-standards.md`)

- `src/domain/` — pure TS ห้าม import framework (eslint gate บังคับ): ports (game/level/achievement/cosmetic),
  `Result<T>`, `services/` (stars, unlock, energy, diamonds, achievements)
- `src/adapters/` — static adapters อ่าน master data (แทน DB, สลับ adapter จริงได้ภายหลัง) + factories
- `src/data/` — master data: `games.master.ts` (13 เกม registry), `abc/math/colors.master.ts` (เนื้อหา 3 เกม),
  `achievements.master.ts`, `cosmetics.master.ts`, `characters.master.ts`
- `src/presentation/` — stores (progress/diamond/energy/achievement/settings/theme), lib (sound/shuffle/use-mounted/
  **economy** = orchestrator จบด่าน), games/ (registry + use-round-engine + abc/math/colors round), components
- `app/(main)/` — TabBar 4 แท็บ: 🏠 `/` (+`/games/[gameId]`) · 💎 `/shop` · 🏆 `/achievements` · ⚙️ `/settings` (+`/how-to-play`)
- `app/(game)/` — full screen: `/play/[gameId]/[level]`
- `app/styles/` — ระบบธีม gen-3: `index.css` → `theme.css` (var-only map) → `themes/{universe,candy,galaxy}.css` (light+dark ครบ)

## ระบบเกม + เศรษฐกิจร่วม (สรุป — รายละเอียดใน [[eku-game-decisions]])

- **13 เกมบน Home** v1 เล่นได้ 3: `abc` (สะกดคำ) · `math` (นับ/บวกลบ) · `colors` (สี) — อีก 10 ติดป้าย "เร็วๆ นี้"
- **pluggable:** เพิ่มเกม = games.master + <game>.master + adapter + registry entry (core ไม่แตะ)
- ⭐ ดาว best-of ต่อด่านต่อเกม · ปลดด่านตามดาวด่านก่อนหน้า (ทุกด่านฟรี)
- ❤️ Energy หลอดเดียวใช้ร่วมทุกเกม max 10 regen 5 นาที เล่นซ้ำด่านผ่านแล้วฟรี — ออกแบบไม่กดดัน
- 💎 เพชร **earn-only** (ไม่มีเงินจริง v1) ได้จากผ่านด่าน/3⭐/achievement/daily gift → ซื้อ cosmetics (ธีม/buddy)
- 🏆 Achievements ข้ามเกม + รางวัลเพชร + toast (evaluate เป็น pure fn ใน domain)

## จุดสำคัญอื่น

- **Skills ที่ต้องยึด** อยู่ใน `skills/` (hexagonal-repo, semantic-theme, versioning) — อ่านก่อนแตะส่วนที่เกี่ยว
- **Next.js 16 มี breaking changes** — อ่าน `node_modules/next/dist/docs/` ก่อนเขียนโค้ด Next (จาก `AGENTS.md`)
- Versioning: เลขจาก `package.json` ที่เดียว → footer `vX.Y.Z (sha)` · bump ตอนออกรุ่นด้วย `npm run release:*`
- Gates: `npm run lint` + `npx tsc --noEmit` + `npm test` + `npm run build` — ดู `.claude/rules/definition-of-done.md`
- Backend (login/cloud save/IAP) = **นอก scope v1** แต่ ports คืน `Promise<Result<T>>` + `earnedTotal`/best-of
  ออกแบบให้ merge idempotent เผื่อเสียบภายหลัง (อ้างอิงแพทเทิร์นจาก easy-abc plan 002)
