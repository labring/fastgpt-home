---
title: FastGPT 工具描述引用变量的历史需求
slug: /zh/troubleshoot/fastgpt-tool-edit-variable-issue-closure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2816
source_type: GitHub issue
---

# FastGPT 工具描述引用变量的历史需求

## 适用场景与历史记录

原议题希望在工具的编辑描述中引用变量，以改善工具选择时机，并提供了示意图。 原始讨论提交于 2024-09-27，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

工具描述中的变量插值与工具输入参数是两个需要分别验证的配置点。

## 排查与复测

1. 记录希望插入描述的变量及其来源，构造两个不同变量值。
2. 查看模型实际接收的工具描述，确认是否发生插值。
3. 对比工具选择结果与输入参数，保留具体版本和最小示例继续反馈。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：建议在工具调用的编辑描述里面添加变量](https://github.com/labring/FastGPT/issues/2816)

> 来源: [FastGPT 工具调用与终止](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)
