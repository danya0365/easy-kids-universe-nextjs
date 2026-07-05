// ตัวละครแก๊งจักรวาล — แสดงเป็น emoji ในวงกลม (รูปจริงเติมทีหลัง)
import { getCharacter } from "@/src/adapters/characters";
import type { CharacterId } from "@/src/domain/ports/game.port";
import { cn } from "@/src/presentation/lib/cn";

const SIZES = {
  sm: "size-9 text-xl",
  md: "size-14 text-3xl",
  lg: "size-20 text-5xl",
  xl: "size-28 text-7xl",
} as const;

export function CharacterAvatar({
  characterId,
  size = "md",
  className,
}: {
  characterId: CharacterId;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const char = getCharacter(characterId);
  return (
    <span
      role="img"
      aria-label={char?.nameTh ?? "ตัวละคร"}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-muted-surface",
        SIZES[size],
        className,
      )}
    >
      {char?.emoji ?? "🐼"}
    </span>
  );
}
