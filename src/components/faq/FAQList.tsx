'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import FAQCard from './FAQCard';
import FAQFilter from './FAQFilter';
import { X } from 'lucide-react';

const PAGE_SIZE = 30;

interface FAQItem {
  Category: string;
  Question: string;
  Answers: string;
}

interface FAQListProps {
  faqData: Record<string, FAQItem>;
  locale: any;
  langName: string;
}

export default function FAQList({ faqData, locale, langName }: FAQListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setVisibleCount(PAGE_SIZE);
    searchRef.current?.focus();
  }, []);

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    Object.values(faqData).forEach((item) => {
      categorySet.add(item.Category);
    });
    return ['All', ...Array.from(categorySet).sort()];
  }, [faqData]);

  const filteredFAQs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return Object.entries(faqData).filter(([, item]) => {
      const categoryMatch =
        selectedCategory === 'All' || item.Category === selectedCategory;
      const searchMatch =
        !query ||
        item.Question.toLowerCase().includes(query) ||
        item.Answers.toLowerCase().includes(query) ||
        item.Category.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }, [faqData, selectedCategory, searchQuery]);

  const visibleFAQs = filteredFAQs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFAQs.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => c + PAGE_SIZE);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore]);

  const [focused, setFocused] = useState(false);

  // Handle mobile keyboard: scroll input into safe area above keyboard
  useEffect(() => {
    if (typeof window === 'undefined' || !searchRef.current) return;
    const vv = window.visualViewport;
    if (!vv) return;

    const handleResize = () => {
      if (!focused || !searchRef.current) return;
      const keyboardHeight = window.innerHeight - vv.height;
      if (keyboardHeight > 0) {
        window.scrollTo({
          top: searchRef.current.getBoundingClientRect().top + window.scrollY - vv.height / 3,
          behavior: 'smooth'
        });
      }
    };

    vv.addEventListener('resize', handleResize);
    return () => vv.removeEventListener('resize', handleResize);
  }, [focused]);

  return (
    <div className="w-full">
      {/* Search Bar with embedded Filter */}
      <div className="mb-12 flex justify-center">
        <div
          className="w-full max-w-[600px] flex items-center"
          style={{
            height: 48,
            borderRadius: 9999,
            border: '1px solid #d4d4d4',
            backgroundColor: focused ? '#fff' : 'rgba(255,255,255,0.4)',
            boxShadow: focused
              ? '0 1px 3px 0 rgba(0,0,0,0.08)'
              : '0 1px 2px 0 rgba(0,0,0,0.04)',
            transition: 'background-color 0.2s, box-shadow 0.2s'
          }}
        >
          <div className="pl-3 py-1.5 w-[140px] md:w-auto flex-shrink-0">
            <FAQFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={handleCategoryChange}
              locale={locale}
            />
          </div>
          <div style={{ width: 1, height: 20, backgroundColor: '#d4d4d4', flexShrink: 0, margin: '0 8px' }} />
          <input
            ref={searchRef}
            type="text"
            placeholder={locale.searchPlaceholder || '搜索问题...'}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              setFocused(true);
              setTimeout(() => searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
            }}
            onBlur={() => setFocused(false)}
            className="flex-1 px-3 bg-transparent border-0 focus:outline-none text-[14px] min-w-0"
            style={{ color: 'rgb(2, 6, 23)', height: '100%' }}
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="flex items-center justify-center mr-3 flex-shrink-0"
              style={{ width: 20, height: 20, color: '#6d6d6d' }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* FAQ Grid */}
      {visibleFAQs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[80px]">
            {visibleFAQs.map(([id, item]) => (
              <FAQCard key={id} id={id} data={item} langName={langName} locale={locale} />
            ))}
          </div>
          {hasMore && (
            <div ref={sentinelRef} className="h-10 mt-4" />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-[16px]" style={{ color: 'rgb(71, 85, 105)' }}>
            {locale.noResults || '未找到匹配的问题'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setVisibleCount(PAGE_SIZE);
            }}
            className="mt-4 px-4 py-2 text-[14px] font-medium rounded-full transition-colors"
            style={{
              border: '1px solid #d4d4d4',
              color: 'rgb(2, 6, 23)',
              background: '#fff'
            }}
          >
            {locale.clearFilters || '清除筛选'}
          </button>
        </div>
      )}
    </div>
  );
}
