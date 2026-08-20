import { getCustomerByIdPublic, getRelatedCustomers } from '@/customers/lib/data';
import CustomerPageClient from './CustomerPageClient';
import CustomerReadableArticle from '@/customers/components/customer/CustomerReadableArticle';
import { absoluteUrl } from '@/customers/lib/site-url';
import { getCustomerPublicHref } from '@/customers/lib/customer-url';
import { buildCustomerJsonLd } from '@/customers/lib/customer-json-ld';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { withBasePath } from '@/customers/lib/base-path';

type CustomerPageProps = {
  params: Promise<{ id: string }>;
};

// 旧 id 直达路由仅做一次永久重定向，按 ISR 缓存以省去每次请求的 DB 查询。
export const revalidate = 300;

export type CustomerRouteParams = {
  id: string;
  categorySlug?: string;
};

export async function generateCustomerMetadata(params: CustomerRouteParams): Promise<Metadata> {
  const { id } = params;
  const customer = await getCustomerByIdPublic(id);

  if (!customer) {
    return {
      title: '客户案例不存在 - FastGPT 客户案例中心',
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const pageUrl = absoluteUrl(getCustomerPublicHref(customer));
  const imageUrl = customer.imageUrl?.startsWith('http')
    ? customer.imageUrl
    : absoluteUrl(customer.imageUrl || '/fastgpt.svg');

  // 回退链：metaTitle → 站点模板；metaDescription → description；publishedAt → createdAt
  const metaTitle = customer.metaTitle || `${customer.title} - FastGPT 客户案例中心`;
  const metaDescription = customer.metaDescription || customer.description;
  const publishedTime = customer.publishedAt || customer.createdAt;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: pageUrl
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: customer.title,
      description: metaDescription,
      url: pageUrl,
      siteName: 'FastGPT 客户案例中心',
      locale: 'zh_CN',
      type: 'article',
      publishedTime,
      modifiedTime: customer.updatedAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: customer.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: customer.title,
      description: metaDescription,
      images: [imageUrl]
    }
  };
}

export async function generateMetadata({ params }: CustomerPageProps): Promise<Metadata> {
  return generateCustomerMetadata(await params);
}

export async function renderCustomerPage(
  params: CustomerRouteParams,
  customer?: Awaited<ReturnType<typeof getCustomerByIdPublic>>
) {
  const { id } = params;
  const initialCustomer = customer ?? (await getCustomerByIdPublic(id));
  const relatedCustomers = initialCustomer ? await getRelatedCustomers(initialCustomer) : [];

  return (
    <>
      {initialCustomer && (
        <>
          <CustomerReadableArticle customer={initialCustomer} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildCustomerJsonLd(initialCustomer)).replace(/</g, '\\u003c')
            }}
          />
        </>
      )}
      <CustomerPageClient
        id={id}
        initialCustomer={initialCustomer}
        initialRelatedCustomers={relatedCustomers}
      />
    </>
  );
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { id } = await params;
  const customer = await getCustomerByIdPublic(id);

  if (!customer) {
    notFound();
  }

  permanentRedirect(withBasePath(getCustomerPublicHref(customer)));
}
