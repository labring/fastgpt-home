import { getCategories, getPublishedSolutionsPage, getAllPublishedSolutions } from '@/customers/lib/data';
import { readSystemSettings } from '@/customers/lib/system-settings';
import { getSolutionPublicHref } from '@/customers/lib/solution-url';
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
// Serving it dynamically avoids requiring MongoDB access during `next build`.
export const dynamic = 'force-dynamic';

export async function HomePageContent({
  categorySlug,
  renderHomeDirectoryJsonLd = false
}: {
  categorySlug?: string;
  renderHomeDirectoryJsonLd?: boolean;
} = {}) {
  // 服务端只注入首屏列表，后续案例由客户端按需分页加载。
  const [initialCategories, initialSolutionsPage, allPublished, settings] = await Promise.all([
    getCategories(),
    getPublishedSolutionsPage({ category: categorySlug }),
    getAllPublishedSolutions(),
    readSystemSettings(),
  ]);
  const githubStars = readCachedGitHubStars();
  const initialSolutions = initialSolutionsPage.solutions;
  const { cases: allCases, solutions: allSolutions } = splitDirectoryEntries(allPublished);
  const solutionsByCategory = new Map<string, typeof allSolutions>();
  for (const solution of allSolutions) {
    const list = solutionsByCategory.get(solution.categorySlug) || [];
    list.push(solution);
    solutionsByCategory.set(solution.categorySlug, list);
  }
  const knownCategorySlugs = new Set(initialCategories.map((category) => category.slug));
  const orphanSolutions = allSolutions.filter(
    (solution) => !knownCategorySlugs.has(solution.categorySlug)
  );
  const homeDirectoryJsonLd = buildHomeDirectoryJsonLd({
    cases: allCases,
    solutions: allSolutions,
    absoluteUrlOf: (entry) => absoluteUrl(getSolutionPublicHref(entry))
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
                  <a href={withBasePath(getSolutionPublicHref(item))}>{formatCaseName(item)}</a>
                  <p>
                    分类：{item.categoryName}。简介：{item.description}
                  </p>
                  <a href={withBasePath(`/solution/${item.slug || item.id}/markdown`)}>
                    纯文本版本
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
        <h3>解决方案目录</h3>
        {initialCategories.map((category) => {
          const categorySolutions = solutionsByCategory.get(category.slug) || [];
          if (categorySolutions.length === 0) {
            return null;
          }
          return (
            <section key={category.id} aria-label={category.name}>
              <h4>{category.name}</h4>
              <ul>
                {categorySolutions.map((solution) => (
                  <li key={solution.id}>
                    <a href={withBasePath(getSolutionPublicHref(solution))}>{solution.title}</a>
                    <p>简介：{solution.description}</p>
                    <a href={withBasePath(`/solution/${solution.slug || solution.id}/markdown`)}>
                      纯文本版本
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {orphanSolutions.length > 0 && (
          <section aria-label="其他方案">
            <h4>其他方案</h4>
            <ul>
              {orphanSolutions.map((solution) => (
                <li key={solution.id}>
                  <a href={withBasePath(getSolutionPublicHref(solution))}>{solution.title}</a>
                  <p>简介：{solution.description}</p>
                  <a href={withBasePath(`/solution/${solution.slug || solution.id}/markdown`)}>
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
        initialSolutions={initialSolutions}
        initialPagination={initialSolutionsPage.pagination}
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
