/**
 * 案例页批量导入工具：解析交付稿 frontmatter → 映射到 Solution 新字段 → 落库。
 *
 * 用法：
 *   npm run customers:import-cases -- --file <md路径>             # dry-run
 *   npm run customers:import-cases -- --file <md路径> --apply     # 实际写入（草稿）
 *   npm run customers:import-cases -- --file <md路径> --apply --publish  # 写入并发布
 *   npm run customers:import-cases -- --dir <目录> --apply         # 批量导入目录下全部 案例-*.md
 *   pnpm tsx scripts/import-case-pages.ts --file <md路径> --polish --output <目录>  # 按客户案例中心规范 AI 润色并保存审阅稿
 *   pnpm tsx scripts/import-case-pages.ts --file <md路径> --polish --apply  # 润色并通过校验后写库（草稿）
 *   pnpm tsx scripts/import-case-pages.ts --polish-from <md路径> --apply    # 用已修订的润色稿校验并写库
 *   pnpm tsx scripts/import-case-pages.ts --validate-only <md路径>          # 只校验一份润色稿，不写库
 *   pnpm tsx scripts/import-case-pages.ts --file <md路径> --apply --no-cover # 写库但不匹配封面
 *   pnpm tsx scripts/import-case-pages.ts --file <md路径> --apply --cover-host http://localhost:3001  # 指定封面接口地址
 */
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import mongoose from 'mongoose';
import { loadEnvFile } from './lib/env';

loadEnvFile();

const DEFAULT_CASE_DIR =
  'tmp/W3-客户案例页-V1.1已清正文注释-20260811';

const MODULE_TITLES = [
  '## 一、解决方案概览',
  '## 二、客户背景与业务挑战',
  '## 三、落地方案全景',
  '## 四、落地效果与价值数据',
  '## 五、真实使用场景',
  '## 六、企业级选型价值',
  '## 七、预约免费 POC'
] as const;

function parseArgs() {
  const args = process.argv.slice(2);
  const files: string[] = [];
  let directory = '';
  let polishPrompt = 'scripts/customers/prompts/polish-case-article.md';
  let output = 'FastGPT-Expert-Outputs';
  let polishFrom = '';
  let validateOnly = '';
  let coverHost = '';
  let polishRetries = 2;
  const apply = args.includes('--apply');
  const publish = args.includes('--publish');
  const polish = args.includes('--polish');
  const noCover = args.includes('--no-cover');

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--file') {
      files.push(args[index + 1]);
      index += 1;
    } else if (arg === '--dir') {
      directory = args[index + 1];
      index += 1;
    } else if (arg === '--polish-prompt') {
      polishPrompt = args[index + 1];
      index += 1;
    } else if (arg === '--output') {
      output = args[index + 1];
      index += 1;
    } else if (arg === '--polish-from') {
      polishFrom = args[index + 1];
      index += 1;
    } else if (arg === '--validate-only') {
      validateOnly = args[index + 1];
      index += 1;
    } else if (arg === '--cover-host') {
      coverHost = args[index + 1];
      index += 1;
    } else if (arg === '--polish-retries') {
      const parsedRetries = Number.parseInt(args[index + 1], 10);
      polishRetries = Number.isFinite(parsedRetries) && parsedRetries >= 0 ? parsedRetries : 2;
      index += 1;
    }
  }

  return {
    files,
    directory,
    apply,
    publish,
    polish,
    noCover,
    polishPrompt,
    output,
    polishFrom,
    validateOnly,
    coverHost,
    polishRetries
  };
}

function readFrontmatterAndBody(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  if (lines[0]?.trim() !== '---') {
    throw new Error(`缺少 YAML frontmatter: ${filePath}`);
  }

  let endIndex = -1;
  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === '---') {
      endIndex = index;
      break;
    }
  }

  if (endIndex < 0) {
    throw new Error(`frontmatter 未闭合: ${filePath}`);
  }

  const frontmatter = lines.slice(1, endIndex).join('\n');
  let body = lines.slice(endIndex + 1).join('\n').trim();

  // 剔除交付稿里的 JSON-LD 块（页面 JSON-LD 由服务端生成，避免重复）
  body = body
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
    .trim();

  // 剔除正文开头的 `# H1`（页面上 H1 由 SolutionHero 渲染，正文从模块开始）
  body = body
    .replace(/\r\n/g, '\n')
    .replace(/^#\s+[^\n]+\n+/, '')
    .trim();

  const data = yaml.load(frontmatter) as Record<string, unknown>;
  return { data, body };
}

