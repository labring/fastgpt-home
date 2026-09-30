---
title: Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-ernie01-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型，其上下文长度 `maxContext` 达到 128000 tokens，这决定了单次模型调用能够处理的输入信息量上限。引用上限 `quoteMaxToken` 为 119000 tokens，这意味着模型在生成回答时，用于引用相关上下文内容的 token 总量不能"
language: zh
axis_model_tier: "Ernie / 128000 /  / 119000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "ernie-5.1"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Ernie 128K 上下文模型，其上下文长度 `maxContext` 达到 128000 tokens，这决定了单次模型调用能够处理的输入信息量上限。引用上限 `quoteMaxToken` 为 119000 tokens，这意味着模型在生成回答时，用于引用相关上下文内容的 token 总量不能
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么

Ernie 128K 上下文模型，其上下文长度 `maxContext` 达到 128000 tokens，这决定了单次模型调用能够处理的输入信息量上限。引用上限 `quoteMaxToken` 为 119000 tokens，这意味着模型在生成回答时，用于引用相关上下文内容的 token 总量不能超过此限制。工具调用 `true` 表示模型支持集成外部工具以扩展能力，图片输入 `false` 则说明模型当前不支持直接处理图像信息。模型单次最大输出未标注，通常由平台或应用层决定。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项             | 建议取法       | 这样取的依据                                                 |
| :----------------- | :------------- | :----------------------------------------------------------- |
| `PG_URL`           | `postgresql://user:password@host:port/database` | 数据库连接的规范格式，确保应用能正确连接到 pgvector 实例。 |
| `ef_construction`  | `100`–`200`    | 构建 HNSW 索引时，搜索邻居的数量。值越大，索引质量越高，构建时间越长。 |
| `ef_search`        | `60`–`120`     | HNSW 索引查询时，搜索邻居的数量。值越大，召回率越高，查询时间越长。 |
| `m`                | `32`           | HNSW 索引中每个节点的最大连接数。影响内存占用和查询性能。  |
| `vector_ip_ops`    | `true`         | 启用内积操作，适用于计算向量相似度，例如余弦相似度。       |
| `max_connections`  | `100`–`200`    | PostgreSQL 允许的最大并发连接数，需根据应用并发量调整。    |

## 这两者互相约束的地方

Ernie 128K 上下文模型与 PostgreSQL（pgvector）的集成，核心在于如何平衡模型输入限制与向量检索结果。模型上下文预算 128000 tokens，其中引用上限 119000 tokens，意味着召回内容总和不能超出此范围。向量库返回的是固定数量的条目，每条内容长度不一。引用上限按 token 计数，而向量库返回按条数计数，谁先达到限制取决于每段内容的平均 token 长度。例如，如果每段内容平均 500 tokens，那么 119000 tokens 的引用上限允许引用大约 238 段内容。

PostgreSQL（pgvector）的索引参数，如 `ef_construction` 和 `ef_search`，调大后可以提高检索的召回率和准确性。这意味着向量库能更精确地找到与查询最相关的文档片段。对于 Ernie 128K 上下文模型而言，接收到高质量的召回内容，有助于模型更好地理解上下文并生成更准确的回答。同时，如果召回的条目过多或过长，可能会触及模型的引用上限，导致部分内容被截断。因此，在配置 `ef_search` 时，需要权衡召回质量与最终传递给模型的 token 数量。

## 容易做错的三处

*   模型返回的回答内容不完整：原因是召回条目总 token 数超过了 `quoteMaxToken` 限制，导致模型在处理时截断了部分内容。
*   向量检索结果相关性差：原因是 `ef_search` 参数设置过低，导致 HNSW 索引在查询时搜索的邻居数量不足，未能找到最相关的向量。
*   PostgreSQL 数据库连接超时：原因是 `max_connections` 参数设置过小，无法承载高并发请求，导致新的连接请求被拒绝。

## 怎么确认配好了

*   通过 FastGPT 后台的调试工具，观察模型实际接收到的上下文 token 数量，确保其未超出 `quoteMaxToken`。
*   在 PostgreSQL 数据库中，执行 `SELECT * FROM pg_stat_activity;` 命令，检查当前活跃连接数是否在 `max_connections` 限制内，且无大量空闲连接。
*   使用 FastGPT 的测试集或自定义查询，评估模型回答的相关性和完整性，并检查 `pg_stat_statements` 视图来分析 pgvector 查询的性能。
*   在 FastGPT 知识库管理页面，上传具有代表性的文档，并进行多次检索测试，验证返回的向量条目与预期相关性是否一致。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
