---
title: FastGPT 简易应用 MCP 调用停止后的结果核对
slug: /zh/troubleshoot/fastgpt-simple-model-mcp-stop-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5112
source_type: GitHub issue
---

# FastGPT 简易应用 MCP 调用停止后的结果核对

## 适用场景与历史记录

原议题描述模型调用 MCP 数次后，后续回答可能沿用先前结果却没有相应工具请求。 原始讨论提交于 2025-06-30，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

工具选择由模型参与决策，正文应通过工具运行记录验证实际调用。原线程缺少固定触发次数和确定根因。

## 排查与复测

1. 使用返回带时间或唯一值的测试工具，逐轮核对是否产生真实 MCP 请求。
2. 检查工具说明、必填参数及模型工具调用能力，并保存运行日志。
3. 对要求每次获取实时数据的路径，使用显式工作流调用并把结果传入回答节点进行复测。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：普通应用时设置的mcp，AI会偷懒，调用几次就不调用了伪造数据。](https://github.com/labring/FastGPT/issues/5112)

> 来源: [FastGPT 工具调用与终止](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool)
