---
title: 解决FastGPT批量执行控件运行报错问题
slug: /zh/troubleshoot/fastgpt-batch-control-stream-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4484
source_type: GitHub issue
---

# 解决FastGPT批量执行控件运行报错问题

## 现象
使用FastGPT的批量执行控件时出现报错，该报错的具体文本未在反馈中明确披露，报错触发于批量执行任务的实际运行过程中。

## 可能原因
出现该报错的可能原因包含两类：一是批量执行控件的流式输出开关未处于开启状态；二是当前调用的模型仅支持流式输出模式，无法在非流式运行模式下正常完成任务。两类原因均会导致批量执行控件无法按预期运行。

## 排查步骤
1. 确认批量执行控件的流式输出开关配置状态，检查该开关是否处于关闭状态
2. 核对当前使用的模型的输出模式支持情况，确认该模型是否仅支持流式输出

## 解决与验证
若流式输出开关未开启，开启该开关后重新运行批量执行任务。若当前使用的模型仅支持流式输出，则需将批量执行控件调整为流式运行模式。完成配置调整后，重新执行批量执行任务，确认报错是否不再出现。

> 来源: [FastGPT GitHub issue #4484](https://github.com/labring/FastGPT/issues/4484)
