---
title: MiniMax 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-minimax06-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "MiniMax-Text-01 模型提供了高达 1000000 token 的上下文长度，这意味着在单次交互中可以处理非常大量的历史对话和召回内容。尽管单次最大输出未标注，但通常足以支持复杂的回答和内容生成。引用上限为 90000 token，这限定了模型在生成回复时可以引用的外部知识内容的总 to"
language: zh
axis_model_tier: "MiniMax / 1000000 /  / 90000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "MiniMax-Text-01"
check_day: 2026-09-29
meta_title: MiniMax 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: MiniMax-Text-01 模型提供了高达 1000000 token 的上下文长度，这意味着在单次交互中可以处理非常大量的历史对话和召回内容。尽管单次最大输出未标注，但通常足以支持复杂的回答和内容生成。引用上限为 90000 token，这限定了模型在生成回复时可以引用的外部知识内容的总 to
date_published: 2026-09-29
date_modified: 2026-09-29
---

# MiniMax 1000K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
MiniMax-Text-01 模型提供了高达 1000000 token 的上下文长度，这意味着在单次交互中可以处理非常大量的历史对话和召回内容。尽管单次最大输出未标注，但通常足以支持复杂的回答和内容生成。引用上限为 90000 token，这限定了模型在生成回复时可以引用的外部知识内容的总 token 预算。段落条数由检索系统的返回结果决定，引用上限与段落条数是两个独立的概念。此模型不支持图片输入和工具调用，因此在应用设计时无需考虑多模态输入或外部工具集成。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的必要参数，包含认证信息。 |
| `ef_construction` | `64` | HNSW 索引构建时的邻居搜索参数，影响索引质量与构建速度，64 是一个平衡值。 |
| `ef_search` | `64` | HNSW 索引查询时的邻居搜索参数，影响查询召回率和速度，64 在精度与性能间取得平衡。 |
| `m` | `32` | HNSW 索引每层最大连接数，影响索引大小和查询性能，32 是一个常见的有效配置。 |
| `vector_ip_ops` | `true` | 使用内积（Inner Product）作为向量相似度度量，与大多数嵌入模型兼容。 |

## 这两者互相约束的地方
MiniMax-Text-01 模型 1000000 token 的上下文长度为 RAG 提供了充足的空间。然而，召回条数与每段内容的长度共同决定了最终占用的上下文 token 量，召回条数乘以每段长度的总和不能超出模型的上下文预算。引用上限 90000 token 是模型可以引用的外部知识的总量限制。向量库返回的是固定数量的段落，每段内容的 token 长度决定了这些段落能否在引用上限内被充分利用。如果每段内容过长，可能导致在达到引用上限时只能引用少数几段；如果每段内容较短，可以在引用上限内引用更多段落。PostgreSQL（pgvector）的索引参数调大，如 `ef_construction` 和 `ef_search`，可以提高向量召回的精度，这意味着模型能获取到更相关的上下文信息，从而提升回答质量，但也可能略微增加查询延迟。

## 容易做错的三处
*   日志显示「token budget exceeded for quote」，原因是对接 FastGPT 的检索器返回了过多的内容，超出了 MiniMax 模型 90000 token 的引用上限。
*   查询结果返回的段落数量少于预期，原因是 `ef_search` 参数配置过小，导致 HNSW 索引在查询时未能充分探索邻居，召回率下降。
*   数据库连接超时，原因是 `PG_URL` 配置中的主机或端口信息有误，无法正确建立与 PostgreSQL 数据库的连接。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传文档并观察其分段数量和每段的平均 token 数，以此估算单次查询可能占用的引用 token 量。
*   在 FastGPT 调试界面进行多次问答测试，观察模型回答的质量，并检查引用内容是否完整且相关，以此判断 `ef_search` 参数是否合理。
*   通过 FastGPT 的数据库连接状态检查功能，确认 `PG_URL` 配置能够成功连接到 PostgreSQL 数据库，并能正常读写向量数据。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
