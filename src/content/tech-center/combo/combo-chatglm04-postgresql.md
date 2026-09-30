---
title: ChatGLM 200K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-chatglm04-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`glm-5v-turbo` 模型具备 200000 token 的上下文长度，这意味着在单次交互中可以处理大量输入信息。模型支持图片输入和工具调用能力，拓宽了其在多模态和复杂任务场景下的应用范围。引用上限设定为 200000 token，用于限制引用内容的总体预算。实际引用的段落条数由检索系统的返"
language: zh
axis_model_tier: "ChatGLM / 200000 /  / 200000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "glm-5v-turbo"
check_day: 2026-09-29
meta_title: ChatGLM 200K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `glm-5v-turbo` 模型具备 200000 token 的上下文长度，这意味着在单次交互中可以处理大量输入信息。模型支持图片输入和工具调用能力，拓宽了其在多模态和复杂任务场景下的应用范围。引用上限设定为 200000 token，用于限制引用内容的总体预算。实际引用的段落条数由检索系统的返
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 200K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`glm-5v-turbo` 模型具备 200000 token 的上下文长度，这意味着在单次交互中可以处理大量输入信息。模型支持图片输入和工具调用能力，拓宽了其在多模态和复杂任务场景下的应用范围。引用上限设定为 200000 token，用于限制引用内容的总体预算。实际引用的段落条数由检索系统的返回结果决定，引用上限与段落条数是两个不同的约束条件。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限正确性 |
| `ef_construction` | `100–200` | 建立 HNSW 索引时，控制图的复杂度，影响索引质量与构建时间 |
| `ef_search` | `80–150` | 查询 HNSW 索引时，控制搜索的宽度，影响召回率与查询速度 |
| `m = 32` | `32` | HNSW 索引中每个节点的最大邻居数，影响索引大小和查询性能 |
| 向量维度 | 按模型 embedding 输出维度 | 确保向量维度与模型输出一致，否则无法存入或查询 |
| `vector_ip_ops` | `true` | 使用内积（inner product）进行相似度计算，适用于某些 embedding 模型 |

## 这两者互相约束的地方
召回的文本内容总长度受限于模型的上下文长度。具体而言，召回的条数乘以每段文本的平均长度，其结果必须小于或等于 200000 token 的上下文预算。引用上限是按照 token 数量进行计量的，而向量库返回的是固定数量的段落条数。当每段文本较短时，可能会先达到引用上限的 token 预算，而未用尽召回条数。当每段文本较长时，可能在达到引用上限 token 预算之前，就已经达到向量库设定的最大召回条数。PostgreSQL（pgvector）的索引参数，例如 `ef_construction` 和 `ef_search`，调高后可以提升向量检索的召回率，这为模型提供了更相关、更全面的引用内容，进而可能提高模型的回答质量。

## 容易做错的三处
*   日志显示 `PG_URL connection refused`：原因可能是 `PG_URL` 中的主机地址、端口或认证信息不正确，导致无法建立数据库连接。
*   检索结果为空，但数据库中存在数据：原因可能是向量索引未正确构建，或 `ef_search` 值过低导致检索精度不足。
*   模型输出回复截断，或返回 `context window exceeded` 错误：原因可能是召回内容总 token 数超过了模型的 200000 token 上下文长度限制。

## 怎么确认配好了
*   执行一次端到端的问答流程，检查模型是否能基于引用内容正确回答，并观察 FastGPT 界面上的引用内容是否符合预期。
*   通过 `EXPLAIN ANALYZE` 命令分析 pgvector 索引的查询计划，确认 HNSW 索引是否被正确使用，并检查查询时间是否在可接受范围内。
*   监控 PostgreSQL 数据库的 CPU、内存和 I/O 使用情况，在负载下观察系统资源是否稳定，没有异常飙升或瓶颈。
*   调整检索召回条数与每段长度，观察模型对不同输入长度的适应性，并确认引用上限的 token 预算得到有效利用。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
