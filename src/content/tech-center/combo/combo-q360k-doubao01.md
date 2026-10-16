---
title: 引用预算 19 万–35 万的对话模型配 doubao-embedding-large-text-250515 / doubao-embedding-text-240715 的分段与引用口径
slug: /zh/combo/combo-q360k-doubao01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是单次对话中可引用的知识库内容的总token预算，本档对话模型的该参数覆盖19万至35万token区间。该预算可支撑整合多段知识库内容的引用需求，适配需要较多背景信息支撑的问答场景，无需频繁截断引用内容，保障调用的知识库信息充足，为复杂问题的回答提供足够的上下文支撑。"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 doubao-embedding-large-text-250515 / doubao-embedding-text-240715 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是单次对话中可引用的知识库内容的总token预算，本档对话模型的该参数覆盖19万至35万token区间。该预算可支撑整合多段知识库内容的引用需求，适配需要较多背景信息支撑的问答场景，无需频繁截断引用内容，保障调用的知识库信息充足，为复杂问题的回答提供足够的上下文支撑。

## 配 Doubao 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 与所选Doubao向量模型的默认分段token数匹配，保障向量提取的一致性 |
| `maxToken` | 4096 | 匹配所选Doubao向量模型支持的单段最大token上限，最大化单段可承载的语义信息 |
| `quoteMaxToken` | 190000–350000 | 适配本档对话模型的引用预算区间，确保可调用的知识库内容总量符合模型限制 |
| `chunkSize` | 512 或 4096 | 对应`defaultToken`或`maxToken`的取值，可根据语义完整性需求选择对应分块长度 |
| 重叠长度 | 分块长度的10%–20% | 避免分块截断关键语义内容，保障相邻分块间的上下文连贯性 |
| 单次搜索上限 | 按需调整 | 结合引用预算与分块长度，控制单次检索返回的知识库条目数，避免超出token预算 |

## 这两者互相约束的地方
本档对话模型的引用预算与Doubao向量模型的分段参数存在双向约束。按默认每段512 tokens计算，一轮引用最多可放下约371–683段；若将每段调整至向量模型允许的上限4096 tokens，则仅能放下约46段起。每段越长，单段承载的语义信息越完整，但一轮可容纳的段数越少；每段越短，可容纳的段数越多，但单段上下文越碎片化。更换向量模型后，由于向量维度与模型绑定，已建立的知识库索引需要重新构建。

## 容易做错的三处
- 现象：检索返回的知识库条目超出引用预算导致回答截断。原因：未将`quoteMaxToken`与检索上限、分块长度联动配置，导致实际引用的总token数超出模型限制。
- 现象：向量提取结果异常或无法生成索引。原因：未匹配`defaultToken`或`maxToken`与向量模型的参数要求，导致分块token数超出模型支持范围。
- 现象：分块后语义断裂严重。原因：未合理设置重叠长度，导致关键语义被分块截断，相邻分块间缺乏上下文衔接。

## 怎么确认配好了
- 查看系统配置界面的`quoteMaxToken`参数，确认其取值符合本档对话模型的区间要求。
- 核对知识库分块的长度设置，确认与所选向量模型的token参数匹配。
- 执行一次模拟问答，观察引用内容的展示是否符合预期，无明显截断或语义断裂。
- 检查向量索引的绑定信息，确认与当前使用的Doubao向量模型一致。
