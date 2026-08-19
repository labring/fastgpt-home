/**
 * 案例/方案 SEO 一致性校验脚本（计划书阶段 4 两项验收）：
 *
 * 1) 数据级（全量 33 篇案例）：
 *    - slug 合法（/^[a-z0-9]+(?:-[a-z0-9]+)*$/）且全库唯一；
 *    - canonical 期望路径 = /customers/{分类slug}/{案例slug}，无 ObjectId 残留；
 *    - 封面（imageUrl）与发布时间（publishedAt）齐备。
 * 2) 页面级（抽样，已发布页面优先，默认 10 篇）：
 *    - canonical == og:url == 最终 URL（跟随重定向后），且与数据级期望一致；
 *    - hreflang 不输出（当前仅中文单语，输出为空且不报错）；
 *    - JSON-LD 可解析，TechArticle + BreadcrumbList 均存在，
 *      TechArticle 必填字段（headline/image/datePublished/dateModified/author/publisher/url）齐全，
 *      BreadcrumbList 为三级结构，url 与 canonical 一致。
 *
 * 用法：
 *   pnpm tsx scripts/verify-case-seo.ts                          # 默认抽样 10 篇，host 取 SITE_URL/HOST
 *   pnpm tsx scripts/verify-case-seo.ts --sample 3               # 抽样 3 篇
 *   pnpm tsx scripts/verify-case-seo.ts --host http://localhost:3000/customers
 *   pnpm tsx scripts/verify-case-seo.ts --host http://localhost:18080/customers \
 *     --canonical-host https://fastgpt.cn/customers
 */
import mongoose from 'mongoose';
import { loadEnvFile } from './lib/env';

loadEnvFile();

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const OBJECT_ID_PATTERN = /[a-f0-9]{24}/;

function parseArgs() {
  const args = process.argv.slice(2);
  let sample = 10;
  let host = process.env.SITE_URL || process.env.HOST || 'http://localhost:3000/customers';
  let canonicalHost = '';

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--sample') {
      sample = Math.max(1, Number.parseInt(args[index + 1] || '10', 10));
      index += 1;
    } else if (arg === '--host') {
      host = args[index + 1]?.replace(/\/+$/, '') || host;
      index += 1;
    } else if (arg === '--canonical-host') {
      canonicalHost = args[index + 1]?.replace(/\/+$/, '') || canonicalHost;
      index += 1;
    }
  }

  return { sample, host, canonicalHost: canonicalHost || host };
}

type SolutionRecord = {
  caseNo?: number;
  slug?: string;
  categoryId?: string;
  categorySlug?: string;
  categoryName?: string;
  title: string;
  contentType?: string;
  isPublished?: boolean;
  imageUrl?: string;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
};

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, '');
}

function extractAttribute(html: string, tagPattern: RegExp, attribute: string): string {
  const match = html.match(tagPattern);
  if (!match) {
    return '';
  }
  const attrMatch = match[0].match(new RegExp(`${attribute}="([^"]*)"`));
  return attrMatch ? attrMatch[1] : '';
}

async function verifyPage(
  record: SolutionRecord,
  host: string,
  canonicalHost: string
): Promise<{ ok: boolean; errors: string[]; detail: string }> {
  const errors: string[] = [];
  const expectedPath = `${new URL(canonicalHost).pathname.replace(/\/$/, '')}/${record.categorySlug}/${record.slug}`;
  const expectedCanonicalUrl = `${normalizeUrl(canonicalHost)}/${record.categorySlug}/${record.slug}`;
  const url = `${normalizeUrl(host)}/${record.categorySlug}/${record.slug}`;

  let response: Response;
  try {
    response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
  } catch (error) {
    return {
      ok: false,
      errors: [`抓取失败：${error instanceof Error ? error.message : String(error)}`],
      detail: `${record.title}（${url}）`
    };
  }

  const finalUrl = normalizeUrl(response.url);
  const html = await response.text();

  const canonical = normalizeUrl(extractAttribute(html, /<link rel="canonical"[^>]*>/, 'href'));
  const ogUrl = normalizeUrl(
    extractAttribute(html, /<meta property="og:url"[^>]*>/, 'content')
  );

  if (canonical !== expectedCanonicalUrl) {
    errors.push(`canonical(${canonical}) ≠ 预期 canonical(${expectedCanonicalUrl})`);
  }
  if (new URL(finalUrl).pathname !== expectedPath) {
    errors.push(`最终路径(${new URL(finalUrl).pathname}) ≠ 预期路径(${expectedPath})`);
  }
  if (ogUrl !== expectedCanonicalUrl) {
    errors.push(`og:url(${ogUrl}) ≠ 预期 canonical(${expectedCanonicalUrl})`);
  }
  if (html.includes('hreflang=')) {
    errors.push('页面输出了 hreflang（当前单语不应输出）');
  }

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const jsonLdNodes: Record<string, unknown>[] = [];
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block[1].replace(/\\u003c/g, '<'));
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      for (const node of nodes) {
        if (node && typeof node === 'object') {
          jsonLdNodes.push(node as Record<string, unknown>);
        }
      }
    } catch {
      errors.push('JSON-LD 无法解析（JSON.parse 失败）');
    }
  }

  const techArticle = jsonLdNodes.find((node) => node['@type'] === 'TechArticle');
  const breadcrumb = jsonLdNodes.find((node) => node['@type'] === 'BreadcrumbList');

  if (!techArticle) {
    errors.push('缺少 TechArticle');
  } else {
    for (const field of [
      'headline',
      'image',
      'datePublished',
      'dateModified',
      'url',
      'author',
      'publisher'
    ]) {
      if (!techArticle[field]) {
        errors.push(`TechArticle 缺少必填字段 ${field}`);
      }
    }
    if (techArticle.url && normalizeUrl(String(techArticle.url)) !== expectedCanonicalUrl) {
      errors.push(`TechArticle.url ≠ 预期 canonical`);
    }
    const author = techArticle.author as { name?: string } | undefined;
    if (!author?.name) {
      errors.push('TechArticle.author.name 缺失');
    }
  }

  if (!breadcrumb) {
    errors.push('缺少 BreadcrumbList');
  } else {
    const items = breadcrumb.itemListElement as Array<{ position?: number; item?: string }> | undefined;
    if (!Array.isArray(items) || items.length !== 3) {
      errors.push(`BreadcrumbList 应为 3 级，当前 ${items?.length ?? 0} 级`);
    } else {
      const positions = items.map((item) => item.position).join(',');
      if (positions !== '1,2,3') {
        errors.push(`BreadcrumbList position 应为 1,2,3，当前 ${positions}`);
      }
      if (normalizeUrl(items[2]?.item || '') !== expectedCanonicalUrl) {
        errors.push('BreadcrumbList 末级 item ≠ 预期 canonical');
      }
    }
  }

  return { ok: errors.length === 0, errors, detail: `${record.title}（${url}）` };
}

