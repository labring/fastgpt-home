'use client';

import { useState, useMemo } from 'react';
import FAQCard from './FAQCard';
import FAQFilter from './FAQFilter';

interface FAQItem {
  Category: string;
  Question: string;
  Answers: string;
  Title: string;
  Description: string;
  Keywords: string;
  URL: string;
  Url: string;
}

interface FAQListProps {
  faqData: Record<string, FAQItem>;
  locale: any;
  langName: string;
}

export default function FAQList({ faqData, locale, langName }: FAQListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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
    return Object.entries(faqData).filter(([, item]) => {
      const categoryMatch =
        selectedCategory === 'All' || item.Category === selectedCategory;

      const searchMatch =
        searchQuery === '' ||
        item.Question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Answers.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Category.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [faqData, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Combined Search Bar with Filter - Centered with max-width */}
      <div className="mb-6 flex justify-center">
        <div className="w-full max-w-[600px] flex items-center gap-0 rounded-lg bg-background dark:bg-background border border-input shadow-sm hover:shadow-md transition-shadow">
          {/* Category Filter Dropdown */}
          <div className="pl-3 py-2">
            <FAQFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              locale={locale}
            />
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border" />

          {/* Search Input */}
          <input
            type="text"
            placeholder={locale.searchPlaceholder || 'Search questions...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      {filteredFAQs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFAQs.map(([id, item]) => (
            <FAQCard key={id} id={id} data={item} langName={langName} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            {locale.noResults || 'No questions found matching your search.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
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
