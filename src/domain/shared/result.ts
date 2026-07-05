// Result<T> — error เป็นค่า ไม่ throw ใน flow ปกติ (hexagonal pattern)
// adapter แปลง error ที่ขอบเป็น err() · UI/store เช็ค .ok ก่อนใช้ .value

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export function ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

export function err<T = never>(error: string): Result<T> {
  return { ok: false, error };
}
