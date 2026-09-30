---
title: Moonshot 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-moonshot08-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`moonshot-v1-128k-vision-preview` 模型档位具备 128000 tokens 的上下文长度，这意味着在单次交互中可以处理大量输入信息，为复杂的知识问答和任务执行提供了充足空间。引用上限 60000 tokens 规定了知识库召回内容的最大可用预算，这直接影响了知识库段"
language: zh
axis_model_tier: "Moonshot / 128000 /  / 60000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "moonshot-v1-128k-vision-preview"
check_day: 2026-09-29
meta_title: Moonshot 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `moonshot-v1-128k-vision-preview` 模型档位具备 128000 tokens 的上下文长度，这意味着在单次交互中可以处理大量输入信息，为复杂的知识问答和任务执行提供了充足空间。引用上限 60000 tokens 规定了知识库召回内容的最大可用预算，这直接影响了知识库段
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`moonshot-v1-128k-vision-preview` 模型档位具备 128000 tokens 的上下文长度，这意味着在单次交互中可以处理大量输入信息，为复杂的知识问答和任务执行提供了充足空间。引用上限 60000 tokens 规定了知识库召回内容的最大可用预算，这直接影响了知识库段落的数量和每段的平均长度。支持图片输入 `true` 允许模型处理视觉信息，为多模态应用场景打开了可能。工具调用 `true` 则表明模型能够与外部工具集成，执行特定操作，增强了其自动化和扩展能力。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保 FastGPT 能够访问 pgvector 实例。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量与构建速度。 |
| `ef_search` | `32` | HNSW 索引查询参数，影响召回精度与查询速度。 |
| `m = 32` | `32` | HNSW 索引最大邻居数，影响索引的内存占用与查询性能。 |
| `vector_ip_ops` | `true` | 使用内积距离计算，匹配模型嵌入的相似度度量方式。 |
| 召回条数 | `10–20` 条 | 平衡召回广度与模型上下文预算，避免过多冗余信息。 |

## 这两者互相约束的地方
召回条数与每段知识内容的长度是影响模型性能的关键因素。知识库召回的总长度，即“召回条数 × 每段长度”，必须严格控制在模型上下文长度 128000 tokens 预算之内。同时，引用上限 60000 tokens 进一步限制了可用于引用的知识内容总量。这意味着即使向量库返回了大量相关条目，也需要根据模型的引用上限进行裁剪。PostgreSQL（pgvector）的索引参数 `ef_search` 调大，虽然有助于提高召回精度，但也可能增加查询延迟。对于 `moonshot-v1-128k-vision-preview` 这种大上下文模型，精确召回的价值更高，但仍需确保向量库的响应速度与模型推理速度相匹配。

## 容易做错的三处
- 日志中出现 `PG::ConnectionBad: could not connect to server`：通常是 `PG_URL` 配置错误，如主机、端口或数据库名不正确。
- 模型回答中知识点不完整或缺失关键信息：可能是向量库 `ef_search` 参数过小，导致召回精度不足，未能检索到最相关的知识段落。
- 知识库模块返回的引用条目数量少于预期：这可能是因为 FastGPT 侧配置的引用上限低于向量库实际返回的条数，导致在传递给模型前进行了截断。

## 怎么确认配好了
- 通过 FastGPT 管理界面，在知识库配置中测试连接，确认 PostgreSQL（pgvector）数据库连接成功。
- 部署一个简单的 RAG 应用，输入与知识库内容高度相关的查询，观察模型回答中是否准确引用了知识库中的信息，并核对引用原文。
- 监控 FastGPT 后台日志，确保没有与 `pgvector` 相关的错误或警告信息，特别是关于索引查询性能的提示。
- 使用真实场景查询，观察知识库召回条数与模型实际引用的条数，验证召回策略与引用上限的协同效果。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
