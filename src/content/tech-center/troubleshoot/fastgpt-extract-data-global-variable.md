---
title: FastGPT 内容提取结果写入全局变量的方法
slug: /zh/troubleshoot/fastgpt-extract-data-global-variable
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/791
source_type: GitHub issue
---

# FastGPT 内容提取结果写入全局变量的方法

## 适用场景与历史记录

原议题于 2024 年询问能否把内容提取结果保存为全局变量；最初回复只反映当时状态。 原始讨论提交于 2024-01-26，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

后续维护者明确确认支持变量更新，官方文档说明该节点可更新全局变量及指定节点输出。

## 排查与复测

1. 创建用于保存提取结果的自定义全局变量。
2. 将内容提取输出连接到变量更新节点，选择目标全局变量并赋值。
3. 在后续节点引用该变量，以两个不同输入核对值随提取结果更新。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：Excuse me: Is there any way to save the extracted data as a global variable?](https://github.com/labring/FastGPT/issues/791)

> 来源: [FastGPT 变量更新](https://doc.fastgpt.io/en/guide/build/workflow/nodes/variable_update)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/791#issuecomment-3713269722)
