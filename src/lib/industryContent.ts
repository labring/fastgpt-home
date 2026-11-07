import 'server-only';

import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { isIndustryArea, type IndustryArea, type IndustrySummary } from '@/lib/industryListing';

import {
  currentSiteVariant,
  getDefaultLocaleForSiteVariant,
  getLocaleOwner,
  getReviewLocalePath,
  type SiteVariant
} from '@/lib/siteRouting';

export const INDUSTRY_LOCALES = ['zh', 'en'] as const;
export type IndustryLocale = (typeof INDUSTRY_LOCALES)[number];

const INDUSTRY_ROOT = path.join(process.cwd(), 'src', 'content', 'industry');
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MIN_BODY_CHARS = 500;

export type IndustryQualityIssue =
  | 'empty-body'
  | 'short-body'
  | 'placeholder-body'
  | 'broken-section'
  | 'cross-industry'
  | 'topic-mismatch'
  | 'duplicate-meta';

export type IndustryArticle = {
  locale: IndustryLocale;
  slug: string;
  title: string;
  pageType: string;
  area: IndustryArea;
  body: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  datePublished: string;
  dateModified: string;
  sourcePath: string;
  publishedLocales: IndustryLocale[];
  qualityIssues: IndustryQualityIssue[];
  indexable: boolean;
};

function fail(sourcePath: string, message: string): never {
  throw new Error(`Industry ${sourcePath}: ${message}`);
}

function parseFrontMatter(source: string, sourcePath: string) {
  const normalized = source.replace(/\r\n?/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n(?:\n)?/);
  if (!match) fail(sourcePath, 'expected a byte-zero front matter block');

  const metadata: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator <= 0) fail(sourcePath, `invalid front matter line: ${line}`);
    const field = line.slice(0, separator).trim();
    if (field === 'application_area' && Object.hasOwn(metadata, field)) {
      fail(sourcePath, 'duplicate application_area; declare exactly one primary area');
    }
    let value = line.slice(separator + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      try {
        const parsed: unknown = JSON.parse(value);
        if (typeof parsed !== 'string') fail(sourcePath, `invalid quoted value for ${field}`);
        value = parsed;
      } catch {
        fail(sourcePath, `invalid quoted value for ${field}`);
      }
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1).replaceAll("''", "'");
    }
    metadata[field] = value;
  }

  const body = normalized.slice(match[0].length).trim();
  if (!body) fail(sourcePath, 'missing body');
  if (/<!--[\s\S]*?-->/.test(body)) {
    fail(sourcePath, 'body contains an internal metadata comment');
  }
  if (
    /^(?:slug|page_type|meta_title|meta_description|date_published|date_modified|(?:source|publication|delivery|review|batch)_[\w-]+|schedule|sign[- ]?off)\s*:/im.test(
      body
    )
  ) {
    fail(sourcePath, 'body contains internal delivery metadata');
  }
  return { metadata, body };
}

function requireField(metadata: Record<string, string>, sourcePath: string, field: string) {
  const value = metadata[field]?.trim();
  if (!value) fail(sourcePath, `missing ${field}`);
  return value;
}

function normalizeSlug(value: string, locale: IndustryLocale, sourcePath: string) {
  const expectedPrefix = `/${locale}/industry/`;
  const ownerPrefix = '/industry/';
  const rawSlug = value.startsWith(expectedPrefix)
    ? value.slice(expectedPrefix.length)
    : value.startsWith(ownerPrefix)
    ? value.slice(ownerPrefix.length)
    : '';
  if (!rawSlug || !SLUG_PATTERN.test(rawSlug)) {
    fail(sourcePath, `invalid slug: ${value}`);
  }
  return rawSlug;
}

function validateDate(value: string, field: string, sourcePath: string) {
  if (!DATE_PATTERN.test(value)) fail(sourcePath, `invalid ${field}: ${value}`);
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    fail(sourcePath, `invalid ${field}: ${value}`);
  }
}

