---
title: Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-ernie05-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型提供了高达 128000 token 的上下文长度，这意味着在单次对话中可以处理大规模的输入信息，为复杂的问答和长篇文档分析提供了充足的空间。`引用上限` 为 123000 token，这是模型处理引用内容的预算，确保了召回的知识内容能够被模型有效利用。模型支持图片输"
language: zh
axis_model_tier: "Ernie / 128000 /  / 123000 / true / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "ernie-4.5-turbo-vl"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Ernie 128K 上下文模型提供了高达 128000 token 的上下文长度，这意味着在单次对话中可以处理大规模的输入信息，为复杂的问答和长篇文档分析提供了充足的空间。`引用上限` 为 123000 token，这是模型处理引用内容的预算，确保了召回的知识内容能够被模型有效利用。模型支持图片输
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型提供了高达 128000 token 的上下文长度，这意味着在单次对话中可以处理大规模的输入信息，为复杂的问答和长篇文档分析提供了充足的空间。`引用上限` 为 123000 token，这是模型处理引用内容的预算，确保了召回的知识内容能够被模型有效利用。模型支持图片输入，使其能够处理多模态信息，但不支持工具调用，因此在集成时需要注意其功能边界。引用上限限制了引用内容的总 token 数量，召回条数则由检索系统决定。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的标准格式，确保数据库可访问。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量与构建速度。过小影响召回率，过大增加构建时间。 |
| `ef_search` | `40` | HNSW 索引查询参数，影响查询召回率与查询速度。过小可能漏召，过大增加查询耗时。 |
| `m` | `32` | HNSW 索引的邻居数参数，影响索引密度和召回精度。通常取值在 16-64 之间。 |
| `vector_ip_ops` | `true` | 启用向量内积操作优化，提升相似度计算效率。 |
| `max_connections` | 按实测标定 | 数据库连接池的最大连接数，需根据 FastGPT 并发量和数据库承载能力进行调整。 |

## 这两者互相约束的地方
模型 128000 token 的上下文预算是总容量，它需要容纳用户输入、系统指令、历史对话以及召回的引用内容。召回条数与每段内容的长度共同决定了引用内容的总 token 量，这个总量不能超过 123000 token 的引用上限。例如，如果每段召回内容平均 500 token，那么最多可以引用约 246 段。向量库返回的是固定数量的段落，而模型引用内容的预算是按 token 计数的。当每段内容较短时，引用上限允许引用更多段落；当每段内容较长时，引用上限则会限制可引用的段落数量。`ef_construction` 和 `ef_search` 等索引参数调大，通常会提高召回的准确性，这意味着模型能够获得更高质量的引用内容，从而提升回答的精确性，但也可能带来索引构建和查询时间的增加。

## 容易做错的三处
*   日志显示 `PG_URL` 连接失败，原因是数据库地址、端口或认证信息配置错误。
*   检索结果返回的段落相关性差，原因是 `ef_construction` 或 `ef_search` 参数设置过低，导致 HNSW 索引构建或查询精度不足。
*   知识库查询耗时过长，原因是 `m` 参数设置过大，增加了索引的维护成本和查询时的计算量。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面上传文档，观察是否能正常分段并成功向量化入库，检查入库日志是否有错误。
*   使用 FastGPT 的知识库检索功能，输入与文档内容相关的问题，检查返回的召回条数和内容是否与预期相符，判断召回质量。
*   监控 PostgreSQL 数据库的 CPU、内存和 I/O 使用率，确保在 FastGPT 进行大量知识库操作时数据库性能稳定，没有出现资源瓶颈。
*   通过 FastGPT 的模型调用日志，观察模型处理带有引用内容的请求时，`quoteMaxToken` 是否得到有效利用，且没有出现因引用内容过长而导致的截断或报错。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
