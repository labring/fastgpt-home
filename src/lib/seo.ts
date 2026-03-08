// SEO utility functions

/**
 * Generate structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate structured data for FAQ
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate structured data for Article
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FastGPT',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fastgpt.io/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

/**
 * Generate structured data for HowTo
 */
export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  steps: Array<{ name: string; text: string; image?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    image: howTo.image,
    totalTime: howTo.totalTime,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string, baseUrl?: string): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Generate alternate language links
 */
export function generateAlternateLinks(
  path: string,
  languages: string[] = ['en', 'zh', 'ja'],
  baseUrl?: string
) {
  const base = baseUrl || process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  
  return languages.map(lang => ({
    hreflang: lang,
    href: `${base}/${lang}${path}`,
  }));
}

/**
 * Optimize meta description
 * - Truncate to 155-160 characters
 * - Ensure it ends with a complete sentence
 */
export function optimizeMetaDescription(description: string, maxLength: number = 155): string {
  if (description.length <= maxLength) {
    return description;
  }

  // Try to cut at sentence boundary
  const truncated = description.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastExclamation = truncated.lastIndexOf('!');
  const lastQuestion = truncated.lastIndexOf('?');
  
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);
  
  if (lastSentenceEnd > maxLength * 0.7) {
    return description.substring(0, lastSentenceEnd + 1);
  }

  // If no good sentence boundary, cut at word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return description.substring(0, lastSpace) + '...';
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImageUrl(params: {
  title: string;
  description?: string;
  theme?: 'light' | 'dark';
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const searchParams = new URLSearchParams({
    title: params.title,
    ...(params.description && { description: params.description }),
    ...(params.theme && { theme: params.theme }),
  });

  return `${baseUrl}/api/og?${searchParams.toString()}`;
}

/**
 * Extract keywords from text
 */
export function extractKeywords(text: string, maxKeywords: number = 10): string[] {
  // Remove common stop words
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
  ]);

  // Tokenize and filter
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  // Count frequency
  const frequency = new Map<string, number>();
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });

  // Sort by frequency and return top keywords
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Validate and sanitize URL
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.toString();
  } catch {
    // If invalid URL, return empty string
    return '';
  }
}

/**
 * Generate sitemap entry
 */
export function generateSitemapEntry(params: {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: Record<string, string>;
}) {
  return {
    url: params.url,
    lastModified: params.lastModified || new Date(),
    changeFrequency: params.changeFrequency || 'weekly',
    priority: params.priority || 0.5,
    ...(params.alternates && {
      alternates: {
        languages: params.alternates,
      },
    }),
  };
}