const TOPIC_TERMS: Partial<Record<IndustryArea, RegExp>> = {
  finance:
    /金融|保险|银行|证券|基金|信托|支付|投研|投资|理财|信贷|财务|会计|审计|KYC|资金|资产|风险|风控|合规|反洗钱|交易|清算|结算|贷款|存款|利率|额度|授信|账户|投顾|财富|经纪|承销|保荐|并购|财报|税务|客户|受益所有人|名单筛查|finance|financial|insurance|bank|securities|fund|trust|payment|investment|credit|accounting|audit|capital|asset|risk|compliance|transaction|loan|deposit|interest|account|tax|customer|beneficial owner|anti-money|list screening|identity/i,
  biomed:
    /医药|医疗|临床|药物|医院|生物|细胞|患者|诊断|基因|CAR-T|CDMO|CRO|疫苗|CMC|GMP|制药|pharma|clinical|biolog|cell|diagnos|vaccine/i,
  research:
    /政府|公共|政务|国央企|监管|政策|城市|热线|医保|部门|公民|档案|许可|制度|科研|研究|项目申报|研发|成果|伦理|期刊|同行评议|public|government|regulat|policy|research|project|archive|permit/i,
  manufacturing:
    /制造|生产|加工|设备|工厂|车间|机械|材料|船舶|铁路|轨道|钢铁|电网|电源|PCB|SMT|冶炼|化工|manufactur|production|equipment|factory|material|rail|steel|power grid|chemical/i,
  technology:
    /软件|互联网|系统|代码|数据|云|IT|技术|CDN|平台|应用|软件|Issue|API|software|internet|system|code|data|cloud|platform|application/i,
  retail:
    /零售|电商|门店|订单|商品|库存|消费|商城|商家|客户|Shopify|独立站|B2B|交易|售后|仓储|物流|retail|commerce|store|order|product|inventory|shop|merchant|logistics/i,
  education:
    /教育|学校|课程|教学|学生|教师|幼儿园|培训|招生|考试|校园|班级|教研|听评课|职业|学位|高校|心理|学业|毕业|课堂|教材|学员|家长|院校|校区|老师|作业|人才|技能|考务|高考|报名|录取|学术|实验室|儿童|科研|研究|项目申报|研发|成果|伦理|期刊|同行评议|办学|education|school|course|teaching|student|teacher|kindergarten|training|admission|exam|campus|class|curriculum|college|university|academic|laboratory|child|research|project|journal|enrollment|degree|assessment|learning|lesson|vocational|peer review|employment|graduate/i
};

const FINANCE_CROSS_INDUSTRY_TERMS =
  /教育服务|电网设备|专用设备|多应用路由|模型分配|用量统计|统一入口|education service|power grid|specialized equipment/i;

export function getIndustryQualityIssues(
  area: IndustryArea,
  title: string,
  body: string,
  metaDescription: string,
  metadata: Record<string, string>
): IndustryQualityIssue[] {
  const issues: IndustryQualityIssue[] = [];
  const text = `${title}\n${body}`;
  if (!body.trim()) issues.push('empty-body');
  else if (body.replace(/\s/g, '').length < MIN_BODY_CHARS) issues.push('short-body');
  if (/仅作参考；请以目标 FastGPT 发布版本与部署文档核验。/.test(body)) {
    issues.push('placeholder-body');
  }
  // article_section is optional reader navigation data; only the value steal is corrupted.
  if (metadata.article_section?.includes('is_part_of:')) {
    issues.push('broken-section');
  }
  if (area === 'finance' && FINANCE_CROSS_INDUSTRY_TERMS.test(text)) issues.push('cross-industry');
  if (!TOPIC_TERMS[area]?.test(text)) issues.push('topic-mismatch');
  if (
    metaDescription.trim() === title.trim() ||
    (metaDescription.trim().startsWith(title.trim()) && metaDescription.includes('涵盖'))
  ) {
    issues.push('duplicate-meta');
  }
  return issues;
}

function resolveApplicationArea(
  metadata: Record<string, string>,
  slug: string,
  sourcePath: string
): IndustryArea {
  const historicalArea = /^(?:finance|finace)-/.test(slug)
    ? 'finance'
    : slug.startsWith('biomed-')
    ? 'biomed'
    : undefined;
  const declaredArea = metadata.application_area;
  if (declaredArea !== undefined && !isIndustryArea(declaredArea)) {
    fail(
      sourcePath,
      `unknown application_area: ${declaredArea}; expected a supported application area`
    );
  }
  if (historicalArea && declaredArea && historicalArea !== declaredArea) {
    fail(
      sourcePath,
      `conflicting application_area: ${declaredArea}; ${slug} belongs to ${historicalArea}`
    );
  }
  const area = declaredArea || historicalArea;
  if (!area)
    fail(
      sourcePath,
      'missing application_area; expected finance, biomed, research, manufacturing, or technology'
    );
  return area;
}

