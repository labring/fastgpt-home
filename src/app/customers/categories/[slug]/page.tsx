import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePageContent } from '@/app/customers/page';
import { getCategories } from '@customers/lib/data';
import { absoluteUrl } from '@customers/lib/site-url';
import { buildCategoryJsonLd } from '@customers/lib/site-json-ld';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

// 静态导出：从 JSON 枚举全部分类落地页 /customers/categories/{slug}
export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: '分类不存在 - FastGPT 客户案例中心',
      robots: {
        index: false,
        follow: false
      }
    };
  }

  return {
    title: `${category.name}解决方案 - FastGPT 客户案例中心`,
    description: `浏览 FastGPT ${category.name} 行业解决方案，了解企业级 AI 落地场景、价值数据、案例详情、免费 POC 验证路径与生产级交付方式。`,
    alternates: {
      canonical: absoluteUrl(`/categories/${category.slug}`)
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: `${category.name}解决方案 - FastGPT 客户案例中心`,
      description: `浏览 FastGPT ${category.name} 行业解决方案，了解企业级 AI 落地场景、价值数据、案例详情与免费 POC 验证路径。`,
      url: absoluteUrl(`/categories/${category.slug}`),
      siteName: 'FastGPT 客户案例中心',
      locale: 'zh_CN',
      type: 'website',
      images: [
        {
          url: absoluteUrl('/og-image.png'),
          width: 1200,
          height: 630,
          alt: `${category.name}解决方案`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name}解决方案 - FastGPT 客户案例中心`,
      description: `浏览 FastGPT ${category.name} 行业解决方案，了解企业级 AI 落地场景、价值数据、案例详情与免费 POC 验证路径。`,
      images: [absoluteUrl('/og-image.png')]
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <HomePageContent categorySlug={category.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildCategoryJsonLd(category)).replace(/</g, '\\u003c')
        }}
      />
    </>
  );
}
