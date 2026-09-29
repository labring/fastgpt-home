---
title: StepFun 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-stepfun06-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "StepFun 8K 上下文模型档位提供 `step-1-flash` 和 `step-2-mini` 两款模型，其上下文长度 `maxContext` 为 8000 tokens，决定了单次请求中可输入的最大文本量。引用上限 `quoteMaxToken` 为 6000 tokens，限定了引用内"
language: zh
axis_model_tier: "StepFun / 8000 /  / 6000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "step-1-flash、step-2-mini"
check_day: 2026-09-29
meta_title: StepFun 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: StepFun 8K 上下文模型档位提供 `step-1-flash` 和 `step-2-mini` 两款模型，其上下文长度 `maxContext` 为 8000 tokens，决定了单次请求中可输入的最大文本量。引用上限 `quoteMaxToken` 为 6000 tokens，限定了引用内
date_published: 2026-09-29
date_modified: 2026-09-29
---

# StepFun 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
StepFun 8K 上下文模型档位提供 `step-1-flash` 和 `step-2-mini` 两款模型，其上下文长度 `maxContext` 为 8000 tokens，决定了单次请求中可输入的最大文本量。引用上限 `quoteMaxToken` 为 6000 tokens，限定了引用内容合计所占的 token 预算，这与检索返回的段落条数是两个不同的量。单次最大输出未标注，意味着模型在生成回复时没有明确的长度限制。图片输入和工具调用功能均为 `false`，表明这些模型不具备处理图像信息或调用外部工具的能力，因此相关的技术链路不需要考虑。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，用于 FastGPT 访问 pgvector 实例。 |
| `ef_construction` | `80` | HNSW 索引构建参数，影响索引质量与构建时间。 |
| `ef_search` | `60` | HNSW 索引搜索参数，影响搜索召回率与查询速度。 |
| `m = 32` | `32` | HNSW 索引层数参数，影响内存占用与查询性能。 |
| `vector_ip_ops` | `true` | 启用向量内积操作，与模型的嵌入向量类型匹配。 |
| `recall_top_k` | `5` | 向量召回的条数，与引用上限和每段长度综合考虑。 |

## 这两者互相约束的地方
召回条数与每段内容的长度之积不应超过模型 8000 tokens 的上下文预算。引用上限 `quoteMaxToken` 按 token 计数，它限制了所有引用内容的总量。向量库返回的则是按条数计，每条内容的 token 长度是可变的，因此谁先达到上限取决于每段内容的平均长度。当每段内容较短时，可能会召回更多条数才达到引用上限；而当每段内容较长时，可能少量条数就会触及引用上限。PostgreSQL（pgvector） 的索引参数 `ef_construction` 和 `ef_search` 调大后，向量检索的精度会提升，召回更相关的段落，这有助于模型在 6000 tokens 的引用预算内获取高质量信息。高精度的召回能让模型更有效地利用上下文，即使在有限的引用预算下也能生成准确的回复。

## 容易做错的三处
*   日志中出现 `ERROR: database "xxx" does not exist`：原因是没有正确配置 `PG_URL` 中的数据库名称或数据库未创建。
*   检索结果返回的 `data` 字段为空，但数据库中有数据：原因可能是 `ef_search` 参数设置过低，导致召回率不足，或查询向量与索引数据不匹配。
*   模型回复出现 `Context window exceeded` 错误：原因在于检索到的引用内容总 token 数加上用户输入已超出 8000 tokens 的上下文长度。

## 怎么确认配好了
*   在 FastGPT 界面配置知识库后，上传文档并检查日志，确认没有 `pgvector connection error` 异常信息。
*   通过 FastGPT 的知识库测试功能，输入查询语句，观察返回的引用内容是否相关且数量符合预期 `recall_top_k` 设置。
*   使用 FastGPT 调试模式，查看模型输入中的 `quote` 字段，确认引用内容的 token 总量未超过 6000 tokens 的引用上限。
*   监控 PostgreSQL（pgvector）的 CPU 和内存使用情况，确保在查询高峰期系统资源消耗在可接受范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
