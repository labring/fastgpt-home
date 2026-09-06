---
title: 解决FastGPT中Qwen2工具调用格式不兼容的问题
slug: /zh/troubleshoot/fastgpt-qwen2-tool-compatibility
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1727
source_type: GitHub issue
---

# 解决FastGPT中Qwen2工具调用格式不兼容的问题

## 现象
在FastGPT中配置Qwen2模型进行工具调用时，无法正常触发工具调用功能。当用户发起包含工具调用需求的对话时，模型无法生成符合预期的工具调用指令，导致工具无法被正常调用。

## 可能原因
Qwen2模型的工具调用功能，在Qwen-Agent框架下不兼容OpenAI标准格式的tools调用参数。FastGPT默认采用OpenAI格式的工具调用配置，导致两者格式不匹配，无法正常解析和触发工具调用。

## 排查步骤
1. 确认当前FastGPT中部署的Qwen2模型是否基于Qwen-Agent框架运行。
2. 检查FastGPT中工具调用的配置是否使用包含`name`、`description`、`parameters`字段的OpenAI标准格式。
3. 查看模型返回的工具调用内容，核对其格式是否符合Qwen-Agent的解析要求。
4. 需按实际环境确认Qwen2模型版本与Qwen-Agent框架的适配情况。

## 解决与验证
1. 调整FastGPT中的工具调用配置格式，使其适配Qwen-Agent的要求。
2. 参考示例代码初始化Qwen-Agent的LLM实例，替换原有的OpenAI格式调用逻辑。
3. 发起包含工具调用需求的对话，验证模型能够正确生成符合Qwen-Agent格式的工具调用请求。
4. 确认工具能够被正常触发并返回结果，对话流程正常完成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1727)
