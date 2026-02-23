'use client';

import { useState, useMemo, useCallback } from 'react';
import FAQCard from './FAQCard';
import FAQFilter from './FAQFilter';

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

  // Reset pagination when filters change
  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(PAGE_SIZE);
  }, []);

  // Extract all unique categories
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    Object.values(faqData).forEach((item) => {
      categorySet.add(item.Category);
    });
    return ['All', ...Array.from(categorySet).sort()];
  }, [faqData]);

  // Filter FAQs based on category and search query
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

  return (
    <div className="w-full">
      {/* Combined Search Bar with Filter */}
      <div className="mb-6 flex justify-center">
        <div className="w-full max-w-[600px] flex items-center gap-0 rounded-lg bg-background dark:bg-background border border-input shadow-sm hover:shadow-md transition-shadow">
          <div className="pl-3 py-2">
            <FAQFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={handleCategoryChange}
              locale={locale}
            />
          </div>
          <div className="h-8 w-px bg-border" />
          <input
            type="text"
            placeholder={locale.searchPlaceholder || 'Search questions...'}
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1 px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-muted-foreground">
        {locale.showing || 'Showing'} {filteredFAQs.length}{' '}
        {filteredFAQs.length === 1
          ? locale.question || 'question'
          : locale.questions || 'questions'}
      </div>

      {/* FAQ Grid */}
      {visibleFAQs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleFAQs.map(([id, item]) => (
              <FAQCard key={id} id={id} data={item} langName={langName} locale={locale} />
            ))}
          </div>
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="px-6 py-3 text-sm font-medium rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              >
                {locale.viewMore || 'Load More'} ({filteredFAQs.length - visibleCount} {locale.questions || 'remaining'})
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            {locale.noResults || 'No questions found matching your search.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setVisibleCount(PAGE_SIZE);
            }}
            className="mt-4 px-4 py-2 text-sm font-medium rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {locale.clearFilters || 'Clear Filters'}
          </button>
        </div>
      )}
    </div>
  );
}
