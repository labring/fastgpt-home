---
title: 解决FastGPT 4.6.4版本文本提取功能函数调用失效问题
slug: /zh/troubleshoot/fastgpt-text-extract-function-calling-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/615
source_type: GitHub issue
---

# 解决FastGPT 4.6.4版本文本提取功能函数调用失效问题

## 现象
更新FastGPT至4.6.4版本后，系统模块的【文本内容提取】功能无法正常调用function calling。从调试日志可见，请求参数中functions字段值为None，temperature设为0.0、top_p设为0.8，且接口返回的message内容为空。本次测试场景为提取用户问题中的城市信息，任务描述包含明确的上下文提取规则，但功能未返回预期结果。

## 可能原因
目前已知的潜在原因包括：4.6.4版本更新后，文本内容提取工具的function calling参数传递逻辑存在异常，导致请求中的functions字段被错误设置为None；或工具的function calling相关配置未被正确加载。

## 排查步骤
1. 确认当前FastGPT的部署版本为4.6.4。
2. 导出工具调用的调试日志，检查请求参数中的functions字段是否为None。
3. 核对【文本内容提取】工具的配置项，确认function calling相关参数是否已正确配置。
4. 复现测试场景，使用包含明确提取规则的任务发起调用，观察接口返回结果。

## 解决与验证
目前可通过以下方式临时验证与修复：检查调用代码中是否正确传递了functions参数，确保其不为空；或回退至4.6.4之前的稳定版本，等待官方发布修复补丁。验证方式为：发起包含明确提取规则的测试请求，确认接口返回的message内容符合预期，且调试日志中functions字段已被正确赋值。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/615)
