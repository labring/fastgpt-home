'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          isOpen && 'bg-accent text-accent-foreground'
        )}
      >
        <span className="text-sm">
          {selected === 'All'
            ? (locale?.allCategories || 'All Categories')
            : selected
          }
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-60 z-50 rounded-lg border border-border bg-popover shadow-md">
          <div className="p-1 max-h-80 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onSelect(category);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  selected === category
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-foreground'
                )}
              >
                <span>
                  {category === 'All'
                    ? (locale?.allCategories || 'All Categories')
                    : category
                  }
                </span>
                {selected === category && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
