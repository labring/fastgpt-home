---
title: Moonshot 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-moonshot04-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot 32K 上下文模型提供了 32000 token 的上下文长度，这决定了单次请求中可以输入给模型的最大文本量，包括用户查询和召回内容。引用上限为 32000 token，意味着模型在生成回复时可引用的召回内容总和不能超过此限制。工具调用功能的支持，允许模型与外部系统进行交互，执行特"
language: zh
axis_model_tier: "Moonshot / 32000 /  / 32000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "moonshot-v1-32k"
check_day: 2026-09-29
meta_title: Moonshot 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Moonshot 32K 上下文模型提供了 32000 token 的上下文长度，这决定了单次请求中可以输入给模型的最大文本量，包括用户查询和召回内容。引用上限为 32000 token，意味着模型在生成回复时可引用的召回内容总和不能超过此限制。工具调用功能的支持，允许模型与外部系统进行交互，执行特
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Moonshot 32K 上下文模型提供了 32000 token 的上下文长度，这决定了单次请求中可以输入给模型的最大文本量，包括用户查询和召回内容。引用上限为 32000 token，意味着模型在生成回复时可引用的召回内容总和不能超过此限制。工具调用功能的支持，允许模型与外部系统进行交互，执行特定操作。图片输入功能为 `false`，表示此模型不支持直接处理图像数据。这些特性共同构成了模型在 RAG 应用中的行为边界。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项             | 建议取法       | 这样取的依据                                                 |
| ------------------ | -------------- | ------------------------------------------------------------ |
| `PG_URL`           | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限正确。                 |
| `ef_construction`  | `100`–`200`    | 索引构建时的邻居数量，影响索引质量和构建时间，越大越精确。 |
| `ef_search`        | `50`–`150`     | 查询时的邻居数量，影响搜索召回率和查询速度，越大越精确。   |
| `m`                | `32`           | HNSW 算法中每个节点的最大连接数，影响索引结构和查询性能。  |
| `vector_ip_ops`    | `true`         | 启用内积操作，适用于衡量向量相似度。                       |
| 召回条数           | `5`–`10` 条    | 初始建议值，需根据实际场景和引用上限调整。                 |

## 这两者互相约束的地方
Moonshot 32K 上下文模型的上下文长度与引用上限，对 PostgreSQL（pgvector）的召回策略有直接影响。向量库检索到的段落总数与每段内容的长度，其总和不能超出模型的上下文长度预算。引用上限是针对引用内容总 token 数的限制，而向量库返回的是固定数量的段落。因此，实际能够引用的段落数量取决于每段内容的平均 token 长度。如果单段内容较长，即使召回条数不多，也可能率先触及引用上限；反之，如果段落较短，则可以引用更多条目。在 PostgreSQL（pgvector）中，`ef_construction` 和 `ef_search` 等索引参数的调整，会影响召回的准确性和速度，进而影响模型接收到的信息质量，但不会直接改变模型本身的 token 限制。

## 容易做错的三处
*   日志中出现 `PG::ConnectionBad: could not connect to server`：通常是 `PG_URL` 配置错误，导致 FastGPT 无法连接到 PostgreSQL 数据库。
*   模型回复中未包含关键信息，或回复质量不佳：`ef_search` 或 `ef_construction` 参数设置过低，导致向量检索召回率不足，未能提供足够的相关上下文。
*   模型回复被截断，或返回 `token_limit_exceeded` 错误：召回的文本内容总 token 数超出了 Moonshot 32K 上下文模型的引用上限，或者总输入超出了上下文长度。

## 怎么确认配好了
*   执行一次包含复杂查询的 RAG 流程，检查 FastGPT 界面中展示的引用内容是否准确且完整，并与原始文档进行比对。
*   使用 `EXPLAIN ANALYZE` 命令分析 PostgreSQL 中向量查询的执行计划，确认 `hnsw` 索引被正确使用，并关注查询时间是否在可接受范围内。
*   逐步增加或减少向量召回条数，观察模型输出的质量和长度变化，以确定合适的召回数量，使其既能提供足够信息，又不超过模型的引用上限。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
