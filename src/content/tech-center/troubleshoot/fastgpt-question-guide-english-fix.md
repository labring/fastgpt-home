---
title: 解决FastGPT私有部署版猜你想问返回英文结果的问题
slug: /zh/troubleshoot/fastgpt-question-guide-english-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3261
source_type: GitHub issue
---

# 解决FastGPT私有部署版猜你想问返回英文结果的问题

## 现象
在FastGPT v4.8.13和v4.8.14私有部署版本中，猜你想问功能的返回结果变为英文。调用`/api/core/ai/agent/createQuestionGuide`接口时，提交给大模型的最后一条`user`角色消息的`content`为英文预设Prompt，即使对话历史中用户最后一条提问为中文，最终生成的猜你想问问题也为英文。

## 可能原因
调用`/api/core/ai/agent/createQuestionGuide`接口时，传入的最后一条`user`角色的`content`为英文的预设引导Prompt，未适配对话历史的实际语言。大模型按照该英文Prompt的规则生成问题，最终返回英文结果，而非匹配用户对话的语言。

## 排查步骤
1. 确认当前FastGPT版本为v4.8.13或v4.8.14私有部署版。
2. 使用抓包工具获取调用`/api/core/ai/agent/createQuestionGuide`接口的完整请求参数。
3. 查看请求参数中`messages`数组的最后一条`user`角色的`content`内容，确认是否为英文预设Prompt。
4. 核对对话历史中用户最后一条提问的语言类型。

## 解决与验证
解决该问题需要调整`/api/core/ai/agent/createQuestionGuide`接口的预设Prompt，使其匹配对话历史中用户最后一条提问的语言。验证步骤如下：
1. 完成接口Prompt的调整配置，重新启动服务。
2. 发起包含中文（或其他非英文语言）的对话，触发猜你想问功能。
3. 查看返回的猜你想问结果，确认是否为与用户对话同语言的内容。
4. 再次抓取接口请求参数，确认最后一条`user`角色的`content`已适配对话语言。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3261)
