---
title: Hunyuan 1024K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-hunyuan01-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan `hy4-preview` 模型提供 1024000 token 的上下文长度，这意味着在单次对话中可以处理大量历史信息和检索内容。引用上限为 960000 token，这部分预算专用于承载从知识库中召回并插入到提示词中的内容。引用内容合计占据的 token 数量由引用上限限定。段落"
language: zh
axis_model_tier: "Hunyuan / 1024000 /  / 960000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "hy4-preview"
check_day: 2026-09-29
meta_title: Hunyuan 1024K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Hunyuan `hy4-preview` 模型提供 1024000 token 的上下文长度，这意味着在单次对话中可以处理大量历史信息和检索内容。引用上限为 960000 token，这部分预算专用于承载从知识库中召回并插入到提示词中的内容。引用内容合计占据的 token 数量由引用上限限定。段落
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 1024K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么

Hunyuan `hy4-preview` 模型提供 1024000 token 的上下文长度，这意味着在单次对话中可以处理大量历史信息和检索内容。引用上限为 960000 token，这部分预算专用于承载从知识库中召回并插入到提示词中的内容。引用内容合计占据的 token 数量由引用上限限定。段落条数由检索侧的返回条数决定，两者是不同的量。模型支持工具调用，允许与外部系统进行交互以执行特定任务。不支持图片输入，提示词中无法直接嵌入图像信息。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的必要参数，确保数据库可访问。 |
| `ef_construction` | `64` | 影响 HNSW 索引构建时的图质量，值越大索引质量越高，召回准确率越好，但构建时间增加。 |
| `ef_search` | `32` | 影响 HNSW 索引查询时的搜索范围，值越大召回率越高，但查询耗时增加。 |
| `m` | `32` | HNSW 索引中每个节点的最大邻居数，影响索引大小和查询性能。 |
| `vector_ip_ops` | `true` | pgvector 启用向量内积操作，与 FastGPT 的向量相似度计算方式保持一致。 |
| 索引类型 | `hnsw` | 提供较好的召回性能和查询效率，适用于大规模向量检索。 |

## 这两者互相约束的地方

Hunyuan `hy4-preview` 模型 1024000 token 的上下文长度，是模型处理所有输入（包括用户提问、历史对话和召回内容）的总和上限。引用上限 960000 token 专门用于检索到的知识内容。向量库返回的是固定数量的段落，每段内容的长度决定了这些段落总共占据多少 token。当召回的段落总 token 数超过引用上限时，模型将截断部分引用内容。当索引参数 `ef_construction` 和 `ef_search` 值调大时，pgvector 的召回准确率和召回率会提升。这意味着模型能获得更相关的知识片段，从而提升回答质量，但也可能增加索引构建和查询的延迟。

## 容易做错的三处

*   日志显示 `Error: Context window exceeded`：召回内容加上用户输入与历史对话，总 token 数超过 1024000。
*   模型返回的回答内容过短或不完整：引用内容总 token 数超过 960000，导致关键信息被截断。
*   检索结果相关性差，模型回答质量低：`ef_search` 参数设置过低，导致 pgvector 检索时未能充分探索相似向量空间。

## 怎么确认配好了

*   在 FastGPT 知识库管理界面，上传文档并进行向量化，观察向量化任务状态码是否为 `200`。
*   通过 FastGPT 的调试功能，输入测试问题，查看模型返回的引用内容是否包含预期知识点，并检查引用内容总 token 数。
*   使用 pgAdmin 或 psql 连接 PostgreSQL 数据库，查询 `pg_stat_statements` 表，分析 `hnsw` 索引的查询耗时，确保其在可接受范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
