/**
 * 为存量解决方案批量回填唯一语义 slug。
 *
 * 用法：
 *   npm run customers:backfill-slugs             # dry-run，只预览
 *   npm run customers:backfill-slugs -- --apply  # 实际写入
 */
import { loadEnvFile } from './lib/env';

loadEnvFile();

async function main() {
  const [{ default: dbConnect }, { default: Solution }, { slugifyChineseTitle }] =
    await Promise.all([
      import('@/customers/lib/db'),
      import('@/customers/models/Solution'),
      import('./lib/slugify')
    ]);

  await dbConnect();

  const apply = process.argv.includes('--apply');

  const solutions = await Solution.find({ deletedAt: null })
    .select('_id title slug')
    .lean<Array<{ _id: { toString(): string }; title: string; slug?: string | null }>>();

  const taken = new Set<string>(
    solutions
      .map((solution) => solution.slug)
      .filter((slug): slug is string => Boolean(slug))
  );
  const missing = solutions.filter((solution) => !solution.slug);

  console.log(
    `存量方案 ${solutions.length} 条：已有 slug ${solutions.length - missing.length} 条，缺少 slug ${missing.length} 条。`
  );

  if (missing.length === 0) {
    console.log('无需回填。');
    process.exit(0);
    return;
  }

  const plan: Array<{ id: string; title: string; slug: string }> = [];

  for (const solution of missing) {
    const base = slugifyChineseTitle(solution.title) || 'solution';
    let candidate = base;
    let suffix = 2;

    while (taken.has(candidate)) {
      candidate = `${base}-${suffix}`;
      suffix += 1;
    }

    taken.add(candidate);
    plan.push({ id: solution._id.toString(), title: solution.title, slug: candidate });
  }

  if (!apply) {
    console.log('dry-run（未写入），以下为计划写入的 slug：');
    for (const item of plan) {
      console.log(`  ${item.id}  ${item.title}  ->  ${item.slug}`);
    }
    console.log(`共 ${plan.length} 条。确认无误后加 --apply 实际写入。`);
    process.exit(0);
    return;
  }

  let written = 0;
  for (const item of plan) {
    await Solution.updateOne({ _id: item.id }, { $set: { slug: item.slug } });
    written += 1;
  }

  console.log(`已写入 ${written} 条 slug。`);
  process.exit(0);
}

main().catch((error) => {
  console.error('回填失败:', error);
  process.exit(1);
});
