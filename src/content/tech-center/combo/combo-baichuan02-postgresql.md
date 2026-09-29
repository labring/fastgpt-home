---
title: Baichuan 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-baichuan02-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`Baichuan3-Turbo-128k` 模型拥有 128000 的上下文长度，这意味着在单次交互中可以处理大量的输入信息。引用上限为 100000 token，这是对模型在生成回答时可以参考的引用内容的总体预算。模型在生成答案时，会从检索到的内容中选择不超过此上限的 token 量进行引用。工"
language: zh
axis_model_tier: "Baichuan / 128000 /  / 100000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "Baichuan3-Turbo-128k"
check_day: 2026-09-29
meta_title: Baichuan 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `Baichuan3-Turbo-128k` 模型拥有 128000 的上下文长度，这意味着在单次交互中可以处理大量的输入信息。引用上限为 100000 token，这是对模型在生成回答时可以参考的引用内容的总体预算。模型在生成答案时，会从检索到的内容中选择不超过此上限的 token 量进行引用。工
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Baichuan 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`Baichuan3-Turbo-128k` 模型拥有 128000 的上下文长度，这意味着在单次交互中可以处理大量的输入信息。引用上限为 100000 token，这是对模型在生成回答时可以参考的引用内容的总体预算。模型在生成答案时，会从检索到的内容中选择不超过此上限的 token 量进行引用。工具调用能力表明模型可以与外部工具集成以扩展其功能，而 `图片输入 false` 则表示模型不直接支持图像作为输入。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :----- | :----- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接的标准化 URI 格式，确保正确连接到 pgvector 实例。 |
| `ef_construction` | `64` | HNSW 索引构建时的邻居数量，影响索引质量与构建时间，通常取 `16` 到 `256`。 |
| `ef_search` | `40` | HNSW 索引查询时的搜索范围，影响查询召回率与查询速度，通常取 `ef_construction` 的 `1` 到 `2` 倍。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响索引大小和查询性能，通常取 `4` 到 `64`。 |
| `vector_ip_ops` | `true` | 启用向量内积操作，用于计算向量相似度，确保向量检索功能正常。 |
| 检索召回条数 | `15–20` 条 | 结合模型引用上限和单段平均长度，平衡召回质量与上下文预算。 |

## 这两者互相约束的地方
模型的 128000 token 上下文长度是总容量，其中一部分用于用户查询和模型回复，另一部分用于引用检索到的内容。引用上限 100000 token 限制了引用内容的总量。向量库检索返回的是若干条文档段落，每条段落包含一定数量的 token。当每条段落的 token 数量较少时，可以引用更多条段落；当每条段落 token 数量较多时，即使召回条数不多，也可能很快触及引用上限。因此，需要根据实际文档段落的平均 token 数量来决定向量库的检索召回条数，以避免因引用内容过长而超出模型引用预算。PostgreSQL（pgvector）的索引参数如 `ef_construction` 和 `ef_search` 调大，会提升向量检索的精度和召回率，意味着向量库能提供更相关的段落，这有助于模型在引用上限内获取高质量信息。

## 容易做错的三处
*   检索结果为空或不相关：向量索引未正确构建，或者向量嵌入模型与查询嵌入模型不一致。
*   模型回答出现截断：引用内容加上用户查询和模型自身回复超过了 128000 的上下文长度限制。
*   数据库连接错误：`PG_URL` 配置不正确，导致无法连接到 PostgreSQL 数据库或 pgvector 扩展未启用。

## 怎么确认配好了
*   执行一次包含向量检索的问答流程，检查模型是否成功引用了相关内容。
*   在 PostgreSQL 数据库中，通过 `SELECT * FROM pg_stat_activity WHERE datname = 'your_database_name';` 检查是否有活跃的 FastGPT 连接。
*   使用 `EXPLAIN ANALYZE` 语句检查 pgvector 索引查询的执行计划，确认 HNSW 索引被正确使用。
*   观察日志输出，确认没有关于上下文长度超出或引用上限触及的警告信息。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
