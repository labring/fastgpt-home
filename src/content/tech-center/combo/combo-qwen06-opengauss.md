---
title: Qwen 128K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-qwen06-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Qwen 128K 上下文这一档模型，其上下文长度高达 128000 tokens，意味着单次输入可以承载极大量的信息，这为知识库召回提供了宽裕的预算。引用上限 120000 tokens 决定了从知识库中检索并送入模型的引用内容总量。图片输入能力表示模型可以直接处理图像信息，支持多模态RAG应用场"
language: zh
axis_model_tier: "Qwen / 128000 /  / 120000 / true / false"
axis_vector_db: "openGauss"
covered_models: "qwen-vl-max、qwen-vl-plus"
check_day: 2026-09-29
meta_title: Qwen 128K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Qwen 128K 上下文这一档模型，其上下文长度高达 128000 tokens，意味着单次输入可以承载极大量的信息，这为知识库召回提供了宽裕的预算。引用上限 120000 tokens 决定了从知识库中检索并送入模型的引用内容总量。图片输入能力表示模型可以直接处理图像信息，支持多模态RAG应用场
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 128K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Qwen 128K 上下文这一档模型，其上下文长度高达 128000 tokens，意味着单次输入可以承载极大量的信息，这为知识库召回提供了宽裕的预算。引用上限 120000 tokens 决定了从知识库中检索并送入模型的引用内容总量。图片输入能力表示模型可以直接处理图像信息，支持多模态RAG应用场景。工具调用能力的缺失则表明，如果需要外部工具辅助，则需在模型外部进行逻辑编排。单次最大输出未标注，通常意味着模型会根据输入上下文和任务需求，生成相应长度的回答。

## 配 openGauss 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的必要连接字符串，需指向实际部署的 openGauss 实例。 |
| `ef_construction` | `64`–`128` | openGauss HNSW 索引构建参数，影响索引质量和构建速度。值越大，索引质量越高，召回准确率越好，但构建时间更长。 |
| `ef_search` | `32`–`64` | openGauss HNSW 索引查询参数，影响查询召回精度和查询速度。值越大，召回精度越高，但查询耗时增加。 |
| `m` | `32` | openGauss HNSW 索引的图层连接数参数，影响索引的内存占用和查询性能。建议保持默认值或根据实际测试调整。 |
| 召回条数 | `20`–`40` 条 | 结合模型引用上限和单段文本平均长度，确保召回内容在模型上下文预算内。 |
| 单段最大长度 | `800`–`1200` 字符 | 确保知识库分段粒度适中，既包含足够信息，又不至于过长导致模型处理效率下降或超过上下文限制。 |

## 这两者互相约束的地方
模型上下文长度是核心约束。召回条数与每段长度的乘积，加上原始问题和系统提示的长度，必须小于模型 128000 tokens 的上下文预算。如果召回内容过长，模型将无法处理完整信息，导致回答不准确或截断。引用上限 120000 tokens 意味着即使向量库返回再多条目，送入模型的总引用内容也不会超过此限制。因此，在 openGauss 中设置的召回条数，最终会受到模型引用上限的约束。openGauss 的索引参数，如 `ef_construction` 和 `ef_search`，调大后可以提升向量检索的召回精度，这意味着为模型提供了更高质量的潜在引用内容。然而，更高的召回精度也可能带来更长的检索时间，这需要与模型处理时延进行权衡，确保整体RAG链路的响应速度满足应用需求。

## 容易做错的三处
*   错误现象：模型返回的回答内容缺失关键信息或逻辑不连贯。原因：知识库分段过长，导致单段文本超过模型处理能力，或分段过短，导致语义不完整。
*   错误现象：openGauss 查询超时，日志显示 `canceling statement due to statement timeout`。原因：`ef_search` 参数设置过大，导致向量检索计算量剧增，超出数据库配置的查询时间限制。
*   错误现象：RAG 流程中模型输出的引用来源为空或不准确。原因：openGauss 向量索引的 `ef_construction` 或 `m` 参数设置不当，导致索引质量低下，无法有效召回相关文档。

## 怎么确认配好了
*   执行 FastGPT 的 RAG 流程，检查日志中 openGauss 的查询耗时，确保在可接受范围内。
*   随机选取多个复杂问题进行测试，观察模型回答的准确性和完整性，并核对引用来源是否正确且相关。
*   在 FastGPT 界面或API返回中，检查实际送入模型的引用内容长度，确认其未超过 120000 tokens 的引用上限。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
