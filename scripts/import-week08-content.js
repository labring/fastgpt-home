#!/usr/bin/env node
/** Import the bounded Week08 delivery into authored content and existing discovery data. */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { buildSearchProjection, validateIdentitySet } = require('./import-technical-content');
const { applyRollbackProjection } = require('./lib/technical-projection');
const snapshot = require('../src/content/week08/reference-snapshot.json');
const corrections = require('../src/content/week08/publication-corrections.json');
const ROOT = path.resolve(__dirname, '..');
const DATE = '2026-09-08';
const STAGES = {
  zh: {
    'container-orchestration-issues': 146,
    'database-storage-issues': 73,
    'image-architecture-issues': 60,
    'model-serving-issues': 68,
    'version-upgrade-issues': 100
  },
  en: {
    'api-authentication-issues': 33,
    'environment-configuration-issues': 125,
    'model-serving-issues': 41,
    'upgrade-migration-issues': 114,
    'workflow-node-issues': 37
  }
};
const GUIDES = {
  'deployment-form-selection': [
    'decision',
    'FastGPT Deployment: Cloud, Self-Hosting or Private Setup',
    'Compare FastGPT cloud, community self-hosting and commercial private deployment across operations, data boundaries, upgrades and migration costs.'
  ],
  'doc-parser-selection': [
    'decision',
    'FastGPT Document Parser Selection and Evaluation Guide',
    'Compare built-in, enhanced and external document parsing for FastGPT using file formats, image extraction, operating costs and migration criteria.'
  ],
  'kb-index-strategy-selection': [
    'decision',
    'FastGPT Knowledge Base Indexing and Retrieval Strategy',
    'Evaluate FastGPT chunking, enhanced indexes and multi-path retrieval using document structure, retrieval quality, operating costs and migration effort.'
  ],
  'permission-model-selection': [
    'decision',
    'FastGPT Permissions: Teams, Members and API Key Scope',
    'Define FastGPT permission boundaries for teams, members and API keys, with criteria for access control, administration, audits and migration planning.'
  ],
  'vector-store-selection': [
    'decision',
    'FastGPT Vector Store Selection and Migration Planning',
    'Compare FastGPT vector stores using deployment constraints, retrieval features, operational capacity and migration costs before changing production.'
  ],
  'workflow-vs-agent-selection': [
    'decision',
    'FastGPT Workflow and Agent Orchestration Decision Guide',
    'Compare FastGPT workflows and Agent orchestration using predictability, tool selection, debugging, governance and the cost of changing your approach.'
  ],
  'backup-restore-drill': [
    'implementation',
    'FastGPT Backup and Restore Drill Acceptance Checklist',
    'Plan a FastGPT restore drill that validates backup integrity, dependencies, business data, permissions and recovery objectives before an outage occurs.'
  ],
  'observability-baseline': [
    'implementation',
    'FastGPT Observability: Logs, Metrics and Alert Ownership',
    'Set a FastGPT observability baseline for logs, metrics and alerts, with clear ownership, deployment checks, response thresholds and acceptance criteria.'
  ],
  'version-upgrade-decision': [
    'implementation',
    'FastGPT Upgrade Cadence and Rollback Readiness Guide',
    'Plan FastGPT upgrade windows, version transitions, dependency checks and rollback readiness with practical acceptance criteria for private deployments.'
  ],
  'api-integration-acceptance': [
    'implementation',
    'FastGPT API Integration Acceptance and Error Handling',
    'Validate FastGPT API authentication, rate limits, error handling and regression coverage with an acceptance checklist for integration and operations teams.'
  ]
};
const REFERENCE_FILES = {
  'env-variables-reference': ['blob', 'projects/app/.env.template'],
  'error-codes-reference': ['tree', 'packages/global/common/error/code'],
  'workflow-nodes-reference': ['tree', 'packages/global/core/workflow/template/system']
};
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
function parseSource(source, label) {
  const normalized = source.replace(/\r\n?/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]+)$/);
  assert(match, `${label}: expected front matter and body`);
  const metadata = Object.fromEntries(
    match[1]
      .split('\n')
      .filter((line) => line.includes(':'))
      .map((line) => {
        const at = line.indexOf(':');
        return [line.slice(0, at).trim(), line.slice(at + 1).trim()];
      })
  );
  return { metadata, body: match[2].trim(), sourceHash: hash(normalized) };
}
function normalizePath(value, locale) {
  const route = value.replace(/^\/(zh|en)(?=\/)/, (prefix, language) => {
    assert.equal(language, locale, `Wrong delivery locale: ${value}`);
    return '';
  });
  assert(
    /^\/(guide|reference)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(route),
    `Invalid public path: ${value}`
  );
  return route;
}
function prepareBody(body, locale, slug) {
  for (const correction of corrections.filter(
    (item) => item.slug === slug && item.locale === locale
  )) {
    for (const { before, after } of correction.replacements) {
      assert(body.includes(before), `${locale}/${slug}: correction source changed: ${before}`);
      body = body.replaceAll(before, after);
    }
    const sourceLabels = {
      4162: 'FastGPT 4.16.2 migration instructions',
      4160: 'FastGPT 4.16.0 Agent Sandbox migration',
      'upgrade-instruction': 'FastGPT upgrade procedure',
      'useSystemStore.ts': 'FastGPT GitHub star request configuration',
      'http468.ts': 'FastGPT workflow HTTP certificate verification',
      common: 'FastGPT Agent Sandbox Proxy health check',
      env: 'FastGPT deployment environment variables'
    };
    const citations = correction.sources
      .map((url) => `- [${sourceLabels[url.split('/').at(-1)]}](${url})`)
      .join('\n');
    body = body.replace(/^(## (?:References|参考资料))$/m, `$1\n\n${citations}`);
  }
  body = body
    .split('\n')
    .filter((line) => !/^>.*(?:核验日|verified|Verified)/.test(line))
    .join('\n')
    .replace(/(?:，|。)?核验日 2026-09-07。/g, '。')
    .replace(/\s*Verified 2026-09-07\./g, '')
    .replace(/本轮未建清单/g, '[搜索技术中心](/tech-center)')
    .replace(/no list in this round/g, '[Search Technical Center](/tech-center)')
    .replace(/&rarr;/g, '→');
  // Conversion labels retain their wording; the renderer uses the shared instrumented entries.
  body = body.replace(
    /^- (商务咨询|立即开始|定价|Contact sales|Get started|Pricing)([：:])\s*(.+)$/gm,
    (_, label, separator, description) => {
      const target = /商务咨询|Contact sales/.test(label)
        ? '/contact'
        : /立即开始|Get started/.test(label)
        ? '/start'
        : '/price';
      return `- [${label}](${target})${separator} ${description}`;
    }
  );
  if (REFERENCE_FILES[slug]) {
    const [kind, file] = REFERENCE_FILES[slug];
    const url = `https://github.com/labring/FastGPT/${kind}/${snapshot.commit}/${file}`;
    const context =
      locale === 'zh'
        ? `本表对应 FastGPT 开发分支快照 ${snapshot.commit.slice(
            0,
            7
          )}（2026-09-07）。开发分支包含尚未进入正式版本的能力；部署时请核对所用版本。`
        : `This table describes FastGPT development snapshot ${snapshot.commit.slice(
            0,
            7
          )} (2026-09-07). Development definitions can precede a stable release; check the version you deploy.`;
    body = body.replace(/^(# [^\n]+)\n/, `$1\n\n${context}\n`);
    body += `\n\n## ${locale === 'zh' ? '参考资料' : 'References'}\n\n- [FastGPT ${slug.replace(
      /-/g,
      ' '
    )} — ${snapshot.commit.slice(0, 7)}](${url})\n`;
    if (slug === 'env-variables-reference') {
      body = body.replace(
        /(\| `DEFAULT_ROOT_PSW` \|) `[^`]*`/,
        `$1 ${
          locale === 'zh' ? '示例值（部署时必须改）' : 'Example value (replace before deployment)'
        }`
      );
    }
    if (slug === 'error-codes-reference') {
      body = body
        .replace(/123/g, '124')
        .replace(/14 个模块/g, '15 个模块')
        .replace(/14 modules/g, '15 modules');
      const heading =
        locale === 'zh'
          ? 'model 模块（1 条 · 基码段位 513000）'
          : 'model module (1 code, base band 513000)';
      const table = `## ${heading}\n\n| Code | statusText | Message key |\n| --- | --- | --- |\n| \`513000\` | \`modelUnExist\` | \`common:model_not_exist\` |\n\n`;
      body = body.replace(
        /^## (什么情况下这张表会过期|When this table goes out of date)/m,
        `${table}## $1`
      );
      body = body
        .replace(
          /stable across versions, use it for programmatic checks/g,
          'preferred for programmatic checks; verify identifier compatibility when upgrading'
        )
        .replace(/跨版本稳定/g, '升级时需核对兼容性');
    }
    if (slug === 'workflow-nodes-reference') {
      body = body
        .replace(/stable across versions/g, 'check compatibility when upgrading')
        .replace(/跨版本稳定/g, '升级时需核对兼容性');
      body = body
        .replace(/32/g, '34')
        .replace(/29/g, '33')
        .replace(/remaining 24/g, 'remaining 25')
        .replace(/其余 24/g, '其余 25')
        .replace(/Only 8 of/g, 'Only 9 of')
        .replace(/只有 8/g, '只有 9')
        .replace(/仅 8/g, '仅 9')
        .replace(/Tools \(8 nodes\)/g, 'Tools (10 nodes)')
        .replace(/工具（8 个节点）/g, '工具（10 个节点）');
      body = body
        .split('\n')
        .map((line) => {
          const cells = line.split('|');
          if (cells.length !== 8) return line;
          const type = cells[1].trim().replace(/`/g, '');
          const node = snapshot.nodes.find((node) => node.type === type);
          if (!node) return line;
          cells[4] = ` ${node.inputs} / ${node.required} `;
          cells[5] = ` ${node.outputs} `;
          return cells.join('|');
        })
        .join('\n');
      const rows = `| \`readFiles\` | ${locale === 'zh' ? '读取文件' : 'Read files'} | ${
        locale === 'zh' ? '是' : 'Yes'
      } | 1 / 1 | 3 | — |\n| \`variableUpdate\` | ${
        locale === 'zh' ? '更新变量' : 'Update variables'
      } | ${locale === 'zh' ? '是' : 'Yes'} | 1 / 0 | 0 | — |\n\n`;
      body = body.replace(/\n\n## (System input|系统输入)/m, `\n${rows}## $1`);
      body = body.replace(
        /(\| `toolCall` \|[^\n]+\| `4\.9\.2`[^\n]*\n)/,
        '$1| `readFiles` | Read files | `4.9.2` | — |\n'
      );
      body +=
        locale === 'zh'
          ? '\n## 参数统计口径\n\n参数数量按快照内节点定义的数组项统计，包含共享参数模板；必填数量统计本定义直接声明的 required 标志，共享模板与运行时条件还会影响实际必填项。\n'
          : '\n## Parameter counting\n\nParameter totals count array entries in each node definition, including shared templates. Required totals count flags declared directly in that definition; shared templates and runtime conditions can add required fields.\n';
    }
  }
  if (REFERENCE_FILES[slug]) {
    body = body
      .replace(
        /`statusText` is the stable identifier and is more reliable than `code` across versions/g,
        '`statusText` is preferred for programmatic checks; validate its compatibility against the target version'
      )
      .replace(
        /`statusText` 是稳定标识，跨版本比 `code` 更可靠/g,
        '`statusText` 更适合程序判断，升级时应核对目标版本的标识兼容性'
      )
      .replace(
        /which remains stable across versions/g,
        'whose compatibility must be checked when upgrading'
      )
      .replace(/stable across versions/g, 'check compatibility when upgrading')
      .replace(
        /Node type identifiers are stable, names can change/g,
        'Check node identifier and name compatibility when upgrading'
      )
      .replace(/节点类型标识是稳定的/g, '节点类型标识的兼容性应在升级时核对')
      .replace(/跨版本保持稳定/g, '升级时需核对兼容性');
    body = body.replace(
      /`(\/guide\/build\/workflow\/nodes\/[^`]+)`/g,
      (_, route) =>
        `[${locale === 'zh' ? '节点文档' : 'Node documentation'}](https://doc.fastgpt.${
          locale === 'zh' ? 'cn/zh-CN' : 'io/en'
        }${route})`
    );
  }
  // Normalize links to an explicit content locale; rendering applies Site Variant ownership.
  return (
    body
      .replace(
        /\]\(\/(?:zh\/|en\/)?([^)#]+)(#[^)]*)?\)/g,
        (_, target, fragment = '') => `](/${locale}/${target}${fragment})`
      )
      .replace(/\n{3,}/g, '\n\n')
      .trim() + '\n'
  );
}
function guideDocument(page) {
  const { locale, slug, metadata, body } = page;
  const spec = GUIDES[slug];
  const canonical = `https://fastgpt.${locale === 'zh' ? 'cn' : 'io'}/guide/${slug}`;
  const h1 = body.match(/^# (.+)$/m)?.[1];
  assert(h1, `${slug}: missing H1`);
  const title = locale === 'en' ? spec[1] : metadata.meta_title || metadata.title;
  const description = locale === 'en' ? spec[2] : metadata.meta_description;
  if (locale === 'en') {
    assert(title.length >= 50 && title.length <= 60, `${slug}: title length ${title.length}`);
    assert(
      description.length >= 140 && description.length <= 160,
      `${slug}: description length ${description.length}`
    );
  }
  const hreflang = `${
    locale === 'zh' ? 'zh-CN' : 'en'
  } | zh-CN → https://fastgpt.cn/guide/${slug} | en → https://fastgpt.io/guide/${slug} | x-default → https://fastgpt.io/guide/${slug}`;
  const keywords = metadata.keywords || slug.replace(/-/g, ' ');
  const image = 'Text and accessible tables; no image is required for this release.';
  const comment = `<!--\nslug: ${slug}\ncanonical: ${canonical}\nhreflang: ${hreflang}\nMeta title: ${title}\nMeta description: ${description}\nkeywords: ${keywords}\n结构化数据: Article + BreadcrumbList\n配图需求: ${image}\n内链: \nsource_file: ${page.source}\nsource_sha256: ${page.sourceHash}\nsource_verified: 2026-09-07\npublication_batch: Week08\n-->`;
  const document = `${comment}\n\n${body}`;
  return {
    document,
    snapshot: {
      sourceName: `${slug}.${locale}.md`,
      sourceSha256: hash(document),
      bodySha256: hash(`\n\n${body}`),
      h1,
      metaTitle: title,
      metaDescription: description,
      keywords,
      canonical,
      hreflang,
      schemaTokens: ['Article', 'BreadcrumbList'],
      sourceSchema: 'Article + BreadcrumbList',
      sourceImageDirective: image,
      sourceInternalLinkLabels: [''],
      assetPolicy: { status: 'source-exception' },
      configuredInternalLinks: [],
      datePublished: DATE,
      dateModified: DATE
    }
  };
}
function technicalDocument(page) {
  const { locale, slug, route, body, metadata } = page;
  const title = body.match(/^# (.+)$/m)?.[1];
  assert(title, `${slug}: missing H1`);
  const category = route.startsWith('/reference/') ? 'reference' : 'troubleshoot';
  const categoryLabel = category === 'reference' ? '技术速查' : '故障排查';
  const summary =
    metadata.meta_description
      ?.replace(/\s*Verified[^.]+\./g, '')
      .replace(/123/g, '124')
      .replace(/32/g, '34') ||
    (locale === 'zh'
      ? `查阅${title.replace(
          /^FastGPT\s*/,
          ''
        )}，按症状与技术对象定位相关配置、排查步骤和已发布文档，结合版本边界确认适用条件。`
      : `Explore ${title.replace(
          /^FastGPT\s*/,
          ''
        )} with symptom-based checks, published article links and practical guidance for troubleshooting your deployment.`);
  const source = REFERENCE_FILES[slug]
    ? `https://github.com/labring/FastGPT/${REFERENCE_FILES[slug][0]}/${snapshot.commit}/${REFERENCE_FILES[slug][1]}`
    : 'https://github.com/labring/FastGPT';
  const projection = {
    title,
    slug: `/${locale}${route}`,
    category,
    categoryLabel,
    source,
    sourceType: '官方文档',
    summary,
    minutes: Math.max(1, Math.ceil(body.length / 500))
  };
  const fields = {
    title,
    slug: projection.slug,
    page_type: metadata.page_type,
    source,
    source_type: projection.sourceType,
    meta_title: `${title}${locale === 'zh' ? '｜FastGPT 技术中心' : ' | FastGPT Technical Center'}`,
    meta_description: summary,
    schema_type: 'TechArticle',
    date_published: DATE,
    date_modified: DATE,
    source_file: page.source,
    source_sha256: page.sourceHash,
    source_verified: '2026-09-07',
    publication_batch: 'Week08'
  };
  return {
    projection,
    document: `---\n${Object.entries(fields)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')}\n---\n\n${body}`
  };
}
function buildImport(sourceRoot, repoRoot = ROOT) {
  const pages = [];
  for (const locale of ['zh', 'en']) {
    const programmatic = path.join(
      sourceRoot,
      '程序化技术页-第6批',
      locale === 'zh' ? '中文-fastgpt.cn' : '英文-fastgpt.io'
    );
    const deep = path.join(sourceRoot, locale === 'zh' ? '深度内容-第6批' : '深度内容-英文版');
    const files = [
      ...['guide', 'reference'].flatMap((section) =>
        fs
          .readdirSync(path.join(programmatic, section))
          .filter((file) => file.endsWith('.md'))
          .map((file) => path.join(programmatic, section, file))
      ),
      ...fs
        .readdirSync(deep)
        .filter((file) => file.endsWith('.md'))
        .map((file) => path.join(deep, file))
    ].sort();
    for (const file of files) {
      const source = path.relative(sourceRoot, file);
      const parsed = parseSource(fs.readFileSync(file, 'utf8'), source);
      const route = normalizePath(parsed.metadata.slug, locale);
      const slug = route.split('/').at(-1);
      const family = GUIDES[slug] ? 'guide' : 'technical';
      assert(
        GUIDES[slug] ||
          STAGES[locale][slug] ||
          slug === 'deployment-issue-landscape' ||
          REFERENCE_FILES[slug],
        `Unexpected incoming page: ${locale}${route}`
      );
      pages.push({
        ...parsed,
        locale,
        route,
        slug,
        family,
        source,
        body: prepareBody(parsed.body, locale, slug)
      });
    }
  }
  validateIdentitySet(pages.map((page) => ({ locale: page.locale, canonicalPath: page.route })));
  assert.equal(pages.length, 38);
  assert.equal(pages.filter((page) => page.family === 'guide').length, 20);
  const entries = readJson(path.join(repoRoot, 'src/components/tech-center/entries.json'));
  const entriesBySlug = new Map(entries.map((entry) => [entry.slug, entry]));
  const returns = {};
  const preserved = {};
  for (const page of pages.filter((page) => STAGES[page.locale][page.slug])) {
    const links = [...page.body.matchAll(/^\| \[[^\]]+\]\((\/[^)]+)\) \|/gm)].map(
      (match) => match[1]
    );
    assert.equal(links.length, STAGES[page.locale][page.slug], `${page.slug}: stage cardinality`);
    for (const source of links) {
      assert(entriesBySlug.has(source), `Unresolved return source: ${source}`);
      assert(!returns[source], `Duplicate return source: ${source}`);
      returns[source] = `/${page.locale}${page.route}`;
      let file = `src/content/tech-center${source}.md`;
      if (!fs.existsSync(path.join(repoRoot, file)) && page.locale === 'zh')
        file = file.replace('/tech-center/zh/', '/tech-center/');
      preserved[source] = { file, sha256: hash(fs.readFileSync(path.join(repoRoot, file))) };
    }
  }
  assert.equal(Object.keys(returns).length, 797);
  const guideRegistry = readJson(path.join(repoRoot, 'src/content/guides/registry.json'));
  const files = new Map();
  const newGuides = new Map();
  const newTechnical = [];
  for (const page of pages) {
    const key = `/${page.locale}${page.route}`;
    if (page.family === 'guide') {
      assert(!entriesBySlug.has(key), `Conflicting technical owner: ${key}`);
      const { document, snapshot } = guideDocument(page);
      const entry = newGuides.get(page.slug) || { slug: page.slug, group: GUIDES[page.slug][0] };
      entry[page.locale] = snapshot;
      newGuides.set(page.slug, entry);
      files.set(`src/content/guides/${page.locale}/${snapshot.sourceName}`, document);
    } else {
      assert(
        !guideRegistry.entries.some((entry) => `/guide/${entry.slug}` === page.route),
        `Conflicting Guide owner: ${key}`
      );
      const { projection, document } = technicalDocument(page);
      newTechnical.push(projection);
      files.set(`src/content/tech-center/${page.locale}${page.route}.md`, document);
    }
  }
  const nextGuides = {
    ...guideRegistry,
    entries: [
      ...guideRegistry.entries.filter((entry) => !newGuides.has(entry.slug)),
      ...newGuides.values()
    ]
  };
  const newKeys = new Set(newTechnical.map((entry) => entry.slug));
  const nextTechnical = [...newTechnical, ...entries.filter((entry) => !newKeys.has(entry.slug))];
  files.set('src/content/guides/registry.json', json(nextGuides));
  files.set(
    'src/content/guides/policy.json',
    fs
      .readFileSync(path.join(repoRoot, 'src/content/guides/policy.json'), 'utf8')
      .replace(/"entryCount":\s*\d+/, `"entryCount": ${nextGuides.entries.length}`)
  );
  files.set('src/components/tech-center/entries.json', json(nextTechnical));
  const search = buildSearchProjection(nextTechnical);
  for (const locale of ['zh', 'en'])
    files.set(
      `public/tech-center/search-index${locale === 'en' ? '.en' : ''}.json`,
      json(search.filter((entry) => entry.locale === locale))
    );
  files.set('src/content/tech-center/stage-returns.json', json(returns));
  files.set(
    'src/content/week08/publication.json',
    json({
      date: DATE,
      pages: pages.map(({ locale, route, family, source, sourceHash }) => ({
        locale,
        route,
        family,
        source,
        sourceHash
      })),
      stages: STAGES,
      preserved
    })
  );
  return files;
}
function main(argv = process.argv.slice(2)) {
  const [sourceRoot, flag] = argv;
  assert(
    sourceRoot && (!flag || flag === '--check') && argv.length <= 2,
    'Usage: node scripts/import-week08-content.js <Week08 root> [--check]'
  );
  const files = buildImport(path.resolve(sourceRoot));
  if (flag === '--check') {
    for (const [file, content] of files)
      assert.equal(
        fs.readFileSync(path.join(ROOT, file), 'utf8'),
        content,
        `Week08 import drift: ${file}`
      );
  } else {
    applyRollbackProjection({
      files: [...files.keys()].map((file) => path.join(ROOT, file)),
      contents: [...files.values()]
    });
  }
  console.log(
    `[import-week08-content] ${
      flag ? 'checked' : 'imported'
    } 38 pages and 797 unique article returns`
  );
}
if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`[import-week08-content] ${error.message}`);
    process.exitCode = 1;
  }
}
module.exports = { buildImport, normalizePath, parseSource, prepareBody, STAGES };
