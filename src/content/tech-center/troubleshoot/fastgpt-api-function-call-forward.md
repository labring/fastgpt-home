---
title: 解决FastGPT外接API转发时未传递函数调用参数的问题
slug: /zh/troubleshoot/fastgpt-api-function-call-forward
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/657
source_type: GitHub issue
---

# 解决FastGPT外接API转发时未传递函数调用参数的问题

## 现象
使用FastGPT外接API接口转发请求时，转发的请求中未携带functions或tools参数，无法调用函数调用功能。该问题在对接ChatGLM等模型时均会出现，且已将模型配置中的toolChoice参数设置为true。

## 可能原因
FastGPT的外接API接口设计目标为调用应用，无法直接转发函数调用相关参数。

## 排查步骤
1. 确认当前使用的FastGPT外接API接口的定位，区分应用调用接口与中转接口。
2. 检查模型配置项中的toolChoice参数是否已设置为true。
3. 查看转发请求的日志，确认functions或tools参数是否被正常携带。

## 解决与验证
1. 使用oneapi进行API转发。
2. 配置oneapi对接目标模型，确保函数调用参数可正常传递。
3. 发起测试请求，验证functions或tools参数出现在转发请求中，确认函数调用功能正常。

> 来源: [FastGPT GitHub issue #657](https://github.com/labring/FastGPT/issues/657)
