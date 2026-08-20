/**
 * 将存量方案的拼音 slug 替换为英文语义 slug（映射见 scripts/customers/slugs-english.json）。
 *
 * 用法：
 *   npm run customers:apply-english-slugs             # dry-run
 *   npm run customers:apply-english-slugs -- --apply  # 实际写入
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadEnvFile } from './lib/env';

loadEnvFile();

async function main() {
  const [{ default: dbConnect }, { default: Customer }] = await Promise.all([
    import('@/customers/lib/db'),
    import('@/customers/models/Customer')
  ]);

  await dbConnect();

  const apply = process.argv.includes('--apply');
  const mappingPath = path.resolve(process.cwd(), 'scripts/customers/slugs-english.json');
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8')) as Record<string, string>;

  const entries = Object.entries(mapping);
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  const formatErrors = entries.filter(([, slug]) => !slugPattern.test(slug));
  if (formatErrors.length > 0) {
    console.error('存在非法 slug：', formatErrors);
    process.exit(1);
  }

  const seen = new Set<string>();
  const duplicates = entries.filter(([, slug]) => {
    if (seen.has(slug)) return true;
    seen.add(slug);
    return false;
  });
  if (duplicates.length > 0) {
    console.error('映射中存在重复 slug：', duplicates);
    process.exit(1);
  }

  const ids = entries.map(([id]) => id);
  const customers = await Customer.find({ _id: { $in: ids } })
    .select('_id title slug')
    .lean<Array<{ _id: { toString(): string }; title: string; slug?: string | null }>>();
  const customerMap = new Map(customers.map((s) => [s._id.toString(), s]));

  // 校验：新 slug 不得与其他文档（含未在映射中的文档）冲突
  const otherSlugs = await Customer.find({
    _id: { $nin: ids },
    slug: { $in: [...seen] }
  })
    .select('slug')
    .lean<Array<{ slug?: string | null }>>();
  if (otherSlugs.length > 0) {
    console.error('新 slug 与库中其他文档冲突：', otherSlugs.map((s) => s.slug).join(', '));
    process.exit(1);
  }

  const plan = entries
    .map(([id, slug]) => {
      const customer = customerMap.get(id);
      return { id, title: customer?.title || '?', oldSlug: customer?.slug || '', newSlug: slug };
    })
    .filter((item) => item.oldSlug !== item.newSlug);

  console.log(`映射共 ${entries.length} 条，需要更新 ${plan.length} 条。`);

  if (!apply) {
    console.log('dry-run（未写入）：');
    for (const item of plan) {
      console.log(`  ${item.title}  ${item.oldSlug}  ->  ${item.newSlug}`);
    }
    process.exit(0);
  }

  let written = 0;
  for (const item of plan) {
    await Customer.updateOne({ _id: item.id }, { $set: { slug: item.newSlug } });
    written += 1;
  }

  console.log(`已更新 ${written} 条 slug 为英文语义 slug。`);
  process.exit(0);
}

main().catch((error) => {
  console.error('更新失败:', error);
  process.exit(1);
});
