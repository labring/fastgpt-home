---
title: Ernie 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-ernie08-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 8K 上下文模型档位提供 8000 token 的上下文长度，决定了单次请求中模型能够处理的输入总量。引用上限为 5000 token，这是用于召回内容填充的预算，即从知识库中检索出的内容，其总 token 数不应超过此限制。单次最大输出未标注，意味着模型可以生成较长回复，但实际长度受限"
language: zh
axis_model_tier: "Ernie / 8000 /  / 5000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "ERNIE-4.0-8K、ERNIE-4.0-Turbo-8K"
check_day: 2026-09-29
meta_title: Ernie 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Ernie 8K 上下文模型档位提供 8000 token 的上下文长度，决定了单次请求中模型能够处理的输入总量。引用上限为 5000 token，这是用于召回内容填充的预算，即从知识库中检索出的内容，其总 token 数不应超过此限制。单次最大输出未标注，意味着模型可以生成较长回复，但实际长度受限
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Ernie 8K 上下文模型档位提供 8000 token 的上下文长度，决定了单次请求中模型能够处理的输入总量。引用上限为 5000 token，这是用于召回内容填充的预算，即从知识库中检索出的内容，其总 token 数不应超过此限制。单次最大输出未标注，意味着模型可以生成较长回复，但实际长度受限于上下文总量和用户提示。此档模型不支持图片输入和工具调用，因此基于这些功能的复杂 RAG 链路不适用于此配置。理解这些参数有助于合理规划检索策略和内容组织，确保模型高效运行。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :--- | :--- | :--- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 连接数据库的必要参数，包含认证信息和地址。 |
| `ef_construction` | `64` | HNSW 索引构建时的邻居数量，影响索引质量和构建速度。 |
| `ef_search` | `40` | HNSW 索引搜索时的邻居数量，影响召回率和查询速度。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响内存占用和查询性能。 |
| `vector_ip_ops` | `true` | 启用内积（Inner Product）操作符，适应某些嵌入模型输出。 |
| 检索返回条数 | `3-5` 条 | 基于引用上限和单段平均 token 数，平衡召回质量与上下文预算。 |

## 这两者互相约束的地方
召回条数与每段内容的长度共同决定了填充到模型上下文中的总 token 数。Ernie 8K 上下文模型具有 8000 token 的上下文预算，其中 5000 token 专用于引用内容。PostgreSQL（pgvector）返回的是离散的向量条目，而模型引用上限是 token 预算。这意味着，如果单段内容较短，可以在 5000 token 预算内召回更多条目；如果单段内容很长，则可能在少数条目时就达到引用上限。向量库的索引参数，例如 `ef_construction` 和 `ef_search`，调大后可以提升检索的准确性和召回率，这对于确保模型能获取到高质量的引用信息至关重要。然而，过高的参数值会增加索引构建和查询的计算开销，需要根据实际性能进行权衡。

## 容易做错的三处
*   错误信息提示 `Context window exceeded`：召回内容总 token 数超出了模型的上下文长度限制。
*   检索结果为空或不相关：`ef_search` 参数设置过低，导致 HNSW 索引在查询时无法有效探索邻居节点。
*   响应时间过长：`ef_construction` 或 `m` 参数设置过高，导致索引构建或查询阶段耗时过长。

## 怎么确认配好了
*   提交一个测试问题，检查 FastGPT 界面中“引用”区域显示的内容是否完整、相关，且未出现截断。
*   在 PostgreSQL 数据库中执行 `SELECT * FROM pg_stat_activity WHERE datname = 'your_database_name';` 观察连接状态，确认 `PG_URL` 配置正确。
*   通过 FastGPT 的日志输出，观察每次请求的召回条数和引用 token 消耗，确保其在模型 `quoteMaxToken` 限制内。
*   针对特定查询，在 pgvector 中直接执行相似度搜索，对比返回的向量与 FastGPT 中模型引用的内容是否一致。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
