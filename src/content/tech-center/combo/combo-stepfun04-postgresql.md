---
title: StepFun 100K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-stepfun04-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "StepFun 的 `step-r1-v-mini` 模型，上下文长度高达 100000 token，这决定了单次请求中模型可以处理的输入信息总量，包括系统指令、用户查询及召回内容。引用上限 60000 token，表示模型在生成回答时，用于引用原文内容的预算。引用内容的总 token 数受此限制，"
language: zh
axis_model_tier: "StepFun / 100000 /  / 60000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "step-r1-v-mini"
check_day: 2026-09-29
meta_title: StepFun 100K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: StepFun 的 `step-r1-v-mini` 模型，上下文长度高达 100000 token，这决定了单次请求中模型可以处理的输入信息总量，包括系统指令、用户查询及召回内容。引用上限 60000 token，表示模型在生成回答时，用于引用原文内容的预算。引用内容的总 token 数受此限制，
date_published: 2026-09-29
date_modified: 2026-09-29
---

# StepFun 100K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
StepFun 的 `step-r1-v-mini` 模型，上下文长度高达 100000 token，这决定了单次请求中模型可以处理的输入信息总量，包括系统指令、用户查询及召回内容。引用上限 60000 token，表示模型在生成回答时，用于引用原文内容的预算。引用内容的总 token 数受此限制，而召回的段落数量则由检索策略和每段内容的长度共同决定。图片输入功能允许模型处理视觉信息，支持多模态场景。工具调用能力则使得模型能够与外部系统交互，执行特定任务。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :--- | :--- | :--- |
| `PG_URL` | `postgresql://user:pass@host:port/dbname` | 连接 PostgreSQL 数据库实例的必要参数，确保服务可达。 |
| `ef_construction` | `100–200` | 影响 HNSW 索引构建时的图连接数，数值越大索引质量越高，召回准确率提升，但构建时间增加。 |
| `ef_search` | `60–120` | 影响 HNSW 索引查询时的图遍历深度，数值越大召回准确率越高，但查询延迟增加。 |
| `m = 32` | `32` | HNSW 索引中每个节点的最大连接数，影响索引的内存占用和查询性能，`32` 是一个平衡值。 |
| `vector_ip_ops` | `true` | 启用向量内积操作，与模型的嵌入向量类型匹配，确保相似度计算正确。 |
| 检索条数 `top_k` | `5–10` 条 | 平衡召回广度和模型上下文预算，避免单次召回内容过多。 |

## 这两者互相约束的地方
模型上下文长度 100000 token 限制了 FastGPT 传递给模型的所有输入内容总量。向量库返回的召回条数与每段内容的长度直接决定了引用内容的 token 消耗。引用上限 60000 token 专门用于约束引用内容的预算，这意味着即使召回了多条内容，若其总 token 数超过 60000，模型也只能引用其中的一部分。向量库返回的召回结果是按条数计数的，而模型的引用预算是按 token 计数的。当每段召回内容较短时，可能召回更多条数才触及引用上限；当每段召回内容较长时，较少的召回条数就可能触及引用上限。PostgreSQL（pgvector）的 `ef_construction` 和 `ef_search` 参数调高，可以提高检索的准确率，为模型提供更相关的引用内容，进而提升模型输出的质量。

## 容易做错的三处
- 日志显示 `context_length_exceeded` 错误：原因在于召回内容与用户查询、系统指令的总 token 数超过了 100000 上下文长度限制。
- 模型返回的回答中引用内容不完整：原因在于引用内容的 token 总量超出了 60000 引用上限，导致部分召回内容未能被模型引用。
- 检索结果相关性差，模型回答质量低：原因在于 PostgreSQL（pgvector）的 `ef_search` 或 `ef_construction` 参数设置过低，导致向量检索未能找到足够相关的文档。

## 怎么确认配好了
- 检查 FastGPT 控制台，确认模型输入总 token 数（包含召回内容）始终低于 100000，且无 `context_length_exceeded` 报错。
- 观察模型输出，确认引用内容在逻辑上完整，且引用内容的 token 数未超过 60000 引用上限。
- 针对特定查询，手动验证 PostgreSQL（pgvector）返回的召回结果，确认其相关性达到预期，可以通过调整 `ef_search` 参数并观察召回的准确度来确定合适的阈值。
- 监控 PostgreSQL 数据库的查询延迟，确保在当前 `ef_search` 和 `ef_construction` 参数下，查询性能满足业务要求。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
