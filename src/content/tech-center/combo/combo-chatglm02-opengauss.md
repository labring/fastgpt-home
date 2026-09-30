---
title: ChatGLM 1000K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-chatglm02-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`maxContext` 1000000 决定了模型在一次对话中可以处理的输入文本总量，这包含了用户提问、历史对话以及系统召回的内容。模型未标注单次最大输出长度，意味着其生成回复的长度通常受限于上下文总量或系统内部的其他设定。`quoteMaxToken` 900000 专门用于限制引用内容的 to"
language: zh
axis_model_tier: "ChatGLM / 1000000 /  / 900000 / false / true"
axis_vector_db: "openGauss"
covered_models: "glm-5.3、glm-5.2"
check_day: 2026-09-29
meta_title: ChatGLM 1000K 上下文 这一档模型配 openGauss 的配置口径
meta_description: `maxContext` 1000000 决定了模型在一次对话中可以处理的输入文本总量，这包含了用户提问、历史对话以及系统召回的内容。模型未标注单次最大输出长度，意味着其生成回复的长度通常受限于上下文总量或系统内部的其他设定。`quoteMaxToken` 900000 专门用于限制引用内容的 to
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 1000K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
`maxContext` 1000000 决定了模型在一次对话中可以处理的输入文本总量，这包含了用户提问、历史对话以及系统召回的内容。模型未标注单次最大输出长度，意味着其生成回复的长度通常受限于上下文总量或系统内部的其他设定。`quoteMaxToken` 900000 专门用于限制引用内容的 token 预算，它规定了从知识库中检索并注入到模型提示词中的引用文本总共可以消耗多少 token。引用内容的 token 预算限制的是引用文本的累计长度，而向量库返回的段落条数是独立的数量。`图片输入 false` 表明当前模型不支持直接处理图片作为输入，而 `工具调用 true` 则表示模型具备与外部工具集成的能力，可以执行函数调用等操作。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 实例的标准连接字符串 |
| `ef_construction` | `128–256` | 影响索引构建时的图拓扑质量，数值越高，召回精度越高，构建时间越长 |
| `ef_search` | `64–128` | 影响查询时的邻居搜索范围，数值越高，召回精度越高，查询延迟越大 |
| `m` | `32` | HNSW 图中每个节点的最大出边数，影响索引结构和查询性能 |
| 召回条数 | `5–10 条` | 综合考虑引用上限与单段长度，避免超出模型上下文限制 |
| 单段最大字符数 | `800–1200 字符` | 确保每段内容完整且不冗余，方便模型理解 |

## 这两者互相约束的地方
ChatGLM 1000K 上下文模型拥有 1000000 的 `maxContext`，这为整合大量检索内容提供了空间。然而，`quoteMaxToken` 900000 明确限制了引用内容的 token 预算。当 openGauss 向量库返回多段内容时，这些内容的累计 token 数必须在 `quoteMaxToken` 范围内。这意味着召回条数与每段内容的长度需要协同控制，防止任何一方首先触及上限。引用上限按 token 计，向量库返回的按条数计，谁先触顶取决于每段内容的平均 token 长度。如果每段内容较长，则较少的条数就会达到引用上限；如果每段内容较短，则可以返回更多的条数。openGauss 的 `ef_construction` 和 `ef_search` 参数调高，可以提升向量检索的精度，从而可能召回与查询更相关的段落。这种高精度召回有助于模型在有限的引用预算内获取高质量信息，提升回答的相关性。

## 容易做错的三处
*   日志中出现 `connection refused` 或 `authentication failed` 错误，原因通常是 `OPENGAUSS_URL` 配置的连接信息（如主机、端口、用户名、密码）不正确。
*   模型返回的回答中缺乏相关知识引用，但向量库有对应内容，这可能是因为召回条数过少或单段字符数过长，导致实际引用的内容不足以支撑回答，或者 `ef_search` 值过低影响了检索精度。
*   系统响应时间明显变长，尤其是在知识库检索环节，这可能与 openGauss 的 `ef_construction` 或 `ef_search` 值设置过高有关，导致索引构建或查询计算量过大。

## 怎么确认配好了
*   在 FastGPT 界面中进行测试，观察每次查询后模型返回的引用内容是否充足且相关，并查看日志中是否有 `quoteMaxToken` 警告。
*   在 openGauss 数据库中，通过 `EXPLAIN ANALYZE` 命令分析向量查询的执行计划和耗时，确认 `ef_search` 的设置是否导致查询效率低下。
*   通过 FastGPT 的监控面板查看 RAG 环节的平均响应时间，并与基线进行对比，确认 openGauss 的参数调整没有引入显著的延迟。
*   进行多轮对话测试，观察模型在复杂问题下是否能持续有效地利用知识库信息，并检查 `maxContext` 的使用情况。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
