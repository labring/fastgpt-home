interface JsonLdProps {
  lang: string;
  path?: string;
  schema: JsonLdCopy;
}

type FAQSchemaItem = {
  question: string;
  answer: string;
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

type JsonLdCopy = {
  siteName: string;
  pageTitle: string;
  description: string;
  inLanguage: string;
  organizationName: string;
  applicationCategory: string;
  operatingSystem: string;
  offerDescription: string;
  authorName: string;
  breadcrumbHome: string;
  featureList: string[];
};

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function JsonLd({ lang, path = '', schema }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const pageUrl = `${baseUrl}/${lang}${path}`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: schema.organizationName,
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description: schema.description,
    sameAs: [
      'https://github.com/labring/FastGPT'
    ]
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: schema.siteName,
    url: baseUrl,
    description: schema.description,
    inLanguage: schema.inLanguage,
    publisher: {
      '@type': 'Organization',
      name: schema.organizationName
    }
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: schema.pageTitle,
    url: pageUrl,
    description: schema.description,
    inLanguage: schema.inLanguage,
    isPartOf: {
      '@type': 'WebSite',
      name: schema.siteName,
      url: baseUrl
    }
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: schema.siteName,
    applicationCategory: schema.applicationCategory,
    operatingSystem: schema.operatingSystem,
    url: baseUrl,
    description: schema.description,
    featureList: schema.featureList,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: schema.offerDescription
    },
    author: {
      '@type': 'Organization',
      name: schema.authorName
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: schema.breadcrumbHome,
        item: `${baseUrl}/${lang}`
      }
    ]
  };

  return (
    <>
      <JsonLdScript data={organizationSchema} />
      <JsonLdScript data={webSiteSchema} />
      <JsonLdScript data={webPageSchema} />
      <JsonLdScript data={softwareSchema} />
      <JsonLdScript data={breadcrumbSchema} />
    </>
  );
}

export function FAQJsonLd({ items }: { items: FAQSchemaItem[] }) {
  const visibleItems = items
    .filter((item) => item.question && item.answer)
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replace(/\s+/g, ' ').trim()
      }
    }));

  if (!visibleItems.length) return null;

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: visibleItems
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const listItems = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }));

  if (!listItems.length) return null;

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: listItems
      }}
    />
  );
}
