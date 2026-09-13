---
title: 解决FastGPT使用vllm部署模型时工具调用参数异常问题
slug: /zh/troubleshoot/fastgpt-vllm-tool-param-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3914
source_type: GitHub issue
---

# 解决FastGPT使用vllm部署模型时工具调用参数异常问题

## 现象
使用vllm部署Qwen2.5-14B-Instruct模型后，在FastGPT中调用工具时，仅获取当前时间插件出现异常。第一阶段工具调用流程正常，第二阶段执行环节出现参数异常。使用其他商业模型时无该问题，本地部署的该模型仅该插件触发异常，执行时出现参数相关报错。

## 可能原因
结合用户初步排查结论，可排除OneAPI相关问题。可能的原因包括：vllm部署的Qwen2.5-14B-Instruct模型对工具调用的参数格式兼容性不足；FastGPT与该vllm模型的工具调用交互逻辑存在适配差异；获取当前时间插件的参数传递逻辑与模型输出格式不匹配。

## 排查步骤
1. 确认FastGPT版本为4.8.22私有部署版本，确认使用的vllm部署模型为Qwen2.5-14B-Instruct。
2. 复现工具调用流程，确认仅获取当前时间插件出现异常，其他商业模型无此问题。
3. 查看工具调用各阶段的日志，对比正常模型与异常模型的参数传递差异。
4. 检查获取当前时间插件的参数配置，确认参数格式符合FastGPT的基础要求。
5. 参考vllm部署模型的官方文档，确认模型支持的工具调用参数规范。

## 解决与验证
若需解决该问题，可调整获取当前时间插件的参数传递逻辑，使其匹配vllm部署的Qwen2.5-14B-Instruct模型的要求。验证时可重新执行工具调用流程，确认第二阶段参数异常问题不再出现，获取当前时间插件可正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3914)
