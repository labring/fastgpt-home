---
title: 引用预算 19 万–35 万的对话模型配 bge-m3 的分段与引用口径
slug: /zh/combo/combo-q360k-baai01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是对话模型可接收的引用内容总token预算，限定了单次对话中所有被召回的知识库内容合计占用的token上限。当前档位的190000–350000 token区间，能够支撑较长上下文的知识库应用场景，保障复杂问答、长文档分析等任务中，足够的背景信息被引入对话，同时不会超"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 bge-m3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是对话模型可接收的引用内容总token预算，限定了单次对话中所有被召回的知识库内容合计占用的token上限。当前档位的190000–350000 token区间，能够支撑较长上下文的知识库应用场景，保障复杂问答、长文档分析等任务中，足够的背景信息被引入对话，同时不会超出模型的上下文窗口限制，为对话的连贯性和准确性提供基础保障。

## 配 BAAI 向量模型要定哪些
| `defaultToken` | 512 | 与bge-m3模型默认的分块token数对齐，保障向量检索的向量生成一致性 |
| --- | --- | --- |
| `maxToken` | 8000 | 匹配bge-m3模型支持的单段最大token上限，充分发挥模型的单段处理能力 |
| `quoteMaxToken` | 190000–350000 | 匹配当前对话模型档的引用token预算区间，符合选型组合的基础要求 |
| `chunkSize` | 512 或 8000 | 对应`defaultToken`或`maxToken`的取值，按需调整知识库分块的单段长度 |
| 分块重叠长度 | 10%–20%的`chunkSize` | 减少分块间的语义断层，提升跨分块的检索召回连贯性 |
| 单次搜索上限 | 按业务场景调整 | 结合引用预算和分块长度设置，避免单次召回的总token超出限制 |
| 最低相关度阈值 | 按业务需求设置 | 过滤低相关性的检索结果，控制总引用token的消耗总量 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可容纳约371–683段；若将每段调整至向量模型允许的上限8000 tokens，则仅可容纳约23段起。每段越长，单段语义完整性越强，但一轮可容纳的段数越少；每段越短，单段上下文越碎片化，但一轮可容纳的段数越多。此外，向量模型与向量维度绑定，更换向量模型后已构建的知识库索引需要重新生成，否则将无法正常匹配检索结果，影响对话的准确性。

## 容易做错的三处
- 界面提示引用内容超出模型预算，无法完成回答。原因是单次搜索召回的总token数超过了`quoteMaxToken`的设定值。
- 检索结果与查询的相关性不符合预期。原因是分块长度设置与向量模型的`defaultToken`或`maxToken`不匹配，导致向量生成出现偏差。
- 知识库索引无法正常加载。原因是更换向量模型后未重新执行索引构建操作，向量维度与当前模型不兼容。

## 怎么确认配好了
- 查看向量模型的配置参数页面，确认`defaultToken`和`maxToken`的取值与bge-m3的官方参数一致。
- 检查目标知识库集合的分块配置，确认分块长度与`defaultToken`或`maxToken`的取值匹配。
- 查看对话模型的引用预算设置项，确认当前取值处于190000–350000的区间内。
- 执行一次测试检索，验证召回结果的总token消耗符合设定的`quoteMaxToken`要求。
