import Header from '@/components/header/Header';
import { siteConfig, siteConfigZh } from '@/config/site';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';
import { SiteConfig } from '@/types/siteConfig';

export default async function LangHome({ children, params: { lang } }: { children: React.ReactNode, params: { lang?: string } }) {
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <>
      <Header dict={dict} CTALocale={dict.CTAButton} />
      <main className="flex flex-col items-center mt-12 sm:mt-14 lg:mt-20">
        <div className="mx-4 sm:mx-6 md:mx-12 xl:mx-[60px] 2xl:max-w-7xl 2xl:mx-auto flex flex-col items-center margin-top-40">
          {children}
        </div>
      </main>
    </>
  );
}

export async function generateMetadata(
  { params: { lang } }: { params: { lang?: string } }
): Promise<SiteConfig> {
  const langName = lang || defaultLocale;
  return langName === 'zh' ? siteConfigZh : siteConfig;
}
