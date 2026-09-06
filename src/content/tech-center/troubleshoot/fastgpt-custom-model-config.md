---
title: 配置FastGPT自定义聊天与向量索引模型的方法
slug: /zh/troubleshoot/fastgpt-custom-model-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1960
source_type: GitHub issue
---

# 配置FastGPT自定义聊天与向量索引模型的方法

## 现象
用户在FastGPT中配置自定义模型时，仅掌握聊天模型的配置方法，无法完成文档训练所需的向量索引模型配置，且现有聊天模型配置示例无法直接适配索引模型场景。

## 可能原因
未获取向量索引模型的专属配置指引，仅参考了聊天模型的配置示例，未明确两类模型的配置差异与专属参数要求。

## 排查步骤
1. 区分需配置的模型类型，明确是聊天模型还是文档训练用的向量索引模型。
2. 查找对应类型模型的官方配置指引，确认所需参数与格式要求。
3. 核对已有的配置内容，补充或调整符合目标模型类型的配置项，确保参数匹配模型功能场景。

## 解决与验证
聊天模型的配置可使用以下标准格式，可根据实际需求修改`model`、`maxContext`、`maxResponse`等相关参数：
```json
{
"model": "qwen-max",
"name": "Qwen-Max",
"avatar": "/imgs/model/qwen.svg",
"maxContext": 16000,
"maxResponse": 4000,
"quoteMaxToken": 13000,
"maxTemperature": 1.2,
"charsPointsPrice": 0,
"censor": false,
"vision": false,
"datasetProcess": true,
"usedInClassify": true,
"usedInExtractFields": true,
"usedInToolCall": true,
"usedInQueryExtension": true,
"toolChoice": true,
"functionCall": false,
"customCQPrompt": "",
"customExtractPrompt": "",
"defaultSystemChatPrompt": "",
"defaultConfig": {}
}
```
向量索引模型的配置可参考官方文档链接：https://doc.fastgpt.in/docs/development/custom-models/m3e/。完成配置后，可通过模型调用测试验证配置是否生效，确认索引模型可正常用于文档训练场景。

> 来源: [FastGPT GitHub issue #1960](https://github.com/labring/FastGPT/issues/1960)
