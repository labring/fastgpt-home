---
title: 解决FastGPT配置模型后无法显示思考过程及API识别异常的问题
slug: /zh/troubleshoot/fastgpt-model-api-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3797
source_type: GitHub issue
---

# 解决FastGPT配置模型后无法显示思考过程及API识别异常的问题

## 现象
升级至4.8.21版本后，使用OneAPI集成的密钥，在模型配置中选择OpenAI或阿里云提供商，配置阿里云百炼DeepSeek R1的API时，即使开启UI端"支持输出思考"选项，且在配置文件中手动添加"reasoning": true，对话过程中仍无法显示思考过程。直接填写Ollama的API地址http://ollama:11434时，无法被系统正确识别。

## 可能原因
结合线程信息，可能的触发原因包括：API端点路径配置不完整，未添加模型请求的具体接口路径；Ollama的基础API地址填写方式不符合系统识别规则；配置项未匹配模型提供商的要求。

## 排查步骤
1. 确认已在UI界面开启"支持输出思考"选项。
2. 检查配置文件中是否已添加"reasoning": true配置项。
3. 核对所使用的API端点的完整路径，确认包含模型请求的具体接口。
4. 测试不同模型提供商的API配置，排查适配问题。

## 解决与验证
1. 针对阿里云百炼类模型，需补充完整的API路径。例如，原基础地址https://dashscope.aliyuncs.com/compatible-mode/v1，需补全为https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions。
2. 针对Ollama的API识别问题，可通过UI界面直接配置API地址。
3. 验证方式：发起对话测试，确认是否正常显示思考过程。

> 来源: [FastGPT GitHub issue #3797](https://github.com/labring/FastGPT/issues/3797)
