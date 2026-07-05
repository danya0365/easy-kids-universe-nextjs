// รูปคำศัพท์ — โหลดไฟล์จริงถ้ามี (/easy-kid-universe/words/<word>.png) ไม่งั้น fallback เป็น emoji
"use client";

import { useState } from "react";

export function WordImage({ word, emoji }: { word: string; emoji: string }) {
  const [failed, setFailed] = useState(false);
  const src = `/easy-kid-universe/words/${word.toLowerCase()}.png`;

  if (failed) {
    return (
      <span className="text-8xl" role="img" aria-label={word}>
        {emoji}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- ต้องการ onError fallback เป็น emoji
    <img
      src={src}
      alt={word}
      onError={() => setFailed(true)}
      className="size-32 object-contain"
    />
  );
}
