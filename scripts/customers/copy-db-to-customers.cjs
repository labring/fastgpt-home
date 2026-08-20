#!/usr/bin/env node
/**
 * 把 fastgpt_solutions 库复制为 fastgpt-customers，并把 solution 命名的
 * 表名/字段名改成 customer 命名，供去掉 CUSTOMERS_MONGODB_* 环境变量后直接使用。
 * 同时把 contentType（枚举）转换为 isPublicCase（布尔）：case → true，其余 → false。
 *
 * 安全约束：
 *   - 对源库【只读】：仅 listCollections / countDocuments / find / indexes。
 *   - 所有写操作（dropDatabase / insertMany / createIndex）只针对目标库 fastgpt-customers。
 *   - 默认 dry-run，必须显式传 --apply 才会真正写库。
 *
 * 用法：
 *   node scripts/customers/copy-db-to-customers.cjs            # 预览计划，不写任何数据
 *   node scripts/customers/copy-db-to-customers.cjs --apply    # 实际复制
 */
const fs = require('node:fs');
const path = require('node:path');
const { MongoClient } = require('mongodb');

const TARGET_DB = 'fastgpt-customers';
const BATCH_SIZE = 1000;

function loadEnv(filePath = path.resolve(process.cwd(), '.env')) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

/**
 * 集合复制计划：source 集合名 -> 目标集合名 + 字段改名 + 索引名覆盖。
 * 未列出的集合按原样复制（表名、字段名、索引名都不变）。
 */
const PLAN = {
  solutions: {
    to: 'customers',
    renameFields: { relatedSolutionIds: 'relatedCustomerIds', contentType: 'isPublicCase' },
    indexNameOverrides: {
      'contentType_1_isPublished_1_deletedAt_1_createdAt_-1':
        'isPublicCase_1_isPublished_1_deletedAt_1_createdAt_-1',
    },
    transform(doc) {
      // contentType（枚举）→ isPublicCase（布尔）：case → true，其余（solution/customer/null）→ false
      doc.isPublicCase = doc.isPublicCase === 'case';
      return doc;
    },
  },
  solutioninteractions: {
    to: 'customerinteractions',
    renameFields: { solutionId: 'customerId' },
    indexNameOverrides: {
      solutionId_1: 'customerId_1',
      solution_interaction_unique_visitor_type: 'customer_interaction_unique_visitor_type',
    },
  },
  ctaclicks: {
    to: 'ctaclicks',
    renameFields: { solutionId: 'customerId', solutionTitle: 'customerTitle' },
    indexNameOverrides: {},
  },
};

