---
title: 在Sealos部署的FastGPT中完成PgVector数据库升级的具体步骤
slug: /zh/reference/sealos-fastgpt-pgvector-upgrade
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/45
source_type: 官方文档小节
---

# 在Sealos部署的FastGPT中完成PgVector数据库升级的具体步骤

## 结论
本页提供Sealos部署FastGPT的PgVector数据库升级操作流程。完成全部步骤后，PgVector插件将升级至0.5.0版本，同时完成数据库索引重构与构建。

## 具体怎么做
1.  点击Sealos桌面的数据库应用。
2.  点击【pg】数据库的详情。
3.  点击右上角的重启，等待重启完成。
4.  点击左侧的一键链接，等待打开Terminal。
5.  依次输入以下SQL命令：
```sql
-- 升级插件名
ALTER EXTENSION vector UPDATE ;
-- 验证升级结果，成功则vector插件版本为0.5.0，旧版为0.4.1
\dx
-- 设置pg构建索引时可用内存，需根据数据库规格配置，示例为2400MB
alter system set maintenance_work_mem = '2400MB' ;
select pg_reload_conf();
-- 重构数据库索引和排序
REINDEX DATABASE postgres;
-- 构建索引，可直接退出Terminal
CREATE INDEX CONCURRENTLY vector_index ON modeldata USING hnsw ( vector vector_ip_ops) WITH (m = 16 , ef_construction = 64 );
-- 验证索引构建完成
\d modeldata
```

## 注意事项
1.  maintenance_work_mem需根据自身数据库规格动态配置，可设置为1/4的数据库内存大小，示例值为2400MB。
2.  构建索引的执行时间较长，可直接点击右上角叉号退出Terminal，无需等待执行完成。
3.  验证索引构建完成时，需在`\d modeldata`的输出中看到`vector_index hnsw (vector vector_ip_ops) WITH (m='16', ef_construction='64')`，且无INVALID标识。
4.  升级成功后，通过`\dx`命令可确认PgVector插件版本为0.5.0，旧版本为0.4.1。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/45)
