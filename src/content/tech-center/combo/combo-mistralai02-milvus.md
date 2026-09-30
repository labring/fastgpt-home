---
title: MistralAI 131K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-mistralai02-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "MistralAI 131K 上下文档位模型，其 `maxContext` 达 131000 token，支持处理相当长的输入内容。单次最大输出未标注，意味着模型在生成回复时没有硬性 token 限制，实际输出长度受限于模型自身能力与后续处理。`quoteMaxToken` 为 120000 tok"
language: zh
axis_model_tier: "MistralAI / 131000 /  / 120000 / true / true"
axis_vector_db: "Milvus"
covered_models: "ministral-14b-2512、ministral-8b-2512、ministral-3b-2512"
check_day: 2026-09-29
meta_title: MistralAI 131K 上下文 这一档模型配 Milvus 的配置口径
meta_description: MistralAI 131K 上下文档位模型，其 `maxContext` 达 131000 token，支持处理相当长的输入内容。单次最大输出未标注，意味着模型在生成回复时没有硬性 token 限制，实际输出长度受限于模型自身能力与后续处理。`quoteMaxToken` 为 120000 tok
date_published: 2026-09-29
date_modified: 2026-09-29
---

# MistralAI 131K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
MistralAI 131K 上下文档位模型，其 `maxContext` 达 131000 token，支持处理相当长的输入内容。单次最大输出未标注，意味着模型在生成回复时没有硬性 token 限制，实际输出长度受限于模型自身能力与后续处理。`quoteMaxToken` 为 120000 token，这是引用内容的总 token 预算。引用内容的总 token 量由检索到的内容段落合计决定。图片输入功能 `true` 使得模型能够理解并处理图像信息。工具调用功能 `true` 则表明模型具备与外部工具集成的能力，可以执行复杂任务。

## 配 Milvus 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `milvus-service:19530` | 内部集群通信地址，通常为 Kubernetes Service Name |
| `MILVUS_TOKEN` | 按实际部署生成 | 访问 Milvus 服务的认证凭证，确保安全连接 |
| 索引类型 (`index_type`) | `HNSW` | 在高维数据上提供高效的近似最近邻搜索性能 |
| 距离度量 (`metric_type`) | `IP` | 适用于文本嵌入向量，衡量向量间的内积相似度 |
| `nlist` | `128` | HNSW 索引参数，平衡搜索性能与索引构建时间 |
| `nprobe` | `32` | HNSW 搜索参数，影响召回率和查询延迟，可按需调整 |

## 这两者互相约束的地方
模型 131K 的上下文长度，对召回内容的数量和长度都有承载能力。召回条数与每段内容长度的乘积，必须控制在模型的 `maxContext` 预算之内，以避免超出模型处理上限。`quoteMaxToken` 限制了引用内容的总 token 量，而 Milvus 向量库返回的是固定条数的段落。每段内容越长，相同条数下引用的总 token 量就越大，越容易触及 `quoteMaxToken` 上限。反之，每段内容越短，在 `quoteMaxToken` 预算内可以引用更多条段落。Milvus 索引参数如 `nlist` 和 `nprobe` 调大，通常能提升召回率和搜索精度，这对于模型理解复杂查询和生成高质量回答至关重要，能为模型提供更相关的上下文信息。

## 容易做错的三处
- 连接 Milvus 报错 `connection refused`：原因可能是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
- 检索结果的 `vector_field` 为空：原因可能是 Milvus 集合创建时未正确指定向量字段类型或索引未构建。
- 查询 Milvus 超时：原因可能是 `nprobe` 值设置过大导致查询耗时过长，或 Milvus 实例资源不足。

## 怎么确认配好了
- 查看 FastGPT 系统日志，确认 Milvus 连接初始化成功，没有报错信息。
- 执行一次 RAG 查询，检查返回的引用内容是否符合预期条数和相关性，并观察 Milvus 侧的查询延迟。
- 逐步增加测试文档的长度和数量，观察模型在不同 `quoteMaxToken` 限制下的引用表现，确定合适的召回条数与单段长度组合。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
