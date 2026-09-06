---
title: 解决FastGPT工具调用时JSON5解析无效输入的不稳定报错问题
slug: /zh/troubleshoot/fastgpt-tool-call-json-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4090
source_type: GitHub issue
---

# 解决FastGPT工具调用时JSON5解析无效输入的不稳定报错问题

## 现象
使用fastgpt:v4.8.23-fix私有部署版本时，工具调用控件出现异常。日志报错文本为`Your model may not support tool_call SyntaxError: JSON5: invalid end of input at 1:1`，问题无法稳定重现，多数情况下无法正常提取内容，偶尔可正常完成提取。

## 可能原因
结合报错信息与问题特性，可能的触发原因包括：
1.  当前调用的模型未明确支持工具调用（tool_call）能力。
2.  模型返回的工具调用结果格式不符合JSON5规范，导致解析失败。
3.  模型响应被截断，返回的JSON内容不完整，触发`invalid end of input`解析错误。

## 排查步骤
1.  确认当前使用的模型是否支持工具调用能力，可查阅模型官方公开文档。
2.  提取工具调用流程中的模型原始响应内容，使用JSON5解析工具验证其格式完整性。
3.  查看完整的服务日志，核对报错`Your model may not support tool_call SyntaxError: JSON5: invalid end of input at 1:1`的上下文场景。
4.  在可控环境中重复执行相同的工具调用配置，确认问题是否仅在特定条件下触发。

## 解决与验证
如果确认模型不支持工具调用能力，更换支持该能力的模型后重新测试。如果是JSON格式或响应截断问题，可排查模型服务的超时设置、网络传输链路，确保完整接收模型响应内容，同时修正不符合规范的返回格式。完成调整后，重复执行工具调用流程，确认报错不再出现，且能稳定提取到预期结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4090)
