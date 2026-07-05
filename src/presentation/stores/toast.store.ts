// คิว toast (achievement / daily gift) — แสดงทีละใบ · ไม่ persist (session เดียว)
import { create } from "zustand";

export interface ToastItem {
  id: string;
  kind: "achievement" | "daily-gift" | "info";
  emoji: string;
  title: string;
  subtitle?: string;
}

interface ToastStore {
  queue: ToastItem[];
  push: (item: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

let seq = 0;

export const useToastStore = create<ToastStore>((set) => ({
  queue: [],
  push: (item) =>
    set((s) => ({ queue: [...s.queue, { ...item, id: `toast-${seq++}` }] })),
  dismiss: (id) => set((s) => ({ queue: s.queue.filter((t) => t.id !== id) })),
}));
