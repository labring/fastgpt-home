---
title: 使用FastGPT工作流节点处理长文本翻译的分段与质量保障问题
slug: /zh/node/fastgpt-long-text-translation-nodes
page_type: 工作流节点
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/loop
source_type: 官方文档小节
---

# 使用FastGPT工作流节点处理长文本翻译的分段与质量保障问题

处理长文本翻译时，常遇到LLM token长度超限、翻译风格难以保持一致、上下文连贯性难维护、翻译质量需多轮优化等挑战。FastGPT的【批量运行】节点可针对性解决这些问题，配合【代码运行】节点完成文本预处理，实现合规的长文本拆分与翻译流程。

### 文本分段与批量翻译配置步骤
首先添加【代码运行】节点，粘贴预设的文本分段代码。该代码内置多项长度限制参数，包括MAX_SENTENCE_LENGTH=400、MAX_PARAGRAPH_LENGTH=1000、MAX_LIST_ITEM_LENGTH=200、MAX_BLOCKQUOTE_LINES=15等，可自动识别Markdown格式块，将长文本按句子、段落、列表、代码块、引用等单元拆分为符合LLM token限制的分段。将待翻译的长文本输入该代码运行节点，执行后即可得到拆分后的分段列表。
接着添加【批量运行】节点，将代码运行节点的输出作为批量任务的输入源，配置每个子任务调用LLM完成单段文本的翻译。批量运行节点会统一调度所有子任务，确保翻译配置的一致性，避免不同分段出现风格差异。

拆分后的短文本适配LLM的token限制，避免单次输入过长导致的任务失败。统一的翻译配置保证了所有分段的翻译风格保持一致，按原顺序合并翻译后的分段即可得到完整且上下文连贯的长文本翻译结果。针对单段翻译结果进行精细化调整后，可进一步提升整体翻译的质量。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/loop)
