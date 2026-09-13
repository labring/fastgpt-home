---
title: 解决FastGPT中DeepSeek-V3使用联网搜索工具报400错误的问题
slug: /zh/troubleshoot/fastgpt-deepseek-v3-function-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4023
source_type: GitHub issue
---

# 解决FastGPT中DeepSeek-V3使用联网搜索工具报400错误的问题

## 现象
用户在FastGPT 4.8.23私有部署版本中搭建简易应用，配置DeepSeek-V3模型并选择联网搜索工具（DuckDuckgo或wiki）后发起对话，收到报错：`400 Function call is not supported for this model. (request id: 2025030703215075180107320527002)`。

## 可能原因
该报错明确提示当前模型不支持函数调用功能，核心原因为所选DeepSeek-V3模型本身不具备函数调用能力，或FastGPT中该模型的配置未匹配函数调用的相关要求。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.23私有部署版本，核对应用中配置的模型为DeepSeek-V3。
2. 查看对话返回的完整报错信息，确认是否为`400 Function call is not supported for this model. (request id: 2025030703215075180107320527002)`。
3. 查阅所选DeepSeek-V3模型的官方说明，确认其是否支持函数调用能力。
4. 检查FastGPT中该模型的配置项，需按实际环境确认是否开启了与函数调用相关的设置。

## 解决与验证
若确认DeepSeek-V3模型本身不支持函数调用，可更换为支持函数调用的同类型模型；若为FastGPT配置不匹配，按实际环境调整模型配置以适配函数调用要求。调整完成后重新发起带联网搜索工具的对话，验证报错是否消失，联网搜索功能能否正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4023)
