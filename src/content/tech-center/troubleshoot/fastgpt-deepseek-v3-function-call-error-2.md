---
title: 解决FastGPT中DeepSeek-V3使用联网搜索工具报400错误的问题
slug: /zh/troubleshoot/fastgpt-deepseek-v3-function-call-error-2
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4031
source_type: GitHub issue
---

# 解决FastGPT中DeepSeek-V3使用联网搜索工具报400错误的问题

## 现象
在FastGPT 4.8.23私有部署版本中，用户新建简易应用并配置DeepSeek-V3模型，选择联网搜索工具（DuckDuckgo或wiki）发起对话后，收到报错信息：400 Function call is not supported for this model. (request id: 2025030703215075180107320527002)，无法正常使用联网搜索功能。

## 可能原因
结合报错文本可知，核心原因为当前使用的DeepSeek-V3模型不支持函数调用功能，或FastGPT与该模型的函数调用适配配置存在不匹配的情况。因用户已确认自身Key可用，可排除密钥相关的异常。

## 排查步骤
1. 确认当前使用的DeepSeek-V3模型是否支持函数调用能力，可通过模型官方文档或接口测试进行验证。
2. 检查FastGPT中该模型的配置参数，确认是否正确适配了该模型的函数调用要求。
3. 重新发起联网搜索相关的对话，观察报错是否仍然出现。

## 解决与验证
若问题源于模型本身不支持函数调用，需更换支持函数调用的模型版本或类型。若为FastGPT配置适配问题，则需按照模型要求调整相关配置。调整完成后，重新发起联网搜索对话，若不再出现“400 Function call is not supported for this model”的报错，则验证问题已解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4031)
