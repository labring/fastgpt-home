---
title: 解决FastGPT main分支PG数据库初始化索引报错问题
slug: /zh/troubleshoot/fastgpt-pg-index-init-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/682
source_type: GitHub issue
---

# 解决FastGPT main分支PG数据库初始化索引报错问题

## 现象
使用FastGPT main分支（20240102版本）源码启动时，PG数据库初始化抛出报错：`CREATE INDEX CONCURRENTLY cannot run inside a transaction block`，报错日志指向`packages/service/common/vectorStore/pg/controller.ts`文件的`initPg`函数。

## 可能原因
当前初始化代码中，`CREATE INDEX CONCURRENTLY`语句与其他DDL语句在同一数据库事务上下文中执行，而PostgreSQL数据库不允许在事务块内运行`CREATE INDEX CONCURRENTLY`命令。

## 排查步骤
1.  查看报错日志，定位到`packages/service/common/vectorStore/pg/controller.ts`的`initPg`函数。
2.  检查该函数内的数据库查询语句，确认`CREATE INDEX CONCURRENTLY`语句与其他DDL语句在同一批查询或事务中执行。
3.  结合PostgreSQL官方规则，验证`CREATE INDEX CONCURRENTLY`无法在事务块内运行。

## 解决与验证
1.  修改`packages/service/common/vectorStore/pg/controller.ts`中的`initPg`函数，将创建索引的语句与建表语句拆分为两个独立的`PgClient.query`调用，参考修复代码：
```typescript
export async function initPg() {
  try {
    await connectPg();
    await PgClient.query(`
      CREATE EXTENSION IF NOT EXISTS vector;
      CREATE TABLE IF NOT EXISTS ${PgDatasetTableName} (
          id BIGSERIAL PRIMARY KEY,
          vector VECTOR(1536) NOT NULL,
          team_id VARCHAR(50) NOT NULL,
          tmb_id VARCHAR(50) NOT NULL,
          dataset_id VARCHAR(50) NOT NULL,
          collection_id VARCHAR(50) NOT NULL,
          data_id VARCHAR(50) NOT NULL,
          createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await PgClient.query(`
    CREATE INDEX CONCURRENTLY IF NOT EXISTS vector_index ON ${PgDatasetTableName}
      USING hnsw (vector vector_ip_ops) WITH (m = 32, ef_construction = 64);
    `);

    console.log('init pg successful');
  } catch (error) {
    console.log('init pg error', error);
  }
}
```
2.  重新启动FastGPT源码服务，查看控制台是否输出`init pg successful`提示。
3.  连接目标PostgreSQL数据库，验证`vector_index`索引已创建，且`${PgDatasetTableName}`表存在且结构符合预期。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/682)
