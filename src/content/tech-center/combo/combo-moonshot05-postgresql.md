---
title: Moonshot 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-moonshot05-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`moonshot-v1-128k` 模型具备 128000 的上下文长度，这意味着一次请求中可以处理大量的输入信息。引用上限 60000 限制了知识库召回内容在模型输入中的 token 总量。该模型支持工具调用，允许其与外部系统进行交互，执行特定任务或获取实时信息。不支持图片输入，表明其当前主要处"
language: zh
axis_model_tier: "Moonshot / 128000 /  / 60000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "moonshot-v1-128k"
check_day: 2026-09-29
meta_title: Moonshot 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `moonshot-v1-128k` 模型具备 128000 的上下文长度，这意味着一次请求中可以处理大量的输入信息。引用上限 60000 限制了知识库召回内容在模型输入中的 token 总量。该模型支持工具调用，允许其与外部系统进行交互，执行特定任务或获取实时信息。不支持图片输入，表明其当前主要处
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`moonshot-v1-128k` 模型具备 128000 的上下文长度，这意味着一次请求中可以处理大量的输入信息。引用上限 60000 限制了知识库召回内容在模型输入中的 token 总量。该模型支持工具调用，允许其与外部系统进行交互，执行特定任务或获取实时信息。不支持图片输入，表明其当前主要处理文本模态数据。这些参数共同决定了在 FastGPT 平台上构建 RAG 应用时，知识库召回策略和数据处理流程需要如何设计。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的必要参数，确保数据库可达且权限正确。 |
| `vector_ip_ops` | `true` | pgvector 默认使用欧氏距离（`vector_l2_ops`），当向量数据归一化后，内积距离（`vector_ip_ops`）等价于余弦相似度，且通常性能更优。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量和构建时间。此值越大，索引质量越高，召回准确率越高，但索引构建时间越长。 |
| `ef_search` | `32` | HNSW 索引查询参数，影响查询速度和召回准确率。此值越大，查询结果越准确，但查询时间越长。应至少等于 `k` (召回条数)，通常建议设置为 `k` 的 2-4 倍。 |
| `m` | `16` | HNSW 图结构参数，影响索引的内存占用和查询性能。此值越大，内存占用越高，但查询效率可能提升。 |

## 这两者互相约束的地方
`moonshot-v1-128k` 模型的 128000 上下文长度是核心约束。在 RAG 流程中，召回的知识段落总长度 (`召回条数` × `每段平均长度`) 必须严格控制在 128000 token 以内。FastGPT 的引用上限 60000 token 进一步限制了知识库内容的实际输入量，这意味着即使模型上下文允许更多，知识库部分也只能占用最多 60000 token。PostgreSQL（pgvector）在执行向量搜索时，其返回的条数 (`k` 值) 需要与 FastGPT 的召回条数配置相匹配。如果 `ef_search` 参数设置过小，可能导致 HNSW 索引无法返回足够准确的 `k` 条结果，从而影响模型获取高质量的知识。索引参数 `ef_construction` 和 `m` 的调整会影响 pgvector 索引的质量，进而影响召回结果的准确性，最终影响模型生成回答的质量。

## 容易做错的三处
*   日志中出现 `ERROR: function vector_ip_ops(vector, vector) does not exist`：原因是没有正确设置 `vector_ip_ops` 或者 pgvector 扩展未加载。
*   FastGPT 界面显示“知识库召回内容过少，可能影响回答质量”：原因可能是 pgvector 的 `ef_search` 参数设置过低，导致召回的有效条目不足或质量不高。
*   模型回答内容与知识库中的关键信息不符：原因可能是 `ef_construction` 或 `m` 参数设置不当，导致 HNSW 索引质量不佳，未能召回最相关的知识块。

## 怎么确认配好了
*   在 FastGPT 中进行知识库问答测试，观察模型回答是否准确引用了知识库内容，并检查 FastGPT 调试界面中召回的知识段落数量和内容。
*   通过 PostgreSQL 的 `EXPLAIN ANALYZE` 命令分析 pgvector 索引查询的执行计划和耗时，评估查询性能是否满足要求。
*   调整 FastGPT 的召回条数和单段最大长度，结合 `moonshot-v1-128k` 的上下文长度和引用上限，确保召回内容的总 token 数在合理范围内，并观察模型回答的完整性。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
