import Link from 'next/link';
import { hexToRgba, normalizeHexColor } from '@customers/lib/category-color';

interface CategoryBadgeProps {
  label: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  className?: string;
  surface?: 'soft' | 'onImage';
}

export default function CategoryBadge({
  label,
  color,
  onClick,
  href,
  className = '',
  surface = 'soft'
}: CategoryBadgeProps) {
  const categoryColor = normalizeHexColor(color);
  const isOnImage = surface === 'onImage';

  const badgeClassName =
    `relative z-50 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-bold transition-all cursor-pointer ${className}`.trim();
  const style = {
    color: categoryColor,
    backgroundColor: isOnImage ? 'rgba(255, 255, 255, 0.9)' : hexToRgba(categoryColor, 0.1),
    borderColor: hexToRgba(categoryColor, isOnImage ? 0.18 : 0.24)
  };

  if (href) {
    return (
      <Link href={href} className={badgeClassName} style={style}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={badgeClassName} style={style}>
      {label}
    </button>
  );
}
