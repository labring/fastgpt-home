---
title: 引用预算 19 万–35 万的对话模型配 text-embedding-3-large / text-embedding-3-small 的分段与引用口径
slug: /zh/combo/combo-q360k-openai01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是单轮对话中可引用的知识库内容总token预算，本档190000至350000的token区间，适配中长上下文的知识库应用场景。该预算可容纳多段结构化或非结构化的知识库片段，在单次交互中整合充足的上下文信息，无需频繁触发多轮检索补充，保障复杂问题回答的连贯性与信息完整"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 text-embedding-3-large / text-embedding-3-small 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是单轮对话中可引用的知识库内容总token预算，本档190000至350000的token区间，适配中长上下文的知识库应用场景。该预算可容纳多段结构化或非结构化的知识库片段，在单次交互中整合充足的上下文信息，无需频繁触发多轮检索补充，保障复杂问题回答的连贯性与信息完整性，适配对上下文完整性要求较高的业务需求，本档共包含68款长上下文对话模型。

## 配 OpenAI 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配本次选型的OpenAI向量模型默认分段参数，保障检索与引用的参数一致性 |
| `maxToken` | 8000 | 对应本次选型的OpenAI向量模型单段最大允许token上限，作为分块长度的最高参考值 |
| `quoteMaxToken` | 190000–350000 | 匹配对话模型的引用token预算，确保检索后的总引用内容未超出上限 |
| `chunkSize` | 512 或 8000 | 根据业务需求选择，512适配细粒度检索场景，8000适配长文本完整语义保留场景 |
| 分块重叠长度 | 10%–20% 的分块长度 | 避免关键信息被分块截断，保障上下文片段的连贯性 |
| 单次搜索上限 | 按引用预算与分块长度计算的合理区间 | 控制单次检索返回的片段总token消耗，避免超出`quoteMaxToken` |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可容纳约371–683段知识库片段；若将分块长度调整至向量模型允许的8000 tokens上限，则仅可容纳约23段。分块长度越长，单段承载的语义信息越完整，但单轮可容纳的片段数量越少；分块长度越短，单轮可容纳的片段数量越多，但单段语义完整性越弱，上下文拼接的连贯性越差。此外，更换向量模型后，已构建的知识库索引需要重新生成，因向量维度与向量模型绑定，旧索引无法适配新模型的向量计算逻辑。

## 容易做错的三处
- 检索返回的片段总token超出对话模型的`quoteMaxToken`，导致部分内容被截断。原因：未根据对话模型的token预算调整单次搜索上限或分块长度，未校验检索结果的总token消耗。
- 知识库分块后，关键业务信息被截断丢失。原因：分块重叠长度设置过低，或分块长度超出目标文本的自然语义边界。
- 更换向量模型后，原知识库无法正常完成语义检索。原因：未重新生成向量索引，未考虑向量维度与新向量模型的绑定关系。

## 怎么确认配好了
- 查看对话模型的`quoteMaxToken`参数，确认其处于190000至350000的区间内。
- 核对向量模型的`maxToken`与`defaultToken`参数，确认与本次选型的OpenAI向量模型配置一致。
- 测试不同分块长度下的检索结果，确认总引用token未超出对话模型的预算范围。
- 重建知识库向量索引后，验证检索结果的片段完整性与匹配准确性。
