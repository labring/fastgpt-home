---
title: 解决FastGPT中PG向量查询分数异常大于1的问题
slug: /zh/troubleshoot/fastgpt-pg-query-score-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/244
source_type: GitHub issue
---

# 解决FastGPT中PG向量查询分数异常大于1的问题

## 现象
执行以下PG查询语句时，返回的score字段值大于1。查询语句包含事务块、SET LOCAL ivfflat.probes参数设置、基于向量<#>操作符的相似度查询，涉及kb_id、user_id参数与vectors数组传入。
```sql
BEGIN;
SET LOCAL ivfflat.probes = ${global.systemEnv.pgIvfflatProbe || 10};
select id,q,a,source,(vector <#> '[${vectors[0]}]') * -1 AS score from ${PgTrainingTableName} where kb_id='${kbId}' AND user_id='${userId}' order by vector <#> '[${vectors[0]}]' limit 12;
COMMIT;
```

## 可能原因
目前未明确具体原因，需结合实际PG环境配置与查询场景确认。可能与ivfflat.probes参数设置、向量距离计算逻辑相关。

## 排查步骤
1. 提取当前执行的PG查询语句，确认事务块内的SET LOCAL ivfflat.probes参数值（默认值为10）。
2. 检查查询语句中使用的向量匹配操作符<#>的计算规则，确认score字段的生成逻辑。
3. 核对查询涉及的kb_id、user_id参数是否正确，以及传入的vectors数组格式是否符合PG向量索引要求。
4. 确认PG向量索引的类型为ivfflat，且向量维度与查询向量一致。

## 解决与验证
1. 根据业务需求调整score字段的阈值判断规则，匹配预期的结果范围。
2. 修改global.systemEnv.pgIvfflatProbe的配置值，重新执行查询验证score结果。
3. 核对向量数据的生成与传输格式，确保与PG向量索引的维度匹配。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/244)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
