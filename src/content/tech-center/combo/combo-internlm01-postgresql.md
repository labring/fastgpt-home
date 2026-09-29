---
title: InternLM 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-internlm01-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`internlm2-pro-chat` 和 `internlm3-8b-instruct` 这一档模型具备 32000 token 的上下文长度，这意味着在单次交互中，模型能够处理和理解的输入信息量较大，为集成更多召回内容提供了空间。引用上限同样为 32000 token，这决定了知识库召回的段落"
language: zh
axis_model_tier: "InternLM / 32000 /  / 32000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "internlm2-pro-chat、internlm3-8b-instruct"
check_day: 2026-09-29
meta_title: InternLM 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `internlm2-pro-chat` 和 `internlm3-8b-instruct` 这一档模型具备 32000 token 的上下文长度，这意味着在单次交互中，模型能够处理和理解的输入信息量较大，为集成更多召回内容提供了空间。引用上限同样为 32000 token，这决定了知识库召回的段落
date_published: 2026-09-29
date_modified: 2026-09-29
---

# InternLM 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`internlm2-pro-chat` 和 `internlm3-8b-instruct` 这一档模型具备 32000 token 的上下文长度，这意味着在单次交互中，模型能够处理和理解的输入信息量较大，为集成更多召回内容提供了空间。引用上限同样为 32000 token，这决定了知识库召回的段落总长度。未标注的单次最大输出表明模型在回复长度上可能具有一定的灵活性，但仍需在实际应用中观察其行为。工具调用能力支持模型与外部系统进行交互，拓展了其功能边界。图片输入为 false 则表明该档模型不具备处理图像信息的能力，相关链路应避免尝试传输图片数据。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的必要配置 |
| `ef_construction` | `80` | 构建 HNSW 索引时，平衡索引质量与构建速度 |
| `ef_search` | `60` | 查询 HNSW 索引时，平衡召回精度与查询耗时 |
| `m` | `32` | HNSW 图的层数，影响索引结构和查询性能 |
| `vector_ip_ops` | `true` | 启用内积距离计算，适用于某些嵌入模型 |
| `max_connections` | `100` | 数据库最大并发连接数，根据并发量调整 |

## 这两者互相约束的地方
模型上下文长度与引用上限是 RAG 系统设计的核心约束。对于 InternLM 32K 上下文的这一档模型，召回条数与每段长度的总和不能超过 32000 token 的上下文预算。引用上限 32000 token 决定了知识库召回段落的总字符数上限，而向量库返回条数则限制了向量检索阶段可以获取的段落数量。两者之中，更严格的限制将先生效。例如，如果向量库只返回 10 条段落，即使模型上下文允许更多，也只能处理这 10 条。调整 PostgreSQL（pgvector） 的 `ef_construction` 和 `ef_search` 参数，会影响向量检索的速度和精度。调大这些参数通常能提高召回质量，但也可能增加查询延迟，进而影响模型响应时间，尤其是在高并发场景下。

## 容易做错的三处
- 日志中出现 `connection refused` 错误，原因是 `PG_URL` 配置的主机或端口不正确。
- 模型返回的引用内容不完整或不准确，原因是 `ef_search` 值设置过低，导致向量检索召回精度不足。
- 查询响应时间过长，甚至出现超时，原因是 `max_connections` 配置不足，或 `ef_construction` 和 `ef_search` 设置过高导致索引查询负担过重。

## 怎么确认配好了
- 检查 FastGPT 系统日志，确认数据库连接成功，没有 `authentication failed` 或 `connection refused` 错误信息。
- 通过 FastGPT 提供的知识库测试功能，上传少量文档并进行检索，观察返回的召回条数和内容相关性，根据业务需求标定相关性阈值。
- 使用数据库监控工具（如 `pg_stat_activity`）观察 `max_connections` 的使用情况，确认并发连接数在合理范围内，没有达到上限。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
