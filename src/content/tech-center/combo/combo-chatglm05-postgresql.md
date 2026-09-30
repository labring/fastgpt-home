---
title: ChatGLM 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-chatglm05-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`glm-4.6v`、`glm-4.6v-flashx`、`glm-4.6v-flash` 这一档模型具备 128000 的上下文长度，允许单次处理大量信息。引用上限为 120000 token，这是模型可用于回答的参考内容总预算。工具调用能力的提供使得模型能够与外部系统交互，执行特定任务。图片输入"
language: zh
axis_model_tier: "ChatGLM / 128000 /  / 120000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash"
check_day: 2026-09-29
meta_title: ChatGLM 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `glm-4.6v`、`glm-4.6v-flashx`、`glm-4.6v-flash` 这一档模型具备 128000 的上下文长度，允许单次处理大量信息。引用上限为 120000 token，这是模型可用于回答的参考内容总预算。工具调用能力的提供使得模型能够与外部系统交互，执行特定任务。图片输入
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`glm-4.6v`、`glm-4.6v-flashx`、`glm-4.6v-flash` 这一档模型具备 128000 的上下文长度，允许单次处理大量信息。引用上限为 120000 token，这是模型可用于回答的参考内容总预算。工具调用能力的提供使得模型能够与外部系统交互，执行特定任务。图片输入功能则支持模型理解和处理图像信息，拓展了多模态处理能力。

## 配 PostgreSQL（pgvector） 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :----- | :----- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限 |
| `ef_construction` | `32` | HNSW 索引构建参数，影响索引质量与构建速度的平衡 |
| `ef_search` | `16` | HNSW 搜索参数，影响召回率与查询延迟的平衡 |
| `m = 32` | `32` | HNSW 索引图的邻居数，影响索引大小和搜索性能 |
| 召回条数 | `5-8` 条 | 兼顾信息量与模型上下文预算，避免冗余 |
| 每段长度 | `500-1000` 字符 | 确保单段语义完整，适配常见分块策略 |

## 这两者互相约束的地方
召回条数与每段长度的乘积不应超过模型 128000 的上下文长度，这是硬性约束。引用上限 120000 token 是模型可以利用的引用内容总预算，而向量库返回的是固定数量的段落。当每段内容较短时，模型可以引用更多段落；当每段内容较长时，即使段落数量不多，也可能达到引用上限。索引参数 `ef_construction` 和 `ef_search` 的调整，会直接影响向量检索的质量。更大的 `ef_construction` 值通常能构建出更优的索引，从而提高召回内容的准确性，这对于充分利用模型的上下文能力至关重要。 `ef_search` 值的提升，则能让模型在更精准的召回结果中进行推理，提升回答质量。

## 容易做错的三处
* 向量数据库连接失败，日志显示 `connection refused`。原因可能是 `PG_URL` 配置错误或数据库未启动。
* 模型回答内容与预期引用内容不符，排查发现返回的段落数量不足。原因可能是向量库检索召回条数设置过低。
* 查询响应时间过长，甚至超时。原因可能是 `ef_search` 值设置过大，导致向量检索耗时过长。

## 怎么确认配好了
* 运行一次带引用功能的查询，观察模型是否成功引用了知识库内容，并核对引用内容是否与原始知识段落一致。
* 检查数据库日志，确认 `pgvector` 索引的创建和查询操作是否正常执行，没有报错信息。
* 监控向量查询的延迟，确保在可接受的范围内，并通过调整 `ef_search` 参数来平衡性能与召回质量。
* 在知识库中上传不同长度的文档，进行检索测试，检查不同文档长度下的召回条数和引用效果是否符合预期。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