function readLocaleArticles(locale: IndustryLocale): IndustryArticle[] {
  const localeRoot = path.resolve(INDUSTRY_ROOT, locale);
  if (!fs.existsSync(localeRoot)) return [];

  return fs
    .readdirSync(localeRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((entry) => {
      const sourcePath = path.join(localeRoot, entry.name);
      const { metadata, body } = parseFrontMatter(fs.readFileSync(sourcePath, 'utf8'), sourcePath);
      const title = requireField(metadata, sourcePath, 'title');
      const slug = normalizeSlug(requireField(metadata, sourcePath, 'slug'), locale, sourcePath);
      const pageType = requireField(metadata, sourcePath, 'page_type');
      const metaTitle = requireField(metadata, sourcePath, 'meta_title');
      const metaDescription = requireField(metadata, sourcePath, 'meta_description');
      const datePublished = requireField(metadata, sourcePath, 'date_published');
      const dateModified = requireField(metadata, sourcePath, 'date_modified');
      const h1 = body.match(/^#\s+(.+)$/m)?.[1]?.trim();
      if (h1 !== title) fail(sourcePath, 'title must match the first H1');
      validateDate(datePublished, 'date_published', sourcePath);
      validateDate(dateModified, 'date_modified', sourcePath);
      const area = resolveApplicationArea(metadata, slug, sourcePath);
      const qualityIssues = getIndustryQualityIssues(area, title, body, metaDescription, metadata);

      return {
        locale,
        slug,
        title,
        pageType,
        area,
        body,
        metaTitle,
        metaDescription,
        keywords: metadata.keywords
          ? metadata.keywords
              .split(',')
              .map((keyword) => keyword.trim())
              .filter(Boolean)
          : [],
        datePublished,
        dateModified,
        sourcePath,
        publishedLocales: [],
        qualityIssues,
        indexable: qualityIssues.length === 0
      };
    });
}

const loadedArticles = INDUSTRY_LOCALES.flatMap(readLocaleArticles);
const identities = new Map<string, IndustryArticle>();
for (const article of loadedArticles) {
  const identity = `${article.locale}|${article.slug}`;
  if (identities.has(identity)) fail(article.sourcePath, `duplicate slug: ${article.slug}`);
  identities.set(identity, article);
}

for (const article of loadedArticles) {
  article.publishedLocales = INDUSTRY_LOCALES.filter((locale) =>
    identities.has(`${locale}|${article.slug}`)
  );
}

export const industryArticles = loadedArticles;

const relatedGroups = new Map<
  string,
  { articles: IndustryArticle[]; positions: Map<string, number> }
>();
// Order each pool once for stable recommendations without per-page sorting.
for (const { article } of loadedArticles
  .map((article) => ({
    article,
    rank: createHash('sha256').update(article.slug).digest('hex')
  }))
  .sort(
    (left, right) =>
      left.rank.localeCompare(right.rank) || left.article.slug.localeCompare(right.article.slug)
  )) {
  const key = `${article.locale}|${article.area}`;
  const group = relatedGroups.get(key) || { articles: [], positions: new Map<string, number>() };
  group.positions.set(article.slug, group.articles.length);
  group.articles.push(article);
  relatedGroups.set(key, group);
}

export function getRelatedIndustryArticles(article: IndustryArticle): IndustryArticle[] {
  const group = relatedGroups.get(`${article.locale}|${article.area}`);
  const position = group?.positions.get(article.slug);
  if (!group || position === undefined) return [];
  const related: IndustryArticle[] = [];
  for (let index = 1; index < group.articles.length && related.length < 3; index++) {
    const candidate = group.articles[(position + index) % group.articles.length];
    if (candidate.indexable) related.push(candidate);
  }
  return related;
}

export function getIndustrySummaries(locale: IndustryLocale): IndustrySummary[] {
  return industryArticles
    .filter((article) => article.locale === locale && article.indexable)
    .map(({ slug, area, title, metaDescription }) => ({
      slug,
      area,
      title,
      description: metaDescription,
      href: getReviewLocalePath(locale, getIndustryPath(slug))
    }));
}

export function resolveIndustryLocale(locale: string): IndustryLocale | undefined {
  return INDUSTRY_LOCALES.includes(locale as IndustryLocale)
    ? (locale as IndustryLocale)
    : undefined;
}

export function getIndustryArticle(locale: IndustryLocale, slug: string) {
  return identities.get(`${locale}|${slug}`);
}

export function getIndustryArticleForRoot(slug: string, variant: SiteVariant = currentSiteVariant) {
  const preferredLocale = getDefaultLocaleForSiteVariant(variant);
  return (
    getIndustryArticle(preferredLocale as IndustryLocale, slug) ||
    industryArticles.find((article) => article.slug === slug)
  );
}

export function getIndustryReviewParams(variant: SiteVariant = currentSiteVariant) {
  if (variant !== 'preview') {
    const ownerArticle = industryArticles.find(
      (article) => getLocaleOwner(article.locale) === variant
    );
    return ownerArticle ? [{ lang: ownerArticle.locale, slug: ownerArticle.slug }] : [];
  }
  return industryArticles.map(({ locale, slug }) => ({ lang: locale, slug }));
}

export function getIndustryHubParams(variant: SiteVariant = currentSiteVariant) {
  if (variant === 'preview') return INDUSTRY_LOCALES.map((lang) => ({ lang }));
  const locale = resolveIndustryLocale(getDefaultLocaleForSiteVariant(variant));
  return locale ? [{ lang: locale }] : [];
}

export function getIndustryOwnerParams(variant: SiteVariant = currentSiteVariant) {
  if (variant === 'preview') {
    const placeholder = industryArticles[0]?.slug;
    return placeholder ? [{ slug: placeholder }] : [];
  }
  return [
    ...new Set(
      industryArticles
        .filter((article) => getLocaleOwner(article.locale) === variant)
        .map((article) => article.slug)
    )
  ].map((slug) => ({ slug }));
}

export function getIndustryPath(slug?: string) {
  return slug ? `/industry/${slug}` : '/industry';
}

export function getIndustrySitemapEntries(variant: SiteVariant = currentSiteVariant) {
  if (variant === 'preview') return [];
  return industryArticles
    .filter((article) => article.indexable && getLocaleOwner(article.locale) === variant)
    .map((article) => ({
      slug: article.slug,
      locale: article.locale,
      dateModified: article.dateModified
    }));
}
