---
title: Moonshot 32K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-moonshot04-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot 32K 上下文模型提供了高达 32000 token 的上下文长度，这意味着在单次对话中，系统能够处理并理解更大量的历史信息和召回内容。引用上限同样为 32000 token，这部分预算专用于引用内容，它限定了检索到的文档片段合计可以消耗的 token 总量。段落条数由检索逻辑决定"
language: zh
axis_model_tier: "Moonshot / 32000 /  / 32000 / false / true"
axis_vector_db: "openGauss"
covered_models: "moonshot-v1-32k"
check_day: 2026-09-29
meta_title: Moonshot 32K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Moonshot 32K 上下文模型提供了高达 32000 token 的上下文长度，这意味着在单次对话中，系统能够处理并理解更大量的历史信息和召回内容。引用上限同样为 32000 token，这部分预算专用于引用内容，它限定了检索到的文档片段合计可以消耗的 token 总量。段落条数由检索逻辑决定
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 32K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Moonshot 32K 上下文模型提供了高达 32000 token 的上下文长度，这意味着在单次对话中，系统能够处理并理解更大量的历史信息和召回内容。引用上限同样为 32000 token，这部分预算专用于引用内容，它限定了检索到的文档片段合计可以消耗的 token 总量。段落条数由检索逻辑决定，与引用上限是两个独立的考量维度。工具调用能力的开启允许模型执行预设的外部功能，例如查询数据库或调用 API。当前模型不支持图片输入，因此不适用于需要视觉信息处理的场景。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | 连接 openGauss 数据库实例的必要参数，确保服务可达。 |
| `ef_construction` | `100–200` | 影响索引构建时的图拓扑质量，数值越大，索引质量越高，但构建时间增加。 |
| `ef_search` | `60–120` | 影响查询时最近邻搜索的精度，数值越大，召回精度越高，但查询耗时增加。 |
| `m` | `32` | HNSW 图的每个节点连接的最大邻居数量，影响索引结构和查询性能。 |
| 召回条数 | `前 5–10 条` | 结合模型引用上限和单段平均 token 数，避免超出引用预算。 |
| 分段长度 | `400–800 字符` | 兼顾语义完整性和模型上下文处理效率，避免单段过长或过短。 |

## 这两者互相约束的地方
模型上下文长度为 32000 token，这意味着所有输入（包括用户查询、历史对话和召回内容）的总和不能超过此限制。引用上限同样为 32000 token，这部分预算专门用于检索系统返回的文档片段。向量库返回的是固定数量的文档条目，而模型侧的引用上限是按 token 计数的。当每段召回内容的平均 token 数较高时，即使召回条数不多，也可能率先触及引用上限。反之，如果每段内容较短，则可能在达到引用上限前召回更多条目。openGauss 的索引参数，如 `ef_construction` 和 `ef_search`，调大可以提升检索质量，但也会增加索引构建和查询的资源消耗，这需要与模型处理的实时性要求进行权衡。

## 容易做错的三处
*   日志显示 `context_length_exceeded` 错误：原因在于召回内容与用户输入及历史对话的总 token 数超出了模型 `32000` 的上下文限制。
*   检索结果数量正常但模型回答未充分利用引用：原因可能是单段内容过长，导致引用内容总 token 数迅速达到 `32000` 的引用上限，而实际可利用的段落条数偏少。
*   查询响应时间明显变长：原因可能是 openGauss 的 `ef_search` 参数设置过高，导致每次向量搜索的计算量增大，影响了整体端到端延迟。

## 怎么确认配好了
*   针对典型查询，检查 FastGPT 界面中实际发送给模型的输入 token 数，确保其低于 `32000`。
*   通过 FastGPT 的调试模式，观察模型实际接收到的引用内容，计算其 token 总量，并与 `32000` 的引用上限进行对比。
*   在 openGauss 数据库中，执行几次向量相似度查询，并使用 `EXPLAIN ANALYZE` 命令分析查询计划和执行时间，确认 `ef_search` 参数的性能表现是否符合预期。
*   部署后进行多轮对话测试，观察模型回答的质量和相关性，结合日志分析，判断召回内容是否有效支撑了模型输出。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
