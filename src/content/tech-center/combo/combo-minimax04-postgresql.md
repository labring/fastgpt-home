---
title: MiniMax 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-minimax04-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "MiniMax `M2-her` 模型提供 64000 的上下文长度，这意味着在单次对话中，模型可以处理的输入信息总量（包括用户提问、历史对话和知识库召回内容）上限为 64000 个 token。引用上限 60000 标识了知识库召回内容能够占据的最大 token 空间。尽管单次最大输出长度未明确标"
language: zh
axis_model_tier: "MiniMax / 64000 /  / 60000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "M2-her"
check_day: 2026-09-29
meta_title: MiniMax 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: MiniMax `M2-her` 模型提供 64000 的上下文长度，这意味着在单次对话中，模型可以处理的输入信息总量（包括用户提问、历史对话和知识库召回内容）上限为 64000 个 token。引用上限 60000 标识了知识库召回内容能够占据的最大 token 空间。尽管单次最大输出长度未明确标
date_published: 2026-09-29
date_modified: 2026-09-29
---

# MiniMax 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
MiniMax `M2-her` 模型提供 64000 的上下文长度，这意味着在单次对话中，模型可以处理的输入信息总量（包括用户提问、历史对话和知识库召回内容）上限为 64000 个 token。引用上限 60000 标识了知识库召回内容能够占据的最大 token 空间。尽管单次最大输出长度未明确标注，但通常会建议预留足够的上下文空间给模型生成回答。该模型不支持图片输入和工具调用，因此在设计 RAG 链路时，无需考虑多模态输入处理和外部工具集成。这些参数共同决定了系统在信息检索、内容组织和模型交互层面的工程约束。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接标准格式，确保 FastGPT 能正确连接。 |
| `ef_construction` | `64` | 构建 HNSW 索引时的邻居搜索参数，影响索引质量和构建速度。 |
| `ef_search` | `40` | 搜索 HNSW 索引时的邻居搜索参数，影响搜索精度和速度。 |
| `m` | `32` | HNSW 索引中每个层级节点的最大连接数，影响索引大小和搜索效率。 |
| 召回条数 | `前 5-8 条` | 经验值，平衡召回质量和上下文长度，避免超出模型引用上限。 |
| 单段最大长度 | `800-1200 字符` | 控制召回文本段落的粒度，避免过长或过短，影响模型理解。 |

## 这两者互相约束的地方
模型上下文长度是核心约束。MiniMax `M2-her` 的 64000 token 上下文长度，必须容纳用户输入、历史对话以及 PostgreSQL（pgvector）召回的知识段落。这意味着召回条数与每段长度的乘积，加上其他上下文内容，不能超过 64000 token。引用上限 60000 进一步限定了知识库召回内容的最大 token 量，即使向量库返回了更多条目，也只会在 60000 token 内截断。当向量库的 `ef_construction` 和 `ef_search` 参数调大时，索引构建和搜索精度会提高，但可能增加资源消耗和搜索延迟。对于 MiniMax `M2-her` 这种高上下文模型，高质量的召回能更好地利用其处理能力，因此适当调优向量库参数以提升召回质量是必要的。然而，过高的参数值可能会导致查询超时或资源耗尽，需要根据实际负载进行权衡。

## 容易做错的三处
*   出现 `Context window exceeded` 错误：召回内容加上用户输入和历史对话的总 token 数超过了 64000。
*   召回结果不准确：`ef_search` 参数设置过低，导致 HNSW 索引搜索精度不足。
*   向量搜索响应缓慢：`ef_construction` 参数设置过高，或者 `m` 值过大，导致索引构建耗时过长或查询效率下降。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传文档后，检查向量化任务状态是否为 `完成`。
*   通过 FastGPT 的调试功能，观察模型响应中引用的知识段落，确认召回内容与预期相关性。
*   监控 PostgreSQL（pgvector）的日志，检查是否有 `ERROR` 或 `WARNING` 级别的 HNSW 索引操作相关信息。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
