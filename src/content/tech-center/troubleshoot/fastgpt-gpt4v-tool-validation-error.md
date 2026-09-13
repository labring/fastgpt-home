---
title: 解决FastGPT中GPT-4-Vision调用时间工具的参数校验报错问题
slug: /zh/troubleshoot/fastgpt-gpt4v-tool-validation-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1598
source_type: GitHub issue
---

# 解决FastGPT中GPT-4-Vision调用时间工具的参数校验报错问题

## 现象
使用FastGPT的工具->获取当前时间功能时，调用GPT-4-Vision模型会返回如下报错：null 2 validation errors for Request body -> tool_choice extra fields not permitted (type=value_error.extra) body -> tools extra fields not permitted (type=value_error.extra)，同时附带多个request id。使用gpt-3.5-turbo或gpt-4-turbo模型时，该功能可正常返回结果，无报错。

## 可能原因
报错提示请求体中的tool_choice和tools字段存在不被允许的额外字段，推测GPT-4-Vision模型的API接口对工具调用的请求参数校验规则与gpt-3.5-turbo、gpt-4-turbo存在差异，导致FastGPT生成的请求体不符合校验要求。

## 排查步骤
1. 确认当前调用的模型为GPT-4-Vision，对比gpt-3.5-turbo、gpt-4-turbo模型的调用结果，验证报错仅出现在GPT-4-Vision场景。
2. 查看FastGPT生成的工具调用请求体，检查tool_choice和tools字段的参数结构，确认是否存在额外未定义的字段。
3. 核对对应模型的官方参数规范，对比现有请求体与规范的差异。

## 解决与验证
解决方法：根据报错提示，移除请求体中tool_choice和tools字段内的额外不允许字段，使请求参数符合GPT-4-Vision的校验规则。
验证步骤：重新调用工具->获取当前时间功能，使用GPT-4-Vision模型，确认不再出现参数校验报错，正常返回当前时间结果。同时验证gpt-3.5-turbo、gpt-4-turbo模型的调用仍可正常使用。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1598)
