---
title: Yi 16K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-yi01-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型具备 16000 token 的上下文长度，决定了单次交互中可处理的输入总量。引用上限为 12000 token，用于限制召回内容在模型输入中所占的预算，确保模型有足够空间生成回答。段落召回数量与每段长度共同决定了引用内容的总体 token 消耗。模型不支持图片输入与工具调用，这意味着在 "
language: zh
axis_model_tier: "Yi / 16000 /  / 12000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "yi-lightning"
check_day: 2026-09-29
meta_title: Yi 16K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: 这一档模型具备 16000 token 的上下文长度，决定了单次交互中可处理的输入总量。引用上限为 12000 token，用于限制召回内容在模型输入中所占的预算，确保模型有足够空间生成回答。段落召回数量与每段长度共同决定了引用内容的总体 token 消耗。模型不支持图片输入与工具调用，这意味着在
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Yi 16K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
这一档模型具备 16000 token 的上下文长度，决定了单次交互中可处理的输入总量。引用上限为 12000 token，用于限制召回内容在模型输入中所占的预算，确保模型有足够空间生成回答。段落召回数量与每段长度共同决定了引用内容的总体 token 消耗。模型不支持图片输入与工具调用，这意味着在 FastGPT 中无法通过模型层面的能力处理图像信息或直接调用外部工具。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接数据库的标准形式，确保服务能正确访问 pgvector 实例。 |
| `ef_construction` | `64` | 影响 HNSW 索引的构建质量，提高召回准确率，但会增加索引构建时间。 |
| `ef_search` | `40` | 影响 HNSW 索引的搜索质量，提高查询召回率，但会增加搜索耗时。 |
| `m = 32` | `32` | HNSW 索引中每个节点的最大连接数，平衡索引大小与查询性能。 |
| 召回条数 | `前 5-8 条` | 平衡引用上限与召回质量，避免单次引用内容超出模型预算。 |
| 每段召回长度 | `500-800 字符` | 确保每段内容完整且不冗余，与模型引用上限配合。 |

## 这两者互相约束的地方
召回条数与每段长度的乘积不能超过模型 16000 token 的上下文预算，否则可能导致截断或模型理解偏差。引用上限按 token 计量，而向量库返回的是条数，两者谁先触顶取决于召回段落的平均长度。当段落较短时，可能召回更多条数才达到引用上限；当段落较长时，较少条数便可能触及引用上限。PostgreSQL（pgvector）的 `ef_construction` 和 `ef_search` 参数调大后，向量检索的准确性会提高，意味着 FastGPT 能够向模型提供更相关的上下文。这有助于模型生成更精准的回答，减少“幻觉”现象。同时，较高的准确性也可能在 FastGPT 内部触发更高效的召回策略，例如减少不必要的重试或优化召回排序。

## 容易做错的三处
*  报错信息显示 `PostgreSQL connection failed`：通常是 `PG_URL` 配置不正确，如用户名、密码、主机或端口错误。
*  检索返回内容为空或相关性差：`ef_construction` 或 `ef_search` 参数设置过低，导致索引质量或搜索召回率不足。
*  对话响应时间过长：`ef_search` 参数设置过高，导致向量查询耗时过长，或数据库硬件资源不足。

## 怎么确认配好了
*  通过 FastGPT 后台的调试工具，观察每次召回的段落数量和内容是否符合预期。
*  监控 PostgreSQL 数据库的查询日志，确认 `vector_ip_ops` 相关的查询是否正常执行，且查询耗时在可接受范围内。
*  在 FastGPT 中进行多次对话测试，确保模型能够基于召回内容给出准确且完整的回答，并观察回答长度是否受引用上限影响。
*  定期检查 PostgreSQL 数据库的索引健康状况，确保 `ef_construction` 和 `m` 参数构建的索引维持较高质量。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
