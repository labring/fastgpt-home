---
title: Moonshot 1048K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-moonshot01-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot 模型的上下文长度为 1048576 token，这意味着在单次交互中，可以向模型输入极大量的背景信息和历史对话，为复杂问答和长篇文档处理提供了基础。引用上限 1000000 token 决定了知识库召回内容在模型输入中的最大占比。图片输入能力允许模型处理视觉信息，支持多模态RAG。"
language: zh
axis_model_tier: "Moonshot / 1048576 /  / 1000000 / true / true"
axis_vector_db: "openGauss"
covered_models: "kimi-k3"
check_day: 2026-09-29
meta_title: Moonshot 1048K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Moonshot 模型的上下文长度为 1048576 token，这意味着在单次交互中，可以向模型输入极大量的背景信息和历史对话，为复杂问答和长篇文档处理提供了基础。引用上限 1000000 token 决定了知识库召回内容在模型输入中的最大占比。图片输入能力允许模型处理视觉信息，支持多模态RAG。
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 1048K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Moonshot 模型的上下文长度为 1048576 token，这意味着在单次交互中，可以向模型输入极大量的背景信息和历史对话，为复杂问答和长篇文档处理提供了基础。引用上限 1000000 token 决定了知识库召回内容在模型输入中的最大占比。图片输入能力允许模型处理视觉信息，支持多模态RAG。工具调用能力则使得模型能够与外部系统进行交互，执行特定任务，扩展了其应用场景，例如查询实时数据或执行业务逻辑。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 实例的标准连接字符串格式。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量与构建时间。此值在 32-128 之间是常见平衡点。 |
| `ef_search` | `32` | HNSW 索引查询参数，影响查询召回率与查询速度。此值不应小于 `ef_construction`。 |
| `m` | `32` | HNSW 索引的邻居数量参数，影响索引内存占用与查询性能。 |
| 召回条数 | `20-50` 条 | 结合模型上下文长度与单段文本长度预估，避免单次召回内容溢出模型输入上限。 |
| 单段文本长度 | `800-1200` 字符 | 经验值，确保每段文本携带足够语义信息，又不过长导致 token 浪费或语义分散。 |

## 这两者互相约束的地方
模型的巨大上下文窗口为 RAG 应用提供了广阔空间，但仍需注意召回条数与每段长度的乘积不能超过模型上下文预算。例如，如果每段文本平均 1000 token，召回 1000 条段落将消耗 100 万 token，几乎触及 1048576 token 的上限，这还不包括用户查询和模型回复本身。引用上限 1000000 token 限制了知识库内容在模型输入中的最大比例，实际召回条数应同时受此限制。openGauss 的 `ef_construction` 和 `ef_search` 参数调大，虽然可能提高召回质量，但也会增加索引构建时间和查询延迟，对于此档模型而言，如果延迟过高，可能会影响用户体验，需要权衡。向量库返回的条数应小于或等于模型引用上限以及实际配置的召回条数。

## 容易做错的三处
*   日志显示 `ERROR: context window exceeded`：原因可能是向量召回的文本段落总长度加上用户输入超过了 1048576 token。
*   知识库问答结果不准确，但日志显示召回了大量相关段落：原因可能是 `ef_search` 参数设置过低，导致向量检索未能找到最相关的邻居。
*   查询等待时间过长，甚至超时：原因可能是 `ef_construction` 或 `m` 参数设置过高，导致 openGauss 向量索引的计算开销过大。

## 怎么确认配好了
*   执行一次包含大量上下文的复杂查询，检查模型回复是否充分利用了知识库信息，并确认日志中没有上下文溢出警告。
*   在 FastGPT 界面查看知识库召回的段落数量和内容，确保与 openGauss 返回的向量匹配，并验证召回条数在预期范围内。
*   监控 openGauss 实例的 CPU、内存和 I/O 使用情况，确保在高峰期查询时资源消耗在可接受范围内，通过压测确定 `ef_search` 和 `ef_construction` 的合理阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
