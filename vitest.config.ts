import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// รองรับ path alias "@/..." (ตรงกับ tsconfig paths) ให้ vitest resolve ได้
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    include: [
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "test-contracts/**/*.test.ts",
    ],
    environment: "node",
  },
});
