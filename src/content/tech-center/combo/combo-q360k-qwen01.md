---
title: 引用预算 19 万–35 万的对话模型配 text-embedding-v4 / text-embedding-v3 的分段与引用口径
slug: /zh/combo/combo-q360k-qwen01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是知识库应用中可注入上下文的总token预算，限定了单轮对话中引用内容的总长度上限。本档对话模型的`quoteMaxToken`覆盖190000至350000 tokens，能够支撑较大体量的上下文召回，适配多文档、长文本的知识库问答场景，无需频繁截断检索到的内容，保"
language: zh
axis_model_tier: "引用预算 19 万–35 万"
covered_models: "Ling-3.0-flash-VL、Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T、glm-5.1、glm-5、glm-5-turbo、glm-5v-turbo、glm-4.7、glm-4.7-flashx、glm-4.7-flash、glm-4.6、claude-fable-5-1、claude-fable-5、claude-opus-4-8、claude-opus-5、claude-sonnet-5、claude-opus-4-7、claude-sonnet-4-6、claude-opus-4-6、claude-opus-4-6-20260205、claude-sonnet-4-6-20260217、doubao-seed-2-1-pro-260628、doubao-seed-2-1-turbo-260628、doubao-seed-2-0-pro-260215、doubao-seed-2-0-lite-260428、doubao-seed-2-0-lite-260215、doubao-seed-2-0-mini-260428、doubao-seed-2-0-mini-260215、doubao-seed-1-8-251228、grok-build-0.1、minimaxai/minimax-m2.7、hy3、hunyuan-a13b、MiniMax-M2.7、MiniMax-M2.7-highspeed、MiniMax-M2.5、MiniMax-M2.5-highspeed、MiniMax-M2.1、MiniMax-M2.1-lightning、MiniMax-M2、mistral-large-2512、mistral-small-2603、mistral-medium-3-5、kimi-k2.7-code、kimi-k2.7-code-highspeed、kimi-k2.6、kimi-k2.5、gpt-5.4-mini、gpt-5.4-nano、gpt-5.3-codex、gpt-5.2、gpt-5.2-pro、gpt-5.1、gpt-5、gpt-5-pro、gpt-5-mini、gpt-5-nano、qwen3.6-max-preview、qwen3-max、qwen3-coder-next、spark-x、step-3.7-flash、step-3.5-flash-2603、step-3.5-flash、step-1-256k"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 19 万–35 万的对话模型配 text-embedding-v4 / text-embedding-v3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是知识库应用中可注入上下文的总token预算，限定了单轮对话中引用内容的总长度上限。本档对话模型的`quoteMaxToken`覆盖190000至350000 tokens，能够支撑较大体量的上下文召回，适配多文档、长文本的知识库问答场景，无需频繁截断检索到的内容，保障回答时的语义完整性与信息充足度。

## 配 Qwen 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配Qwen text-embedding-v4/v3的默认分段长度，无需额外调整即可适配模型输入要求 |
| `maxToken` | 8000 tokens | 匹配Qwen text-embedding-v4/v3的单段最大输入token上限，保障单段文本的语义完整性 |
| `quoteMaxToken` | 190000–350000 tokens | 匹配本档对话模型的引用预算区间，适配不同场景的上下文注入需求 |
| `chunkSize` | 512–8000 tokens | 可根据场景灵活调整，短分段适配细粒度检索，长分段保障单段语义完整 |
| 分块重叠长度 | 10%–20% of 分块长度 | 避免分块截断关键语义信息，提升检索召回的连贯性 |
| 单次搜索上限 | 适配检索场景的返回条数 | 结合分段长度与引用预算调整，防止总引用token超出预算 |

## 这两者互相约束的地方
本组合的引用预算与向量模型分段存在明确约束关系。按默认512 tokens分段时，一轮引用最多可容纳371–683段；若调整至向量模型允许的8000 tokens上限分段，仅可容纳约23段。每段越长，单段语义完整性越强，但单轮可容纳的段数越少；每段越短，单轮可容纳段数越多，但单段语义颗粒度越细，上下文拼接易出现碎片化。更换向量模型后，已构建的知识库索引需要重新生成，因向量维度与向量模型绑定，旧索引无法适配新模型的向量计算逻辑。

## 容易做错的三处
- 检索返回的内容总token超出`quoteMaxToken`导致回答被截断。未结合分段长度与单次搜索上限校验总引用token，超出了本档模型的预算区间。
- 知识库索引无法正常加载或检索结果异常。更换向量模型后未重新生成索引，新旧模型的向量维度不匹配，无法完成向量计算。
- 检索召回的内容语义关联度过低。分块长度设置过短，导致关键语义被拆分至多个分块，检索时无法匹配完整的语义单元。

## 怎么确认配好了
- 查看向量模型配置项，确认当前选用的是text-embedding-v4或text-embedding-v3。
- 校验`quoteMaxToken`的取值是否落在190000–350000 tokens的区间内。
- 测试分块功能，查看生成的分块长度是否符合预设的`chunkSize`或调整后的取值。
- 发起测试问答，查看返回的上下文内容未出现强制截断，且总长度符合配置要求。
