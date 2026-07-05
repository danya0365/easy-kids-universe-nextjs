// 1) ThemeProvider — client component ฟัง store แล้ว apply data-theme + .dark ตอน runtime
// 2) ThemeScript   — inline blocking script ใน <head> apply ธีมที่ persist ไว้ ก่อน first paint (กัน FOUC)
"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/src/presentation/stores/theme.store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const template = useThemeStore((s) => s.template);
  const dark = useThemeStore((s) => s.dark);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", template);
    root.classList.toggle("dark", dark);
  }, [template, dark]);

  return <>{children}</>;
}

/**
 * Blocking inline script — apply ธีมที่ persist ไว้ก่อน first paint (กัน flash ของธีม default)
 * อ่าน localStorage key เดียวกับ zustand persist ("eku-theme")
 */
export function ThemeScript() {
  const code = `(function(){try{var s=JSON.parse(localStorage.getItem('eku-theme')||'{}');var t=(s.state&&s.state.template)||'universe';var d=(s.state&&s.state.dark)||false;var r=document.documentElement;r.setAttribute('data-theme',t);if(d)r.classList.add('dark');}catch(e){document.documentElement.setAttribute('data-theme','universe');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
