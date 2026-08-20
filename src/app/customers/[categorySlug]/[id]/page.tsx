import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import {
  generateCustomerMetadata,
  renderCustomerPage,
  type CustomerRouteParams
} from '@/app/customers/customer/[id]/page';
import { getCustomerByIdPublic } from '@/customers/lib/data';
import { getCustomerPublicHref } from '@/customers/lib/customer-url';
import { isValidObjectId } from '@/customers/lib/object-id';
import { withBasePath } from '@/customers/lib/base-path';

type SemanticCustomerPageProps = {
  params: Promise<CustomerRouteParams>;
};

// 动态路由段无 generateStaticParams 时 revalidate 不生效（实测动态渲染），
// 显式声明动态；访客态（isLiked/hasViewed）由客户端 no-store 请求获取。
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: SemanticCustomerPageProps): Promise<Metadata> {
  return generateCustomerMetadata(await params);
}

export default async function SemanticCustomerPage({ params }: SemanticCustomerPageProps) {
  const routeParams = await params;
  const customer = await getCustomerByIdPublic(routeParams.id);

  if (!customer) {
    notFound();
  }

  if (isValidObjectId(routeParams.id) && customer.slug) {
    permanentRedirect(withBasePath(getCustomerPublicHref(customer)));
  }

  if (customer.slug && routeParams.id !== customer.slug) {
    permanentRedirect(withBasePath(getCustomerPublicHref(customer)));
  }

  if (customer.categorySlug !== routeParams.categorySlug) {
    permanentRedirect(withBasePath(getCustomerPublicHref(customer)));
  }

  return renderCustomerPage(routeParams, customer);
}
