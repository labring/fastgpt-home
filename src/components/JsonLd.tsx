import { siteConfig, siteConfigZh, siteConfigJa } from '@/config/site';

interface JsonLdProps {
  lang: string;
  path?: string;
}

function getLangCode(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  if (lang === 'ja') return 'ja-JP';
  return 'en-US';
}

function getConfig(lang: string) {
  if (lang === 'zh') return siteConfigZh;
  if (lang === 'ja') return siteConfigJa;
  return siteConfig;
}

export default function JsonLd({ lang, path = '' }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const config = getConfig(lang);
  const pageUrl = path ? `${baseUrl}/${lang}${path}` : `${baseUrl}/${lang}`;
  const inLanguage = getLangCode(lang);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'FastGPT',
    alternateName: ['FastGPT AI', 'labring FastGPT'],
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.svg`,
      width: 200,
      height: 200
    },
    description: config.description,
    foundingDate: '2023',
    sameAs: [
      'https://github.com/labring/FastGPT',
      'https://twitter.com/fastgpt',
      'https://fastgpt.io',
      'https://fastgpt.cn'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'yujinlong@sealos.io',
      availableLanguage: ['English', 'Chinese']
    }
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: config.name,
    url: baseUrl,
    description: config.description,
    inLanguage: inLanguage,
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/en/faq?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}/#webpage`,
    name: config.title,
    url: pageUrl,
    description: config.description,
    inLanguage: inLanguage,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`
    },
    about: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`
    }
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${baseUrl}/#software`,
    name: 'FastGPT',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'AI Agent Builder',
    operatingSystem: 'Web, Linux, Docker',
    url: baseUrl,
    description: config.description,
    releaseNotes: 'https://github.com/labring/FastGPT/releases',
    softwareVersion: '4.x',
    license: 'https://github.com/labring/FastGPT/blob/main/LICENSE',
    featureList: [
      'RAG Knowledge Base',
      'AI Agent Builder',
      'Visual Workflow Orchestration',
      'MCP Tool Integration',
      'Multi-model Support',
      'API Integration',
      'Enterprise Knowledge Management',
      'Intelligent Customer Service'
    ],
    screenshot: `${baseUrl}/og.png`,
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free open-source self-hosted version',
        url: 'https://github.com/labring/FastGPT'
      },
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free cloud tier available',
        url: (process.env.NEXT_PUBLIC_USER_URL || 'https://cloud.fastgpt.io')
      }
    ],
    author: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'labring'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '500',
      bestRating: '5'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}

/**
 * FAQ page JSON-LD: FAQPage schema for FAQ list pages
 */
interface FaqListJsonLdProps {
  lang: string;
  items: Array<{ question: string; answer: string }>;
}

export function FaqListJsonLd({ lang, items }: FaqListJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${baseUrl}/${lang}/faq`,
    inLanguage: getLangCode(lang),
    mainEntity: items.slice(0, 20).map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
    />
  );
}

/**
 * FAQ detail page JSON-LD: single Q&A + BreadcrumbList
 */
interface FaqDetailJsonLdProps {
  lang: string;
  id: string;
  question: string;
  answer: string;
  category: string;
}

export function FaqDetailJsonLd({ lang, id, question, answer, category }: FaqDetailJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const pageUrl = `${baseUrl}/${lang}/faq/${id}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: pageUrl,
    inLanguage: getLangCode(lang),
    mainEntity: [
      {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${lang}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: `${baseUrl}/${lang}/faq`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category,
        item: `${baseUrl}/${lang}/faq`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: question,
        item: pageUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
