---
title: 解决FastGPT中函数调用返回空字段的适配问题
slug: /zh/troubleshoot/fastgpt-function-call-adaptation
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/761
source_type: GitHub issue
---

# 解决FastGPT中函数调用返回空字段的适配问题

## 现象
使用模型函数调用功能时，部分场景会返回空字段。不同模型的函数调用响应结构存在差异，与预设处理逻辑不匹配。OpenAI官方已弃用Function Calling，改用tool_calls。当前版本如需使用工具功能，需通过高级编排流程实现。

## 可能原因
1. 不同模型的函数调用响应字段结构存在差异，例如部分开源模型的响应结构与OpenAI原有结构不匹配；
2. OpenAI弃用Function Calling功能，改用tool_calls，现有代码未完成相关适配；
3. 未通过正确的高级编排流程调用工具功能。

## 排查步骤
1. 确认当前使用的模型类型，核对其函数调用响应的字段结构；
2. 检查extract.ts和classifyQuestion.ts文件中的响应字段处理逻辑；
3. 确认工具功能是否通过高级编排中的“问题分类+字段提取+HTTP调用”流程调用。

## 解决与验证
针对chatGLM3模型的适配场景：将extract.ts和classifyQuestion.ts中的`response?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments || '{}'`替换为`response?.choices?.[0]?.message?.function_call?.arguments || '{}'`，即可解决函数调用返回空字段的问题。
针对OpenAI相关适配：因OpenAI已弃用Function Calling，需改用tool_calls相关逻辑处理工具调用。
当前版本如需使用工具功能，可通过高级编排中的“问题分类+字段提取+HTTP调用”流程实现。
验证方式：测试工具调用功能，确认返回字段不为空，且功能正常执行。

> 来源: [FastGPT GitHub issue #761](https://github.com/labring/FastGPT/issues/761)
