---
title: 解决FastGPT与OneAPI 0.6.8版本兼容运行时的报错问题
slug: /zh/troubleshoot/fastgpt-oneapi-compatibility-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2944
source_type: GitHub issue
---

# 解决FastGPT与OneAPI 0.6.8版本兼容运行时的报错问题

## 现象
FastGPT 4.8.11-fix版本搭配OneAPI 0.6.8时，单独调试AI模块可正常输出内容，但运行完整流程时触发报错。将OneAPI降级至0.6.7版本后，报错问题消失。

## 可能原因
OneAPI 0.6.8版本与FastGPT的流式调用模式存在兼容性限制，针对Ollama相关模型的流式调用无法正常工作，其他模型的流式调用可正常运行。

## 排查步骤
1. 核对当前部署的FastGPT与OneAPI版本，确认为FastGPT 4.8.11-fix、OneAPI 0.6.8。
2. 验证单独调试AI模块的输出是否正常，确认仅在运行完整流程时触发报错。
3. 检查当前使用的模型类型与调用模式，确认是否为Ollama相关模型的流式调用。
4. 如需进一步定位问题，可提供Docker Compose配置文件与运行报错日志。

## 解决与验证
1. 若使用Ollama相关模型的流式调用，将OneAPI版本降级至0.6.7，即可恢复正常运行。
2. 若使用非Ollama模型，可保留OneAPI 0.6.8版本，无需额外调整即可正常运行。
验证方式：降级OneAPI至0.6.7后，运行完整流程不再触发报错；或更换为非Ollama模型后，OneAPI 0.6.8可正常工作。

> 来源: [FastGPT GitHub issue #2944](https://github.com/labring/FastGPT/issues/2944)
