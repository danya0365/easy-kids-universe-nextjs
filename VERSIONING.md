# Versioning — Easy Kids Universe

เวอร์ชันมี **แหล่งเดียว** = ฟิลด์ `version` ใน `package.json` → ฝังเป็น env ตอน build
(`NEXT_PUBLIC_APP_VERSION`) แล้วแสดงเป็น footer `vX.Y.Z (sha)` ทุกหน้า **ไม่ต้องแก้เลขที่ไฟล์อื่น**

## ออกรุ่น (ทำตอนจะ deploy — ไม่ใช่ทุก commit)

1. commit งานฟีเจอร์ให้ครบ working tree สะอาด
2. ย้ายรายการ `CHANGELOG.md` จาก `[Unreleased]` → หัวข้อเวอร์ชันใหม่ + วันที่
3. เลือกระดับตามเกณฑ์ด้านล่างแล้วรัน:
   ```bash
   npm run release:patch   # 0.1.0 -> 0.1.1
   npm run release:minor   # 0.1.1 -> 0.2.0
   npm run release:major   # 0.9.0 -> 1.0.0 (production แรก)
   ```
   คำสั่งเดียว bump + commit `chore(release): vX.Y.Z` + git tag ให้
4. `git push --follow-tags`

## เกณฑ์ขยับเลข

| หลัก      | ขยับเมื่อ                                                    |
| --------- | ------------------------------------------------------------ |
| **PATCH** | แก้บั๊ก, ปรับ UX/ถ้อยคำ/สไตล์, performance — ไม่มีฟีเจอร์ใหม่ |
| **MINOR** | ฟีเจอร์ใหม่ที่ผู้ใช้สังเกตได้ เช่นเพิ่มเกมใหม่ (backward-compat) |
| **MAJOR** | เปลี่ยนใหญ่กระทบ workflow / redesign / breaking              |

**สั้นๆ:** มีของใหม่ให้เล่นไหม → MINOR · แค่ทำของเดิมดีขึ้น/หายพัง → PATCH · ผู้ใช้ต้องปรับตัวใหม่ → MAJOR
`1.0.0` = production แรก · ช่วง `0.x` = ยังไม่ stable

## หมายเหตุ

- ต้อง build ผ่าน `npm run build` (ไม่ใช่ `next build` ตรง) เพื่อให้ `npm_package_version` ถูกตั้ง
- `npm version` จะ error ถ้า working tree สกปรก → commit ก่อน (hook `version` ดึง CHANGELOG เข้า commit ให้)
