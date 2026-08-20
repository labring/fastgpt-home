/**
 * 数据库索引同步脚本（发布/迁移时运行一次）。
 *
 * 使用 `createIndexes()`（只创建缺失索引，绝不删除线上已有索引），
 * 覆盖本次新增的两个复合索引：
 *   - { isPublished: 1, deletedAt: 1, createdAt: -1 }
 *   - { categoryId: 1, isPublished: 1, deletedAt: 1, createdAt: -1 }
 *
 * 用法：
 *   pnpm tsx scripts/sync-db-indexes.ts
 */
import mongoose from 'mongoose';
import { loadEnvFile } from './lib/env';

loadEnvFile();

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[错误] 缺少 MONGODB_URI（请检查 .env）');
    process.exit(1);
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });

  const [{ default: Customer }, { default: Category }, { default: CustomerInteraction }] =
    await Promise.all([
      import('@/customers/models/Customer'),
      import('@/customers/models/Category'),
      import('@/customers/models/CustomerInteraction'),
    ]);

  const models: Array<[string, { createIndexes: () => Promise<unknown> }]> = [
    ['Customer', Customer],
    ['Category', Category],
    ['CustomerInteraction', CustomerInteraction],
  ];
  const failures: string[] = [];

  for (const [name, model] of models) {
    try {
      const created = await model.createIndexes();
      console.log(`  ${name}: OK（${Array.isArray(created) ? created.length : '完成'}）`);
    } catch (error) {
      failures.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (failures.length > 0) {
    console.error('以下模型索引同步失败：');
    for (const failure of failures) {
      console.error(`  ${failure}`);
    }
    await mongoose.disconnect();
    process.exit(1);
  }

  console.log('索引同步完成（Customer / Category / CustomerInteraction）');

  const customerCollection = 'customers';
  const customerIndexes = await mongoose.connection.db!.collection(customerCollection).indexes();
  console.log('customers 集合当前索引：');
  for (const index of customerIndexes) {
    console.log(`  ${index.name}: ${JSON.stringify(index.key)}`);
  }

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
