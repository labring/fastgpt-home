---
title: Gemini 1000K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-gemini02-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Gemini 1000K 上下文档位模型，其 1,000,000 token 的上下文长度 (`maxContext`) 意味着在单次交互中，模型能够处理极大量的输入信息，包括历史对话、系统指令以及从向量库召回的引用内容。未标注的单次最大输出 (`maxTokens`) 允许模型生成较长的回答，但实"
language: zh
axis_model_tier: "Gemini / 1000000 /  / 1000000 / true / true"
axis_vector_db: "Milvus"
covered_models: "gemini-3.1-pro-preview-customtools、gemini-3.1-pro-preview、gemini-3.1-pro、gemini-2.5-pro、gemini-2.5-flash、gemini-2.5-flash-lite"
check_day: 2026-09-29
meta_title: Gemini 1000K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Gemini 1000K 上下文档位模型，其 1,000,000 token 的上下文长度 (`maxContext`) 意味着在单次交互中，模型能够处理极大量的输入信息，包括历史对话、系统指令以及从向量库召回的引用内容。未标注的单次最大输出 (`maxTokens`) 允许模型生成较长的回答，但实
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Gemini 1000K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Gemini 1000K 上下文档位模型，其 1,000,000 token 的上下文长度 (`maxContext`) 意味着在单次交互中，模型能够处理极大量的输入信息，包括历史对话、系统指令以及从向量库召回的引用内容。未标注的单次最大输出 (`maxTokens`) 允许模型生成较长的回答，但实际输出长度仍受限于总上下文预算。1,000,000 token 的引用上限 (`quoteMaxToken`) 是专门为引用内容预留的 token 预算，模型在生成回答时，可以从这些引用内容中提取信息。工具调用功能支持模型与外部系统进行交互，执行特定操作。图片输入能力则允许模型直接处理图像信息，进行多模态理解。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `your_milvus_instance_ip:19530` | 确保 FastGPT 能正确连接到 Milvus 服务端口。 |
| `MILVUS_TOKEN` | `your_api_key_or_token` | 用于 Milvus 认证，保障数据访问安全。 |
| `HNSW` | `M=32, efConstruction=200` | 经验证 HNSW 索引在召回性能和构建时间上表现均衡，适合高维向量检索。`M` 控制邻居数量，`efConstruction` 影响构建质量。 |
| `IP` | `L2` 或 `COSINE` | `IP`（内积）或 `COSINE`（余弦相似度）根据向量嵌入模型的输出特性选择，通常推荐使用 `COSINE` 满足文本相似度场景。 |
| 召回条数 | `10-20` | 根据引用上限和每段平均 token 数估算，避免一次性召回过多无效内容或超出引用预算。 |
| 单段最大字符 | `800-1200` | 结合模型上下文长度与引用上限，优化单段内容密度，提高召回内容的有效性。 |

## 这两者互相约束的地方
Gemini 1000K 上下文模型与 Milvus 向量库的配合，核心在于如何高效地利用模型的巨大上下文窗口。向量库返回的是固定数量的段落条数，而模型的引用上限则按 token 计量。这意味着，当向量库返回多段内容时，如果每段的长度较短，可能在达到引用上限之前就用完了所有召回条数；反之，如果每段内容较长，则可能在召回少量条数后，引用内容的 token 总量便触及上限。因此，召回条数与每段长度的乘积，必须控制在模型的上下文预算之内，同时要优先考虑引用上限的约束。Milvus 的索引参数，如 `HNSW` 的 `efConstruction` 值调大，会提升召回的准确性，这意味着模型能够获得更高质量的上下文信息，从而在复杂问答场景下生成更精准、更相关的回答。

## 容易做错的三处
- 界面显示「Milvus 连接失败」：`MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
- 回答内容与引用不相关，或引用内容缺失：向量库召回的条数过少，或者索引参数 `HNSW` 的 `M` 值设置过低导致召回质量不佳。
- 模型返回 `maximum context length exceeded` 错误：召回条数过多，或每段文本过长，导致引用内容总 token 超过了模型的引用上限。

## 怎么确认配好了
- 确保 FastGPT 的日志中无 Milvus 连接相关的错误信息，且能正常进行向量搜索。
- 在 FastGPT 平台测试 RAG 功能，观察模型返回的引用内容是否准确且相关。
- 调整召回条数和单段最大字符数，逐步测试在不同配置下，模型是否能稳定地利用引用内容生成高质量回答，并避免 `context length exceeded` 错误。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
