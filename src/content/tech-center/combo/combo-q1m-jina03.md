---
title: 引用预算 50 万–1000 万的对话模型配 jina-embeddings-v5-omni-small 的分段与引用口径
slug: /zh/combo/combo-q1m-jina03
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型的`quoteMaxToken`为引用内容的总token预算，50万–1000万的区间适配中大型知识库应用场景，可承载较多的上下文引用内容，无需频繁截断关键信息，能够满足复杂问答、多文档关联检索等场景的上下文需求，平衡了上下文丰富度与推理资源的占用。"
language: zh
axis_model_tier: "引用预算 50 万–1000 万"
covered_models: "glm-5.3-flash、glm-5.3、glm-5.2、glm-4-long、deepseek-flash、deepseek-v4-flash、deepseek-v4-pro、doubao-seed-evolving、gemini-3.8-flash、gemini-3.7-flash、gemini-3.6-flash、gemini-3.5-flash、gemini-3.1-pro-preview-customtools、gemini-3.1-flash-lite、gemini-3.5-flash-lite、gemini-3.1-pro-preview、gemini-3.1-pro、gemini-3-flash-preview、gemini-3-flash、gemini-2.5-pro、gemini-2.5-flash、gemini-2.5-flash-lite、grok-4.5、grok-4.6、grok-4.3、grok-4.20-multi-agent-0309、grok-4.20-0309-reasoning、grok-4.20-0309-non-reasoning、hy4-preview、MiniMax-M3、MiniMax-M1、kimi-k3、gpt-6-astra、gpt-5.6、gpt-5.6-sol、gpt-5.6-terra、gpt-5.6-luna、gpt-5.5、gpt-5.5-pro、gpt-5.4、gpt-5.4-pro、gpt-4.1、gpt-4.1-mini、gpt-4.1-nano、qwen3.8-max、qwen3.8-flash、qwen3.7-max、qwen3.7-plus、qwen3.7-flash、qwen3.6-plus、qwen3.6-flash、qwen3.5-flash、qwen3.5-plus、qwen-plus、qwen-turbo、qwen-flash、qwen3-coder-plus、qwen3-coder-flash、qwen-long"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 50 万–1000 万的对话模型配 jina-embeddings-v5-omni-small 的分段与引用口径

## 这一档模型的参数意味着什么
这一档模型的`quoteMaxToken`为引用内容的总token预算，50万–1000万的区间适配中大型知识库应用场景，可承载较多的上下文引用内容，无需频繁截断关键信息，能够满足复杂问答、多文档关联检索等场景的上下文需求，平衡了上下文丰富度与推理资源的占用。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 匹配向量模型登记的默认每段长度，保证分块与向量模型原生处理逻辑对齐 |
| `maxToken` | 32000 | 匹配向量模型支持的单段最大token上限，避免分块超出模型可处理范围 |
| `quoteMaxToken` | 500000–10000000 tokens | 匹配当前对话模型档的引用预算区间，确保所有引用内容的总token不超限 |
| `chunkSize` | 512 tokens 或 32000 tokens | 可根据场景选择短段或长段分块，适配不同的上下文完整性需求 |
| 重叠长度 | 64–128 tokens | 补充相邻分块的语义关联，减少关键信息被分块截断的概率 |
| 单次搜索上限 | 不超过quoteMaxToken与所选chunkSize的比值下限 | 控制单次召回的分块总token不超出引用预算 |

## 这两者互相约束的地方
当对话模型档与该向量模型搭配时，按默认每段512 tokens计算，一轮引用最多可容纳约976–19,531段；若将每段调整至向量模型允许的32000 tokens上限，则仅能容纳约15段。分块长度越长，单段包含的语义信息越完整，但一轮可承载的分块数量越少；分块长度越短，可承载的分块数量越多，但单段上下文的完整性越弱。此外，更换向量模型后，已创建的知识库索引需要重新构建，因为向量维度与向量模型绑定，原有索引无法适配新模型的向量计算逻辑。

## 容易做错的三处
- 界面显示引用内容被强制截断，原因是实际引用的总token超出了配置的`quoteMaxToken`预算。
- 向量检索召回结果与预期语义不符，原因是分块长度设置超出向量模型的`maxToken`上限，导致分块被异常截断。
- 更换向量模型后知识库无法正常检索，原因是未重建索引，原有索引的向量维度与新模型不匹配。

## 怎么确认配好了
- 查看模型绑定配置，确认绑定的向量模型为jina-embeddings-v5-omni-small。
- 进入分块设置页面，核对分块长度的预设值与计划配置一致。
- 提交测试文档生成索引，检查分块结果的长度符合预期。
- 发起测试问答，确认系统未弹出引用超限的提示信息。
