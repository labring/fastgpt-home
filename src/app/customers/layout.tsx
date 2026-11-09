import type { Metadata } from 'next';
import CustomersNavbar from './CustomersNavbar';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import { getDictionary } from '@/lib/i18n';
import { getSiteBaseUrl } from '@/lib/siteRouting';
import { getAlternates } from '@/lib/seo';
import seoPageCopy from '@/lib/seoPageCopy.json';
import { absoluteUrl } from '@customers/lib/site-url';
import { buildSiteJsonLd } from '@customers/lib/site-json-ld';
import '@customers/styles/customers.css';

const pageCopy = seoPageCopy.customers;
const title = pageCopy.title;
const description = pageCopy.description;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteBaseUrl('cn')),
  title,
  description,
  alternates: getAlternates('zh', '/customers', ['zh']),
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: absoluteUrl('/'),
    siteName: 'FastGPT 客户案例中心',
    locale: 'zh_CN',
    type: 'website',
    images: [
      { url: absoluteUrl('/og-image.png'), width: 1200, height: 630, alt: 'FastGPT 客户案例中心' }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [absoluteUrl('/og-image.png')]
  }
};

export default async function CustomersLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const dict = await getDictionary('zh');
  const navLinks = dict.links.map((link: { label: string; href: string }) =>
    link.href.includes('fastgpt.cn/customers') ? { ...link, href: '/customers' } : link
  );

  return (
    <div className="customers-shell home min-h-screen flex flex-col">
      <HomeThemeFix />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSiteJsonLd()).replace(/</g, '\\u003c')
        }}
      />
      <CustomersNavbar links={navLinks} t={dict.Home.navCta} />
      <main className="flex-1">{children}</main>
      <Footer t={dict.Home.footer} locale="zh" />
    </div>
  );
}