async function main() {
  const { sample, host, canonicalHost } = parseArgs();

  if (!process.env.MONGODB_URI) {
    console.error('[错误] 缺少 MONGODB_URI（请检查 .env）');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  const db = mongoose.connection.db!;
  const collection = db.collection('solutions');
  const categorySlugById = new Map<string, string>();
  const categoryRows = (await db
    .collection('categories')
    .find({})
    .project({ slug: 1 })
    .toArray()) as unknown as Array<{ _id: { toString(): string }; slug?: string }>;
  for (const category of categoryRows) {
    if (category.slug) {
      categorySlugById.set(category._id.toString(), category.slug);
    }
  }
  const all = (await collection
    .find({ deletedAt: null })
    .project({
      caseNo: 1,
      slug: 1,
      categoryId: 1,
      categorySlug: 1,
      categoryName: 1,
      title: 1,
      contentType: 1,
      isPublished: 1,
      imageUrl: 1,
      publishedAt: 1,
      updatedAt: 1
    })
    .toArray()) as unknown as SolutionRecord[];
  for (const record of all) {
    if (!record.categorySlug && record.categoryId) {
      record.categorySlug = categorySlugById.get(String(record.categoryId)) || '';
    }
  }

  const dataErrors: string[] = [];
  const slugCounts = new Map<string, number>();
  for (const record of all) {
    if (record.slug) {
      slugCounts.set(record.slug, (slugCounts.get(record.slug) || 0) + 1);
    }
  }

  const cases = all
    .filter((record) => record.contentType === 'case')
    .sort((a, b) => (a.caseNo || 0) - (b.caseNo || 0));

  for (const record of cases) {
    const tag = `案例 ${String(record.caseNo || '').padStart(2)} ${record.title}`;
    if (!record.slug) {
      dataErrors.push(`${tag}：缺 slug`);
    } else {
      if (!SLUG_PATTERN.test(record.slug)) {
        dataErrors.push(`${tag}：slug 不合法（${record.slug}）`);
      }
      if (slugCounts.get(record.slug) !== 1) {
        dataErrors.push(`${tag}：slug 重复（${record.slug}）`);
      }
    }
    if (!record.categorySlug) {
      dataErrors.push(`${tag}：缺分类 slug`);
    }
    if (record.slug && OBJECT_ID_PATTERN.test(record.slug)) {
      dataErrors.push(`${tag}：slug 疑似 ObjectId（${record.slug}）`);
    }
    if (!record.imageUrl) {
      dataErrors.push(`${tag}：缺封面 imageUrl`);
    }
    if (!record.publishedAt) {
      dataErrors.push(`${tag}：缺发布时间 publishedAt`);
    }
  }

  const publishedCases = cases.filter((record) => record.isPublished);
  const publishedOthers = all.filter(
    (record) => record.contentType !== 'case' && record.isPublished
  );
  const pageSamples = [...publishedCases, ...publishedOthers].slice(0, sample);

  console.log(`=== 数据级校验（案例 ${cases.length} 篇）===`);
  if (dataErrors.length === 0) {
    console.log(`通过：33 篇案例 slug 合法唯一、canonical 路径 = /customers/{分类}/{slug}、封面与发布时间齐备`);
  } else {
    for (const error of dataErrors) {
      console.log(`  [错误] ${error}`);
    }
  }

  console.log(
    `\n=== 页面级校验（抽样 ${pageSamples.length} 篇，host=${host}，canonical=${canonicalHost}）===`
  );
  const pageResults = [];
  for (const record of pageSamples) {
    const result = await verifyPage(record, host, canonicalHost);
    pageResults.push(result);
    if (result.ok) {
      console.log(`  通过：${result.detail}`);
    } else {
      for (const error of result.errors) {
        console.log(`  [错误] ${result.detail}：${error}`);
      }
    }
  }

  const pageOk = pageResults.filter((result) => result.ok).length;
  console.log(`\n页面级通过 ${pageOk}/${pageResults.length}`);

  await mongoose.disconnect();

  if (dataErrors.length > 0 || pageOk !== pageResults.length) {
    console.log('\n结果：不通过');
    process.exit(1);
  }
  console.log('\n结果：通过');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
