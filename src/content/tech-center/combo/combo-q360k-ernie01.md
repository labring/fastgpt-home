---
title: 引用预算 19 万–35 万的对话模型配 Embedding-V1 的分段与引用口径
slug: /zh/combo/combo-q360k-ernie01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是对话模型允许的单次对话中引用内容的累计token预算，限定了可带入参考文档的总token上限。本档模型的预算区间为19万至35万tokens，能够承载较多的参考文档片段，适配需要整合多段长文本的知识库应用场景，减少重复检索的次数，让对话可以基于更完整的上下文生成回应"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 Embedding-V1 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是对话模型允许的单次对话中引用内容的累计token预算，限定了可带入参考文档的总token上限。本档模型的预算区间为19万至35万tokens，能够承载较多的参考文档片段，适配需要整合多段长文本的知识库应用场景，减少重复检索的次数，让对话可以基于更完整的上下文生成回应，提升内容的连贯性与信息覆盖度。

## 配 Ernie 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 与Embedding-V1默认分段长度匹配，无需额外调整即可适配向量模型的默认输入要求 |
| `maxToken` | 1000 tokens | 匹配Embedding-V1单段输入的最大token限制，避免分段超出模型处理上限 |
| `quoteMaxToken` | 190000–350000 tokens | 遵循本档对话模型的官方参数区间，确保引用内容总token不超过模型预算 |
| `chunkSize` | 512 tokens 或 1000 tokens | 可根据业务场景选择，对应向量模型的默认或最大分段长度 |
| 分块重叠长度 | 64–128 tokens | 保留相邻分段的重叠内容，避免关键信息被分割在两段之间 |
| 单次搜索上限 | 匹配引用预算的合理区间 | 确保单次检索返回的文档总token预留量不超出`quoteMaxToken`的可用额度 |

## 这两者互相约束的地方
本档对话模型与Embedding-V1的组合存在明确的分段约束。按默认每段512 tokens计算，一轮对话可容纳的参考段数约为371–683段；若将分段长度调整至Embedding-V1允许的上限1000 tokens，单轮可容纳的参考段数约为190段起。每段越长，单段承载的语义信息越完整，但单轮能容纳的总段数越少；每段越短，总段数越多，但单段的上下文完整性越弱。更换向量模型后，已构建的知识库索引需要重新生成，因为向量维度与向量模型绑定，不同模型的向量表示逻辑存在差异。

## 容易做错的三处
- 检索返回的文档片段总token超出对话模型预算，导致对话请求失败。原因是未将单次搜索上限与`quoteMaxToken`的预算匹配，未预留系统提示词等其他token的占用空间。
- 分段长度超出Embedding-V1的`maxToken`限制，导致向量入库失败。原因是未将`chunkSize`设置为不超过1000 tokens的数值，强行使用过长的分段进行索引构建。
- 对话时引用的段数远超计算上限，导致上下文被截断。原因是未根据分段长度调整单次搜索返回的文档数量，未校验总token是否符合`quoteMaxToken`的要求。

## 怎么确认配好了
- 进入知识库集合的配置页面，核对分块长度的设置是否符合预设方案。
- 查看向量模型的绑定配置，确认关联的模型为Embedding-V1且参数匹配要求。
- 检查对话模型的参数设置，确认`quoteMaxToken`处于本档的预算区间内。
- 发起一轮测试对话，查看界面展示的引用文档片段数量是否符合分段逻辑。
