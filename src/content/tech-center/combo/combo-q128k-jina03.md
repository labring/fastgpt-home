---
title: 引用预算 5 万–12.8 万的对话模型配 jina-embeddings-v5-omni-small 的分段与引用口径
slug: /zh/combo/combo-q128k-jina03
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是引用内容的 token 预算，限定了单次对话中可引用的所有内容的总 token 数量。这一档模型的区间覆盖 50,000–128,000 tokens，意味着可以承载较多的上下文引用内容，适配需要整合多段文档信息的知识库对话场景，能够支持复杂的多轮上下文关联，无需频"
language: zh
axis_model_tier: "引用预算 5 万–12.8 万"
covered_models: "Ling-1T、Ling-flash-2.0、Ling-mini-2.0、Ring-1T、Ring-flash-2.0、Ring-mini-2.0、Ming-flash-omni、Ming-lite-omni、Baichuan3-Turbo-128k、glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash、glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4.1v-thinking-flashx、glm-4.1v-thinking-flash、glm-4-air、glm-4-flash、glm-4-plus、claude-haiku-4-5、claude-haiku-4-5-20251001、claude-sonnet-4-5-20250929、claude-opus-4-5-20251101、claude-opus-4-1-20250805、deepseek-chat、deepseek-reasoner、ernie-5.1、ernie-x1.1-preview、ernie-x1.1、ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest、ernie-4.5-turbo-128k、ernie-4.5-turbo-vl、ERNIE-Speed-128K、openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3.8-27b、qwen/qwen3.6-27b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile、meta-llama/llama-4-scout-17b-16e-instruct、hunyuan-lite、hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109、M2-her、MiniMax-Text-01、ministral-14b-2512、ministral-8b-2512、ministral-3b-2512、ministral-3b-latest、ministral-8b-latest、mistral-large-latest、moonshot-v1-128k、moonshot-v1-128k-vision-preview、gpt-5.2-chat-latest、gpt-5.1-chat-latest、gpt-5-chat-latest、gpt-4o-mini、gpt-4o、o4-mini、o3、o3-mini、gpt-oss-120b、gpt-oss-20b、qwen-max、qwen-vl-max、qwen-vl-plus、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b、qwen-coder-turbo、qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct、Qwen/Qwen2.5-72B-Instruct、pro-128k、step-3、step-r1-v-mini、step-1-128k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 5 万–12.8 万的对话模型配 jina-embeddings-v5-omni-small 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是引用内容的 token 预算，限定了单次对话中可引用的所有内容的总 token 数量。这一档模型的区间覆盖 50,000–128,000 tokens，意味着可以承载较多的上下文引用内容，适配需要整合多段文档信息的知识库对话场景，能够支持复杂的多轮上下文关联，无需频繁截断召回内容，提升对话的信息完整性。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配向量模型登记的默认每段长度，符合基础分块的通用设置 |
| `maxToken` | 32000 | 遵循向量模型允许的单段最大 token 上限，支持长文本分块需求 |
| `quoteMaxToken` | 50000–128000 | 贴合当前对话模型档的引用预算区间，确保召回内容不超出模型上下文限制 |
| 分块长度 | 512–32000 | 覆盖向量模型的单段 token 范围，可根据业务场景灵活调整 |
| 分块重叠长度 | 10%–20%分块长度 | 保留相邻分块的语义衔接，避免关键上下文被拆分断裂 |
| 单次搜索上限 | 匹配总 token 预算的召回条数 | 结合分块长度与引用预算调整，确保单次召回的总 token 不超限制 |

## 这两者互相约束的地方
对话模型的引用预算与向量模型的分块参数存在直接约束关系。按默认每段 512 tokens 计算，一轮引用最多能放下约 97–250 段；如果把每段调到向量模型允许的上限 32000 tokens，只能放下约 1 段起。每段越长，单段语义越完整、一轮能放下的段数越少；每段越短，段数越多、单段上下文越碎。此外，向量模型与索引维度绑定，更换向量模型后已创建的索引需要重新构建，否则无法正常完成检索。

## 容易做错的三处
- 现象：检索返回的引用内容被系统截断。原因：未按照对话模型的`quoteMaxToken`设置单次搜索的总 token 预算，导致召回内容累计超出模型的上下文限制。
- 现象：长文本分块后出现关键信息断裂。原因：分块长度设置过小或分块重叠长度不足，导致相邻分块的语义衔接被破坏。
- 现象：更换向量模型后无法检索到原有索引内容。原因：未意识到向量模型与索引维度绑定，未重建索引直接复用原有数据。

## 怎么确认配好了
- 核对配置页面中各参数的取值与选型组合的建议值是否一致。
- 提交测试文本，查看系统生成的分块结果是否符合预设的分块逻辑。
- 发起模拟对话，检查系统引用的上下文内容是否符合预期的长度限制。
- 验证更换向量模型后的索引重建流程是否正常触发并完成。
