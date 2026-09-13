---
title: 解决FastGPT调用Ollama模型失败且OneAPI调用正常的问题
slug: /zh/troubleshoot/fastgpt-ollama-model-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2929
source_type: GitHub issue
---

# 解决FastGPT调用Ollama模型失败且OneAPI调用正常的问题

## 现象
用户部署FastGPT V4.8.11、OneAPI 0.6.8，通过Ubuntu Docker安装Ollama并运行qwen2.5:3b模型。在FastGPT的普通应用聊天中调用该模型时，提示报错“LLM model response empty”。但通过OneAPI测试调用该模型正常，且使用工作流调试调用该模型也可正常走通。同时FastGPT后台存在对应调用失败的日志记录，OneAPI和工作流的调用日志均正常。

## 可能原因
结合现有信息，问题可能与FastGPT的模型配置参数、调用链路设置有关，或config.local.json中的模型配置存在格式或内容偏差。此外，普通应用与工作流的调用逻辑差异也可能导致该问题。

## 排查步骤
1.  核对config.local.json中的模型配置：对照issue提供的config.local.json截图，确认qwen2.5:3b的模型名称、接入地址、认证密钥等参数与Ollama或OneAPI的实际配置完全一致，检查配置文件的JSON格式是否正确。
2.  检查FastGPT应用的模型绑定设置：确认创建的普通应用所选择的模型名称，与config.local.json中配置的qwen2.5:3b模型名称完全匹配。
3.  对比普通应用与工作流的调用配置：确认工作流调试可正常运行，排查普通应用的聊天模块是否存在额外的调用限制或参数配置差异。
4.  查看FastGPT后台报错日志：对照issue提供的失败日志，定位调用失败的具体节点，确认请求是否正确转发至OneAPI或Ollama。

## 解决与验证
若经排查确认config.local.json配置无误，可尝试重启FastGPT服务，使最新的模型配置生效。验证方式为：在FastGPT的普通应用聊天界面重新调用qwen2.5:3b模型，确认不再提示“LLM model response empty”报错，且可正常获取模型返回结果。同时确认OneAPI测试和工作流调试的调用状态仍保持正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2929)
