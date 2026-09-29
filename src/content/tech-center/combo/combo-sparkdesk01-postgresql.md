---
title: SparkDesk 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-sparkdesk01-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "SparkDesk 32K 档位模型提供了 32000 的上下文长度（`maxContext`），这意味着单次请求中可以包含的输入内容总量（指令、历史对话、召回内容等）上限。虽然单次最大输出未明确标注，但在实际应用中，应预留足够的上下文空间给模型生成回复。引用上限（`quoteMaxToken`）为"
language: zh
axis_model_tier: "SparkDesk / 32000 /  / 32000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "lite、max-32k"
check_day: 2026-09-29
meta_title: SparkDesk 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: SparkDesk 32K 档位模型提供了 32000 的上下文长度（`maxContext`），这意味着单次请求中可以包含的输入内容总量（指令、历史对话、召回内容等）上限。虽然单次最大输出未明确标注，但在实际应用中，应预留足够的上下文空间给模型生成回复。引用上限（`quoteMaxToken`）为
date_published: 2026-09-29
date_modified: 2026-09-29
---

# SparkDesk 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么

SparkDesk 32K 档位模型提供了 32000 的上下文长度（`maxContext`），这意味着单次请求中可以包含的输入内容总量（指令、历史对话、召回内容等）上限。虽然单次最大输出未明确标注，但在实际应用中，应预留足够的上下文空间给模型生成回复。引用上限（`quoteMaxToken`）为 32000，这指定了召回内容在整个上下文中所能占据的 token 预算。它不直接限制召回的段落数量，而是限制了所有召回段落的总 token 数。工具调用与图片输入功能为 `false`，表明此档模型不具备直接执行外部工具或处理图像信息的能力，相关功能需在应用层实现。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限。 |
| `ef_construction` | `80` | 控制 HNSW 索引构建时的图连接数量，影响索引质量和构建速度。 |
| `ef_search` | `60` | 控制 HNSW 索引查询时的邻居搜索范围，影响召回精度和查询速度。 |
| `m = 32` | `32` | HNSW 索引中每个节点的最大连接数，平衡内存占用与查询性能。 |
| `vector_ip_ops` | `true` | 启用内积操作，与模型嵌入向量的相似度计算方式保持一致。 |
| 召回条数 | `5-8 条` | 结合引用上限和单段平均长度，在保证信息丰富度与避免截断间取得平衡。 |

## 这两者互相约束的地方

SparkDesk 32K 模型的 32000 上下文长度是总预算，其中 32000 的引用上限（`quoteMaxToken`）专门用于召回内容。这意味着向量库返回的召回条数乘以每段内容的平均 token 数，必须在 32000 token 的预算内。如果向量库返回过多条目或每段内容过长，召回内容在被送入模型前可能被截断。引用上限是 token 预算，而向量库返回的是条数，两者不是直接对应的量。具体是引用上限先触顶还是召回条数先触顶，取决于召回内容每段的实际 token 长度。PostgreSQL（pgvector）的 `ef_construction` 和 `ef_search` 参数调大，可以提高向量召回的精度，从而可能减少所需召回的条数以达到相同的信息密度，进而更好地利用模型的引用上限。

## 容易做错的三处

*   模型返回 `Context length exceeded` 错误码，原因是召回内容加上指令和历史对话的总 token 数超出了 32000 的上下文限制。
*   召回结果与预期不符，内容相关性差，可能是 PostgreSQL（pgvector）的 `ef_search` 参数设置过小，导致查询时搜索范围不足。
*   RAG 流程中模型回答信息不全或出现截断，因为引用内容虽然被召回，但其总 token 数超过了 `quoteMaxToken` 的 32000 预算，部分内容被丢弃。

## 怎么确认配好了

*   通过 FastGPT 的调试界面，观察每次 RAG 请求中实际送入模型的召回内容 token 数，确认其未超过 32000 的引用上限。
*   针对特定查询，检查 PostgreSQL（pgvector）返回的向量召回条目，并人工评估其相关性，判断 `ef_search` 参数是否合适。阈值应定为能有效支撑模型回答关键信息所需的相关条目数量。
*   在 FastGPT 中进行多次问答测试，观察模型回答的完整性和准确性，特别是涉及到需要大量背景知识的问题，以验证召回与模型结合的效果。
*   监控 PostgreSQL 数据库的查询延迟，确保在 `ef_search` 和 `ef_construction` 参数设置下，向量检索能满足应用响应时间的要求。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