function getString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function discoverSourceFileForPolished(polishFrom: string) {
  const polishedPath = path.resolve(process.cwd(), polishFrom);
  const { data: polishedData } = readFrontmatterAndBody(polishedPath);
  const caseNo = Number(polishedData._case_no) || 0;

  if (caseNo > 0) {
    const caseDir = path.resolve(process.cwd(), DEFAULT_CASE_DIR);
    const candidates = fs
      .readdirSync(caseDir)
      .filter((name) => /^案例-\d+.*\.md$/.test(name))
      .sort();

    for (const name of candidates) {
      const candidatePath = path.join(caseDir, name);
      try {
        const { data } = readFrontmatterAndBody(candidatePath);
        if (Number(data._case_no) === caseNo) {
          return candidatePath;
        }
      } catch {
        // 跳过无法解析的文件
      }
    }
  }

  throw new Error(`无法根据润色稿 ${polishFrom} 找到对应的源案例文件（_case_no=${caseNo}）`);
}

function normalizeCompact(value: string) {
  return value.replace(/\s+/g, '');
}

function fillPromptTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) =>
    key in values ? values[key] : match
  );
}

async function callPolishLLM(prompt: string) {
  const url = process.env.AI_API_URL;
  const key = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL;

  if (!url || !key || !model) {
    throw new Error('缺少 AI_API_URL / AI_API_KEY / AI_MODEL 环境变量');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      stream: false,
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI API ${response.status}: ${errorText.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('AI 未返回内容');
  }

  return content.trim();
}

function stripFencedBlocks(body: string) {
  return body.replace(/```[\s\S]*?```/g, '');
}

function stripHtmlComments(body: string) {
  return body.replace(/<!--[\s\S]*?-->/g, '');
}

function stripTables(body: string) {
  return body
    .split('\n')
    .filter((line) => !line.trim().startsWith('|'))
    .join('\n');
}

function countBodyText(body: string) {
  const cleaned = stripTables(stripHtmlComments(stripFencedBlocks(body)))
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '');
  return cleaned.length;
}

async function matchSolutionCover(solutionId: string, coverHost?: string) {
  const host = coverHost || process.env.HOST;
  const apiKey = process.env.AGENT_API_KEY;

  if (!host || !apiKey) {
    return { ok: false as const, error: '缺少 HOST / AGENT_API_KEY 环境变量' };
  }

  const response = await fetch(
    `${host.replace(/\/+$/, '')}/api/v1/customers/${solutionId}/cover`,
    {
      method: 'POST',
      headers: { apikey: apiKey }
    }
  );

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success) {
    const message =
      data?.error?.message || data?.error || `HTTP ${response.status}`;
    return { ok: false as const, error: message };
  }

  return {
    ok: true as const,
    imageUrl: data?.data?.imageUrl || '',
    query: data?.data?.query || '',
    reason: data?.data?.reason || ''
  };
}

function tableRowCounts(section: string, body: string) {
  const start = body.indexOf(section);
  const end = start >= 0 ? body.indexOf('## ', start + 3) : -1;
  const segment = start >= 0 ? body.slice(start, end < 0 ? body.length : end) : '';
  const counts: number[] = [];
  const lines = segment.split('\n');
  let current: string[] = [];
  const flush = () => {
    if (current.length >= 2 && current[1].replace(/\s/g, '').includes('---')) {
      counts.push(Math.max(0, current.length - 2));
    }
    current = [];
  };
  for (const line of lines) {
    if (line.trim().startsWith('|')) {
      current.push(line);
    } else {
      flush();
    }
  }
  flush();
  return counts.sort((a, b) => b - a);
}

