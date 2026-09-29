---
title: Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-ernie10-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`ERNIE-Speed-128K` 模型提供 128000 的上下文长度，这意味着在单次对话中，可以输入和处理的总 token 数（包括指令、历史对话和召回知识）上限。引用上限 120000 决定了知识库召回内容在模型输入中的最大占比，为知识库增强型应用提供了充足的空间。模型未标注单次最大输出，通"
language: zh
axis_model_tier: "Ernie / 128000 /  / 120000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "ERNIE-Speed-128K"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `ERNIE-Speed-128K` 模型提供 128000 的上下文长度，这意味着在单次对话中，可以输入和处理的总 token 数（包括指令、历史对话和召回知识）上限。引用上限 120000 决定了知识库召回内容在模型输入中的最大占比，为知识库增强型应用提供了充足的空间。模型未标注单次最大输出，通
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`ERNIE-Speed-128K` 模型提供 128000 的上下文长度，这意味着在单次对话中，可以输入和处理的总 token 数（包括指令、历史对话和召回知识）上限。引用上限 120000 决定了知识库召回内容在模型输入中的最大占比，为知识库增强型应用提供了充足的空间。模型未标注单次最大输出，通常需要通过实际测试来确定其输出能力。此模型不支持图片输入和工具调用，因此基于此模型的应用无需考虑多模态输入处理和外部工具集成链路。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 连接数据库实例的必要参数，确保服务可以访问。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量和构建时间，通常取值范围为 `m` 的 2 倍。 |
| `ef_search` | `60` | HNSW 索引搜索参数，影响搜索召回率和查询速度，通常应大于等于 `k`（实际召回条数）。 |
| `m` | `32` | HNSW 索引的邻居数量，影响索引大小和搜索效率，设置为 32 是常见且均衡的选择。 |
| `vector_ip_ops` | `true` | 使用内积（Inner Product）作为距离度量，与模型嵌入向量的特性匹配。 |
| `max_connections` | 按实测标定 | 数据库最大并发连接数，根据应用负载和数据库性能进行调整。 |

## 这两者互相约束的地方
`ERNIE-Speed-128K` 模型的 128000 上下文长度是核心约束。知识库召回的每一段文本长度，乘以召回条数，其总和必须严格控制在这一上下文预算之内，同时也要考虑指令和历史对话占用的 token。引用上限 120000 规定了知识库内容在模型输入中的最大比例，因此向量库返回的有效召回条数应在此上限内进行筛选。当 PostgreSQL（pgvector）的索引参数 `ef_construction` 和 `ef_search` 调大时，通常会提高召回的准确性和全面性，但这也会增加向量搜索的计算开销和响应时间。需要平衡召回质量与查询效率，以避免模型等待时间过长，影响用户体验。

## 容易做错的三处
*   日志显示“Input token limit exceeded”：原因在于召回条数乘以平均每段长度，加上指令和历史对话，超出了 128000 的上下文限制。
*   界面返回的知识引用不全或重复：原因可能是 `ef_search` 设置过低，导致向量库返回的召回结果质量不高或数量不足，或后处理逻辑未有效去重。
*   数据库连接超时或拒绝连接：原因可能是 `max_connections` 设置过小，无法承载并发请求，或者 `PG_URL` 配置有误。

## 怎么确认配好了
*   在 FastGPT 知识库管理页面，上传大量文档并观察 `ERNIE-Speed-128K` 模型在问答时的引用情况，确保召回条数与引用内容符合预期。
*   通过数据库监控工具观察 PostgreSQL（pgvector）的 `pg_stat_activity` 表，确认并发连接数和查询延迟是否在可接受范围内。
*   执行一系列带知识库检索的测试用例，比对返回结果与预期，并检查模型输出中引用的知识段落是否准确、完整且相关。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
