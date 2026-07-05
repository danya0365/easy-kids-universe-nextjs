// การ์ด achievement — ปลดแล้ว (สี + เพชร) vs ยังไม่ปลด (เทา + progress)
import type { AchievementDef } from "@/src/domain/ports/achievement.port";
import { cn } from "@/src/presentation/lib/cn";

export function AchievementCard({
  def,
  unlocked,
  current,
  target,
}: {
  def: AchievementDef;
  unlocked: boolean;
  current: number;
  target: number;
}) {
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  return (
    <div
      className={cn(
        "chunky flex items-center gap-3 bg-card p-3",
        !unlocked && "opacity-80",
      )}
    >
      <div
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-2xl text-3xl",
          unlocked ? "bg-star/20" : "bg-muted-surface grayscale",
        )}
      >
        {unlocked ? def.emoji : "🔒"}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-heading font-bold text-card-foreground">{def.nameTh}</p>
        <p className="truncate text-xs text-muted">{def.descTh}</p>

        {unlocked ? (
          <span className="mt-0.5 inline-flex items-center gap-1 text-sm font-bold text-diamond">
            💎 +{def.rewardDiamonds}
          </span>
        ) : (
          <div className="mt-1.5">
            <div className="h-2 overflow-hidden rounded-full bg-muted-surface">
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[11px] text-muted tabular-nums">
              {current}/{target}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
