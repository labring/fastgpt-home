---
title: 解决FastGPT未配置OpenAI模型时出现的固定重复请求报错问题
slug: /zh/troubleshoot/fastgpt-unconfigured-openai-request-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/382
source_type: GitHub issue
---

# 解决FastGPT未配置OpenAI模型时出现的固定重复请求报错问题

## 现象
该问题属于私有部署版本的异常表现。系统未配置OpenAI模型时，会触发报错；且每次问答交互后，会固定发送OpenAI模型请求，无论系统是否配置该模型。

## 可能原因
需按实际环境确认。

## 排查步骤
1. 确认系统中OpenAI模型的配置状态，检查相关配置项的存在与否
2. 跟踪问答流程中的模型调用触发逻辑，记录每次请求的相关信息
3. 记录报错的完整信息，包括报错代码、提示文本等（需按实际环境确认具体内容）

## 解决与验证
需按实际环境确认解决方案。验证时需先确认OpenAI模型的配置状态，再测试问答交互后的请求行为是否符合预期，确认报错是否消失。

> 来源: [FastGPT GitHub issue #382](https://github.com/labring/FastGPT/issues/382)
