---
title: 解决FastGPT私有部署版Ollama工具调用失败问题
slug: /zh/troubleshoot/fastgpt-private-ollama-tool-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3546
source_type: GitHub issue
---

# 解决FastGPT私有部署版Ollama工具调用失败问题

## 现象
用户使用FastGPT 4.8.17私有部署版，搭配Ollama 0.5.4、OneAPI 0.6.7部署Qwen2.5:14b模型后，通过curl直接调用OneAPI的工具接口无报错，但在FastGPT工作流中无法正常使用工具调用。用户提供了curl测试截图、配置文件截图、工作流截图及docker日志截图作为排查依据，日志中存在调用异常记录。

## 可能原因
结合已知信息，可能的异常原因包括：
1.  FastGPT工作流中的工具调用节点配置参数与OneAPI服务不匹配
2.  FastGPT与OneAPI的通信链路存在参数偏差
3.  模型返回的工具调用格式未被FastGPT正确识别解析

## 排查步骤
1.  核对FastGPT工作流内的工具调用节点配置，确认调用地址、访问密钥等参数与OneAPI的实际配置完全一致。
2.  查看FastGPT的docker日志，提取具体的报错信息，定位调用失败的具体环节。
3.  对比curl测试与FastGPT工作流的调用参数，检查是否存在参数遗漏、格式错误等差异。
4.  验证OneAPI服务是否正常接收并处理来自FastGPT的工具调用请求。

## 解决与验证
根据排查结果修正对应配置项。例如若为参数配置错误，需调整工作流内的工具调用节点参数至与OneAPI一致；若为格式解析问题，需确认模型返回的工具调用格式符合FastGPT的解析要求。验证时可重新发起工作流测试，确认工具调用可以正常执行，且结果与curl测试结果一致。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3546)
