---
title: MiniMax 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-minimax01-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "MiniMax 1000K 上下文模型提供了高达 1000000 的上下文长度，这决定了单次请求中可以输入给模型的内容总量。引用上限 `quoteMaxToken` 为 900000，这意味着在模型生成回复时，所有引用的召回内容合计不能超过 900000 token。引用内容的段落条数由检索系统的返"
language: zh
axis_model_tier: "MiniMax / 1000000 /  / 900000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "MiniMax-M3"
check_day: 2026-09-29
meta_title: MiniMax 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: MiniMax 1000K 上下文模型提供了高达 1000000 的上下文长度，这决定了单次请求中可以输入给模型的内容总量。引用上限 `quoteMaxToken` 为 900000，这意味着在模型生成回复时，所有引用的召回内容合计不能超过 900000 token。引用内容的段落条数由检索系统的返
date_published: 2026-09-29
date_modified: 2026-09-29
---

# MiniMax 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
MiniMax 1000K 上下文模型提供了高达 1000000 的上下文长度，这决定了单次请求中可以输入给模型的内容总量。引用上限 `quoteMaxToken` 为 900000，这意味着在模型生成回复时，所有引用的召回内容合计不能超过 900000 token。引用内容的段落条数由检索系统的返回结果决定。模型支持图片输入和工具调用，这表示可以在 RAG 链路中整合多模态信息处理和外部 API 调用能力，从而扩展应用场景。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 连接数据库实例，确保网络可达性。 |
| `ef_construction` | `64` | 构建 HNSW 索引时的邻居数量，影响索引质量和构建时间。 |
| `ef_search` | `40` | 搜索 HNSW 索引时的邻居数量，影响召回率和查询速度。 |
| `m` | `32` | HNSW 索引中每层最大连接数，影响内存占用和查询性能。 |
| `vector_ip_ops` | `true` | 启用内积运算（inner product），适用于测量相似度。 |
| 召回条数 | `前 5 条` | 经验值，需根据实际召回质量和模型上下文预算调整。 |

## 这两者互相约束的地方
MiniMax 1000K 上下文模型的上下文长度与 PostgreSQL（pgvector）召回的文档内容直接相关。召回的文档条数乘以每段的平均 token 长度，其总和必须在模型 1000000 的上下文长度预算之内。引用上限 `quoteMaxToken` 限制了模型在生成回复时可以引用的召回内容总量，以 token 计量。PostgreSQL（pgvector） 返回的是独立文档段落，以条数计量。当每段召回内容的长度较短时，引用上限允许引用更多条文档。当每段召回内容较长时，即使召回条数不多，也可能因为总 token 数触及引用上限。调整 `ef_construction` 和 `ef_search` 等索引参数，可以优化 PostgreSQL（pgvector） 的召回质量和速度，从而更高效地填充模型的上下文。

## 容易做错的三处
- 报错信息显示 `context window exceeded`：召回内容总 token 数或单次请求总 token 数超过了模型 1000000 的上下文长度。
- 最终生成的回复内容中引用部分不完整或缺失：引用内容的 token 总量超过了 900000 的引用上限 `quoteMaxToken`。
- 检索结果与预期不符，相关性较低：`ef_search` 参数设置过小，导致 HNSW 索引搜索范围不足，未能找到最相关的向量。

## 怎么确认配好了
- 通过 FastGPT 平台的日志，检查每次请求的输入 token 数是否在模型上下文长度限制内。
- 观察模型回复中引用的内容是否完整且相关，确认引用内容总 token 未超出 `quoteMaxToken` 限制。
- 运行一组标准测试查询，比较 PostgreSQL（pgvector） 返回的召回条数和召回内容的质量，并与预期阈值进行比对。
- 模拟高并发场景，评估 PostgreSQL（pgvector） 的查询响应时间，确保其在可接受的延迟范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
