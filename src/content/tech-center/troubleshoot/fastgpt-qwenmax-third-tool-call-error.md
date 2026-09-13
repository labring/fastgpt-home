---
title: 解决FastGPT中QwenMax模型第三次调用工具报错及图表不显示问题
slug: /zh/troubleshoot/fastgpt-qwenmax-third-tool-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4184
source_type: GitHub issue
---

# 解决FastGPT中QwenMax模型第三次调用工具报错及图表不显示问题

## 现象
FastGPT V4.9.0公有云版本中，在简易应用使用QwenMax/32B/72B模型时，第三次调用工具后会返回如下报错：
```json
{
  "message": "400 <400> InternalError.Algo.InvalidParameter: messages with role \"tool\" must be a response to a preceeding message with \"tool_calls\". (aiproxy: 17421047383072982) (aiproxy: 17421047382959156)",
  "name": "Error",
  "code": "invalid_parameter_error",
  "status": 400
}
```
同时第三次调用工具生成的图表可通过工具调用过程的URL下载，但未在网页中显示。

## 可能原因
根据报错信息，问题源于对话上下文的消息格式不符合大模型工具调用的校验规则：当使用工具调用时，assistant角色需先发起tool_calls，后续需紧跟一条role为tool的消息作为该工具调用的返回结果。第三次调用工具时，对话上下文的消息格式出现错位，导致校验失败。

## 排查步骤
1.  登录FastGPT公有云平台，进入出现问题的简易应用配置页，确认已正确关联自定义知识库与基础图表工具。
2.  复现问题后，打开工具调用过程面板，查看完整的对话上下文与工具返回结果。
3.  提取对话上下文的messages数组，逐一检查每条消息的role与内容，确认role为tool的消息是否紧跟在带有tool_calls字段的assistant消息之后。
4.  核对工具调用的返回参数，确认是否正确将工具结果以标准格式传入对话上下文。

## 解决与验证
修正对话上下文的消息格式，确保每一条role为tool的消息都对应前一条包含tool_calls的assistant消息，严格遵循大模型的工具调用消息格式要求。验证时，重新发起包含三次工具调用的问答流程，确认不再返回指定的invalid_parameter_error报错，且第三次工具生成的图表可正常在网页中显示。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4184)
