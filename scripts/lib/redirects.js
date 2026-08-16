const fs = require('node:fs');
const path = require('node:path');
const { localeCodes } = require('./site-variant');

const EN_ROUTE_REGISTRY = path.join('src', 'faq', 'generated-en-route-registry.json');

function readObjectKeys(rootDir, relativePath, variableName) {
  const filePath = path.join(rootDir, relativePath);
  const source = fs.readFileSync(filePath, 'utf8');
  const ts = require('typescript');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== variableName) continue;
      let initializer = declaration.initializer;
      while (
        initializer &&
        (ts.isAsExpression(initializer) ||
          ts.isSatisfiesExpression(initializer) ||
          ts.isParenthesizedExpression(initializer))
      ) {
        initializer = initializer.expression;
      }
      if (!initializer || !ts.isObjectLiteralExpression(initializer)) {
        throw new Error(`${variableName} in ${relativePath} must be an object literal`);
      }

      return initializer.properties.map((property) => {
        if (!ts.isPropertyAssignment(property)) {
          throw new Error(`Unsupported property in ${variableName} from ${relativePath}`);
        }
        const { name } = property;
        if (ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isIdentifier(name)) {
          return name.text;
        }
        throw new Error(`Unsupported property name in ${relativePath}`);
      });
    }
  }

  throw new Error(`Missing ${variableName} in ${relativePath}`);
}

function getPublishedFaqIds(rootDir) {
  const registry = readRouteRegistry(rootDir);
  const english = registry.records.map((record) => record.canonicalSlug);
  const chinese = [
    ...new Set([
      ...readObjectKeys(rootDir, 'src/faq/zh.ts', 'faqZhLegacy'),
      ...readObjectKeys(rootDir, 'src/faq/w2.ts', 'faqW2Zh'),
      ...readObjectKeys(rootDir, 'src/faq/w3.ts', 'faqW3Zh')
    ])
  ];

  if (!english.length || !chinese.length) throw new Error('Published FAQ IDs must not be empty');
  if (new Set(english).size !== english.length) {
    throw new Error('Published English FAQ canonical slugs must be unique');
  }
  return { chinese, english };
}

function readRouteRegistry(rootDir) {
  const registryPath = path.join(rootDir, EN_ROUTE_REGISTRY);
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  if (!Array.isArray(registry.records) || !registry.records.length) {
    throw new Error('English FAQ route registry must contain records');
  }
  if (!Array.isArray(registry.collisionLedger)) {
    throw new Error('English FAQ route registry must contain a collision ledger');
  }
  return registry;
}

function getFaqRedirectProjection(rootDir) {
  const registry = readRouteRegistry(rootDir);
  const byCanonicalSlug = new Map();
  const byLegacySource = new Map();

  for (const record of registry.records) {
    if (!record.contentId || !record.canonicalSlug) {
      throw new Error('English FAQ route registry contains an incomplete record');
    }
    if (byCanonicalSlug.has(record.canonicalSlug)) {
      throw new Error(`Duplicate canonical FAQ slug: ${record.canonicalSlug}`);
    }
    byCanonicalSlug.set(record.canonicalSlug, record);
    if (!Array.isArray(record.legacySources) || !record.legacySources.length) {
      throw new Error(`FAQ registry record has no legacy source: ${record.contentId}`);
    }
    for (const sourceSlug of record.legacySources) {
      if (typeof sourceSlug !== 'string' || !sourceSlug) {
        throw new Error(`FAQ registry has an invalid legacy source: ${record.contentId}`);
      }
      const candidates = byLegacySource.get(sourceSlug) || [];
      candidates.push(record);
      byLegacySource.set(sourceSlug, candidates);
    }
  }

  const deniedSources = new Set(
    registry.records
      .filter((record) => record.collisionDisposition === 'no-redirect')
      .flatMap((record) => record.legacySources)
  );
  for (const ledgerEntry of registry.collisionLedger) {
    if (ledgerEntry.disposition !== 'no-redirect' || !ledgerEntry.sourceSlug) {
      throw new Error(`Collision ledger contains an invalid entry: ${ledgerEntry.sourceSlug || '<missing>'}`);
    }
    deniedSources.add(ledgerEntry.sourceSlug);
  }

  const eligible = [];
  for (const record of registry.records) {
    if (record.routeStatus !== 'repaired' || record.collisionDisposition !== 'none') continue;
    for (const sourceSlug of record.legacySources) {
      const candidates = byLegacySource.get(sourceSlug) || [];
      if (candidates.length !== 1 || candidates[0].contentId !== record.contentId) {
        throw new Error(
          `Ambiguous FAQ redirect source ${sourceSlug} (${candidates.map((candidate) => candidate.contentId).join(', ')})`
        );
      }
      if (deniedSources.has(sourceSlug)) {
        throw new Error(`Eligible FAQ redirect source is explicitly denied: ${sourceSlug}`);
      }
      if (!byCanonicalSlug.has(record.canonicalSlug)) {
        throw new Error(`Missing FAQ redirect target: ${record.canonicalSlug}`);
      }
      const targetOwner = byLegacySource.get(record.canonicalSlug);
      if (targetOwner && targetOwner[0].contentId !== record.contentId) {
        throw new Error(`FAQ redirect target points to a legacy alias: ${record.canonicalSlug}`);
      }
      eligible.push({
        contentId: record.contentId,
        sourceSlug,
        canonicalSlug: record.canonicalSlug
      });
    }
  }

  const eligibleTargets = new Map();
  for (const entry of eligible) {
    const targets = eligibleTargets.get(entry.canonicalSlug) || [];
    targets.push(entry);
    eligibleTargets.set(entry.canonicalSlug, targets);
  }
  for (const [canonicalSlug, entries] of eligibleTargets) {
    if (entries.length > 1) {
      throw new Error(
        `Many-to-one FAQ redirect candidates for ${canonicalSlug}: ${entries
          .map((entry) => entry.sourceSlug)
          .join(', ')}`
      );
    }
  }

  return {
    registry,
    byCanonicalSlug,
    byLegacySource,
    deniedSources,
    eligible
  };
}

