// แถวดาว ⭐ — แสดง earned/3 (ดาวที่ยังไม่ได้เป็นสีจาง)
import { cn } from "@/src/presentation/lib/cn";

export function StarRow({
  earned,
  total = 3,
  size = "md",
  className,
}: {
  earned: number;
  total?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClass =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-2xl";
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", sizeClass, className)}
      aria-label={`${earned} จาก ${total} ดาว`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={i < earned ? "text-star" : "text-locked opacity-50"}
        >
          {i < earned ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}
