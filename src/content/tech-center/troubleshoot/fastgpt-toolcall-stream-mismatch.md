---
title: 解决FastGPT工具调用AI流输出关闭后stream参数异常的问题
slug: /zh/troubleshoot/fastgpt-toolcall-stream-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6481
source_type: GitHub issue
---

# 解决FastGPT工具调用AI流输出关闭后stream参数异常的问题

## 现象
在私有部署版本4.14.6的FastGPT中，用户将工具调用的AI流输出设置为关闭，但抓包发现向模型发起的请求中stream参数仍为true。由于使用的qwen-2.5 72b模型需要stream为false才能输出正确的tool_call信息，该参数异常导致无法获取预期的工具调用结果。

## 可能原因
当前已知配置与实际请求参数不符，可能的原因包括：配置项未正确同步到模型请求的生成逻辑、流输出开关未正确映射为stream参数、私有部署版本4.14.6中存在配置未生效的异常，具体需按实际环境确认是否存在其他覆盖配置。

## 排查步骤（有序列表）
1. 确认FastGPT后台「工具调用AI流输出」的配置开关是否已设置为关闭，并检查配置是否成功保存。
2. 抓取FastGPT向大模型发起的API请求，查看请求体中的stream参数实际取值。
3. 核对当前使用的FastGPT私有部署版本为4.14.6，确认该版本的配置传递逻辑是否存在异常。
4. 检查是否存在全局环境变量或其他配置项覆盖了stream参数的设置，需按实际环境排查。

## 解决与验证
首先尝试重新保存「工具调用AI流输出」的关闭配置，重启FastGPT服务后再次抓包验证stream参数。若配置仍未生效，需检查FastGPT的模型调用代码中，是否正确将流输出开关的配置映射为stream参数。验证标准为：关闭流输出配置后，发起工具调用请求时抓包得到的stream参数为false，此时使用qwen-2.5 72b模型即可获取正确的tool_call信息。

> 来源：https://github.com/labring/FastGPT/issues/6481