function getTechPaths(rootDir) {
  return JSON.parse(
    fs.readFileSync(path.join(rootDir, 'src', 'components', 'tech-center', 'entries.json'), 'utf8')
  ).map((entry) => entry.slug);
}

function addRedirect(redirects, source, target) {
  const setRedirect = (sourcePath) => {
    const currentTarget = redirects.get(sourcePath);
    if (currentTarget && currentTarget !== target) {
      throw new Error(`Conflicting redirect source ${sourcePath}: ${currentTarget} vs ${target}`);
    }
    redirects.set(sourcePath, target);
  };
  setRedirect(source);
  if (source !== '/' && !source.endsWith('/')) setRedirect(`${source}/`);
}

function addFaqAliasRedirect(redirects, prefix, entry) {
  const target = `https://fastgpt.io/faq/${encodeURIComponent(entry.canonicalSlug)}`;
  const encodedSource = encodeURIComponent(entry.sourceSlug);
  const sourceVariants = new Set([encodedSource, entry.sourceSlug]);
  for (const sourceSlug of sourceVariants) {
    addRedirect(redirects, `${prefix}/${sourceSlug}`, target);
  }
}

function buildRedirects(rootDir) {
  const cnUrl = 'https://fastgpt.cn';
  const ioUrl = 'https://fastgpt.io';
  const { chinese: chineseFaqIds, english: englishFaqIds } = getPublishedFaqIds(rootDir);
  const faqProjection = getFaqRedirectProjection(rootDir);
  const compareSlugs = fs
    .readdirSync(path.join(rootDir, 'content', 'competitors', 'en'))
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
  const techPaths = getTechPaths(rootDir);
  const ioRedirects = new Map();
  const cnRedirects = new Map();

  for (const pagePath of ['', '/price']) {
    addRedirect(ioRedirects, `/zh${pagePath}`, `${cnUrl}${pagePath || '/'}`);
    addRedirect(cnRedirects, `/zh${pagePath}`, `${cnUrl}${pagePath || '/'}`);

    for (const locale of localeCodes.filter((locale) => locale !== 'zh')) {
      const source = `/${locale}${pagePath}`;
      const targetPath = locale === 'en' ? pagePath || '/' : `/${locale}${pagePath}`;
      addRedirect(cnRedirects, source, `${ioUrl}${targetPath}`);
      if (locale === 'en') addRedirect(ioRedirects, source, `${ioUrl}${targetPath}`);
    }
  }

  addRedirect(ioRedirects, '/zh/contact', `${cnUrl}/contact`);
  addRedirect(ioRedirects, '/en/contact', `${ioUrl}/contact`);
  addRedirect(cnRedirects, '/zh/contact', `${cnUrl}/contact`);
  addRedirect(cnRedirects, '/en/contact', `${ioUrl}/contact`);
  addRedirect(cnRedirects, '/zh-hant/contact', `${ioUrl}/zh-hant/contact`);

  addRedirect(ioRedirects, '/zh/enterprise', `${cnUrl}/`);
  addRedirect(cnRedirects, '/zh/enterprise', `${cnUrl}/`);

  for (const [sourcePrefix, targetUrl, ids, redirects] of [
    ['/zh/faq', cnUrl, chineseFaqIds, ioRedirects],
    ['/en/faq', ioUrl, englishFaqIds, ioRedirects],
    ['/zh/faq', cnUrl, chineseFaqIds, cnRedirects],
    ['/en/faq', ioUrl, englishFaqIds, cnRedirects]
  ]) {
    addRedirect(redirects, sourcePrefix, `${targetUrl}/faq`);
    for (const id of ids) {
      const encodedId = encodeURIComponent(id);
      const target = `${targetUrl}/faq/${encodedId}`;
      addRedirect(redirects, `${sourcePrefix}/${encodedId}`, target);
      if (encodedId !== id) addRedirect(redirects, `${sourcePrefix}/${id}`, target);
    }
  }

  for (const entry of faqProjection.eligible) {
    addFaqAliasRedirect(ioRedirects, '/faq', entry);
    addFaqAliasRedirect(ioRedirects, '/en/faq', entry);
    addFaqAliasRedirect(cnRedirects, '/en/faq', entry);
  }

  for (const [sourcePrefix, targetUrl, redirects] of [
    ['/zh/compare', cnUrl, ioRedirects],
    ['/en/compare', ioUrl, ioRedirects],
    ['/zh/compare', cnUrl, cnRedirects],
    ['/en/compare', ioUrl, cnRedirects]
  ]) {
    addRedirect(redirects, sourcePrefix, `${targetUrl}/compare`);
    for (const slug of compareSlugs) {
      addRedirect(redirects, `${sourcePrefix}/${slug}`, `${targetUrl}/compare/${slug}`);
    }
  }

  addRedirect(ioRedirects, '/zh/tech-center', `${cnUrl}/tech-center`);
  addRedirect(cnRedirects, '/zh/tech-center', `${cnUrl}/tech-center`);
  for (const techPath of techPaths) {
    const targetPath = techPath.replace(/^\/zh(?=\/)/, '');
    addRedirect(ioRedirects, techPath, `${cnUrl}${targetPath}`);
    addRedirect(cnRedirects, techPath, `${cnUrl}${targetPath}`);
  }

  return { cnRedirects, ioRedirects };
}

