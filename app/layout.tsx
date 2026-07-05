import type { Metadata, Viewport } from "next";
import { Mali, Baloo_2 } from "next/font/google";
import "./styles/index.css";

import {
  ThemeProvider,
  ThemeScript,
} from "@/src/presentation/providers/theme-provider";

// body face — ไทย + ละติน อ่านสบายสำหรับเด็ก
const mali = Mali({
  variable: "--font-mali",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// heading/ตัวเลข/tile — กลมหนา chunky
// Baloo 2 ไม่มี subset ไทย — ตัวไทย fallback ไป Mali ตาม --font-heading-family (latin/ตัวเลขใช้ Baloo)
const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://easy-kids-universe.easy-ai.online"),
  title: {
    default: "Easy Kids Universe — จักรวาลเกมสนุกของเด็กๆ",
    template: "%s | Easy Kids Universe",
  },
  description:
    "จักรวาลรวมมินิเกมเสริมทักษะสำหรับเด็ก — สะกดคำ นับเลข เรียนรู้สี และอีกมากมาย เล่นฟรีบนเว็บ ไม่ต้องดาวน์โหลด",
  applicationName: "Easy Kids Universe",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Easy Kids Universe — จักรวาลเกมสนุกของเด็กๆ",
    description:
      "จักรวาลรวมมินิเกมเสริมทักษะสำหรับเด็ก เล่นฟรีบนเว็บ ไม่ต้องดาวน์โหลด",
    images: ["/easy-kid-universe/logo.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#5cc6f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      data-theme="universe"
      className={`${mali.variable} ${baloo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
