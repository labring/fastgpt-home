---
title: Groq 131K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-groq01-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Groq 131K 上下文模型档位中的模型，例如 `openai/gpt-oss-120b` 和 `llama-3.3-70b-versatile`，其上下文长度为 131072 token。这意味着模型在单次调用中可以处理的输入和输出总和。引用上限 120000 token 规定了模型用于引用检索"
language: zh
axis_model_tier: "Groq / 131072 /  / 120000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile"
check_day: 2026-09-29
meta_title: Groq 131K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Groq 131K 上下文模型档位中的模型，例如 `openai/gpt-oss-120b` 和 `llama-3.3-70b-versatile`，其上下文长度为 131072 token。这意味着模型在单次调用中可以处理的输入和输出总和。引用上限 120000 token 规定了模型用于引用检索
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Groq 131K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Groq 131K 上下文模型档位中的模型，例如 `openai/gpt-oss-120b` 和 `llama-3.3-70b-versatile`，其上下文长度为 131072 token。这意味着模型在单次调用中可以处理的输入和输出总和。引用上限 120000 token 规定了模型用于引用检索内容的 token 预算，这一预算独立于检索返回的段落条数。工具调用能力的提供，使得模型能够与外部工具进行交互以完成特定任务。图片输入功能在此档位中未提供，因此模型无法直接处理图像数据。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，用于建立 FastGPT 与 PostgreSQL 的连接。 |
| `m = 32` | `32` | HNSW 索引图的每个节点连接的最大邻居数，影响索引质量与构建速度。 |
| `ef_construction` | `100–200` | HNSW 索引构建时使用的搜索参数，值越大索引质量越高，构建时间越长。 |
| `ef_search` | `60–120` | HNSW 索引查询时使用的搜索参数，值越大召回率越高，查询延迟越大。 |
| `vector_ip_ops` | `true` | 启用向量内积操作的优化，提升向量相似度计算效率。 |
| 召回条数 | `10–20 条` | 在满足引用上限的前提下，提供足够多的信息供模型理解上下文。 |

## 这两者互相约束的地方
召回条数与每段内容的长度共同决定了送入模型的总 token 数，此总和必须控制在 131072 token 的上下文长度预算之内。引用上限 120000 token 用于限制检索内容的总体 token 消耗，而向量库返回的是固定数量的段落。当每段内容的平均 token 长度较小时，可能会在达到引用上限前就触及了检索条数上限；反之，若每段内容较长，则可能在检索条数不多时就先达到引用上限。Pgvector 的索引参数，如 `ef_construction` 和 `ef_search`，调大后可以提升检索的准确性和召回率，这使得模型在有限的引用预算内能获得更相关的上下文，从而提高模型理解和生成答案的质量。

## 容易做错的三处
- 日志显示 `context window exceeded`：召回内容总 token 数加上用户输入超过了 131072 的上下文长度。
- 检索结果返回条数远少于预期：`ef_search` 参数设置过低，导致向量检索召回率不足。
- 模型输出内容与检索知识关联度低：Pgvector 索引的 `m` 参数设置不当，或者 `ef_construction` 过低，导致索引质量不佳，未能有效匹配相关内容。

## 怎么确认配好了
- 检查 FastGPT 后台日志，确认没有 `PG_URL` 连接失败或 `psycopg2.OperationalError` 错误。
- 观察模型在处理复杂查询时的响应速度，对比调整 `ef_search` 前后的查询延迟变化，找到合适的平衡点。
- 通过 FastGPT 的知识库检索测试功能，验证在不同查询下，召回的文档段落相关性是否达到预期，并据此调整 `m` 和 `ef_construction` 参数。
- 检查模型返回答案的长度和引用内容的完整性，确保在 120000 token 的引用上限内，模型能充分利用检索到的信息。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
