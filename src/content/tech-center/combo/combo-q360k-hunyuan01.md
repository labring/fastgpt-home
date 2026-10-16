---
title: 引用预算 19 万–35 万的对话模型配 hunyuan-embedding 的分段与引用口径
slug: /zh/combo/combo-q360k-hunyuan01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是知识库应用中可引用内容的总token预算，限定了单次对话中注入上下文的引用内容总长度。本次选型的对话模型档预算区间为190000至350000 tokens，能够承载较大体量的知识库上下文引用，适配多文档关联问答、长文本检索等场景，为复杂查询提供充足的内容支撑，避免"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 hunyuan-embedding 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是知识库应用中可引用内容的总token预算，限定了单次对话中注入上下文的引用内容总长度。本次选型的对话模型档预算区间为190000至350000 tokens，能够承载较大体量的知识库上下文引用，适配多文档关联问答、长文本检索等场景，为复杂查询提供充足的内容支撑，避免因上下文截断导致问答逻辑断裂。

## 配 Hunyuan 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配向量模型默认的单段token长度，无需额外调整即可兼容基础场景 |
| `maxToken` | 1024 | 匹配向量模型允许的单段最大token上限，最大化单段语义完整性 |
| `quoteMaxToken` | 190000 至 350000 | 匹配当前选型的对话模型档预算区间，确保上下文引用不超出模型限制 |
| `chunkSize` | 512 或 1024 | 匹配向量模型的单段token限制，平衡语义完整性与引用段数 |
| 分块重叠长度 | 64 至 128 | 避免分块截断关键语义，保证相邻分块的上下文连贯性 |
| 单次搜索上限 | 按需动态调整 | 控制单次检索返回的文档段数，避免超出总token预算 |
| 最低相关度 | 0.5 至 0.8 | 过滤低相关性内容，减少无效token占用 |

## 这两者互相约束的地方
本次选型中，按向量模型默认每段512 tokens计算，一轮引用最多可容纳371至683段内容；若将每段调整至向量模型允许的上限1024 tokens，则仅可容纳约185段起。单段长度越长，单段承载的语义信息越完整，但一轮可引用的总段数越少；单段长度越短，总段数越多，但单段上下文的连贯性越弱。若更换向量模型，因向量维度与模型绑定，已构建的知识库索引需要重新生成。

## 容易做错的三处
- 现象：检索返回的文档段数超出预期，总token触发模型截断。原因：未按对话模型的`quoteMaxToken`预算控制单次引用的总token量。
- 现象：知识库索引构建失败或检索结果异常。原因：未匹配向量模型的`maxToken`限制，分块长度超出允许范围。
- 现象：单段内容语义断裂，问答逻辑出现偏差。原因：分块重叠长度设置不合理，导致关键信息被分块截断且未被相邻分块覆盖。

## 怎么确认配好了
- 核对对话模型的配置参数，确认`quoteMaxToken`处于选型区间内。
- 验证向量模型的`defaultToken`和`maxToken`配置与选型参数一致。
- 检查知识库分块设置，确认`chunkSize`匹配向量模型的单段token限制。
- 发起单次检索并查看上下文注入情况，确认引用内容未触发截断。
