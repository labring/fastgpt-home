---
title: FastGPT 检索后由用户确认引用范围的历史需求
slug: /zh/troubleshoot/fastgpt-manual-referenced-dataset-filter
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2371
source_type: GitHub issue
---

# FastGPT 检索后由用户确认引用范围的历史需求

## 适用场景与历史记录

原议题希望在知识库检索与 AI 回答之间，让用户手动排除不需要的引用集合。 原始讨论提交于 2024-08-13，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

这是检索后的交互确认需求。预检索过滤和检索后确认应分别设计。

## 排查与复测

1. 明确确认对象是知识库、集合还是单条引用，并保留稳定 ID。
2. 用小测试工作流展示候选引用，核对用户选择后的实际引用数组。
3. 确认后再调用 AI，并检查答案只使用已选资料；同时核对访问权限。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：是否可以实现知识库搜索完毕后，罗列引用的数据集，由用户手动排除不需要引用的数据集？](https://github.com/labring/FastGPT/issues/2371)

> 来源: [FastGPT 用户选择节点](https://doc.fastgpt.io/en/guide/build/workflow/nodes/user-selection)

> 来源: [FastGPT 商业版集合标签与过滤](https://doc.fastgpt.io/en/guide/dataset/collection_tags)
