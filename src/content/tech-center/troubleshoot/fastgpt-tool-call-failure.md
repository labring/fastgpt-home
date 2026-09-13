---
title: 解决FastGPT私有部署中部分模型无法调用系统工具的问题
slug: /zh/troubleshoot/fastgpt-tool-call-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2617
source_type: GitHub issue
---

# 解决FastGPT私有部署中部分模型无法调用系统工具的问题

## 现象
用户在FastGPT私有部署v4.7.1、v4.8.9版本，通过OneAPI v0.6.7、v0.6.9-alpha中转模型时，添加“获取当前时间”系统工具后，仅OpenAI模型可正常调用工具。开源模型（glm4、deepseek-v2、deepseek-llm、qwen2、llama3.1）无法调用工具，无论是否配置工具均无响应；Claude3.5模型尝试调用工具失败；Gemini模型调用工具直接报错。所有模型在无系统工具场景下可通过OneAPI正常完成基础对话，且已确认密钥可用。用户配置中已开启以下相关参数：
```json
"censor": false,
"vision": true,
"datasetProcess": true,
"usedInClassify": true,
"usedInExtractFields": true,
"usedInToolCall": true,
"usedInQueryExtension": true,
"toolChoice": true,
"functionCall": true
```

## 可能原因
暂未明确具体根因，异常表现与模型类型强相关，仅OpenAI模型可正常使用系统工具，其余模型均出现调用异常。推测可能涉及模型工具调用格式、中转服务的参数适配问题，需结合实际环境进一步确认。

## 排查步骤
1. 记录当前使用的FastGPT与OneAPI版本，本次测试涉及版本为FastGPT v4.7.1、v4.8.9，OneAPI v0.6.7、v0.6.9-alpha。
2. 检查系统工具的配置参数，确认`toolChoice`、`functionCall`等工具相关配置项均已开启。
3. 测试无系统工具场景下的模型对话，确认所有模型可正常完成基础对话，排除密钥与中转服务本身的问题。
4. 分别针对OpenAI模型、其他类型模型测试系统工具调用，对比不同模型的异常表现，记录报错或无响应的具体情况。

## 解决与验证
目前暂未公开通用解决方法，可按以下方式验证与尝试：
1. 针对异常模型，确认其工具调用格式是否符合FastGPT与OneAPI的适配要求，需参考对应模型的官方文档调整参数。
2. 检查OneAPI中转配置中是否针对不同模型做了特殊适配，确保工具调用的请求格式与模型要求一致。
3. 完成调整后，重新添加系统工具并发起对话，验证模型是否可正常调用工具完成任务。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2617)
