---
title: Moonshot 262K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-moonshot02-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot 262K 上下文模型档位，其 `上下文长度 262144` 决定了单次请求中可输入的最大 token 量，这直接限制了 RAG（检索增强生成）模式下召回内容的总体规模。`引用上限 256000` 意味着知识库引用片段在模型内部处理时，单次请求可被引用的 token 总量。`图片输入"
language: zh
axis_model_tier: "Moonshot / 262144 /  / 256000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5"
check_day: 2026-09-29
meta_title: Moonshot 262K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Moonshot 262K 上下文模型档位，其 `上下文长度 262144` 决定了单次请求中可输入的最大 token 量，这直接限制了 RAG（检索增强生成）模式下召回内容的总体规模。`引用上限 256000` 意味着知识库引用片段在模型内部处理时，单次请求可被引用的 token 总量。`图片输入
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 262K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么

Moonshot 262K 上下文模型档位，其 `上下文长度 262144` 决定了单次请求中可输入的最大 token 量，这直接限制了 RAG（检索增强生成）模式下召回内容的总体规模。`引用上限 256000` 意味着知识库引用片段在模型内部处理时，单次请求可被引用的 token 总量。`图片输入 true` 启用了多模态能力，允许在对话中引入视觉信息。`工具调用 true` 则赋予了模型与外部工具集成的能力，可以执行特定操作或获取实时数据，扩展了模型的应用边界。`单次最大输出 未标注` 则需要通过实际测试来确定其输出长度的上限，以避免截断或不完整回复。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :--- | :--- | :--- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限正确。 |
| `ef_construction` | `100` | 索引构建参数，影响索引质量和构建时间，此值在查询性能和写入成本间取得平衡。 |
| `ef_search` | `60` | 搜索阶段参数，影响查询召回率和速度，此值平衡了召回质量与响应延迟。 |
| `m` | `32` | HNSW 索引的邻居数，影响索引的精度和存储开销，此值兼顾了查询性能和索引大小。 |
| `vector_ip_ops` | `true` | 使用内积优化向量相似度计算，提升检索效率。 |
| 召回条数 | `10` | 结合模型引用上限，单次检索返回的向量数量，避免上下文溢出。 |

## 这两者互相约束的地方

Moonshot 262K 上下文模型与 PostgreSQL（pgvector）的配合，核心在于如何有效利用模型的巨大上下文窗口。召回条数与每段知识库内容的长度之积，必须严格控制在模型的 `上下文长度 262144` 范围内，以避免截断或性能下降。同时，实际送入模型的知识库引用 token 总量，也不能超过 `引用上限 256000`。在实际操作中，`引用上限` 会与向量库返回的 `召回条数` 共同决定最终进入模型的知识片段。即使 pgvector 返回了大量结果，若超出模型引用上限，也会被截断。当 pgvector 的索引参数如 `ef_search` 调大时，通常会提高召回的准确性，但也会增加查询延迟。这对于依赖实时响应的工具调用链路尤其需要权衡，过长的检索时间可能导致整体链路超时。

## 容易做错的三处

*   模型返回 `Context window exceeded` 错误码：原因在于召回的知识段落总长度加上用户输入超过了 `上下文长度 262144`。
*   搜索结果与预期不符，或关键信息缺失：原因可能是 `ef_search` 或 `m` 参数设置过低，导致 HNSW 索引在查询时没有探索足够多的邻居。
*   知识库检索响应时间过长，导致整个请求超时：原因可能是 `ef_search` 参数设置过高，或数据库硬件资源不足，导致向量检索效率低下。

## 怎么确认配好了

*   通过 FastGPT 后台的调试工具，观察每次知识库检索的 `召回条数` 和 `总引用 token`，确保其在模型限制范围内。
*   在数据库中执行 `EXPLAIN ANALYZE` 命令，检查 pgvector 索引是否被有效使用，并分析查询计划的执行时间。
*   针对不同复杂度的问题，进行端到端测试，观察模型回答的准确性、完整性，并检查日志中是否存在 `ERROR` 或 `WARNING` 级别的数据库相关信息。
*   监控数据库连接池状态和 CPU、内存使用率，确保在高并发场景下数据库性能稳定。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
