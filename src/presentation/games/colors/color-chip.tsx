// ชิปสี — วงกลมใหญ่เติมสีจริง (hex เป็น content ของเกม → inline style, ไม่ใช่ theme token)
"use client";

export function ColorChip({
  hex,
  label,
  onClick,
  disabled,
}: {
  hex: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="chunky size-24 rounded-full transition active:translate-y-0.5 disabled:opacity-60"
      style={{ backgroundColor: hex }}
    />
  );
}
