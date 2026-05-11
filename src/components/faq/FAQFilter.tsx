'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface FAQFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  locale?: any;
}

export default function FAQFilter({
  categories,
  selected,
  onSelect,
  locale
}: FAQFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const scheduleClose = useCallback(() => {
    timeoutRef.current = setTimeout(close, 200);
  }, [close]);

  const cancelClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      ref={containerRef}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full overflow-hidden flex items-center gap-2 px-3 py-1 rounded-md text-[14px]"
        style={{ color: 'rgb(2, 6, 23)', fontWeight: 400 }}
      >
        <span className="truncate block min-w-0">
          {selected === 'All'
            ? (locale?.allCategories || '全部分类')
            : selected
          }
        </span>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full z-50 w-60"
          style={{
            left: -12,
            marginTop: 14,
            borderRadius: 12,
            border: '1px solid #d4d4d4',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            padding: 6,
            maxHeight: 320,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {categories.map((category) => {
            const isSelected = selected === category;
            return (
              <button
                key={category}
                onClick={() => {
                  onSelect(category);
                  setIsOpen(false);
                }}
                className={[
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-[14px]',
                  isSelected
                    ? 'text-[#3370ff] bg-[rgba(51,112,255,0.06)]'
                    : 'text-[rgb(2,6,23)] hover:bg-[#f5f5f5]'
                ].join(' ')}
                style={{ fontWeight: isSelected ? 500 : 400, transition: 'background-color 0.15s' }}
              >
                <span>
                  {category === 'All'
                    ? (locale?.allCategories || '全部分类')
                    : category
                  }
                </span>
                {isSelected && (
                  <Check className="w-4 h-4" style={{ color: '#3370ff' }} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
