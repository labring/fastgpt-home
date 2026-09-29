---
title: Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-ernie04-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型系列，其 128000 的上下文长度，表明单次请求可处理的文本总量上限。这意味着在RAG（检索增强生成）场景中，传入的查询、检索到的知识片段以及历史对话都必须控制在此范围内。单次最大输出未标注，通常暗示模型回答的长度弹性较大，但仍受限于总上下文。引用上限 123000"
language: zh
axis_model_tier: "Ernie / 128000 /  / 123000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "ernie-4.5-turbo-128k"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Ernie 128K 上下文模型系列，其 128000 的上下文长度，表明单次请求可处理的文本总量上限。这意味着在RAG（检索增强生成）场景中，传入的查询、检索到的知识片段以及历史对话都必须控制在此范围内。单次最大输出未标注，通常暗示模型回答的长度弹性较大，但仍受限于总上下文。引用上限 123000
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型系列，其 128000 的上下文长度，表明单次请求可处理的文本总量上限。这意味着在RAG（检索增强生成）场景中，传入的查询、检索到的知识片段以及历史对话都必须控制在此范围内。单次最大输出未标注，通常暗示模型回答的长度弹性较大，但仍受限于总上下文。引用上限 123000 则直接限定了知识库引用内容可占用的最大Token数，是召回策略设计的重要考量。此外，当前模型不支持图片输入和工具调用，意味着其应用场景主要集中在纯文本对话与知识问答，不涉及多模态理解或复杂外部系统交互。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限 |
| `ef_construction` | `64` | 影响索引构建时的图连接数，越大召回质量越好但构建慢 |
| `ef_search` | `30` | 影响查询时的图搜索范围，越大召回质量越好但查询慢 |
| `m` | `32` | HNSW图中的边数，影响索引结构紧密程度和查询效率 |
| `vector_ip_ops` | `true` | 确保使用内积距离计算，与大多数嵌入模型匹配 |
| `max_connections` | `50` | 数据库最大并发连接数，根据应用并发量调整 |

## 这两者互相约束的地方
Ernie 128K 上下文模型与 PostgreSQL（pgvector）的集成，核心在于如何有效利用模型的上下文窗口。召回条数与每段长度的乘积，加上查询本身和历史对话的Token数，总和必须严格控制在 128000 的上下文长度之内。其中，引用上限 123000 Token是知识库内容可占用的最大空间，它与 `pgvector` 返回的向量条数共同决定了最终送入模型的知识量。如果 `pgvector` 返回的条数过多，超出了引用上限或总上下文，则需要进行截断处理。当 `ef_construction` 和 `ef_search` 等索引参数调大时，`pgvector` 的召回精度通常会提升，这有助于模型获取更相关的知识，但同时也会增加索引构建和查询的延迟，可能影响用户体验。

## 容易做错的三处
*   日志中出现 `ERROR: value too long for type character varying`：向量存储字段长度设置不足，导致文本截断或存储失败。
*   模型返回的答案内容短，且未引用任何知识片段：`pgvector` 返回的向量条数过少，或者召回结果与查询相关性不足。
*   查询耗时过长，远超预期，甚至出现 `Connection Timeout`：`ef_search` 或 `ef_construction` 设置过高，导致索引查询或构建效率低下。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传足够多的文档并进行向量化，观察 `pgvector` 是否成功存储向量数据。
*   通过 FastGPT 的调试功能，输入测试问题，查看模型返回答案中是否包含知识引用，并核对引用的准确性。
*   监控数据库 `pg_stat_activity` 表，观察 `pgvector` 查询的平均响应时间，并与设定的性能阈值进行比较。
*   逐步调整 `ef_search` 参数，通过对比不同设置下的召回结果相关性与查询耗时，找到适合当前业务场景的平衡点。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
