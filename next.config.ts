import { execSync } from "child_process";
import type { NextConfig } from "next";

const getCommitSha = () => {
  try {
    return (
      process.env.WORKERS_CI_COMMIT_SHA ||
      process.env.VERCEL_GIT_COMMIT_SHA ||
      execSync("git rev-parse HEAD").toString().trim()
    );
  } catch {
    return "";
  }
};

const nextConfig: NextConfig = {
  // อย่าเปิด cacheComponents, partialPrefetching หรือ `export const instant`
  // — บน workerd request ค้างทั้ง isolate
  // รูปโลคัลเสิร์ฟตรงจาก static assets ไม่ผ่าน Cloudflare Images
  images: {
    unoptimized: true,
  },
  env: {
    // npm ตั้ง npm_package_version ให้เมื่อรันผ่าน `npm run build`
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || "0.1.0",
    NEXT_PUBLIC_COMMIT_SHA: getCommitSha(),
  },
};

export default nextConfig;
