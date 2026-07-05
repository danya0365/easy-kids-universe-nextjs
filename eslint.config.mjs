import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "skills/**",
  ]),
  // Hexagonal gate — domain ต้อง pure (framework-free). ห้าม import next/react/zustand ใน src/domain/**
  {
    files: ["src/domain/**/*.ts", "src/domain/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "next",
                "next/*",
                "react",
                "react-dom",
                "react/*",
                "zustand",
                "zustand/*",
              ],
              message:
                "src/domain ต้อง framework-free — ห้าม import next/react/zustand (hexagonal gate)",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
