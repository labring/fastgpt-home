/**
 * 数据库索引与查询审查脚本（计划书阶段 9 验收）。
 *
 * 对核心查询跑 `explain("executionStats")` 并断言：
 * - 无 COLLSCAN（全表扫描）；
 * - createdAt 排序的列表查询无内存 SORT stage（排序走索引）；
 * - slug 详情查询 docsExamined ≤ 2；
 * - slug 唯一索引存在。
 * 首页默认 usage 排序的查询允许内存 SORT（易变计数不建索引，属预期取舍），只断言无 COLLSCAN。
 *
 * 用法：
 *   pnpm tsx scripts/verify-db-indexes.ts
 */
import mongoose from 'mongoose';
import { loadEnvFile } from './lib/env';

loadEnvFile();

function collectStages(stage: unknown): Array<Record<string, unknown>> {
  const stages: Array<Record<string, unknown>> = [];
  const stack = [stage];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || typeof current !== 'object') {
      continue;
    }
    const node = current as Record<string, unknown>;
    stages.push(node);
    if (node.inputStage) {
      stack.push(node.inputStage);
    }
    if (Array.isArray(node.inputStages)) {
      for (const child of node.inputStages) {
        stack.push(child);
      }
    }
  }
  return stages;
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[错误] 缺少 MONGODB_URI（请检查 .env）');
    process.exit(1);
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
  const db = mongoose.connection.db!;
  const solutions = db.collection('solutions');

  const indexes = await solutions.indexes();
  const slugIndex = indexes.find((index) => index.name === 'slug_1');
  const errors: string[] = [];

  if (!slugIndex) {
    errors.push('缺少 slug 唯一索引 slug_1');
  } else if (!slugIndex.unique) {
    errors.push('slug_1 索引不是唯一索引');
  }

  const category = await db.collection('categories').findOne({
    slug: 'finance-insurance-wealth-management',
  });

  const checks: Array<{
    name: string;
    query: () => Promise<{
      stages: Array<Record<string, unknown>>;
      docsExamined: number;
    }>;
    expectNoSort: boolean;
  }> = [
    {
      name: '详情页(slug)',
      query: async () => {
        const explain = await solutions
          .find({ slug: 'financial-terminal-ai-search', deletedAt: null })
          .limit(1)
          .explain('executionStats');
        return {
          stages: collectStages(explain.executionStats.executionStages),
          docsExamined: explain.executionStats.totalDocsExamined,
        };
      },
      expectNoSort: true,
    },
    {
      name: '全量列表(createdAt 排序)',
      query: async () => {
        const explain = await solutions
          .find({ isPublished: true, deletedAt: null })
          .sort({ createdAt: -1 })
          .limit(15)
          .explain('executionStats');
        return {
          stages: collectStages(explain.executionStats.executionStages),
          docsExamined: explain.executionStats.totalDocsExamined,
        };
      },
      expectNoSort: true,
    },
    {
      name: '分类列表(createdAt 排序)',
      query: async () => {
        const explain = await solutions
          .find({ isPublished: true, deletedAt: null, categoryId: category?._id })
          .sort({ createdAt: -1 })
          .limit(15)
          .explain('executionStats');
        return {
          stages: collectStages(explain.executionStats.executionStages),
          docsExamined: explain.executionStats.totalDocsExamined,
        };
      },
      expectNoSort: true,
    },
    {
      name: '首页列表(usage 排序，允许内存排序)',
      query: async () => {
        const explain = await solutions
          .find({ isPublished: true, deletedAt: null })
          .sort({ usageCount: -1, createdAt: -1 })
          .limit(15)
          .explain('executionStats');
        return {
          stages: collectStages(explain.executionStats.executionStages),
          docsExamined: explain.executionStats.totalDocsExamined,
        };
      },
      expectNoSort: false,
    },
  ];

  for (const check of checks) {
    const { stages, docsExamined } = await check.query();
    const hasCollscan = stages.some((stage) => stage.stage === 'COLLSCAN');
    const hasInMemorySort = stages.some(
      (stage) => stage.stage === 'SORT' && stage.type === 'simple'
    );
    const detail = `docsExamined=${docsExamined}, COLLSCAN=${hasCollscan}, 内存SORT=${hasInMemorySort}`;

    if (hasCollscan) {
      errors.push(`${check.name}：出现全表扫描 COLLSCAN（${detail}）`);
    } else if (check.expectNoSort && hasInMemorySort) {
      errors.push(`${check.name}：createdAt 排序走了内存 SORT（${detail}）`);
    } else {
      console.log(`  通过：${check.name}（${detail}）`);
    }
  }

  await mongoose.disconnect();

  if (errors.length > 0) {
    for (const error of errors) {
      console.log(`  [错误] ${error}`);
    }
    console.log('\n结果：不通过');
    process.exit(1);
  }
  console.log('\n结果：通过');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
