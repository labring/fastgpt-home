---
title: DeepSeek 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-deepseek03-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "DeepSeek 64K 上下文模型提供了 64000 token 的上下文长度，这决定了单次交互中可以处理的输入和输出总量。引用上限 `quoteMaxToken` 为 60000 token，这个预算用于承载从向量库召回的引用内容。段落条数由检索侧的返回条数决定，引用上限限制的是引用内容合计占用"
language: zh
axis_model_tier: "DeepSeek / 64000 /  / 60000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "deepseek-chat"
check_day: 2026-09-29
meta_title: DeepSeek 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: DeepSeek 64K 上下文模型提供了 64000 token 的上下文长度，这决定了单次交互中可以处理的输入和输出总量。引用上限 `quoteMaxToken` 为 60000 token，这个预算用于承载从向量库召回的引用内容。段落条数由检索侧的返回条数决定，引用上限限制的是引用内容合计占用
date_published: 2026-09-29
date_modified: 2026-09-29
---

# DeepSeek 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
DeepSeek 64K 上下文模型提供了 64000 token 的上下文长度，这决定了单次交互中可以处理的输入和输出总量。引用上限 `quoteMaxToken` 为 60000 token，这个预算用于承载从向量库召回的引用内容。段落条数由检索侧的返回条数决定，引用上限限制的是引用内容合计占用的 token 数量。模型支持工具调用 `true`，意味着可以在模型推理过程中集成外部工具以扩展能力。不支持图片输入 `false`，表示不能直接处理图像信息。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :---------- | :---------- | :---------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 标准数据库连接字符串，用于建立 FastGPT 与 pgvector 的连接。 |
| `ef_construction` | `100–200` | 构建 HNSW 索引时的搜索参数，影响索引质量和构建速度。 |
| `ef_search` | `60–120` | 查询 HNSW 索引时的搜索参数，影响召回精度和查询速度。 |
| `m` | `32` | HNSW 索引的图层最大连接数，影响索引大小和搜索性能。 |
| `vector_ip_ops` | `true` | 启用内积（IP）相似度计算，适用于某些嵌入模型的相似度度量。 |
| 每段召回字符数 | `500–800` 字符 | 兼顾单段信息密度和上下文预算，避免单段过长或过短。 |

## 这两者互相约束的地方
DeepSeek 64K 上下文模型与 PostgreSQL（pgvector）的组合，其核心约束在于 token 预算和召回条数。模型总上下文长度 64000 token，引用上限 60000 token，这要求召回内容（通常是多段文本）的总 token 数不得超出此范围。向量库返回的是固定数量的段落，而每段文本转换为 token 的数量是可变的。引用上限按 token 计，向量库返回的按条数计，因此谁先触顶取决于每段召回内容的平均长度。如果每段内容较长，则可能在召回条数不多时就达到引用上限；如果每段内容较短，则可以召回更多条数。PostgreSQL（pgvector）的索引参数 `ef_construction` 和 `ef_search` 调大，意味着向量搜索的精度会提升，但查询耗时可能增加。更高的召回精度可以为模型提供更相关的上下文，从而提升模型生成回答的质量，但这也会增加后端处理的开销。

## 容易做错的三处
- 日志显示 `PG: connection timeout`：`PG_URL` 配置不正确或数据库服务未启动。
- 界面提示 “引用内容为空”：向量库中没有匹配的文档，或者 `ef_search` 设置过低导致召回率不足。
- 返回的引用条数远少于预期：召回内容总 token 数已达到 `quoteMaxToken`，即使向量库返回了更多条目也无法全部纳入。

## 怎么确认配好了
- 检查 FastGPT 系统日志，确认 PostgreSQL（pgvector）连接成功，无连接错误提示。
- 在 FastGPT 中进行一次 RAG 查询，核对返回的引用内容是否相关且完整，通过调整 `ef_search` 和召回条数观察变化。
- 监控 PostgreSQL 数据库的 CPU 和内存使用情况，确保在高并发查询下数据库性能稳定，没有异常飙升。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
