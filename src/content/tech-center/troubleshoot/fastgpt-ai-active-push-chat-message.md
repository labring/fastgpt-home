---
title: FastGPT中实现AI主动推送消息到聊天框的方案
slug: /zh/troubleshoot/fastgpt-ai-active-push-chat-message
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2647
source_type: GitHub issue
---

# FastGPT中实现AI主动推送消息到聊天框的方案

## 现象
用户发起查询后，希望AI先返回提示语，再主动推送具体结果，例如用户发送"帮我查今天的天气"，AI先回复"好的，请稍等"，再主动推送"今天天气xxxx"。当前默认交互为一问一答模式，工作流调用API及模型返回内容均为单次问答，无法实现主动分段推送消息至聊天框。

## 可能原因
当前默认交互模式为单次问答，未启用sse组件实现主动推送逻辑，工作流未配置分阶段消息推送的流程，无法实现AI主动向聊天框推送消息。

## 排查步骤
1. 确认当前应用是否集成sse组件；
2. 检查工作流的交互配置是否支持主动推送；
3. 验证触发推送的时机是否匹配业务场景。

## 解决与验证
使用sse组件实现主动推送。调整工作流配置，在模型返回结果前，通过sse组件分批次推送消息，例如先推送提示语"好的，请稍等"，再推送具体的业务结果，实现AI主动向聊天框推送消息。需按实际环境确认具体的sse组件调用参数和工作流配置细节。

> 来源: [FastGPT GitHub issue #2647](https://github.com/labring/FastGPT/issues/2647)
