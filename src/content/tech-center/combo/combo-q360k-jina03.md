---
title: 引用预算 19 万–35 万的对话模型配 jina-embeddings-v5-omni-small 的分段与引用口径
slug: /zh/combo/combo-q360k-jina03
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是单轮对话中可使用的引用内容总token预算，限定了传入对话模型的背景信息累计长度。当前档位的区间覆盖190000–350000 tokens，能够支撑知识库应用召回较多的背景内容，无需频繁截断关键信息，适配需要丰富上下文的对话场景，保障回答的完整性与准确性。"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 jina-embeddings-v5-omni-small 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是单轮对话中可使用的引用内容总token预算，限定了传入对话模型的背景信息累计长度。当前档位的区间覆盖190000–350000 tokens，能够支撑知识库应用召回较多的背景内容，无需频繁截断关键信息，适配需要丰富上下文的对话场景，保障回答的完整性与准确性。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配该多模态向量模型的默认每段处理长度，平衡语义完整性与可引用段数 |
| `maxToken` | 32000 tokens | 遵循该向量模型的单段最大输入限制，避免超出模型处理上限 |
| `quoteMaxToken` | 190000–350000 tokens | 匹配当前对话模型档的引用预算区间，适配整体上下文约束 |
| `chunkSize` | 512 tokens 或 32000 tokens | 可根据场景选择短段多召回或长段完整语义的分块策略 |
| 分块重叠 | 10%–20% 的分块长度 | 避免分块截断关键语义，保障相邻分块的上下文连贯性 |
| 单次搜索上限 | 匹配引用预算与分块长度的对应比例 | 控制召回段数不超出对话模型的引用token预算 |

## 这两者互相约束的地方
当使用该对话模型档与向量模型组合时，引用预算与向量模型的分块参数互相约束。按默认每段512 tokens计算，一轮引用最多可放下约371–683段；若将每段调整至向量模型允许的上限32000 tokens，仅能放下约5段起。每段越长，单段语义越完整，一轮能承载的段数越少；每段越短，可容纳的段数越多，但单段上下文会更细碎。更换向量模型后，已构建的知识库索引需要重建，因为向量维度与模型绑定，不同模型的索引格式不兼容。

## 容易做错的三处
- 现象：知识库召回的内容总token超出对话模型限制，导致回答被截断。原因：未根据对话模型的引用预算设置单次搜索的召回段数，导致引用内容累计token超出预设范围。
- 现象：向量模型处理报错，提示输入长度超限。原因：分块长度设置超出向量模型的单段最大输入限制，无法被模型正常处理。
- 现象：检索到的内容语义割裂，连贯性较差。原因：分块重叠长度设置不合理，导致相邻分块的关键语义被截断，无法形成完整的上下文逻辑。

## 怎么确认配好了
- 查看当前使用的对话模型配置，确认已选定对应档位的模型。
- 检查向量模型的配置项，确认已启用指定的多模态向量模型。
- 测试知识库的分块功能，查看生成的分块内容符合预设的配置规则。
- 发起模拟对话，验证引用的上下文内容未出现异常截断或语义混乱。
