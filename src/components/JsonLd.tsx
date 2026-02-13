import { siteConfig, siteConfigZh } from '@/config/site';

interface JsonLdProps {
  lang: string;
  path?: string;
}

export default function JsonLd({ lang, path = '' }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const config = lang === 'zh' ? siteConfigZh : siteConfig;
  const pageUrl = `${baseUrl}/${lang}${path}`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FastGPT',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description: config.description,
    sameAs: [
      'https://github.com/labring/FastGPT'
    ]
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: baseUrl,
    description: config.description,
    inLanguage: lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'FastGPT'
    }
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.title,
    url: pageUrl,
    description: config.description,
    inLanguage: lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: config.name,
      url: baseUrl
    }
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FastGPT',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: baseUrl,
    description: config.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free open-source version available'
    },
    author: {
      '@type': 'Organization',
      name: 'labring'
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
