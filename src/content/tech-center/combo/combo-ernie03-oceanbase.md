---
title: Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-ernie03-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型，其 128000 的上下文长度表示单次交互中模型能够处理的输入与输出总字符数上限。这意味着在 RAG 场景下，召回的知识内容与用户提问、历史对话记录的总和不应超过此限制。119000 的引用上限指模型在生成回复时，引用知识库内容的理论最大字符量。图片输入能力允许模型"
language: zh
axis_model_tier: "Ernie / 128000 /  / 119000 / true / true"
axis_vector_db: "OceanBase"
covered_models: "ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Ernie 128K 上下文模型，其 128000 的上下文长度表示单次交互中模型能够处理的输入与输出总字符数上限。这意味着在 RAG 场景下，召回的知识内容与用户提问、历史对话记录的总和不应超过此限制。119000 的引用上限指模型在生成回复时，引用知识库内容的理论最大字符量。图片输入能力允许模型
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型，其 128000 的上下文长度表示单次交互中模型能够处理的输入与输出总字符数上限。这意味着在 RAG 场景下，召回的知识内容与用户提问、历史对话记录的总和不应超过此限制。119000 的引用上限指模型在生成回复时，引用知识库内容的理论最大字符量。图片输入能力允许模型处理视觉信息，为多模态 RAG 提供了基础。工具调用能力则支持模型在回答问题时执行外部工具函数，扩展了其解决问题的范围。单次最大输出未标注，通常需通过实际测试确定，但应与上下文长度保持合理比例以避免截断。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OCEANBASE_URL` | `ob://user:password@host:port/database` | 数据库连接地址，遵循标准 URL 格式，确保 FastGPT 能正确连接 OceanBase 实例。 |
| `ef_construction` | `80` | HNSW 索引构建参数，影响索引质量与构建速度。较高的值能提升召回精度，但会增加索引构建时间与内存消耗。 |
| `m` | `16` | HNSW 索引参数，控制每个节点连接的最大邻居数量。适当的 `m` 值能在查询速度与召回精度之间取得平衡。 |
| `recall_top_k` | `30` | 向量召回的条目数量，应小于或等于 `119000 / avg_chunk_length` 且小于模型上下文窗口的限制。 |
| `chunk_overlap` | `10%` | 知识库分段时的重叠量，有助于保持上下文连贯性，避免关键信息被切割。 |

## 这两者互相约束的地方
模型上下文长度与 OceanBase 召回的知识条目数量及每段长度直接相关。召回条数乘以每段平均长度的总和，加上用户查询和历史对话，必须严格控制在 128000 的上下文预算之内。如果超出，模型将无法处理完整信息，可能导致回答不完整或不准确。引用上限 119000 限制了最终能被模型引用的知识总量。这意味着即使 OceanBase 召回了大量相关内容，模型也只会引用其中的一部分。索引参数 `ef_construction` 和 `m` 调大，通常会提升 OceanBase 向量召回的准确性，这意味着模型能够获得更高质量的知识片段。然而，过高的参数值可能导致索引构建时间过长，或查询延迟增加，从而影响整体用户体验。因此，需在召回质量和系统性能之间找到平衡。

## 容易做错的三处
*   日志中出现 `OceanBase connection refused`：通常是 `OCEANBASE_URL` 中的主机地址、端口或认证信息不正确。
*   模型回复中知识引用部分为空或不相关：可能是 `recall_top_k` 设置过低，导致向量库返回的有效召回条目不足，或 `ef_construction` 和 `m` 参数过小，影响了召回精度。
*   FastGPT 界面显示 `Context Window Exceeded` 错误：召回条目总长度与用户输入之和超过了 128000 的模型上下文长度限制。

## 怎么确认配好了
*   上传文档后，观察 FastGPT 的知识库分段预览，确认分段长度和重叠量符合预期。
*   进行模拟问答，检查 FastGPT 生成的回复是否准确引用了知识库内容，并观察引用部分是否完整。
*   通过 FastGPT 后台的日志，查看 OceanBase 的查询耗时，确保在可接受范围内。
*   在 FastGPT 的调试界面，检查每次召回的 `recall_top_k` 条目是否包含了问题的核心信息。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
