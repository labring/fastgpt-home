---
title: 引用预算 19 万–35 万的对话模型配 embedding-3 的分段与引用口径
slug: /zh/combo/combo-q360k-chatglm01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是知识库应用中可引用内容的总token预算，限定了单轮对话中嵌入上下文的引用内容总长度。本次所选的对话模型档，`quoteMaxToken` 处于190000至350000 tokens区间，能够支撑大规模知识库的上下文召回需求，无需频繁截断引用内容，可保留更多原始知"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 embedding-3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是知识库应用中可引用内容的总token预算，限定了单轮对话中嵌入上下文的引用内容总长度。本次所选的对话模型档，`quoteMaxToken` 处于190000至350000 tokens区间，能够支撑大规模知识库的上下文召回需求，无需频繁截断引用内容，可保留更多原始知识库细节，适配需要多段长文本引用的复杂问答场景。

## 配 ChatGLM 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配embedding-3的默认分段长度，无需额外调整即可适配向量模型输入要求 |
| `maxToken` | 8000 | 匹配embedding-3的单段最大输入上限，可按需设置分段最大长度以平衡语义完整性与引用段数 |
| `quoteMaxToken` | 190000–350000 | 遵循本次选型的对话模型档参数范围，确保引用内容总长度不超过模型允许的预算 |
| `chunkSize` | 512 或 8000 | 可根据场景选择，对应两种分段策略的典型取值 |
| 重叠长度 | 10%–20% 的分块长度 | 减少分块导致的语义割裂，保证相邻分块间的上下文连贯性 |
| 单次搜索上限 | 按引用预算与分段长度动态调整 | 避免单次召回的总token超出`quoteMaxToken`限制 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮对话最多可容纳约371至683段引用内容；若将分段长度调整至embedding-3允许的8000 tokens上限，一轮仅可放下约23段。分段长度的选择存在平衡关系：每段越长，单段承载的语义信息越完整，但单轮可引用的总段数越少；每段越短，单轮可容纳的段数越多，但单段上下文的完整性越弱，可能增加语义割裂风险。此外，更换向量模型后，已构建的知识库索引需要重新生成，因为向量维度与向量模型绑定，旧索引无法适配新模型的向量计算逻辑。

## 容易做错的三处
- 单轮对话中引用内容被强制截断。原因是引用内容的总token数超出了`quoteMaxToken`的预算范围。
- 向量模型处理分块时返回异常。原因是单段文本的长度超过了`maxToken`的设置上限。
- 实际召回的知识库段数与配置的搜索上限不一致。原因是未结合`quoteMaxToken`和分段长度调整搜索上限，导致总token提前触顶。

## 怎么确认配好了
- 查看配置面板中对话模型的`quoteMaxToken`参数，确认取值在190000至350000 tokens区间内。
- 核对向量模型的`defaultToken`与`maxToken`参数，确认与embedding-3的预设参数一致。
- 上传一段测试文本，触发分块处理，确认分块长度符合预设的`chunkSize`要求。
- 发起一次包含多段知识库引用的测试对话，确认内容未被无故截断。
