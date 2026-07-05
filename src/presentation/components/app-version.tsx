import { useAppVersion } from "@/src/presentation/lib/use-app-version";
import { cn } from "@/src/presentation/lib/cn";

export function AppVersion({ className }: { className?: string }) {
  const { displayVersion } = useAppVersion();
  return (
    <p className={cn("text-center text-[11px] text-muted", className)}>
      Easy Kids Universe {displayVersion}
    </p>
  );
}
