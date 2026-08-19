import { hexToRgba, normalizeHexColor } from "@/customers/lib/category-color";

interface CategoryBadgeProps {
  label: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  surface?: "soft" | "onImage";
}

export default function CategoryBadge({
  label,
  color,
  onClick,
  className = "",
  surface = "soft",
}: CategoryBadgeProps) {
  const categoryColor = normalizeHexColor(color);
  const isOnImage = surface === "onImage";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative z-50 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${className}`.trim()}
      style={{
        color: categoryColor,
        backgroundColor: isOnImage ? "rgba(255, 255, 255, 0.9)" : hexToRgba(categoryColor, 0.1),
        borderColor: hexToRgba(categoryColor, isOnImage ? 0.18 : 0.24)
      }}
    >
      {label}
    </button>
  );
}
