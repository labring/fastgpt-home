---
title: 解决FastGPT工具调用时LLM响应为空的排错方法
slug: /zh/troubleshoot/fastgpt-llm-empty-response-troubleshooting-2
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4764
source_type: GitHub issue
---

# 解决FastGPT工具调用时LLM响应为空的排错方法

## 现象
在FastGPT工具调用流程中，控制台会输出两条警告与错误日志：第一条为`[Warn] 2025-05-08 03:28:30 LLM response empty`，附带的请求体包含`model: "hsrc-llm"`、工具`"kIuPdI"`（用于查询城市天气）、用户提问`"厦门的天气情况"`，配置了自动工具选择与并行工具调用；第二条为`[Warn] 2025-05-08 03:28:30 workflow error {"message":"chat:LLM_model_response_empty"}`。

## 可能原因
结合日志信息，可能的原因包括：调用的LLM模型`"hsrc-llm"`未返回有效响应内容；工具调用的请求格式与模型的要求存在不兼容；模型接口在处理工具调用请求时出现异常。部分排查项需按实际环境确认。

## 排查步骤
1.  查看控制台输出的日志，确认报错信息包含`"LLM response empty"`与`"chat:LLM_model_response_empty"`。
2.  核对工具调用的请求参数，确认`model`字段为`"hsrc-llm"`，工具配置的`name`、`description`、`parameters`格式符合要求，必填参数`city`已正确声明。
3.  确认使用的LLM模型key正常可用，且模型支持工具调用功能。
4.  检查模型接口的响应状态，排除接口调用失败的情况。
5.  复现问题时记录完整的请求体与响应内容，用于进一步排查。

## 解决与验证
根据排查结果调整对应配置：若为LLM模型未返回有效响应，可尝试更换支持工具调用的LLM模型，或检查模型的配置参数；若为工具配置问题，修正工具的参数格式与必填项声明。验证方法为重新发起包含`"厦门的天气情况"`的提问，观察控制台是否不再出现`"LLM response empty"`警告，且能正常获取对应结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4764)
