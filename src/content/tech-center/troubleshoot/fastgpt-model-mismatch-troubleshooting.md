---
title: 解决FastGPT模型选择无效及调用模型与配置不符问题
slug: /zh/troubleshoot/fastgpt-model-mismatch-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1098
source_type: GitHub issue
---

# 解决FastGPT模型选择无效及调用模型与配置不符问题

## 现象
配置指定模型的密钥（SK）后，实际调用的模型与配置不符。界面选择的处理模型未生效，测试请求仍默认使用配置文件中首个配置的模型。例如将文心一言模型设为配置首项并传入ERNIE-Bot（原文提及NRNIE-Bot，应为笔误）参数，实际响应仍来自openai类模型，且向量模型配置存在不匹配情况。

## 可能原因
1. 界面选择的处理模型未正确覆盖配置文件的默认首个模型排序；
2. 向量模型与对话模型的配置存在混淆，使用了不匹配的模型参数。

## 排查步骤
1. 核对配置文件中的模型排序，确认传入的模型标识（如ERNIE-Bot）与配置项一致；
2. 检查当前使用的向量模型类型，确认其与对话模型的配置匹配；
3. 确认界面选择的处理模型与测试请求中传入的模型参数一致。

## 解决与验证
1. 调整配置文件中的模型排序，或确保界面选择的处理模型与配置项匹配；
2. 核对向量模型的配置，确保其与对话模型的配置无冲突；
3. 发起测试请求，传入指定的模型参数，确认响应的模型与选择或配置的参数一致。

> 来源: [FastGPT GitHub issue #1098](https://github.com/labring/FastGPT/issues/1098)
