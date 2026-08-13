const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = process.cwd();
const entries = JSON.parse(
  fs.readFileSync(path.join(root, 'src/components/tech-center/entries.json'), 'utf8')
);
const articles = [
  {
    slug: 'private-deployment-topology',
    metaTitle: '私有化部署企业知识库：拓扑与出站边界怎么定',
    metaDescription:
      '从组件拓扑、向量库选型、六类出站源三层说明私有化部署的数据边界到底由什么决定，给出哪些环节可换成内网组件、采购前应逐项确认的数据流清单，以及用威胁用例验证出站策略的方法。',
    bodyHash: 'bbe19649690dfdb48c8e6dc526a5461d2d2b00174b13ffd27373be107215969a'
  },
  {
    slug: 'self-hostable-platform-selection',
    metaTitle: '可私有化的开源 AI 应用平台：四个固定比较变量',
    metaDescription:
      '功能勾选表分不出高下，真正决定选型的是许可证边界、部署门槛、治理能力落在哪个版本、三年总成本这四个变量。本文给出各项核实方法、同条件验证前提，以及公开资料未列出为何不等于不支持。',
    bodyHash: 'abae263ab5871807f8999857d57647464085c043db5a4c76ef9278161022829c'
  },
  {
    slug: 'open-source-vs-commercial',
    metaTitle: '开源版与商业版差在哪：付费买到的功能与服务',
    metaDescription:
      '用官方「社区版镜像加商业版镜像」的口径说明付费买到的功能与服务分别是什么，给出私有部署三档的选型顺序、必选可选未来功能表模板，以及什么情况下现在还不该升级的判断依据。',
    bodyHash: '2b6c9e0bf4d0873b5ff6d3e54597fa2cf782e5496dfbbaa98deeb72987a931eb'
  },
  {
    slug: 'ai-support-build-or-buy',
    metaTitle: '企业上智能客服：自建开源方案还是买 SaaS 系统',
    metaDescription:
      '决定自建还是采购的不是预算，而是数据敏感度、是否要连业务系统、有没有长期运营负责人这三条依据。本文给出两种方案的成本结构对照、转人工条件设计、分流比例估算与上线后退化的三个原因。',
    bodyHash: 'aad8e37e4a5e2a2fe6b20c4c0703dc3b82fc31ff04b5c53cf34986182204a92d'
  }
];
const requiredMetadata = [
  'schema_type',
  'meta_title',
  'meta_description',
  'keywords',
  'date_published',
  'date_modified',
  'image',
  'image_alt',
  'image_width',
  'image_height'
];

function parseFrontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error('Missing front matter');

  return Object.fromEntries(
    match[1].split('\n').map((line) => {
      const separator = line.indexOf(':');
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    })
  );
}

function getBody(source) {
  const match = source.match(/^---\n[\s\S]*?\n---\n/);
  if (!match) throw new Error('Missing front matter');
  return source.slice(match[0].length).trim();
}

for (const article of articles) {
  const { slug } = article;
  const route = `/zh/tutorial/${slug}`;
  const matchingEntries = entries.filter((entry) => entry.slug === route);
  if (matchingEntries.length !== 1) throw new Error(`${route}: expected one index entry`);
  if (matchingEntries[0].sourceType !== '深度场景内容') {
    throw new Error(`${route}: invalid source type`);
  }

  const articlePath = path.join(root, `src/content/tech-center/tutorial/${slug}.md`);
  const source = fs.readFileSync(articlePath, 'utf8').replace(/\r\n?/g, '\n');
  const metadata = parseFrontMatter(source);

  for (const key of requiredMetadata) {
    if (!metadata[key]) throw new Error(`${route}: missing ${key}`);
  }
  if (metadata.slug !== route || metadata.schema_type !== 'Article') {
    throw new Error(`${route}: invalid route or schema type`);
  }
  if (metadata.date_published !== '2026-08-03' || metadata.date_modified !== '2026-08-13') {
    throw new Error(`${route}: invalid publication dates`);
  }
  if (
    metadata.meta_title !== article.metaTitle ||
    metadata.meta_description !== article.metaDescription
  ) {
    throw new Error(`${route}: publication metadata differs from approved copy`);
  }

  const body = getBody(source);
  const bodyHash = crypto.createHash('sha256').update(body).digest('hex');
  if (bodyHash !== article.bodyHash) {
    throw new Error(`${route}: published body differs from approved copy`);
  }

  const imagePath = path.join(root, 'public', metadata.image.replace(/^\//, ''));
  if (!fs.existsSync(imagePath)) throw new Error(`${route}: missing image`);
  const image = fs.readFileSync(imagePath);
  if (
    image.readUInt32BE(16) !== Number(metadata.image_width) ||
    image.readUInt32BE(20) !== Number(metadata.image_height) ||
    metadata.image_width !== '1200' ||
    metadata.image_height !== '630'
  ) {
    throw new Error(`${route}: invalid image dimensions`);
  }
  if (/交付元数据|客户 KB|签发:|配图需求:|事实来源|更新记录/.test(source)) {
    throw new Error(`${route}: contains internal publication metadata`);
  }

  for (const [, target] of source.matchAll(/\[[^\]]+\]\((\/zh\/[^)]+)\)/g)) {
    const segments = target.split('/').filter(Boolean);
    const targetExists =
      segments[1] === 'faq'
        ? fs.readFileSync(path.join(root, 'src/faq/w2.ts'), 'utf8').includes(`"${segments[2]}"`)
        : segments[1] === 'compare'
        ? fs.existsSync(path.join(root, `content/competitors/${segments[2]}.md`))
        : segments[1] === 'price'
        ? fs.existsSync(path.join(root, 'src/app/price/page.tsx'))
        : segments.length === 3 &&
          fs.existsSync(
            path.join(root, `src/content/tech-center/${segments[1]}/${segments[2]}.md`)
          );
    if (!targetExists) throw new Error(`${route}: missing internal link target ${target}`);
  }
}

console.log(`Deep content verified: ${articles.length} articles`);
