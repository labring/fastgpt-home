import type { Metadata } from 'next';
import CustomersNavbar from './CustomersNavbar';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import { getDictionary } from '@/lib/i18n';
import { getSiteBaseUrl } from '@/lib/siteRouting';
import { absoluteUrl } from '@customers/lib/site-url';
import { buildSiteJsonLd } from '@customers/lib/site-json-ld';
import '@customers/styles/customers.css';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteBaseUrl('cn')),
  title: 'FastGPT 客户案例中心',
  description:
    '探索企业级 AI 解决方案。依托 FastGPT 强大的工作流引擎与知识库检索能力，我们为不同业务场景抽象出标准化、开箱即用的解决方案模板，助力企业快速落地。',
  alternates: { canonical: absoluteUrl('/') },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'FastGPT 客户案例中心',
    description:
      '探索企业级 AI 解决方案，了解行业场景、落地案例、免费 POC 验证路径与生产级交付方式。',
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
    title: 'FastGPT 客户案例中心',
    description:
      '探索企业级 AI 解决方案，了解行业场景、落地案例、免费 POC 验证路径与生产级交付方式。',
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
