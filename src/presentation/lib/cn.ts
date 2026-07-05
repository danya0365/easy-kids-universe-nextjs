// รวม className แบบเบา (แทน clsx) — กรอง falsy ออก
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