function validatePolishedBody(
  body: string,
  context: { citedNumbers: string; clearance: string }
) {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 模块顺序
  let cursor = 0;
  for (const title of MODULE_TITLES) {
    const index = body.indexOf(title);
    if (index < 0) {
      errors.push(`缺少模块：${title}`);
    } else if (index < cursor) {
      errors.push(`模块顺序错误：${title}`);
    } else {
      cursor = index + title.length;
    }
  }

  // 高亮块
  const highlightRules: Array<[string, string]> = [
    ['## 一、解决方案概览', '> [!blue]'],
    ['## 二、客户背景与业务挑战', '> [!red]'],
    ['## 三、落地方案全景', '> [!purple]'],
    ['## 四、落地效果与价值数据', '> [!green]'],
    ['## 六、企业级选型价值', '> [!orange]']
  ];
  for (const [title, marker] of highlightRules) {
    if (!body.includes(marker)) {
      errors.push(`${title} 缺少高亮块 ${marker}`);
    }
  }

  // 模块 1 HTML 注释占位
  for (const placeholder of ['官方演示视频', '系统截图', '脱敏案例材料']) {
    if (!body.includes(placeholder)) {
      errors.push(`模块 1 缺少 HTML 注释占位：${placeholder}`);
    }
  }

  // 引用数字保留
  const compactBody = normalizeCompact(body.replace(/<[^>]+>/g, ''));
  const citedParts = context.citedNumbers
    .split(/[；;]/)
    .map((part) => part.trim())
    .filter(Boolean);
  for (const part of citedParts) {
    if (!compactBody.includes(normalizeCompact(part))) {
      warnings.push(`引用数字片段未逐字命中（请人工核对）：${part}`);
    }
  }
  const numberTokens = context.citedNumbers.match(/\d+(?:\.\d+)?%?|\d+\s*万\+?|\d+\s*[千百万亿]+/g) || [];
  for (const token of [...new Set(numberTokens)]) {
    if (!compactBody.includes(normalizeCompact(token))) {
      warnings.push(`引用数字 token 未找到：${token}`);
    }
  }

  // ECharts
  const echartsBlocks = body.match(/```echarts[\s\S]*?```/g) || [];
  const strictEchartsBlocks = body.match(/```echarts\s*\{[\s\S]*?\}\s*```/g) || [];
  if (echartsBlocks.length < 5) {
    errors.push(`ECharts 至少 5 张，当前 ${echartsBlocks.length} 张`);
  }
  if (strictEchartsBlocks.length !== echartsBlocks.length) {
    errors.push('存在非严格 JSON 的 echarts 代码块（应直接以 { 开头、} 结尾）');
  }

  const coveredModules = new Set<string>();
  for (const title of MODULE_TITLES) {
    const start = body.indexOf(title);
    const end = start >= 0 ? body.indexOf('## ', start + 3) : -1;
    const segment = start >= 0 ? body.slice(start, end < 0 ? body.length : end) : '';
    if (segment.includes('```echarts')) {
      coveredModules.add(title.replace('## ', ''));
    }
  }
  if (coveredModules.size < 5) {
    errors.push(`ECharts 覆盖模块 ${coveredModules.size} 个，要求 ≥5`);
  }

  // Mermaid
  const mermaidBlocks = body.match(/```mermaid[\s\S]*?```/g) || [];
  if (mermaidBlocks.length < 1) {
    errors.push('缺少 mermaid 流程图');
  }

  // 表格
  const overviewCounts = tableRowCounts('## 一、解决方案概览', body);
  if (!overviewCounts.some((count) => count >= 4)) {
    warnings.push('模块 1 建议包含落地效果摘要表（≥4 数据行）');
  }
  const backgroundCounts = tableRowCounts('## 二、客户背景与业务挑战', body);
  if (backgroundCounts.length < 2 || backgroundCounts[0] < 8 || backgroundCounts[1] < 5) {
    errors.push(
      `模块 2 表格不达标：背景表 ≥5 行、痛点表 ≥8 行（当前 ${backgroundCounts.join('/') || 0}）`
    );
  }
  const valueCounts = tableRowCounts('## 四、落地效果与价值数据', body);
  if (!valueCounts.some((count) => count >= 7)) {
    errors.push('模块 4 价值收益表需 ≥7 数据行');
  }
  const scenarioCounts = tableRowCounts('## 五、真实使用场景', body);
  if (!scenarioCounts.some((count) => count >= 3)) {
    errors.push('模块 5 场景表需 ≥3 数据行');
  }
  const platformCounts = tableRowCounts('## 六、企业级选型价值', body);
  if (platformCounts.length < 2 || platformCounts[0] < 7 || platformCounts[1] < 5) {
    errors.push(
      `模块 6 表格不达标：竞品对比表 ≥7 行、顾虑回应表 ≥5 行（当前 ${platformCounts.join('/') || 0}）`
    );
  }

  // 字数（案例页不设上限，仅提示过少）
  const textCount = countBodyText(body);
  if (textCount < 900) {
    warnings.push(`正文字数 ${textCount}，低于 900，内容偏薄，建议按原文扩充`);
  } else {
    warnings.push(`正文字数 ${textCount}（无上限，内容充实度请人工确认）`);
  }

  // 禁用词与内部痕迹
  for (const word of ['待替换', '示例数据', '用户未提供', '正式发布时应替换', '以下为 POC 口径']) {
    if (body.includes(word)) {
      errors.push(`出现内部占位词：${word}`);
    }
  }
  for (const term of ['chatNode', 'datasetSearchNode', 'loop-run', '工作流节点', '节点编排']) {
    if (body.toLowerCase().includes(term.toLowerCase())) {
      errors.push(`暴露 FastGPT 内部术语：${term}`);
    }
  }
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
  if (emojiRegex.test(body)) {
    errors.push('正文/图表出现 emoji');
  }

  // 强调一致性：正文/表格强调必须为 <mark>**…**</mark> 叠加；高亮块标题行禁止 **
  for (const line of body.split('\n')) {
    const stripped = line.trim();
    if (!stripped) {
      continue;
    }
    if (stripped.startsWith('> [!') && !stripped.includes('\n')) {
      if (stripped.includes('**')) {
        errors.push('高亮块标题行出现 **（标题已自动加粗，禁止加粗记号）');
      }
      continue;
    }
    const markRegex = /<mark>(.*?)<\/mark>/g;
    let markMatch: RegExpExecArray | null;
    while ((markMatch = markRegex.exec(stripped)) !== null) {
      const markContent = markMatch[1];
      if (!(markContent.startsWith('**') && markContent.endsWith('**') && markContent.length > 4)) {
        errors.push('正文/表格强调必须为 <mark>**…**</mark> 叠加形式');
        break;
      }
    }
    const restWithoutMarks = stripped.replace(/<mark>.*?<\/mark>/g, '');
    if (restWithoutMarks.includes('**')) {
      errors.push('正文/表格出现 mark 之外的单独 ** 加粗');
    }
  }

  // B 级：正文不得出现原始数字
  if (context.clearance === 'B') {
    const numbers = stripFencedBlocks(body).match(/\d+(?:\.\d+)?/g) || [];
    if (numbers.length > 0) {
      errors.push(`B 级页面出现原始数字：${numbers.slice(0, 8).join(', ')}`);
    }
  }

  return { errors, warnings };
}

