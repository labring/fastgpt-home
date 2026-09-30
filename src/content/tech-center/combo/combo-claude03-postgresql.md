---
title: Claude 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-claude03-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`claude-sonnet-4-5-20250929` 模型的上下文长度高达 1,000,000 token，这意味着单次请求可以处理极大规模的输入信息，包括历史对话、召回文档内容等。引用上限 `quoteMaxToken` 为 100,000 token，用于限定模型在生成回答时可以参考的召回内"
language: zh
axis_model_tier: "Claude / 1000000 /  / 100000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "claude-sonnet-4-5-20250929"
check_day: 2026-09-29
meta_title: Claude 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `claude-sonnet-4-5-20250929` 模型的上下文长度高达 1,000,000 token，这意味着单次请求可以处理极大规模的输入信息，包括历史对话、召回文档内容等。引用上限 `quoteMaxToken` 为 100,000 token，用于限定模型在生成回答时可以参考的召回内
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Claude 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`claude-sonnet-4-5-20250929` 模型的上下文长度高达 1,000,000 token，这意味着单次请求可以处理极大规模的输入信息，包括历史对话、召回文档内容等。引用上限 `quoteMaxToken` 为 100,000 token，用于限定模型在生成回答时可以参考的召回内容的token总量。这与召回的文档条数是两个不同的维度，向量库返回的是文档条数，而模型消耗的是这些文档内容的 token 数量。该模型支持图片输入 `true`，允许在对话中融入视觉信息进行理解和推理。同时，工具调用 `true` 表示模型能够与外部工具进行交互，扩展其处理复杂任务的能力。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的统一入口，需包含认证信息。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量和构建时间。此值越大，索引质量越高，但构建时间越长。 |
| `ef_search` | `64` | HNSW 索引查询参数，影响查询召回率和查询速度。此值越大，召回率越高，但查询速度越慢。 |
| `m` | `32` | HNSW 索引的邻居数量参数，影响索引结构紧密程度。此值越大，索引占用空间越大，但查询效率可能更高。 |
| `vector_ip_ops` | `true` | pgvector 向量操作类型，设置为 `true` 表示使用内积距离（Inner Product），符合一般语义相似度计算需求。 |
| 召回条数 | `5-10` 条 | 在引用上限和单段长度约束下，平衡召回数量与模型处理效率。 |

## 这两者互相约束的地方
模型上下文长度是总输入预算，召回条数乘以每段文本的 token 长度，必须控制在这个总预算之内。当 `claude-sonnet-4-5-20250929` 的引用上限 `quoteMaxToken` 为 100,000 token 时，向量库返回的文档条数与每条文档的平均 token 长度共同决定了实际消耗的引用 token 量。如果每段文档的平均 token 长度较长，即使召回条数不多，也可能迅速触及引用上限。反之，如果每段文档较短，则可以召回更多条文档。pgvector 的 `ef_construction` 和 `ef_search` 参数调大，能提升向量搜索的召回准确性，这对于大上下文模型而言，意味着能更精准地从海量信息中提取相关内容，从而更有效地利用其巨大的上下文处理能力，避免将大量不相关信息送入模型。

## 容易做错的三处
*   模型返回截断或生成内容不完整：引用内容总 token 量超过了 `quoteMaxToken`，导致模型在生成回答时被迫提前结束。
*   召回结果不准确或相关性差：`ef_search` 参数设置过小，导致 pgvector 在搜索时未能充分探索邻近向量，遗漏了高度相关的文档。
*   数据库查询超时或性能下降：`ef_construction` 参数设置过大，导致索引构建时间过长或更新效率低下，影响了数据库的整体响应速度。

## 怎么确认配好了
*   在 FastGPT 知识库中，上传大量文档后，观察知识库索引构建过程是否正常完成，并检查是否有报错信息。
*   通过 FastGPT 的调试界面，进行多次模拟对话，观察模型返回的引用内容是否与召回的文档相关，并评估引用内容的完整性。
*   在 PostgreSQL 数据库中，通过 `EXPLAIN ANALYZE` 命令分析涉及 `pgvector` 索引的查询语句，检查查询计划和执行时间，判断 `ef_search` 和 `m` 参数是否达到了预期的查询效率。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
