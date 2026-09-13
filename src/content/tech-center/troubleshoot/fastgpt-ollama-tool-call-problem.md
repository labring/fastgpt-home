---
title: 解决FastGPT使用本地Ollama部署模型时工具调用异常问题
slug: /zh/troubleshoot/fastgpt-ollama-tool-call-problem
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2662
source_type: GitHub issue
---

# 解决FastGPT使用本地Ollama部署模型时工具调用异常问题

## 现象
用户在FastGPT v4.8.8-fix2私有部署版本中，使用Ollama本地部署的GLM4或Llama3.1模型时，工具调用功能未正常生效。使用线上GLM4模型时，工具调用可正常触发。用户已通过OneApi渠道完成本地模型的对接配置，但工具调用流程无法正常执行，未触发预期的工具调用逻辑。

## 可能原因
结合用户的测试对比情况，可能的触发因素包括：Ollama部署的本地模型未生成符合FastGPT工具调用协议要求的响应格式；FastGPT对Ollama生态模型的工具调用适配逻辑与线上托管模型存在差异；OneApi等转发渠道未正确透传工具调用相关的请求或响应参数，导致解析环节出现异常。

## 排查步骤
1.  验证本地Ollama部署的模型是否支持工具调用功能，可通过Ollama官方测试接口发起工具调用请求，确认模型可返回符合通用大模型工具调用规范的响应内容。
2.  对比线上GLM4模型与本地模型的FastGPT渠道配置，检查模型名称、接口地址、密钥等核心参数是否一致，确认未遗漏工具调用相关的配置项。
3.  检查OneApi渠道的转发配置，确认未过滤工具调用相关的请求字段，确保工具调用的参数可正常透传到Ollama接口。
4.  查看FastGPT后台日志，提取与工具调用相关的异常信息，定位请求转发或响应解析环节的具体问题。

## 解决与验证
1.  若本地模型未正确返回符合规范的工具调用响应，需更新模型版本或调整模型配置，确保模型可生成包含工具调用指令的标准格式内容。
2.  核对并同步FastGPT渠道配置参数，确保与线上模型的配置完全一致，修正可能存在的配置偏差。
3.  重新发起工具调用测试，确认本地模型可正常触发工具调用流程，验证功能是否恢复正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2662)
