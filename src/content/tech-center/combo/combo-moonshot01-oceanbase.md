---
title: Moonshot 1048K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-moonshot01-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot `kimi-k3` 模型具备 1048576 token 的上下文长度，这意味着在单次对话中，模型可以处理极其庞大的输入信息。引用上限为 1000000 token，这笔预算专门用于存放从知识库检索到的内容。引用上限是引用内容整体的 token 预算，它限定了所有引用内容合计占用的"
language: zh
axis_model_tier: "Moonshot / 1048576 /  / 1000000 / true / true"
axis_vector_db: "OceanBase"
covered_models: "kimi-k3"
check_day: 2026-09-29
meta_title: Moonshot 1048K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Moonshot `kimi-k3` 模型具备 1048576 token 的上下文长度，这意味着在单次对话中，模型可以处理极其庞大的输入信息。引用上限为 1000000 token，这笔预算专门用于存放从知识库检索到的内容。引用上限是引用内容整体的 token 预算，它限定了所有引用内容合计占用的
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 1048K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
Moonshot `kimi-k3` 模型具备 1048576 token 的上下文长度，这意味着在单次对话中，模型可以处理极其庞大的输入信息。引用上限为 1000000 token，这笔预算专门用于存放从知识库检索到的内容。引用上限是引用内容整体的 token 预算，它限定了所有引用内容合计占用的 token 数量。段落条数由检索侧的返回条数决定，两者是不同的量。模型支持图片输入，允许在对话中融入视觉信息。工具调用能力则使得模型能够与外部系统交互，执行特定任务或获取实时数据。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :--- | :--- | :--- |
| `OCEANBASE_URL` | `ob://user:pass@host:port/database` | 链接到 OceanBase 实例的标准格式 |
| `ef_construction` | `100` | 索引构建时邻居数量，影响搜索质量与速度的平衡 |
| `m=16` | `16` | HNSW 索引中每个节点的最大连接数，影响索引结构 |
| `recall_max_tokens` | `800000` | 留出部分上下文给用户输入和模型生成，保证引用内容占比 |
| `top_k` | `5` | 结合 OceanBase 召回效率与模型上下文预算，筛选最相关条目 |
| `chunk_overlap` | `50` | 分块时重叠字符数，确保上下文连贯性，避免信息丢失 |

SEEKDB 在使用 OceanBase 作为向量存储时，配置口径与 OceanBase 直连方式保持一致。

## 这两者互相约束的地方
模型的上下文长度是总预算，召回条数与每段长度的乘积必须小于此预算，以避免输入超限。引用上限按 token 计，向量库返回的则是按条数计。引用内容的总 token 数达到引用上限时，即使还有更多条目，也不会被模型处理。反之，如果单条内容过长，即使条数不多，也可能迅速触及引用上限。因此，每段内容的平均长度是决定引用上限与召回条数哪个先触顶的关键。OceanBase 的 `ef_construction` 和 `m` 参数调大，可以提高检索准确性，但可能增加索引构建时间。对于 `kimi-k3` 这样上下文巨大的模型，高准确性检索能够充分利用其处理能力，但需要确保检索延迟在可接受范围内。

## 容易做错的三处
- 日志显示 `Input token limit exceeded`：召回内容总 token 数加上用户输入和系统指令超过了模型的上下文长度。
- 检索结果返回的条目数与预期不符：`top_k` 参数设置过小，或者 OceanBase 索引质量不高导致相关性不足。
- 界面显示引用内容为空或不完整：引用上限 `quoteMaxToken` 设置过低，或者单条召回内容的 token 数过大，导致引用内容被截断。

## 怎么确认配好了
- 通过 FastGPT 平台发送一个长文本查询，检查模型返回的引用内容是否完整、相关。
- 监控 OceanBase 的查询延迟，确保在 `top_k` 和 `ef_construction` 配置下，检索响应时间满足业务要求。
- 在 FastGPT 的调试界面，查看每个召回段落的 token 计数，确保总和在 `quoteMaxToken` 预算内。
- 尝试不同长度的用户输入，观察模型输出是否稳定，没有因上下文长度变化而出现异常行为。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
