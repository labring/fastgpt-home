---
title: FastGPT 多轮知识库检索：历史问题补全与耗时核对
slug: /zh/troubleshoot/fastgpt-history-extraction-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/755
source_type: GitHub issue
---

# FastGPT 多轮知识库检索：历史问题补全与耗时核对

## 适用场景与历史记录

原议题希望检索时直接携带提问历史，并反馈问题补全或内容提取的效果和耗时。 原始讨论提交于 2024-01-20，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者讨论了通过模型过滤历史的必要性；线程缺少确定的修复结论。适宜比较原问句、历史改写和检索结果三个阶段。

## 排查与复测

1. 选取含指代的两轮问题，记录原始问句和改写后的检索词。
2. 分别计时问题改写、检索及回答生成，定位耗时来源。
3. 以固定问答样本比较召回内容，调整历史范围和改写提示词后复测。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：(Suggestion) Can historical records be carried when searching in the knowledge base?](https://github.com/labring/FastGPT/issues/755)

> 来源: [FastGPT 问题优化节点](https://doc.fastgpt.io/en/guide/build/workflow/nodes/coreferenceResolution)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/755#issuecomment-1902062903)
