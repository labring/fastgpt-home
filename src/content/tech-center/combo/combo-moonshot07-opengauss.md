---
title: Moonshot 32K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-moonshot07-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`moonshot-v1-32k-vision-preview` 模型具备 32000 token 的上下文长度，这意味着单次交互中模型能够处理的输入与输出总和上限。图片输入能力允许模型理解并处理包含图像信息的查询，拓宽了应用场景。工具调用能力则支持模型与外部系统进行交互，执行特定任务。引用上限 3"
language: zh
axis_model_tier: "Moonshot / 32000 /  / 32000 / true / true"
axis_vector_db: "openGauss"
covered_models: "moonshot-v1-32k-vision-preview"
check_day: 2026-09-29
meta_title: Moonshot 32K 上下文 这一档模型配 openGauss 的配置口径
meta_description: `moonshot-v1-32k-vision-preview` 模型具备 32000 token 的上下文长度，这意味着单次交互中模型能够处理的输入与输出总和上限。图片输入能力允许模型理解并处理包含图像信息的查询，拓宽了应用场景。工具调用能力则支持模型与外部系统进行交互，执行特定任务。引用上限 3
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 32K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么

`moonshot-v1-32k-vision-preview` 模型具备 32000 token 的上下文长度，这意味着单次交互中模型能够处理的输入与输出总和上限。图片输入能力允许模型理解并处理包含图像信息的查询，拓宽了应用场景。工具调用能力则支持模型与外部系统进行交互，执行特定任务。引用上限 32000 token 规定了检索到的内容在输入给模型时所占用的最大 token 预算。段落条数由检索逻辑决定，与引用上限各自独立。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的连接字符串格式要求 |
| `ef_construction` | `64` | HNSW 索引构建时邻居数量的上限，影响索引质量与构建时间，通常取 `M` 的 2 倍或更高 |
| `ef_search` | `32` | HNSW 搜索时遍历的邻居数量，影响搜索召回率与查询速度，通常取 `M` 或更高 |
| `m` | `16` | HNSW 索引中每个节点的最大连接数，影响索引大小与查询性能，平衡存储与搜索效率 |
| 召回条数 | `5–10 条` | 结合单段平均 token 数，确保引用内容总和不超出引用上限，并兼顾模型处理能力 |
| 单段字符长度 | `500–800 字符` | 兼顾语义完整性与模型上下文处理能力，过长可能导致关键信息稀释，过短可能丢失上下文 |

## 这两者互相约束的地方

这一档模型 32000 token 的上下文长度是输入总量的硬性限制。向量库检索返回的条数与每段内容的长度直接影响总输入 token 量。引用上限 32000 token 是模型可以接收的引用内容的最大 token 预算，它限定了引用内容的上限。向量库返回的是固定数量的段落，每段内容的长度决定了这些段落总共占据多少 token。当每段内容较长时，即使返回的段落数量不多，也可能迅速触及引用上限。反之，当每段内容较短时，可以返回更多段落。openGauss 的 `ef_construction` 和 `ef_search` 参数调高，可以提升向量检索的召回率和精度，为模型提供更相关的上下文。但更高的召回率可能会带来更多段落，占用更多 token，因此需与模型引用上限进行平衡。

## 容易做错的三处

*   FastGPT 日志显示 `400 Bad Request` 错误，内容包含 `context_length_exceeded`。原因在于向量库返回的引用内容总 token 数，加上用户查询和系统指令，超过了模型 32000 token 的上下文长度限制。
*   检索结果界面显示召回条数远低于预期。原因可能是 `ef_search` 参数设置过低，导致向量检索过程没有充分探索近邻空间，影响了召回率。
*   模型回答缺乏相关性或信息不全。原因可能是单段字符长度设置过小，导致向量库返回的每段内容都过于零碎，无法提供完整的上下文信息。

## 怎么确认配好了

*   在 FastGPT 知识库管理页面，上传具有代表性的文档，并观察分段情况，确认单段字符长度符合预期。
*   通过 FastGPT 的调试功能，输入典型问题，检查向量库召回的条数和内容，确保召回的相关性。
*   在 FastGPT 的模型配置中，将引用上限设置为 32000，并测试不同召回条数下的模型响应，观察是否出现上下文超限错误，确定合理的召回条数上限。
*   监控 openGauss 数据库的 CPU 和内存使用情况，结合查询响应时间，评估 `ef_construction` 和 `ef_search` 参数对性能的影响，并根据实际负载进行调整。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
