---
title: Moonshot 262K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-moonshot02-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "上下文长度 `maxContext` 达到 262144 token，这意味着模型在单次对话中能处理的输入信息量极大，可容纳更长的历史对话或更丰富的参考资料。引用上限 `quoteMaxToken` 设定为 256000 token，这是 FastGPT 用于承载检索内容的预算，引用内容的总 tok"
language: zh
axis_model_tier: "Moonshot / 262144 /  / 256000 / true / true"
axis_vector_db: "openGauss"
covered_models: "kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5"
check_day: 2026-09-29
meta_title: Moonshot 262K 上下文 这一档模型配 openGauss 的配置口径
meta_description: 上下文长度 `maxContext` 达到 262144 token，这意味着模型在单次对话中能处理的输入信息量极大，可容纳更长的历史对话或更丰富的参考资料。引用上限 `quoteMaxToken` 设定为 256000 token，这是 FastGPT 用于承载检索内容的预算，引用内容的总 tok
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 262K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
上下文长度 `maxContext` 达到 262144 token，这意味着模型在单次对话中能处理的输入信息量极大，可容纳更长的历史对话或更丰富的参考资料。引用上限 `quoteMaxToken` 设定为 256000 token，这是 FastGPT 用于承载检索内容的预算，引用内容的总 token 量将受此限制。段落条数由检索系统返回，与引用上限是两个独立的量。图片输入能力允许模型处理视觉信息，拓宽了应用场景。工具调用能力则支持模型与外部系统交互，实现更复杂的自动化流程。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的必要凭据，确保连接字符串包含所有鉴权信息。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量与构建时间。此值在 32-128 之间通常能取得良好平衡，`64` 为一个常用起点。 |
| `ef_search` | `32` | HNSW 索引查询参数，影响查询召回率与查询速度。此值建议不小于 `m`，且通常小于 `ef_construction`。 |
| `m` | `32` | HNSW 索引图的每层最大邻居数。此值越大，索引质量越高，但索引大小和查询时间也随之增加。 |
| `vector_dimension` | `1536` | 向量维度，需与嵌入模型输出的维度一致。 |
| `chunk_size` | `800–1200 字符` | 单个知识块的文本长度，影响检索粒度与引用效率。 |

## 这两者互相约束的地方
模型上下文的 262144 token 预算是总的输入上限，其中包括了用户输入、系统指令以及检索到的内容。引用上限 256000 token 专门用于检索内容的预算，它按 token 量计算。向量库返回的是固定数量的段落条数，当每段文本较短时，可能在达到引用上限前就已返回了大量段落；反之，若每段文本很长，则可能在返回少量段落后就触及了引用上限。索引参数 `ef_construction` 和 `ef_search` 的调高，会提升 openGauss 向量检索的准确度，增加召回相关内容的概率，进而使得模型能够接收到更精准的输入，但同时也会增加索引构建和查询的资源消耗。

## 容易做错的三处
*   错误信息显示 `openGauss connection refused`：`OPENGAUSS_URL` 配置有误，导致 FastGPT 无法建立数据库连接，通常是主机、端口或凭据不正确。
*   检索结果为空或不相关：`ef_search` 设置过低，导致向量检索未能有效遍历 HNSW 图，未能召回足够的相关段落。
*   模型输出内容过短或不完整：`quoteMaxToken` 未充分利用，或 `chunk_size` 过大导致单个检索段落占用过多 token，使得实际可引用的有效信息量不足。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传文档并观察分段情况，确认 `chunk_size` 配置是否符合预期。
*   通过 FastGPT 的调试模式，查看每次检索的原始召回条数和引用内容的实际 token 占用，核对是否接近 `quoteMaxToken` 上限。
*   执行模拟查询，检查 openGauss 数据库的日志，确认 `ef_search` 参数生效且查询响应时间在可接受范围内。
*   在 FastGPT 的模型配置页面，检查 `quoteMaxToken` 的数值与本页建议是否一致，确保模型能预算到足够的引用内容。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
