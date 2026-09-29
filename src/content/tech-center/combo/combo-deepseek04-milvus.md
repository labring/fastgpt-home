---
title: DeepSeek 64K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-deepseek04-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "DeepSeek 64K 上下文模型，其 64000 的上下文长度，决定了单次请求中可以承载的输入令牌总量。这包括了用户查询、系统指令以及从知识库召回的内容。引用上限 60000 意味着在知识库检索场景下，模型可以处理的引用段落总令牌数上限。单次最大输出未标注，通常意味着模型会根据输入内容和内部逻辑"
language: zh
axis_model_tier: "DeepSeek / 64000 /  / 60000 / false / false"
axis_vector_db: "Milvus"
covered_models: "deepseek-reasoner"
check_day: 2026-09-29
meta_title: DeepSeek 64K 上下文 这一档模型配 Milvus 的配置口径
meta_description: DeepSeek 64K 上下文模型，其 64000 的上下文长度，决定了单次请求中可以承载的输入令牌总量。这包括了用户查询、系统指令以及从知识库召回的内容。引用上限 60000 意味着在知识库检索场景下，模型可以处理的引用段落总令牌数上限。单次最大输出未标注，通常意味着模型会根据输入内容和内部逻辑
date_published: 2026-09-29
date_modified: 2026-09-29
---

# DeepSeek 64K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
DeepSeek 64K 上下文模型，其 64000 的上下文长度，决定了单次请求中可以承载的输入令牌总量。这包括了用户查询、系统指令以及从知识库召回的内容。引用上限 60000 意味着在知识库检索场景下，模型可以处理的引用段落总令牌数上限。单次最大输出未标注，通常意味着模型会根据输入内容和内部逻辑生成尽可能完整的回答，不受硬性长度限制，但实际输出长度仍受限于总上下文。图片输入 false 和工具调用 false 则明确了此档模型不具备处理图像信息和执行外部工具的能力，因此相关链路在设计时应予规避。

## 配 Milvus 要定哪些

| 配置项             | 建议取法       | 这样取的依据                                                                 |
| :----------------- | :------------- | :--------------------------------------------------------------------------- |
| `MILVUS_ADDRESS`   | `localhost:19530` | 默认部署地址，根据实际 Milvus 服务端点配置                                   |
| `MILVUS_TOKEN`     | `YOUR_API_KEY` | Milvus 认证凭据，确保访问安全和权限正确                                      |
| `HNSW`             | `M=16, efConstruction=128` | HNSW 索引参数，平衡查询性能与索引构建时间，M 影响连接数，efConstruction 影响构建质量 |
| `IP`               | `COSINE`       | 向量相似度度量方式，余弦相似度在文本嵌入场景中表现良好                       |
| `recall_top_k`     | `32`           | 从 Milvus 召回的向量数量，为后续精排和模型上下文预留充足的选择空间           |
| `chunk_overlap_size` | `128 字符`     | 文本切片时的重叠大小，有助于保持语义连贯性，避免关键信息被切断               |

## 这两者互相约束的地方
DeepSeek 64K 上下文模型与 Milvus 协同工作时，其核心约束体现在上下文预算的管理上。知识库召回的“召回条数 × 每段长度”之和，必须严格控制在 64000 的总上下文长度之内，以避免模型输入超限。同时，模型的引用上限 60000 令牌，是实际能够被模型用于生成回答的知识内容上限，它可能低于 Milvus 返回的原始召回内容总量。这意味着即便 Milvus 返回了大量相关条目，最终能进入模型上下文的仍受此上限约束。在 Milvus 中，索引参数如 `HNSW` 的 `efConstruction` 值调大，可以提高召回的准确性，但这通常也意味着更高的查询延迟，需要在模型对实时性要求不高时进行权衡。过高的 `recall_top_k` 值可能导致不必要的网络传输和后续处理负担，但过低则可能错过关键信息。

## 容易做错的三处
*   日志中出现 `Context window exceeded` 错误，原因在于召回的知识段落总长度加上用户输入超过了模型 64000 的上下文限制。
*   模型回答中知识引用不完整或缺失，原因可能是 Milvus 召回的 `recall_top_k` 条目数量不足，或单段文本切分过短，导致关键信息被截断。
*   Milvus 查询响应时间过长，导致整个请求超时，原因可能是 `HNSW` 索引的 `efSearch` 参数设置过高，或 Milvus 实例资源不足。

## 怎么确认配好了
*   提交一个包含复杂知识查询的请求，检查模型回答是否准确引用了知识库内容，并观察 Milvus 查询的响应时间。
*   在 FastGPT 界面查看 RAG 链路的“召回内容”部分，确认 Milvus 返回的条目数量和内容是否符合预期，且未超出模型引用上限。
*   通过 Milvus 监控工具，检查 `MILVUS_ADDRESS` 指向的 Milvus 实例的查询延迟和吞吐量指标，确保在可接受范围内。
*   构造一个接近 64000 令牌上限的输入，包括用户问题和模拟的知识召回内容，验证模型是否能正常处理并给出回答，不报错 `Context window exceeded`。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
