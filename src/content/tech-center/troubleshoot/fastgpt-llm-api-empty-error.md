---
title: 解决FastGPT工具调用时出现LLM api response empty报错的问题
slug: /zh/troubleshoot/fastgpt-llm-api-empty-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2805
source_type: GitHub issue
---

# 解决FastGPT工具调用时出现LLM api response empty报错的问题

## 现象
使用FastGPT的工具调用功能时，会报错“LLM api response empty”。查看日志显示xinference运行正常，该问题在当前环境中频繁出现，另一套测试环境中偶尔出现。涉及的FastGPT版本为v4.8.8-fix2，xinference版本分别为0.15.1和0.13.0，使用的模型为qwen2.5-32b、qwen1.5-72b。

## 可能原因
目前已知xinference运行正常，可能的原因包括FastGPT与xinference的调用链路出现内容丢失、调用超时未获取到有效返回，或模型返回的内容为空但未被正确识别。

## 排查步骤
1.  核对当前环境的FastGPT和xinference版本，当前涉及的版本为fastgpt=v4.8.8-fix2，xinference=0.13.0或0.15.1。
2.  检查LLM模型的配置项，确认与工具调用相关的配置是否正确开启，对应配置为`"toolChoice": true`、`"functionCall": true`。
3.  查看FastGPT的完整调用日志，确认从xinference获取返回的环节是否存在异常，排查链路中间的内容丢失问题。
4.  单独调用xinference的对应模型接口，确认模型可以正常返回非空内容，排除模型本身的返回异常。
5.  核对模型的配置参数，如maxResponse、maxContext等，确认参数符合模型的实际能力范围。

## 解决与验证
若排查发现是调用超时问题，可调整FastGPT中与xinference调用相关的超时配置，具体参数需按实际环境确认。若为调用链路内容丢失，需检查网络连接或中间代理的配置。若为模型返回为空，需排查模型加载或推理环节的问题。验证方式为：重新发起工具调用请求，确认不再出现“LLM api response empty”报错，且能正常获取工具调用的返回结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2805)
