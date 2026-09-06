---
title: FastGPT多轮对话接口调用参数选择与使用说明
slug: /zh/troubleshoot/fastgpt-multi-turn-chat-params
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2502
source_type: GitHub issue
---

# FastGPT多轮对话接口调用参数选择与使用说明

## 现象
用户基于FastGPT开发应用并对接前端时，对多轮对话的接口传参方式存在疑问。用户发起第一轮对话时传入chatId为9999、单条用户消息“你好”，在第二轮对话时，不确定是仅传入当前用户消息“我刚刚问了啥”与chatId9999，还是需要传入包含完整历史对话的messages数组。

## 可能原因
用户未明确FastGPT接口中chatId参数与历史消息参数的关联逻辑，存在两个核心疑问：一是只要传入chatId是否就无需手动维护历史对话，二是未传入chatId时是否需要传入完整的历史对话消息数组。

## 排查步骤
1. 确认当前对话的chatId是否有效，该参数用于绑定同一场景的多轮对话上下文。
2. 查阅FastGPT官方接口文档，确认多轮对话的传参规则。
3. 对比两种传参方式的差异：一种仅传入当前用户消息与chatId，另一种需传入包含完整历史对话的messages数组。
4. 根据业务需求选择对应传参方式，发起接口调用并验证结果。

## 解决与验证
当传入有效chatId时，FastGPT会自动关联该chatId下的历史对话上下文，无需前端手动维护并传入完整历史消息，可使用仅传入当前用户消息与chatId的传参方式。若未传入chatId，则需要前端自行记录并传入所有历史对话的messages数组，遵循标准格式。
验证时，可先发起第一轮对话获取chatId，再使用该chatId仅传入当前用户消息发起第二轮对话，确认模型能正确关联第一轮的上下文内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2502)
