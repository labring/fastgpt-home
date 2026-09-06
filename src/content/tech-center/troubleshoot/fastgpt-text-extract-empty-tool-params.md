---
title: 解决FastGPT文本内容提取为空及工具调用参数异常问题
slug: /zh/troubleshoot/fastgpt-text-extract-empty-tool-params
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1958
source_type: GitHub issue
---

# 解决FastGPT文本内容提取为空及工具调用参数异常问题

## 现象
用户在使用FastGPT执行文本提取操作时，返回结果为空，且userdInToolCall:flase，toolChoice:flase，functionCall:false，即使更换模型后问题仍未得到解决。

## 可能原因
结合现象推测，可能存在以下情况：工具调用相关参数配置异常，模型不支持工具调用功能，或应用的工具调用开关未正确启用。

## 排查步骤
1. 确认应用配置中的userdInToolCall、toolChoice、functionCall参数是否正确设置为启用状态。
2. 更换为支持工具调用的模型，重新执行文本提取任务。
3. 检查工具调用相关的应用配置是否符合当前模型的兼容要求。

## 解决与验证
更换为支持工具调用的模型后，可验证文本提取结果是否恢复正常，同时确认userdInToolCall、toolChoice、functionCall参数是否恢复为正确的启用状态。若参数显示正常且文本提取结果不为空，则问题解决。

> 来源: [FastGPT GitHub issue #1958](https://github.com/labring/FastGPT/issues/1958)
