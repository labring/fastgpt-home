---
title: FastGPT中LLM工具调用不支持的排查与解决方法
slug: /zh/troubleshoot/fastgpt-llm-tool-call-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3168
source_type: GitHub issue
---

# FastGPT中LLM工具调用不支持的排查与解决方法

## 现象
使用FastGPT时，部分LLM的工具调用功能无法正常运行。

## 可能原因
未确认目标LLM是否支持工具调用功能，或未按照FastGPT官方文档完成工具调用的配置与测试。

## 排查步骤
1. 查阅对应LLM的官方文档，确认其是否支持工具调用功能。
2. 查阅FastGPT官方文档，核对工具调用的配置流程是否正确执行。
3. 按照FastGPT官方文档中的工具调用测试教程，完成功能验证操作。

## 解决与验证
按照FastGPT官方文档的工具调用教程完成配置与测试，同时确认目标LLM支持工具调用功能，即可验证工具调用功能正常运行。

> 来源: [FastGPT GitHub issue #3168](https://github.com/labring/FastGPT/issues/3168)
