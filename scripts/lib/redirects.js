const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { localeCodes } = require('./site-variant');

function readObjectKeys(rootDir, relativePath, variableName) {
  const filePath = path.join(rootDir, relativePath);
  const source = fs.readFileSync(filePath, 'utf8');
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
  const english = readObjectKeys(rootDir, 'src/faq/en.ts', 'faq');
  const chinese = [
    ...new Set([
      ...readObjectKeys(rootDir, 'src/faq/zh.ts', 'faqZhLegacy'),
      ...readObjectKeys(rootDir, 'src/faq/w2.ts', 'faqW2Zh'),
      ...readObjectKeys(rootDir, 'src/faq/w3.ts', 'faqW3Zh')
    ])
  ];

  if (!english.length || !chinese.length) throw new Error('Published FAQ IDs must not be empty');
  return { chinese, english };
}

function getTechPaths(rootDir) {
  return JSON.parse(
    fs.readFileSync(path.join(rootDir, 'src', 'components', 'tech-center', 'entries.json'), 'utf8')
  ).map((entry) => entry.slug);
}

function addRedirect(redirects, source, target) {
  redirects.set(source, target);
  if (source !== '/' && !source.endsWith('/')) redirects.set(`${source}/`, target);
}

function buildRedirects(rootDir) {
  const cnUrl = 'https://fastgpt.cn';
  const ioUrl = 'https://fastgpt.io';
  const { chinese: chineseFaqIds, english: englishFaqIds } = getPublishedFaqIds(rootDir);
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
  for (const [source, target] of redirects) lines.push(`  "${source}" "${target}";`);
  lines.push('}', '');
  fs.mkdirSync(nextDir, { recursive: true });
  fs.writeFileSync(path.join(nextDir, 'nginx-redirects.conf'), lines.join('\n'));
}

module.exports = {
  buildRedirects,
  getPublishedFaqIds,
  getTechPaths,
  writeCloudflareWorker,
  writeNginxRedirectMap
};
