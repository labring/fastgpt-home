---
title: StepFun 100K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-stepfun04-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "StepFun `step-r1-v-mini` 模型具备 100000 的上下文长度，这意味着在单次交互中，模型可以处理最多十万个 token 的输入信息，包括用户查询、历史对话和召回文档。引用上限为 60000 token，这是为引用内容预留的 token 预算，模型在生成回答时会优先使用此预算"
language: zh
axis_model_tier: "StepFun / 100000 /  / 60000 / true / true"
axis_vector_db: "OceanBase"
covered_models: "step-r1-v-mini"
check_day: 2026-09-29
meta_title: StepFun 100K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: StepFun `step-r1-v-mini` 模型具备 100000 的上下文长度，这意味着在单次交互中，模型可以处理最多十万个 token 的输入信息，包括用户查询、历史对话和召回文档。引用上限为 60000 token，这是为引用内容预留的 token 预算，模型在生成回答时会优先使用此预算
date_published: 2026-09-29
date_modified: 2026-09-29
---

# StepFun 100K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
StepFun `step-r1-v-mini` 模型具备 100000 的上下文长度，这意味着在单次交互中，模型可以处理最多十万个 token 的输入信息，包括用户查询、历史对话和召回文档。引用上限为 60000 token，这是为引用内容预留的 token 预算，模型在生成回答时会优先使用此预算内的召回信息。单次最大输出未标注，但通常建议控制在合理范围内以避免过长的回答。图片输入功能 `true` 表示模型支持多模态输入，可处理图像数据。工具调用功能 `true` 表示模型具备执行外部工具的能力，能够实现更复杂的任务流程。

## 配 OceanBase 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OCEANBASE_URL` | `mysql://user:password@host:port/database` | 建立与 OceanBase 实例的连接，协议兼容 MySQL。 |
| `ef_construction` | `64` | 影响索引构建时的图拓扑结构，数值越大，索引质量越高，召回准确率提升。 |
| `m` | `16` | 影响 HNSW 图中每个节点的最大连接数，数值越大，搜索效率与召回效果越好，但索引体积增大。 |
| 召回条数 | `前 5 条` | 在引用上限 60000 token 的预算下，平衡召回数量与单段长度，避免单次召回内容过大。 |
| 单段最大长度 | `4000 字符` | 控制每段文本的粒度，确保在向量化时能捕捉到足够语义信息，并有效利用引用上限。 |
| `consistency_level` | `strong` | 确保读取到最新写入的数据，避免因数据不一致导致召回结果偏差。 |

## 这两者互相约束的地方
召回条数与每段文本的平均长度共同决定了召回内容的总 token 数，这个总和不能超过模型 100000 token 的上下文长度预算。引用上限 60000 token 是对引用内容总量的硬性约束，向量库返回的是条数，而模型处理的是 token 数。召回条数乘以每段文本的平均 token 数，如果先达到 60000 token 的引用上限，则后续召回的条目即使未达到设定的召回条数上限，也将被截断。反之，如果召回条数先达到上限，而总 token 数未满 60000，则引用内容的总量由召回条数决定。OceanBase 的索引参数 `ef_construction` 和 `m` 调大，会提升召回准确率，这意味着模型能获取到更相关的文档片段，有助于在有限的引用上限内构建高质量的上下文。

## 容易做错的三处
*   日志显示 `Error: Context window exceeded`，原因是对模型传入的文本总长度超过了 100000 token。
*   查询结果返回的引用内容为空或不完整，原因可能是召回的文档总 token 数超过了 60000 的引用上限而被截断。
*   向量检索响应时间过长，导致整个请求超时，原因是 OceanBase 的 `ef_construction` 或 `m` 参数设置过小，导致索引质量差，需要进行大量计算才能找到相似向量。

## 怎么确认配好了
*   对 FastGPT 平台进行多次查询，检查日志中是否存在 `Context window exceeded` 错误，确保上下文长度未超限。
*   在 FastGPT 界面检查模型回复中引用的文档内容是否完整且相关，确认引用内容总 token 数在 60000 预算内。
*   通过 OceanBase 监控工具观察 `SELECT` 查询的平均响应时间，评估向量检索性能，并根据业务需求设定可接受的响应时间阈值。
*   执行一系列带有图片输入的查询，确认模型能够正确解析图像信息并给出合理回答。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
