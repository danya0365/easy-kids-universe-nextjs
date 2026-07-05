---
name: eku-game-decisions
description: "การตัดสินใจสำคัญของ Easy Kids Universe ที่ไม่อยู่ในโค้ด — economy ร่วมทุกเกม, เพชร earn-only ไม่มีเงินจริง, energy ไม่กดดัน, 3 เกม v1 + 10 coming soon, pluggable registry, backend นอก scope (อ่านก่อนแตะ economy/energy/ธีม/เกม/registry)"
metadata:
  type: project
  status: active
  scope: global
---

โปรเจกต์ easy-kids-universe-nextjs คือจักรวาลรวมมินิเกมเด็ก โดยใช้โลโก้ `public/easy-kid-universe/logo.png`
เป็น requirement spec และเป้าหมายดีไซน์ UI · Easy ABC (เดิมเป็นโปรเจกต์เดี่ยว) กลายเป็น 1 เกมในจักรวาลนี้

การตัดสินใจจากผู้ใช้ที่ต้องรักษาไว้ (ล็อกวันวางแผน 2026-07-05):

- **v1 = client-only ล้วน** — ทุก state (ดาว/เพชร/energy/achievement) อยู่ localStorage ผ่าน zustand persist
  ไม่มี auth/DB/server actions · ปลอมได้จาก devtools **by design** (พี่รับแล้ว "ไม่ซีเรียสความปลอดภัย")
  · แต่สถาปัตยกรรม ports คืน `Promise<Result<T>>` + `earnedTotal`/best-of ออกแบบให้ merge idempotent
  เผื่อเสียบ backend (login Google + cloud save แบบ easy-abc plan 002) ภายหลังโดยไม่รื้อ UI
- **13 เกมบน Home** แต่ v1 เล่นได้จริง 3 เกม: `abc` (สะกดคำ, เจ้าภาพ 🐼), `math` (นับ/บวกลบ, 🦖),
  `colors` (สี, 🐰) · อีก 10 เกม (shapes/animals/fruits/music/memory/logic/puzzle/coding/quran/english)
  ติดป้าย "เร็วๆ นี้" · **pluggable:** เพิ่มเกมแตะแค่ games.master + <game>.master + adapter + registry
- **เศรษฐกิจร่วมทุกเกม** (หัวใจของ "จักรวาล"):
  - ⭐ ดาว: best-of ต่อด่านต่อเกม · ผิด 0-1=3⭐ 2-4=2⭐ 5+=1⭐ · ปลดด่าน n ต้องมีดาวด่าน n-1 (ด่าน 1 เปิดเสมอ)
  - ❤️ Energy: หลอดเดียวใช้ร่วมทุกเกม max 10, regen 1/5นาที (lazy จาก lastRegenAt), หัก 1 เมื่อเริ่มด่านที่
    **ยังไม่เคยผ่าน** (เกมไหนก็ได้), **เล่นซ้ำด่านผ่านแล้วฟรีไม่จำกัด** (กันเครียด), 3⭐ครั้งแรก +1,
    daily gift เปิดแอปวันใหม่เต็มหลอด +2💎 · หมด = modal ปลอบใจ+countdown **ไม่มีขายเติม** ไม่บล็อก replay
  - 💎 เพชร: **earn-only ไม่มีเงินจริงใน v1** — ได้จากผ่านด่านครั้งแรก +5, 3⭐ครั้งแรก +5, achievement,
    daily gift +2 · **replay ไม่ให้เพชร** (กัน farming) · ใช้ซื้อ cosmetics (ธีม candy/galaxy, buddy) เท่านั้น ·
    track earnedTotal/spentTotal แยกจาก balance
  - 🏆 Achievements: ข้ามเกม (levels-completed/total-stars/three-star-count/games-played/diamonds-earned/
    game-complete/all-perfect) + รางวัลเพชร + toast · evaluate เป็น **pure fn ใน domain** ไม่ปลดซ้ำ
  - 🐼 ตัวละครแก๊งเดียวกัน (แพนด้า/กระต่าย/แมว/ไดโน) โผล่ทุกเกม เกมละตัวเป็น "เจ้าภาพ"
- **โลโก้:** `public/easy-kid-universe/logo.png` (rename จากชื่อไฟล์ ChatGPT ที่มีช่องว่าง) · favicon set อยู่
  `public/favicon/` wire เข้า metadata/manifest แล้ว
- **ธีม:** `universe` (default ฟรี ถอดลุคโลโก้) · `candy` 🍬 (80💎) · `galaxy` 🌌 (120💎) — 2 ตัวหลังซื้อด้วยเพชร ·
  ThemeSwitcher อยู่หน้า /settings · ทุกธีมมี light+dark ใช้จริง
- โปรเจกต์ยึด skills ใน `skills/`: hexagonal repo (domain ห้าม import framework — eslint gate),
  semantic theme gen-3 (ห้าม hardcode สีใน className ยกเว้น hex content เกม colors ผ่าน inline style),
  versioning (bump ตอนออกรุ่นเท่านั้น ผ่าน `npm run release:*`)

Gotcha เทคนิค: eslint-config-next ใช้ react-hooks v6 ที่ห้าม setState ตรง ๆ ใน effect body — แพทเทิร์นแก้:
`useSyncExternalStore` ใน `src/presentation/lib/use-mounted.ts`, setTimeout(0)/interval callback สำหรับ state
ที่ต้องตั้งหลัง mount · สุ่ม (shuffle/buildTray) เฉพาะใน effect/handler กัน hydration mismatch
