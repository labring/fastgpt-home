---
title: MistralAI 130K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-mistralai03-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "MistralAI 130K 上下文模型系列，其上下文长度 `maxContext` 达 130000 token，这决定了单次请求中可供模型参考的召回内容总量。引用上限 `quoteMaxToken` 设置为 60000 token，这限制了模型在生成回复时，可引用的召回内容所占用的 token "
language: zh
axis_model_tier: "MistralAI / 130000 /  / 60000 / false / true"
axis_vector_db: "openGauss"
covered_models: "ministral-3b-latest、ministral-8b-latest、mistral-large-latest"
check_day: 2026-09-29
meta_title: MistralAI 130K 上下文 这一档模型配 openGauss 的配置口径
meta_description: MistralAI 130K 上下文模型系列，其上下文长度 `maxContext` 达 130000 token，这决定了单次请求中可供模型参考的召回内容总量。引用上限 `quoteMaxToken` 设置为 60000 token，这限制了模型在生成回复时，可引用的召回内容所占用的 token
date_published: 2026-09-29
date_modified: 2026-09-29
---

# MistralAI 130K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
MistralAI 130K 上下文模型系列，其上下文长度 `maxContext` 达 130000 token，这决定了单次请求中可供模型参考的召回内容总量。引用上限 `quoteMaxToken` 设置为 60000 token，这限制了模型在生成回复时，可引用的召回内容所占用的 token 预算。引用内容合计的 token 预算由 `quoteMaxToken` 决定，而向量库返回的段落条数由检索侧配置决定，两者是相互独立的。工具调用功能 `tool_calling` 为 true，支持模型集成外部工具以扩展能力。图像输入功能 `image_input` 为 false，模型不接受图像作为输入。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限 |
| `ef_construction` | `100–200` | 索引构建时搜索邻居的数量，影响索引质量与构建速度 |
| `ef_search` | `60–120` | 查询时搜索邻居的数量，影响查询精度与速度 |
| `m` | `32` | HNSW 算法中每个顶点的最大连接数，影响索引结构与检索性能 |
| `chunk_size` | `800–1200 字符` | 单个文本段落的字符数，影响向量化粒度与召回条数 |
| `top_k` | `前 5–10 条` | 向量检索返回的段落数量，平衡召回与模型上下文压力 |

## 这两者互相约束的地方
召回条数与每段长度的乘积必须小于模型的上下文预算 130000 token。引用上限 `quoteMaxToken` 按 token 计数，向量库返回的结果按条数计数。当单段文本较长时，引用少数几条就可能达到 60000 token 的引用上限。当单段文本较短时，可以引用更多条数。索引参数 `ef_construction` 和 `ef_search` 调大，可以提升 openGauss 向量检索的准确率，从而为模型提供更相关的上下文。但更高的准确率也可能带来更高的计算开销，需要根据实际负载进行权衡。`m = 32` 参数决定了索引的连接密度，同样影响检索质量与资源消耗。

## 容易做错的三处
*   日志显示 `Context window exceeded` 错误：原因在于召回的总 token 数，加上模型自身输出的 token 数，超过了 130000 token 的最大上下文长度。
*   模型回复内容关联性差或缺失关键信息：原因在于 openGauss 的 `ef_search` 或 `ef_construction` 参数设置过低，导致向量检索召回的段落质量不高或不全面。
*   向量检索响应时间过长：原因在于 `ef_search` 或 `ef_construction` 参数设置过高，或者 `m` 值不当，导致索引查询计算量过大。

## 怎么确认配好了
*   进行端到端测试，观察模型在复杂问题上的回答是否能充分利用知识库中的信息，并核对引用内容是否准确。
*   在 FastGPT 界面中，查看每个对话轮次的引用内容 token 统计，确保其未频繁超出 `quoteMaxToken` 的限制。
*   通过 openGauss 数据库的监控工具，观察向量索引的查询延迟和资源消耗，确保在可接受范围内。
*   针对典型问题集，评估召回段落的相关性分数，并根据业务需求设定合格阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
