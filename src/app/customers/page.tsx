import { getCategories, getPublishedCustomersPage, getAllPublishedCustomerDirectoryEntries } from '@/customers/lib/data';
import { readSystemSettings } from '@/customers/lib/system-settings';
import { getCustomerPublicHref } from '@/customers/lib/customer-url';
import { withBasePath } from '@/customers/lib/base-path';
import { absoluteUrl } from '@/customers/lib/site-url';
import {
  buildHomeDirectoryJsonLd,
  formatCaseName,
  splitDirectoryEntries
} from '@/customers/lib/ai-readable-directory';
import HomeClient from './HomeClient';
import HomeChatbot from '@/customers/components/home/HomeChatbot';
import { readCachedGitHubStars } from '@/customers/lib/github-stats';

// The homepage depends on database-backed content and system settings.
// ISR（60s）避免构建时访问 MongoDB，同时让列表/目录/JSON-LD 不再是
// 每次请求全量查库；客户端挂载后仍会按访客 cookie 刷新点赞等个性化态。
export const revalidate = 60;

export async function HomePageContent({
  categorySlug,
  renderHomeDirectoryJsonLd = false
}: {
  categorySlug?: string;
  renderHomeDirectoryJsonLd?: boolean;
} = {}) {
  // 服务端只注入首屏列表，后续案例由客户端按需分页加载。
  const [initialCategories, initialCustomersPage, allPublished, settings] = await Promise.all([
    getCategories(),
    getPublishedCustomersPage({ category: categorySlug }),
    getAllPublishedCustomerDirectoryEntries(),
    readSystemSettings(),
  ]);
  const githubStars = readCachedGitHubStars();
  const initialCustomers = initialCustomersPage.customers;
  const { cases: allCases, customers: allCustomers } = splitDirectoryEntries(allPublished);
  const customersByCategory = new Map<string, typeof allCustomers>();
  for (const customer of allCustomers) {
    const list = customersByCategory.get(customer.categorySlug) || [];
    list.push(customer);
    customersByCategory.set(customer.categorySlug, list);
  }
  const knownCategorySlugs = new Set(initialCategories.map((category) => category.slug));
  const orphanCustomers = allCustomers.filter(
    (customer) => !knownCategorySlugs.has(customer.categorySlug)
  );
  const homeDirectoryJsonLd = buildHomeDirectoryJsonLd({
    cases: allCases,
    customers: allCustomers,
    absoluteUrlOf: (entry) => absoluteUrl(getCustomerPublicHref(entry))
  });
  const overviewStats = [
    { value: "100+", label: "行业定制模板" },
    { value: "20+", label: "垂直行业覆盖" },
    { value: "50W+", label: "全球注册用户" },
    { value: "500+", label: "合作服务企业" },
    { value: githubStars.value, label: "GitHub 星标", link: githubStars.link, live: true }
  ];

  return (
    <>
      <section className="sr-only" aria-label="FastGPT 客户案例中心 AI 可读目录">
        <h2>FastGPT 客户案例中心内容索引</h2>
        <p>
          FastGPT 客户案例中心展示企业如何基于 FastGPT 落地 AI 知识库、工作流、智能客服、报销审批、售前售后、数据查询等场景。
          你可以从行业分类进入对应方案，也可以点开每个方案详情页阅读业务挑战、落地架构、价值数据、真实使用场景和免费 POC 验证路径。
        </p>
        <h3>行业分类</h3>
        <ul>
          {initialCategories.map((category) => (
            <li key={category.id}>
              <a href={withBasePath(`/categories/${category.slug}`)}>{category.name}</a>
            </li>
          ))}
        </ul>
        {allCases.length > 0 && (
          <>
            <h3>客户案例</h3>
            <ul>
              {allCases.map((item) => (
                <li key={item.id}>
                  <a href={withBasePath(getCustomerPublicHref(item))}>{formatCaseName(item)}</a>
                  <p>
                    分类：{item.categoryName}。简介：{item.description}
                  </p>
                  <a href={withBasePath(`/customer/${item.slug || item.id}/markdown`)}>
                    纯文本版本
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
        <h3>客户案例目录</h3>
        {initialCategories.map((category) => {
          const categoryCustomers = customersByCategory.get(category.slug) || [];
          if (categoryCustomers.length === 0) {
            return null;
          }
          return (
            <section key={category.id} aria-label={category.name}>
              <h4>{category.name}</h4>
              <ul>
                {categoryCustomers.map((customer) => (
                  <li key={customer.id}>
                    <a href={withBasePath(getCustomerPublicHref(customer))}>{customer.title}</a>
                    <p>简介：{customer.description}</p>
                    <a href={withBasePath(`/customer/${customer.slug || customer.id}/markdown`)}>
                      纯文本版本
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {orphanCustomers.length > 0 && (
          <section aria-label="其他方案">
            <h4>其他方案</h4>
            <ul>
              {orphanCustomers.map((customer) => (
                <li key={customer.id}>
                  <a href={withBasePath(getCustomerPublicHref(customer))}>{customer.title}</a>
                  <p>简介：{customer.description}</p>
                  <a href={withBasePath(`/customer/${customer.slug || customer.id}/markdown`)}>
                    纯文本版本
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        <h3>预约联系</h3>
        <p>
          如需验证某个方案是否适合你的业务，可进入方案详情页申请免费 POC。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证，助力后续生产级交付。
        </p>
      </section>
      {renderHomeDirectoryJsonLd && homeDirectoryJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeDirectoryJsonLd).replace(/</g, '\\u003c')
          }}
        />
      )}
      <HomeClient
        initialCategories={initialCategories}
        initialCustomers={initialCustomers}
        initialPagination={initialCustomersPage.pagination}
        overviewStats={overviewStats}
        initialCategorySlug={categorySlug}
      />
      <HomeChatbot botSrc={settings.chatbot_src} />
    </>
  );
}

export default async function Home() {
  return <HomePageContent renderHomeDirectoryJsonLd />;
}
