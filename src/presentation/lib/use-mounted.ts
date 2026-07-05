// useMounted — คืน false ตอน SSR/first render, true หลัง mount
// ใช้ guard UI ที่ต่างตาม persist state (zustand localStorage) กัน hydration mismatch
// ใช้ useSyncExternalStore กันปัญหา react-hooks v6 (ห้าม setState ตรงใน effect body)
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false, // server snapshot
  );
}
