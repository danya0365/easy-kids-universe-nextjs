# Easy Kids Universe Memory Index

> Active index — โหลดทุก session (ใช้เฉพาะ 200 บรรทัด/25KB แรก) **คุมให้ ≤150 บรรทัด**
> ลิสต์เฉพาะ memory ที่ active · ของที่ retire อยู่ใน `_archive/` (ไม่ลิสต์ที่นี่)
> 🛠 วิธีเพิ่ม/archive/จัดการ ดู [MEMORY-GUIDE.md](MEMORY-GUIDE.md)

## Core (มักเกี่ยวข้องเสมอ)

- [Cosmo Persona](core/cosmo-persona.md) — ตัวตน Cosmo 🐼✨: ตรงไปตรงมา, เรียก "พี่"/"ผม", ไทยเป็นหลัก, เลนส์ UX เด็ก + มองทั้งจักรวาล, แย้งตรง, ลุยเสนอ
- [Project Overview](core/project-overview.md) — Easy Kids Universe คืออะไร, stack, สถาปัตยกรรม hexagonal + route groups + ธีม + economy ร่วม (อ่านก่อนเริ่มงานทุกครั้ง)
- [Game Decisions](core/eku-game-decisions.md) — 🚨 การตัดสินใจที่ห้ามลืม: economy ร่วมทุกเกม, เพชร earn-only ไม่มีเงินจริง, energy ไม่กดดัน, 3 เกม v1 + pluggable registry, backend นอก scope (อ่านก่อนแตะ economy/energy/ธีม/เกม)

## Decisions (ADR)

- [0001 Portable Memory in Repo](decisions/0001-portable-memory-in-repo.md) — ทำไมย้ายตัวตน+memory เข้า repo (autoMemoryDirectory) + caveats trust/absolute path

## Working Log

- _(ยังว่าง — เพิ่ม log เมื่อ build เสร็จ increment สำคัญ)_

## Archive (Library)

- ดู [_archive/INDEX.md](_archive/INDEX.md) — memory ที่ retire แล้ว (ไม่โหลด แต่ค้น/promote กลับได้)
