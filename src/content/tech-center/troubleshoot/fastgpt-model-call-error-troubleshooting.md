---
title: 解决FastGPT调用通义千问系列及其他模型异常的问题
slug: /zh/troubleshoot/fastgpt-model-call-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2983
source_type: GitHub issue
---

# 解决FastGPT调用通义千问系列及其他模型异常的问题

## 现象
用户在私有部署的FastGPT 4.8.11-fix版本中，搭配ollama 0.3.13与oneapi 0.6.8使用时，调用qwen2:7b、qwen2:1.5b、qwen2.5:7b、qwen2.5:3b、qwen2.5:1.5b以及gemma2:9b模型出现异常，其中通义千问相关模型无法正常生成回复。同时，在命令行直接调用上述模型时运行正常。

## 可能原因
当前issue未提供具体报错文本，仅能通过现象推测潜在方向，具体原因需结合实际获取的报错日志与部署环境配置确认，无法直接定位根本问题。

## 排查步骤
1.  确认当前使用的FastGPT、ollama、oneapi版本与本次issue中记录的一致，即FastGPT 4.8.11-fix、ollama 0.3.13、oneapi 0.6.8，排查版本兼容性问题。
2.  提取FastGPT后台的具体报错日志，对比命令行调用上述模型时的正常输出，定位两者的差异点。
3.  检查FastGPT中目标模型的接入配置，确认模型名称、参数映射与ollama中部署的模型完全匹配。
4.  验证其他同类型模型在FastGPT中的运行状态，排除全局配置异常的可能。

## 解决与验证
根据排查结果，若为版本兼容性问题，可尝试更新或降级对应组件版本；若为模型接入配置不匹配，修正FastGPT中的模型名称与参数映射。验证时，在FastGPT中调用任意异常模型，确认模型可以正常生成回复，且输出与命令行调用结果一致。需针对qwen2系列、gemma2:9b等所有目标模型逐一验证，确保全部恢复正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2983)
