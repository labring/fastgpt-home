---
title: 引用预算 19 万–35 万的对话模型配 BAAI/bge-m3 的分段与引用口径
slug: /zh/combo/combo-q360k-siliconflow01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是知识库应用中引用内容的总 token 预算，限定检索召回的所有引用内容合计占用的 token 数量。当前对话模型档的预算区间为 190000–350000 tokens，可承载较多的上下文片段，适配长文档、多章节资料的知识库检索场景，能够在问答过程中保留更完整的背景"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 BAAI/bge-m3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是知识库应用中引用内容的总 token 预算，限定检索召回的所有引用内容合计占用的 token 数量。当前对话模型档的预算区间为 190000–350000 tokens，可承载较多的上下文片段，适配长文档、多章节资料的知识库检索场景，能够在问答过程中保留更完整的背景信息，减少因截断导致的关键内容丢失。

## 配 Siliconflow 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 与向量模型登记的默认分段长度匹配，简化基础配置流程 |
| `maxToken` | 8000 | 匹配向量模型允许的单段最大输入长度，保障单段内容的语义完整性 |
| `quoteMaxToken` | 190000–350000 tokens | 匹配当前对话模型档的引用预算区间，严格约束总引用内容的 token 总量 |
| 分块长度 | 512 / 8000 | 对应向量模型的默认或最大分段阈值，适配不同的语义完整性与检索效率需求 |
| 重叠长度 | 100–200 tokens | 减少分块切割带来的语义断裂，提升相邻片段的召回连贯性 |
| 单次搜索上限 | 按检索逻辑适配 | 控制单次召回的片段总数，避免超出引用预算上限 |

## 这两者互相约束的地方
当对话模型的引用预算与向量模型参数结合时，会形成明确的约束关系。按默认每段 512 tokens 计算，一轮引用最多可容纳 371–683 段内容；若将每段调整至向量模型允许的 8000 tokens 上限，则仅可容纳约 23 段及以上。每段越长，单段承载的语义越完整，但一轮可承载的总段数越少；每段越短，总段数越多，但单段上下文的完整性越弱。更换向量模型后，已创建的知识库索引需要重建，因为向量维度与向量模型直接绑定。

## 容易做错的三处
- 检索后界面提示引用内容超限，原因是总召回片段的 token 总和超出了当前对话模型的 `quoteMaxToken` 预算。
- 单段召回内容出现语义割裂，原因是分块长度设置与向量模型的 `maxToken` 不匹配，或重叠长度配置不足。
- 更换向量模型后知识库检索失败，原因是未重建已生成的向量索引，新模型的向量维度与原有索引不兼容。

## 怎么确认配好了
- 查看当前对话模型的配置项，确认 `quoteMaxToken` 的取值范围符合要求。
- 核对向量模型的登记参数，确认分块长度与 `defaultToken` 或 `maxToken` 的设置一致。
- 执行一次长文档检索，查看返回结果的引用片段是否符合预算约束。
- 检查知识库索引的生成记录，确认无向量维度相关的异常提示。
