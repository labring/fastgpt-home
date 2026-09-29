---
title: ChatGLM 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-chatglm06-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "ChatGLM 家族这一档模型提供 128000 的上下文长度，意味着单次请求中可携带的指令、历史对话和知识库召回内容总量上限。引用上限 120000 明确了知识库召回内容在整个上下文中的最大占比，为 RAG 应用提供了充裕的知识注入空间。工具调用能力的提供，使得模型能够执行外部函数来增强其解决问题"
language: zh
axis_model_tier: "ChatGLM / 128000 /  / 120000 / false / true"
axis_vector_db: "Milvus"
covered_models: "glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4-air、glm-4-flash、glm-4-plus"
check_day: 2026-09-29
meta_title: ChatGLM 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: ChatGLM 家族这一档模型提供 128000 的上下文长度，意味着单次请求中可携带的指令、历史对话和知识库召回内容总量上限。引用上限 120000 明确了知识库召回内容在整个上下文中的最大占比，为 RAG 应用提供了充裕的知识注入空间。工具调用能力的提供，使得模型能够执行外部函数来增强其解决问题
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
ChatGLM 家族这一档模型提供 128000 的上下文长度，意味着单次请求中可携带的指令、历史对话和知识库召回内容总量上限。引用上限 120000 明确了知识库召回内容在整个上下文中的最大占比，为 RAG 应用提供了充裕的知识注入空间。工具调用能力的提供，使得模型能够执行外部函数来增强其解决问题的能力，例如查询实时数据或执行特定操作。未标注的单次最大输出长度表示模型可能根据输入和内部逻辑动态调整生成文本的长度，通常会足够完成一般问答。图片输入为 `false` 则表明此档模型不直接支持多模态的图像理解能力。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `milvus.svc.cluster.local:19530` 或 `your_milvus_host:19530` | 指定 Milvus 服务地址和端口，确保 FastGPT 能够正确连接。 |
| `MILVUS_TOKEN` | `your_milvus_api_key` | 使用认证令牌增强连接安全性，避免未授权访问。 |
| `index_type` | `HNSW` | `HNSW` 在大规模向量搜索中表现出较高的召回率和查询效率，适合 RAG 场景。 |
| `metric_type` | `IP` | 内积（`IP`）距离在衡量文本嵌入相似度时通常表现良好，尤其适用于归一化的嵌入向量。 |
| `search_k` | `32` | 在 `HNSW` 索引中，`search_k` 影响查询时的邻居节点数量，通常 `32` 到 `64` 之间能平衡性能和召回。 |
| `recall_top_k` | `20-30` | 经验值，确保在模型引用上限内提供足够的上下文多样性。 |

## 这两者互相约束的地方
模型上下文长度与 Milvus 召回策略之间存在直接约束。ChatGLM 128K 上下文模型的 128000 上下文长度是硬性上限，这意味着所有输入内容（包括指令、历史对话和知识库召回）的总和不得超过此值。知识库的引用上限 120000 则进一步限定了召回内容的最大体积。在配置 Milvus 时，`recall_top_k` 参数决定了从向量库中返回的召回条数。召回条数乘以每条内容的平均字符长度，必须确保最终的总长度低于模型的引用上限。如果 Milvus 返回的条数过多，导致总长度超出，模型将截断输入，可能损失关键信息。反之，若召回条数太少，可能无法为模型提供足够的背景知识。此外，Milvus 的索引参数，如 `HNSW` 的 `efConstruction` 和 `M` 参数，会影响索引构建时间和查询效率。当这些参数调大以提高召回质量时，可能会增加 Milvus 的资源消耗，但对于模型而言，这意味着更精准的召回，从而可能提升 RAG 效果。

## 容易做错的三处
*   调用模型时出现“context window exceeded”错误，现象是模型拒绝响应或返回截断内容。原因在于 Milvus 返回的召回内容加上其他输入超出了模型的 128000 上下文长度限制。
*   模型回答缺乏相关性或出现“信息不足”的提示。原因可能是 Milvus 的 `recall_top_k` 设置过低，导致召回的知识条数不足以覆盖用户问题，或者 `metric_type` 未能准确捕捉语义相似性。
*   Milvus 查询响应时间过长，导致整个 FastGPT 应用响应延迟。原因在于 `HNSW` 索引的 `search_k` 参数设置过大，或 Milvus 实例的硬件资源不足以支撑高并发查询。

## 怎么确认配好了
*   通过 FastGPT 的调试接口，观察每次请求发送给 ChatGLM 模型的实际上下文长度，确保其在 128000 范围内。
*   在 FastGPT 中配置测试集，观察模型对特定知识库问题的回答质量，特别是对 Milvus 召回内容的使用情况。
*   监控 Milvus 实例的查询延迟和资源使用情况，确保在预期负载下 `query_latency` 保持在可接受范围，并且 `CPU` 和 `memory` 使用率稳定。
*   检查 FastGPT 中知识库的召回日志，确认 Milvus 返回的 `recall_top_k` 条数与配置一致，并且返回的向量 ID 对应的内容是相关的。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
