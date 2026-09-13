---
title: FastGPT问题分类功能无法正常使用的排查与解决方法
slug: /zh/troubleshoot/fastgpt-question-classification-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1093
source_type: GitHub issue
---

# FastGPT问题分类功能无法正常使用的排查与解决方法

## 现象
尝试多款模型后，问题分类功能无法正常实现，怀疑存在对接异常问题。

## 可能原因
该问题的可能原因包括：所用模型未由官方标注支持function calling；配置错误，将不支持function calling的模型设置为function calling模式；旧版本未适配提示词模式，提示词调整不到位。

## 排查步骤
1. 确认所用模型是否由官方标注支持function calling；
2. 检查模型配置模式，确认未将不支持function calling的模型设置为function calling模式；
3. 若使用旧版本，检查提示词配置是否合理，可通过少量示例（few shot）调整提示词，帮助模型理解解析指令；
4. 需按实际环境确认版本是否支持提示词模式相关配置。

## 解决与验证
确保所用模型由官方标注支持function calling。调整提示词，使模型理解并解析给定的结构化提取指令，少量示例（few shot）模式可正常使用。修正配置，将不支持function calling的模型调整为非function calling模式。验证时，可使用支持function calling的模型，配置正确的提示词后，测试问题分类功能是否正常输出结构化结果。

> 来源: [FastGPT GitHub issue #1093](https://github.com/labring/FastGPT/issues/1093)