function renameFieldsInDoc(doc, renameFields) {
  const hits = {};
  for (const [from, to] of Object.entries(renameFields)) {
    if (from in doc) {
      if (!(to in doc)) doc[to] = doc[from];
      delete doc[from];
      hits[from] = (hits[from] || 0) + 1;
    }
  }
  return { doc, hits };
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function recreateIndexes(sourceDb, sourceColl, targetColl, renameFields, indexNameOverrides) {
  const specs = await sourceDb.collection(sourceColl).indexes();
  for (const spec of specs) {
    if (spec.name === '_id_') continue;

    let key;
    if (spec.weights) {
      // 文本索引：由 weights 重建 text key
      key = Object.fromEntries(Object.keys(spec.weights).map((k) => [k, 'text']));
    } else {
      key = { ...spec.key };
    }
    key = Object.fromEntries(Object.entries(key).map(([k, v]) => [renameFields[k] || k, v]));

    const name = indexNameOverrides[spec.name] || spec.name;
    const options = { name };
    if (spec.unique) options.unique = true;
    if (spec.sparse) options.sparse = true;
    if (spec.expireAfterSeconds !== undefined) options.expireAfterSeconds = spec.expireAfterSeconds;
    if (spec.weights) {
      if (spec.default_language !== undefined) options.default_language = spec.default_language;
      if (spec.language_override !== undefined) options.language_override = spec.language_override;
      if (spec.textIndexVersion !== undefined) options.textIndexVersion = spec.textIndexVersion;
    }

    await targetColl.createIndex(key, options);
  }
}

function buildTargetUri(sourceUri, targetDb) {
  // 替换 URI 路径中的数据库名（最后一个 / 之后、? 之前）。
  return sourceUri.replace(/\/[^/?]+(?=\?|$)/, '/' + targetDb);
}

async function main() {
  const apply = process.argv.includes('--apply');
  loadEnv();

  const SOURCE_URI = process.env.MONGODB_URI;
  if (!SOURCE_URI) {
    console.error('[错误] 缺少 MONGODB_URI（请检查 .env）');
    process.exit(1);
  }

  const source = new MongoClient(SOURCE_URI, { serverSelectionTimeoutMS: 15000 });
  await source.connect();
  const sourceDbName = source.db().databaseName;
  if (sourceDbName === TARGET_DB) {
    console.error(`[错误] 源库名与目标库名相同（${sourceDbName}），已中止。`);
    process.exit(1);
  }

  const TARGET_URI = buildTargetUri(SOURCE_URI, TARGET_DB);
  const target = new MongoClient(TARGET_URI, { serverSelectionTimeoutMS: 15000 });
  await target.connect();
  const sourceDb = source.db(sourceDbName);
  const targetDb = target.db(TARGET_DB);

  console.log(`模式：${apply ? 'APPLY（实际写入）' : 'DRY-RUN（只预览，不写任何数据）'}`);
  console.log(`源库：${sourceDbName}`);
  console.log(`目标库：${TARGET_DB}`);

  const sourceCollections = (await sourceDb.listCollections().toArray()).map((c) => c.name);

  if (apply) {
    await targetDb.dropDatabase();
    console.log(`已清空目标库 ${TARGET_DB}（确保干净复制）`);
  }

  const report = [];
  for (const sourceColl of sourceCollections) {
    const plan = PLAN[sourceColl] || { to: sourceColl, renameFields: {}, indexNameOverrides: {} };
    const count = await sourceDb.collection(sourceColl).countDocuments();
    const renameDesc =
      Object.entries(plan.renameFields).map(([f, t]) => `${f}→${t}`).join(', ') || '(无)';

    if (!apply) {
      report.push({ sourceColl, targetColl: plan.to, count, copied: null, renameDesc, renameHits: {} });
      continue;
    }

    const docs = await sourceDb.collection(sourceColl).find({}).toArray();
    const renameHits = {};
    const transformed = docs.map((d) => {
      const renamed = renameFieldsInDoc(d, plan.renameFields);
      for (const [f, n] of Object.entries(renamed.hits)) renameHits[f] = (renameHits[f] || 0) + n;
      return plan.transform ? plan.transform(renamed.doc) : renamed.doc;
    });

    const targetColl = targetDb.collection(plan.to);
    for (const batch of chunk(transformed, BATCH_SIZE)) {
      await targetColl.insertMany(batch, { ordered: true });
    }
    await recreateIndexes(sourceDb, sourceColl, targetColl, plan.renameFields, plan.indexNameOverrides);

    report.push({ sourceColl, targetColl: plan.to, count, copied: transformed.length, renameDesc, renameHits });
  }

  console.log('\n=== 复制计划/结果 ===');
  for (const r of report) {
    const hitsDesc = Object.entries(r.renameHits).map(([f, n]) => `${f}(${n} 条)`).join(' ') || '';
    const copyCol = r.copied === null ? `${r.count} 条(待复制)` : `${r.copied} 条`;
    console.log(`${r.sourceColl} → ${r.targetColl}：${copyCol}，字段改名=${r.renameDesc} ${hitsDesc}`);
  }

  if (apply) {
    console.log('\n=== 校验目标库条数 ===');
    let ok = true;
    for (const r of report) {
      const t = await targetDb.collection(r.targetColl).countDocuments();
      const pass = t === r.copied;
      if (!pass) ok = false;
      console.log(`${r.targetColl}: ${t} ${pass ? 'OK' : `MISMATCH(期望 ${r.copied})`}`);
    }
    console.log(ok ? '\n复制完成，校验通过。' : '\n复制完成，但存在条数不一致，请检查。');
  } else {
    console.log('\nDRY-RUN 完成，未写入任何数据。确认无误后加 --apply 执行。');
  }

  await source.close();
  await target.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
