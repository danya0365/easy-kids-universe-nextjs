// อ่านเวอร์ชันจาก env ที่ next.config ฝังไว้ (ไม่มี React hook ข้างใน — server/client ใช้ได้)
export function useAppVersion() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0";
  const commitSha = process.env.NEXT_PUBLIC_COMMIT_SHA || "";
  const shortSha = commitSha.slice(0, 7);
  const displayVersion = shortSha ? `v${version} (${shortSha})` : `v${version}`;
  return { version, commitSha, shortSha, displayVersion };
}