function writeCloudflareWorker(outDir, redirects, noindex) {
  const redirectEntries = JSON.stringify([...redirects]);
  const worker = `const redirects = new Map(${redirectEntries});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const target = redirects.get(url.pathname);
    if (target) {
      const redirectUrl = new URL(target);
      redirectUrl.search = url.search;
      return Response.redirect(redirectUrl, 301);
    }

    const response = await env.ASSETS.fetch(request);
    ${
      noindex
        ? `const headers = new Headers(response.headers);
    if ((headers.get('content-type') || '').includes('text/html')) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });`
        : 'return response;'
    }
  }
};
`;
  fs.writeFileSync(path.join(outDir, '_worker.js'), worker);
}

function writeNginxRedirectMap(nextDir, redirects) {
  const lines = ['map $uri $locale_redirect_target {', '  default "";'];
  const sourceGroups = new Map();
  for (const [source] of redirects) {
    const key = source.toLowerCase();
    const group = sourceGroups.get(key) || [];
    group.push(source);
    sourceGroups.set(key, group);
  }
  const caseSensitiveSources = new Set(
    [...sourceGroups.values()]
      .filter((sources) => new Set(sources).size > 1)
      .flat(),
  );
  const escapeRegex = (value) => value.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');

  for (const [source, target] of redirects) {
    const key = caseSensitiveSources.has(source)
      ? `~^${escapeRegex(source)}$`
      : `"${source}"`;
    lines.push(`  ${key} "${target}";`);
  }
  lines.push('}', '');
  fs.mkdirSync(nextDir, { recursive: true });
  fs.writeFileSync(path.join(nextDir, 'nginx-redirects.conf'), lines.join('\n'));
}

function parseNginxRedirectMap(content) {
  const literal = new Map(
    [...content.matchAll(/^  "([^"]+)" "([^"]+)";$/gm)].map((match) => [match[1], match[2]]),
  );
  const patterns = [...content.matchAll(/^  ~\^(.*)\$ "([^"]+)";$/gm)].map((match) => ({
    pattern: new RegExp(`^${match[1]}$`),
    target: match[2],
  }));

  return {
    get(source) {
      const literalTarget = literal.get(source);
      if (literalTarget !== undefined) return literalTarget;
      return patterns.find(({ pattern }) => pattern.test(source))?.target;
    },
    has(source) {
      return this.get(source) !== undefined;
    },
    get size() {
      return literal.size + patterns.length;
    },
  };
}

module.exports = {
  buildRedirects,
  getFaqRedirectProjection,
  getPublishedFaqIds,
  getTechPaths,
  parseNginxRedirectMap,
  writeCloudflareWorker,
  writeNginxRedirectMap
};
