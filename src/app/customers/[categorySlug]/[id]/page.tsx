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

// Content is cached for five minutes. Visitor state remains in no-store client requests.
export const revalidate = 300;

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
