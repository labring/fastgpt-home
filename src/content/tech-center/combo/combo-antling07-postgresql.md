---
title: AntLing 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-antling07-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 的 `Ming-flash-omni` 模型，具备 128000 的上下文长度，允许一次性处理大量输入信息。该模型支持图片输入，可用于多模态应用场景。工具调用能力意味着模型可以与外部系统交互，执行特定任务。引用上限为 120000 token，这表明模型在生成回复时，可以整合的引用内"
language: zh
axis_model_tier: "AntLing / 128000 /  / 120000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "Ming-flash-omni"
check_day: 2026-09-29
meta_title: AntLing 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: AntLing 的 `Ming-flash-omni` 模型，具备 128000 的上下文长度，允许一次性处理大量输入信息。该模型支持图片输入，可用于多模态应用场景。工具调用能力意味着模型可以与外部系统交互，执行特定任务。引用上限为 120000 token，这表明模型在生成回复时，可以整合的引用内
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
AntLing 的 `Ming-flash-omni` 模型，具备 128000 的上下文长度，允许一次性处理大量输入信息。该模型支持图片输入，可用于多模态应用场景。工具调用能力意味着模型可以与外部系统交互，执行特定任务。引用上限为 120000 token，这表明模型在生成回复时，可以整合的引用内容总和的 token 预算。引用内容的条数由检索系统决定，与引用上限是两个独立的概念。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问 pgvector 扩展 |
| `vector_dimensions` | `1536` | 适配主流 embedding 模型的输出维度，如 `text-embedding-ada-002` |
| `ef_construction` | `80` | 控制 HNSW 索引构建时的邻居搜索范围，影响索引质量和构建时间 |
| `ef_search` | `60` | 控制 HNSW 查询时的邻居搜索范围，影响查询召回率与性能 |
| `m` | `32` | HNSW 图中每个节点的最大连接数，影响索引大小和查询效率 |

## 这两者互相约束的地方
模型的 128000 上下文长度是总预算，其中引用上限为 120000 token。向量库返回的段落条数与每段内容的长度共同决定了实际消耗的 token 量。引用上限是引用内容合计的 token 预算。向量库返回的段落数量是另一个独立的指标。当每段内容的平均长度较短时，可以在不超过引用上限的前提下返回更多条目。反之，若每段内容较长，则可能在条目数较少时即触及引用上限。索引参数 `ef_construction` 和 `m` 调大，通常会提高检索精度，从而为模型提供更相关的上下文，但也会增加索引构建时间和存储开销。

## 容易做错的三处
*   日志中出现 `ERROR: function vector_avg(vector) does not exist`：通常是 `pgvector` 扩展未正确安装或未在数据库中启用。
*   检索结果返回的段落数量显著少于预期：可能是 `ef_search` 参数设置过低，导致搜索范围不足，或 `quoteMaxToken` 限制了实际可引用的内容。
*   查询响应时间过长，甚至超时：HNSW 索引未正确创建或参数 `ef_search` 过高，导致查询计算量过大。

## 怎么确认配好了
*   执行一次包含向量搜索的 RAG 流程，检查日志中是否有 pgvector 相关的 SQL 查询语句，确认数据库交互正常。
*   在 FastGPT 界面上，配置一个包含多段长文本的知识库，观察模型回复中引用的内容是否包含预期信息，并检查引用的 token 数量是否在 `quoteMaxToken` 范围内。
*   通过 `EXPLAIN ANALYZE` 命令分析 pgvector 查询的执行计划，确保 HNSW 索引被有效利用，并评估查询耗时是否在可接受的范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
