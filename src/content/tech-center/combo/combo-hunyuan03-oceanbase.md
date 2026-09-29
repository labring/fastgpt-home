---
title: Hunyuan 28K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-hunyuan03-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 28K 上下文模型，如 `hunyuan-large` 和 `hunyuan-turbo`，其 28000 的上下文长度，决定了单次请求中模型可以处理的输入信息总量。这包括用户提问、历史对话以及从知识库召回的内容。引用上限 20000 意味着知识库返回的引用文本量不应超过此限制，否则"
language: zh
axis_model_tier: "Hunyuan / 28000 /  / 20000 / false / false"
axis_vector_db: "OceanBase"
covered_models: "hunyuan-large、hunyuan-turbo"
check_day: 2026-09-29
meta_title: Hunyuan 28K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Hunyuan 28K 上下文模型，如 `hunyuan-large` 和 `hunyuan-turbo`，其 28000 的上下文长度，决定了单次请求中模型可以处理的输入信息总量。这包括用户提问、历史对话以及从知识库召回的内容。引用上限 20000 意味着知识库返回的引用文本量不应超过此限制，否则
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 28K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 28K 上下文模型，如 `hunyuan-large` 和 `hunyuan-turbo`，其 28000 的上下文长度，决定了单次请求中模型可以处理的输入信息总量。这包括用户提问、历史对话以及从知识库召回的内容。引用上限 20000 意味着知识库返回的引用文本量不应超过此限制，否则可能导致截断或引用不完整。此档模型不具备图片输入能力，因此RAG链路中无法处理图像信息。同样，工具调用功能未开放，所有复杂逻辑需在RAG系统外部实现，或通过模型内部的指令理解完成。

## 配 OceanBase 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OCEANBASE_URL` | `ob://user:pass@host:port/database` | 连接 OceanBase 实例的必需参数，确保网络可达性。 |
| `ef_construction` | `80` | 控制 HNSW 索引构建时的邻居数量，影响索引质量与构建速度。 |
| `m=16` | `16` | HNSW 图层连接数，平衡查询性能与内存消耗。 |
| `recall_top_k` | `3–5` | 向量检索返回的相似文档数量，避免召回过多无关内容。 |
| `chunk_size` | `800–1200 字符` | 知识库文档切分粒度，需兼顾语义完整性与模型上下文限制。 |
| `SEEKDB_URL` | `mysql://user:pass@host:port/database` | SEEKDB 与 OceanBase 兼容 MySQL 协议，配置口径与 `OCEANBASE_URL` 相同。 |

## 这两者互相约束的地方
Hunyuan 28K 上下文模型与 OceanBase 向量库的配合，核心在于上下文预算的合理分配。知识库召回的条数乘以每段文本的平均长度，其总和必须严格控制在 28000 的上下文长度之内。若超出此限制，模型将无法处理全部输入。引用上限 20000 进一步约束了知识库内容的引用量，即使向量库返回了大量相关内容，最终能被模型引用的部分也受此限制。在 OceanBase 中，`ef_construction` 和 `m` 等索引参数调大后，虽然可能提高召回精度，但同时也增加了索引构建和查询的计算资源消耗，这需要与模型处理速度和系统响应时间进行权衡。

## 容易做错的三处
*   知识库查询返回 0 条结果：`OCEANBASE_URL` 配置错误或网络不通，导致无法连接数据库。
*   模型回答内容过短且未引用知识库：`recall_top_k` 设置过小，或向量检索的相似度阈值过高，未能召回足够的信息。
*   模型响应时间过长：`ef_construction` 或 `m` 参数设置过大，导致向量检索耗时增加。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，测试知识库连接状态，确认显示“连接成功”。
*   上传文档至知识库后，检查 OceanBase 数据库中是否存在对应的向量数据。
*   通过 FastGPT 的调试工具，观察模型请求的输入 token 数量，确保召回内容未超出 28000 的上下文限制。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
