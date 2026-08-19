'use client';

import { useState, useRef, useEffect } from 'react';
import {
  HeartIcon,
  EyeIcon,
  ClockIcon,
  CaretDownIcon,
  PencilSimpleIcon,
  FileDashedIcon
} from '@phosphor-icons/react';
import { SORT_OPTIONS, type SolutionSortKey, type SortOption } from '@/customers/lib/solution-search';

const ICON_MAP: Record<SortOption['icon'], typeof HeartIcon> = {
  Heart: HeartIcon,
  Eye: EyeIcon,
  Clock: ClockIcon,
  PencilSimple: PencilSimpleIcon,
  FileDashed: FileDashedIcon
};

interface SortDropdownProps<TSortKey extends string = SolutionSortKey> {
  sortBy: TSortKey;
  onSortChange: (value: TSortKey) => void;
  options?: SortOption<TSortKey>[];
  align?: 'left' | 'right';
  compactOnMobile?: boolean;
}

export default function SortDropdown<TSortKey extends string = SolutionSortKey>({
  sortBy,
  onSortChange,
  options = SORT_OPTIONS as SortOption<TSortKey>[],
  align = 'left',
  compactOnMobile = false
}: SortDropdownProps<TSortKey>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeOption = options.find((o) => o.id === sortBy);
  const ActiveIcon = activeOption ? ICON_MAP[activeOption.icon] : HeartIcon;

  return (
    <div className="flex items-center gap-2 py-0 shrink-0 relative w-fit" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-10 items-center gap-2 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-ink-sub transition-all duration-300 hover:border-surface-300 hover:bg-[#f7f8fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/20 dark:text-[#aeb4bc] dark:hover:border-[#373c43] dark:hover:bg-[#30343b] dark:focus-visible:ring-[#8ab4f8]/20 sm:min-h-0 group cursor-pointer"
        aria-label={compactOnMobile ? `排序：${activeOption?.label}` : undefined}
      >
        <div className="flex items-center gap-1.5 text-[#646a73] dark:text-[#dfe1e5]">
          {activeOption && <ActiveIcon className={`text-lg ${activeOption.color}`} weight="fill" />}
          <span className={`text-[13px] font-bold whitespace-nowrap ${compactOnMobile ? 'hidden sm:inline' : ''}`}>
            {activeOption?.label}
          </span>
        </div>
        <CaretDownIcon
          className={`text-xs text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          weight="bold"
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-1 min-w-max bg-white dark:bg-[#292d33] border border-[#dee0e3] dark:border-[#373c43] rounded-lg shadow-elevation-2 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="p-1 flex flex-col">
            {options.map((item) => {
              const Icon = ICON_MAP[item.icon];
              const isActive = sortBy === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSortChange(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-brand-50 dark:bg-[#203652] text-brand-600 dark:text-[#8ab4f8]'
                      : 'text-[#646a73] dark:text-[#dfe1e5] hover:bg-[#f7f8fa] dark:hover:bg-[#30343b]'
                  }`}
                >
                  <Icon
                    className={`text-base ${isActive ? item.color : 'text-gray-400 dark:text-[#8f959e]'}`}
                    weight={isActive ? 'fill' : 'bold'}
                  />
                  <span className="text-[12px] font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
