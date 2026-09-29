---
title: SparkDesk 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-sparkdesk03-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "SparkDesk `pro-128k` 模型提供了 128000 的上下文长度，这意味着在单次请求中可以输入大量信息。这直接影响了知识库召回内容的数量和长度，确保模型能接收到充足的背景信息进行推理。引用上限同样为 128000，表明模型在生成回答时可以引用等量的原始文本段落。此模型不支持图片输入和"
language: zh
axis_model_tier: "SparkDesk / 128000 /  / 128000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "pro-128k"
check_day: 2026-09-29
meta_title: SparkDesk 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: SparkDesk `pro-128k` 模型提供了 128000 的上下文长度，这意味着在单次请求中可以输入大量信息。这直接影响了知识库召回内容的数量和长度，确保模型能接收到充足的背景信息进行推理。引用上限同样为 128000，表明模型在生成回答时可以引用等量的原始文本段落。此模型不支持图片输入和
date_published: 2026-09-29
date_modified: 2026-09-29
---

# SparkDesk 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
SparkDesk `pro-128k` 模型提供了 128000 的上下文长度，这意味着在单次请求中可以输入大量信息。这直接影响了知识库召回内容的数量和长度，确保模型能接收到充足的背景信息进行推理。引用上限同样为 128000，表明模型在生成回答时可以引用等量的原始文本段落。此模型不支持图片输入和工具调用，因此，基于此模型构建的 FastGPT 应用不会涉及多模态输入处理或外部 API 调用链路。单次最大输出未标注，但通常会根据模型能力和应用场景进行动态调整，以平衡响应速度和信息完整性。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的必要配置，包含认证信息和数据库位置。 |
| `ef_construction` | `64` | HNSW 索引构建时的参数，影响索引质量和构建时间。此值在 16-128 之间，64 是一个在查询性能和索引大小之间取得平衡的常用值。 |
| `ef_search` | `40` | HNSW 索引查询时的参数，影响搜索召回率和查询速度。此值应大于等于 `k` (召回条数)，40 旨在保证较高的召回准确性。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数。此值在 4-64 之间，32 是一个在内存占用和查询效率之间取得较好平衡的常用设置。 |
| `vector_ip_ops` | `true` | pgvector 向量计算使用内积（inner product）操作，适用于 FastGPT 默认的语义相似度计算。 |
| 召回条数 | `15` | 基于 128K 上下文长度，为保证模型能处理足够多的引用信息，同时避免上下文溢出。 |

## 这两者互相约束的地方
SparkDesk `pro-128k` 模型的 128000 上下文长度与 PostgreSQL（pgvector） 的召回策略紧密相关。召回条数与每段知识的平均长度之积不应超过模型的上下文预算，否则会导致输入截断，影响模型对上下文的理解。模型的引用上限决定了 FastGPT 在最终回答中能展示的引用段落最大数量，即使 pgvector 返回了更多条目，FastGPT 也会在此上限处进行截断。因此，pgvector 的召回条数设置应与模型的引用上限和上下文长度综合考虑。如果 `ef_construction` 和 `ef_search` 参数设置过大，虽然可能提高召回准确性，但会增加索引构建时间、内存占用以及查询延迟，这可能在处理高并发请求时对模型的响应速度产生负面影响。

## 容易做错的三处
- 日志中出现 `context window exceeded` 错误：原因在于召回的知识段落总长度超过了模型 128000 的上下文限制。
- 搜索结果相关性不足，但数据库中有相关知识：原因可能是 `ef_search` 参数设置过小，导致 pgvector 在搜索时未能充分探索 HNSW 图，遗漏了相关向量。
- 向量查询耗时过长，导致接口超时：原因可能是 `ef_construction` 或 `m` 参数设置不当，或者索引未正确建立，导致 pgvector 无法高效执行向量搜索。

## 怎么确认配好了
- 通过 FastGPT 管理界面，上传测试知识库并进行问答，观察模型能否正确引用知识库内容，并检查引用的段落数量是否符合预期。
- 监控 PostgreSQL 数据库的查询日志，确认 pgvector 索引被正确使用，并且向量查询的平均响应时间在可接受范围内。
- 在 FastGPT 的模型配置中，调整召回条数，通过实际测试观察模型回答的完整性和相关性变化，以此确定一个合适的召回条数阈值。
- 使用 `EXPLAIN ANALYZE` 命令在 PostgreSQL 中执行 pgvector 查询，分析查询计划和执行时间，确保索引优化生效。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
