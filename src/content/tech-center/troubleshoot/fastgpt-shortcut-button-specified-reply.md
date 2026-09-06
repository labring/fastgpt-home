---
title: FastGPT 指定回复中的快捷按钮历史需求与界面验证
slug: /zh/troubleshoot/fastgpt-shortcut-button-specified-reply
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4286
source_type: GitHub issue
---

# FastGPT 指定回复中的快捷按钮历史需求与界面验证

## 适用场景与历史记录

原议题请求将开场白里的快捷按钮用到指定回复，以便用户点击关键词继续对话。 原始讨论提交于 2025-03-23，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

官方开场白文档确认快捷问题格式。指定回复是否使用同样的交互解析应按实际版本测试，原线程缺少相应实现结论。

## 排查与复测

1. 先按开场白文档建立一个可点击的快捷问题作为对照。
2. 把同一最小内容放入指定回复节点，记录渲染和点击行为。
3. 需要明确分支交互时，测试用户选择节点并核对选择后的工作流路径。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：快捷按钮可用在指定回复组件中](https://github.com/labring/FastGPT/issues/4286)

> 来源: [FastGPT 开场白与快捷问题](https://doc.fastgpt.io/en/guide/build/general/welcomeText)

> 来源: [FastGPT 用户选择节点](https://doc.fastgpt.io/en/guide/build/workflow/nodes/user-selection)
