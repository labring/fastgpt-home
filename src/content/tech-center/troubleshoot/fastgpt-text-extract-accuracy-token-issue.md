---
title: 解决FastGPT文本内容提取模块效果不佳及token浪费问题
slug: /zh/troubleshoot/fastgpt-text-extract-accuracy-token-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2109
source_type: GitHub issue
---

# 解决FastGPT文本内容提取模块效果不佳及token浪费问题

## 现象
文本内容提取模块的提取效果不如AI对话提取模块。提取时间类内容时，AI对话模块可正确返回结果，但文本内容提取模块无法正确提取。使用AI对话提取内容后，仍需调用文本内容提取模块以输出变量，虽可提升提取准确性，但会额外消耗token。

## 可能原因
当前无明确公开的根因说明，需结合实际调用场景与配置项确认。

## 排查步骤
1. 对比文本内容提取模块与AI对话提取模块的提取结果，确认提取效果的具体差异。
2. 检查是否存在仅使用AI对话提取后，仍需调用文本内容提取模块输出变量的业务场景。
3. 统计两种提取方式的token消耗情况，确认额外的token消耗数据。

## 解决与验证
为提升提取准确性并减少token消耗，可先通过AI对话完成内容提取，再调用文本内容提取模块处理以输出变量。验证时，对比调整后的流程与原流程的提取准确性、token消耗情况，确认结果符合预期。

> 来源: [FastGPT GitHub issue #2109](https://github.com/labring/FastGPT/issues/2109)