async function main() {
  const {
    files,
    directory,
    apply,
    publish,
    polish,
    noCover,
    polishPrompt,
    output,
    polishFrom,
    validateOnly,
    coverHost,
    polishRetries
  } = parseArgs();

  if (validateOnly) {
    const filePath = path.resolve(process.cwd(), validateOnly);
    const { data, body } = readFrontmatterAndBody(filePath);
    const report = validatePolishedBody(body, {
      citedNumbers: getString(data._cited_numbers),
      clearance: getString(data._clearance).charAt(0).toUpperCase() as 'A' | 'B' | 'C' | ''
    });
    console.log(`校验 ${path.relative(process.cwd(), filePath)}：`);
    for (const error of report.errors) {
      console.log(`  [错误] ${error}`);
    }
    for (const warning of report.warnings) {
      console.log(`  [提示] ${warning}`);
    }
    console.log(
      report.errors.length > 0
        ? `结果：不通过（${report.errors.length} 个硬错误）`
        : '结果：通过'
    );
    process.exit(report.errors.length > 0 ? 1 : 0);
  }

  const filePaths = [...files];
  if (directory) {
    const resolvedDir = path.resolve(process.cwd(), directory);
    const entries = fs
      .readdirSync(resolvedDir)
      .filter((name) => /^案例-\d+.*\.md$/.test(name))
      .sort();
    filePaths.push(...entries.map((name) => path.join(resolvedDir, name)));
  }

  if (filePaths.length === 0) {
    if (polishFrom) {
      filePaths.push(discoverSourceFileForPolished(polishFrom));
    } else {
    const defaultPath = path.resolve(process.cwd(), DEFAULT_CASE_DIR, '案例-01-金融终端AI智能搜索.md');
    if (fs.existsSync(defaultPath)) {
      filePaths.push(defaultPath);
    } else {
      console.error('未指定 --file / --dir，且默认案例文件不存在');
      process.exit(1);
    }
    }
  }

  const [{ default: dbConnect }, { default: Solution }, { default: Category }] =
    await Promise.all([
      import('@/customers/lib/db'),
      import('@/customers/models/Solution'),
      import('@/customers/models/Category')
    ]);

  await dbConnect();

  console.log(`模式：${apply ? '写入（草稿' + (publish ? '，发布' : '') + '）' : 'dry-run（只预览）'}`);
  console.log(`待导入文件：${filePaths.length} 个`);

  for (const filePath of filePaths) {
    const relativePath = path.relative(process.cwd(), filePath);

    try {
      const { data, body } = readFrontmatterAndBody(filePath);
      const title = getString(data.title);
      const slug = getString(data.slug);
      const metaTitle = getString(data.meta_title);
      const metaDescription = getString(data.meta_description);
      const categorySlug = getString(data.category_slug);
      const caseNo = Number(data._case_no) || 0;
      const clearanceChar = getString(data._clearance).charAt(0).toUpperCase();
      const clearanceLevel: 'A' | 'B' | 'C' | '' = ['A', 'B', 'C'].includes(clearanceChar)
        ? (clearanceChar as 'A' | 'B' | 'C')
        : '';
      const publishedAtRaw = getString(data.article_published_time);
      const imageUrl = getString(data.og_image) || '/fastgpt.svg';
      const caseOrg = getString(data._org) || getString(data._org_display);
      const citedNumbers = getString(data._cited_numbers);

      const errors: string[] = [];
      if (!title) errors.push('title');
      if (!slug) errors.push('slug');
      if (!metaDescription) errors.push('meta_description');
      if (!categorySlug) errors.push('category_slug');
      if (caseNo <= 0) errors.push('_case_no');
      if (body.length < 100) errors.push('正文过短');

      if (errors.length > 0) {
        console.error(`\n[跳过] ${relativePath}：缺少/非法字段 ${errors.join(', ')}`);
        continue;
      }

      const category = await Category.findOne({ slug: categorySlug }).select('_id name').lean();
      if (!category) {
        console.error(`\n[跳过] ${relativePath}：分类不存在 category_slug=${categorySlug}`);
        continue;
      }

      // 幂等：优先按 caseNo + contentType=case 查找，其次按 slug 查找
      const existing =
        (caseNo > 0
          ? await Solution.findOne({ caseNo, contentType: 'case', deletedAt: null })
              .select('_id slug imageUrl thumbnailUrl')
              .lean()
          : null) ||
        (await Solution.findOne({ slug, deletedAt: null })
          .select('_id slug imageUrl thumbnailUrl')
          .lean());

      const duplicate = await Solution.exists({
        slug,
        deletedAt: null,
        ...(existing ? { _id: { $ne: existing._id } } : {})
      });
      if (duplicate) {
        console.error(`\n[跳过] ${relativePath}：slug=${slug} 已存在且不属于本篇`);
        continue;
      }

      const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : null;
      const description = metaDescription;

      let bodyToStore = body;
      if (polishFrom) {
        const polishedFilePath = path.resolve(process.cwd(), polishFrom);
        const { data: polishedData, body: polishedBody } =
          readFrontmatterAndBody(polishedFilePath);
        bodyToStore = polishedBody;

        const report = validatePolishedBody(polishedBody, {
          citedNumbers: getString(polishedData._cited_numbers) || citedNumbers,
          clearance: clearanceLevel
        });
        console.log(
          `  修订稿校验：${report.errors.length > 0 ? `${report.errors.length} 个硬错误` : '通过'}`
        );
        for (const error of report.errors) {
          console.log(`    [错误] ${error}`);
        }
        for (const warning of report.warnings) {
          console.log(`    [提示] ${warning}`);
        }
        if (report.errors.length > 0) {
          console.error(
            `  [跳过落库] ${relativePath}：修订稿存在 ${report.errors.length} 个硬错误`
          );
          continue;
        }
      } else if (polish) {
        const template = fs.readFileSync(path.resolve(process.cwd(), polishPrompt), 'utf-8');
        const prompt = fillPromptTemplate(template, {
          title,
          metaTitle,
          metaDescription,
          caseOrg,
          clearance: clearanceLevel || '未标注',
          citedNumbers,
          body
        });

        console.log('  正在调用 AI 润色…');
        let polishedBody = await callPolishLLM(prompt);
        let report = validatePolishedBody(polishedBody, {
          citedNumbers,
          clearance: clearanceLevel
        });
        let attempt = 0;
        while (report.errors.length > 0 && attempt < polishRetries) {
          attempt += 1;
          console.log(`  润色第 ${attempt + 1} 轮：修复 ${report.errors.length} 个硬错误…`);
          const repairPrompt =
            `${prompt}\n\n# 上一版校验结果与修复要求\n\n`
            '上一版稿件存在以下硬错误，请逐条修复并输出完整的新版正文（不要只输出片段、不要解释）：\n'
            report.errors.map((error) => `- ${error}`).join('\n')
            '\n\n若正文文字量超出 2200，压缩行业泛述与重复论述，但保留全部事实、引用数字与原文要点。';
          polishedBody = await callPolishLLM(repairPrompt);
          report = validatePolishedBody(polishedBody, {
            citedNumbers,
            clearance: clearanceLevel
          });
        }
        bodyToStore = polishedBody;
        console.log(
          `  润色校验：${report.errors.length > 0 ? `${report.errors.length} 个硬错误` : '通过'}`
        );
        for (const error of report.errors) {
          console.log(`    [错误] ${error}`);
        }
        for (const warning of report.warnings) {
          console.log(`    [提示] ${warning}`);
        }

        const date = new Date().toISOString().slice(0, 10);
        const artifactDir = path.resolve(
          process.cwd(),
          output,
          'customers',
          `${date}-${slug}`
        );
        fs.mkdirSync(artifactDir, { recursive: true });
        const artifact = `---\nname: "${title}"\ndescription: "${metaDescription}"\n---\n\n${polishedBody}\n`;
        const artifactPath = path.join(artifactDir, 'article.md');
        fs.writeFileSync(artifactPath, artifact, 'utf-8');
        console.log(`  润色稿已保存: ${artifactPath}`);

        if (report.errors.length > 0) {
          console.error(
            `  [跳过落库] ${relativePath}：润色稿存在 ${report.errors.length} 个硬错误，请人工修订后重跑`
          );
          continue;
        }
      }

      console.log(`\n[${existing ? '更新' : '新增'}] ${title}`);
      console.log(`  slug: ${slug}`);
      console.log(`  分类: ${categorySlug} (${String(category.name)})`);
      console.log(`  caseNo: ${caseNo}  层级: ${clearanceLevel || '-'}  客户: ${caseOrg || '-'}`);
      console.log(`  metaTitle: ${metaTitle || '（空，走模板回退）'}`);
      console.log(`  publishedAt: ${publishedAtRaw || '（空）'}  isPublished: ${publish}`);
      console.log(`  正文字数: ${bodyToStore.length}`);

      if (!apply) {
        continue;
      }

      const hasOgImage = imageUrl !== '/fastgpt.svg';
      const payload: Record<string, unknown> = {
        slug,
        title,
        description,
        metaTitle,
        metaDescription,
        publishedAt,
        contentType: 'case' as const,
        caseOrg,
        clearanceLevel,
        caseNo,
        citedNumbers,
        categoryId: category._id,
        categoryName: String(category.name),
        content: bodyToStore,
        freeUseUrl: '',
        isPublished: publish,
        mediaUrls: []
      };
      if (existing) {
        // 更新：保留已有封面（除非 frontmatter 显式提供 og_image）
        if (hasOgImage) {
          payload.imageUrl = imageUrl;
          payload.thumbnailUrl = imageUrl;
        }
      } else {
        payload.imageUrl = imageUrl;
        payload.thumbnailUrl = '';
      }

      let solutionId: string;
      if (existing) {
        solutionId = String(existing._id);
        await Solution.updateOne(
          { _id: existing._id },
          { $set: { ...payload, deletedAt: null, deletedSource: null } }
        );
        console.log(`  已更新 ${solutionId}`);
      } else {
        const id = new mongoose.Types.ObjectId();
        solutionId = id.toString();
        await Solution.create({
          _id: id,
          storageFolder: id.toString(),
          ...payload
        });
        console.log(`  已创建 ${solutionId}`);
      }

      // 写完文章后自动匹配封面（AI 检索词 → Pexels 图源 → S3 → 写回 imageUrl）
      if (!noCover) {
        const coverResult = await matchSolutionCover(solutionId, coverHost);
        if (coverResult.ok) {
          console.log(`  封面已匹配: ${coverResult.imageUrl}`);
          console.log(`  检索词: ${coverResult.query}（${coverResult.reason}）`);
        } else {
          console.warn(`  [封面匹配失败] ${coverResult.error}`);
        }
      }
    } catch (error) {
      console.error(`\n[失败] ${relativePath}:`, error);
    }
  }

  process.exit(0);
}

main().catch((error) => {
  console.error('导入失败:', error);
  process.exit(1);
});
