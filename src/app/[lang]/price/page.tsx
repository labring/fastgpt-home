import PPlan from '@/components/price/PPlan';
import PTitle from '@/components/price/PTitle';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import { getAlternates, getRobotsPolicy, localeMap } from '@/lib/seo';
import { getBuildLocaleCodes } from '@/lib/siteRouting';
import Navbar from '@/components/home/Navbar';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import GradientBlobs from '@/components/home/GradientBlobs';
import FAQ from '@/components/home/FAQ';
import { Metadata } from 'next';
import { JsonLdScript } from '@/components/JsonLd';
import { PRICE_PLANS_CLOUD } from '@/config/price';
import { getOwnedLocaleUrl } from '@/lib/siteRouting';

// Offer prices mirror PRICE_PLANS_CLOUD (CNY, as rendered by PPlan); annual = monthly × 10 as in PPlan.
function getPricingOfferSchema(langName: string, title: string, description: string) {
  const plans = PRICE_PLANS_CLOUD[langName] || PRICE_PLANS_CLOUD.en;
  const pageUrl = getOwnedLocaleUrl(langName, '/price');
  const offers = plans
    .filter((plan) => typeof plan.price === 'number')
    .flatMap((plan) => {
      const monthly = plan.price as number;
      const base = {
        '@type': 'Offer',
        url: pageUrl,
        priceCurrency: 'CNY',
        availability: 'https://schema.org/InStock'
      };
      if (monthly === 0) return [{ ...base, name: plan.title, price: '0' }];
      return [
        {
          ...base,
          name: plan.title,
          price: String(monthly),
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: String(monthly),
            priceCurrency: 'CNY',
            unitCode: 'MON',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' }
          }
        },
        {
          ...base,
          name: plan.title,
          price: String(monthly * 10),
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: String(monthly * 10),
            priceCurrency: 'CNY',
            unitCode: 'ANN',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'ANN' }
          }
        }
      ];
    });

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FastGPT',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: pageUrl,
    description,
    headline: title,
    offers
  };
}

const titleMap: Record<string, string> = {
  zh: 'FastGPT 定价 - 选择适合你的方案',
  'zh-hant': 'FastGPT 定價 - 選擇適合你的方案',
  en: 'FastGPT Pricing - Choose Your Plan',
  ja: 'FastGPT 料金プラン - あなたに最適なプランを選択',
  ar: 'أسعار FastGPT - اختر الخطة المناسبة',
  vi: 'Bảng giá FastGPT - Chọn gói phù hợp',
  th: 'ราคา FastGPT - เลือกแพ็กเกจที่เหมาะกับคุณ',
  id: 'Harga FastGPT - Pilih paket yang sesuai',
  ms: 'Harga FastGPT - Pilih pelan yang sesuai'
};

const descMap: Record<string, string> = {
  zh: 'FastGPT 提供免费开源版和多种付费方案，满足个人开发者到企业级用户的不同需求。查看定价详情，选择最适合你的 AI Agent 构建方案。',
  'zh-hant':
    'FastGPT 提供免費開源版和多種付費方案，滿足個人開發者到企業級使用者的不同需求。查看定價詳情，選擇最適合你的 AI Agent 構建方案。',
  en: 'FastGPT offers a free open-source version and multiple paid plans for individual developers to enterprise users. View pricing details and choose the best AI Agent building plan.',
  ja: 'FastGPTは無料オープンソース版と複数の有料プランを提供し、個人開発者からエンタープライズユーザーまで対応します。料金詳細を確認して最適なプランを選択してください。',
  ar: 'يوفر FastGPT إصدارا مفتوح المصدر مجانيا وخططا مدفوعة متعددة للمطورين الأفراد وفرق المؤسسات. راجع تفاصيل الأسعار واختر الخطة الأنسب لبناء AI Agent.',
  vi: 'FastGPT cung cấp bản mã nguồn mở miễn phí và nhiều gói trả phí cho nhà phát triển cá nhân đến người dùng doanh nghiệp. Xem chi tiết giá và chọn phương án xây dựng AI Agent phù hợp.',
  th: 'FastGPT มีเวอร์ชันโอเพนซอร์สฟรีและแพ็กเกจแบบชำระเงินหลายระดับ สำหรับนักพัฒนาไปจนถึงองค์กร ดูรายละเอียดราคาและเลือกแผนสร้าง AI Agent ที่เหมาะสม',
  id: 'FastGPT menyediakan versi open-source gratis dan berbagai paket berbayar untuk pengembang individu hingga pengguna perusahaan. Lihat detail harga dan pilih paket AI Agent yang paling sesuai.',
  ms: 'FastGPT menyediakan versi sumber terbuka percuma dan pelbagai pelan berbayar untuk pembangun individu hingga pengguna perusahaan. Lihat butiran harga dan pilih pelan AI Agent yang paling sesuai.'
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const title = titleMap[langName] || titleMap.en;
  const description = descMap[langName] || descMap.en;
  return {
    title,
    description,
    alternates: getAlternates(langName, '/price'),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: localeMap[langName] || 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    },
    robots: getRobotsPolicy(!(lang && langName === defaultLocale))
  };
}

export default async function Index({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <div className="home overflow-x-hidden">
      <JsonLdScript
        data={getPricingOfferSchema(
          langName,
          titleMap[langName] || titleMap.en,
          descMap[langName] || descMap.en
        )}
      />
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} locale={langName} />

      <main className="pb-[80px] px-[16px] md:px-[32px] relative">
        <div className="pointer-events-none mx-auto relative container">
          <GradientBlobs />
        </div>

        <div
          className="w-full relative pt-[200px]"
          style={{ zIndex: 1, maxWidth: 1600, margin: '0 auto' }}
        >
          <PTitle locale={dict.Pricing} />

          <div className="mt-[120px]">
            <PPlan langName={langName} locale={dict.Pricing} />
          </div>

          <div className="mt-[120px]">
            <FAQ t={dict.Pricing.faq} />
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return getBuildLocaleCodes().map((lang) => ({ lang }));
}
