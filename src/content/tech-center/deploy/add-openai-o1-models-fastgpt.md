---
title: 为FastGPT添加OpenAI o1系列模型的详细配置操作指南
slug: /zh/deploy/add-openai-o1-models-fastgpt
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4811
source_type: 官方文档小节
---

# 为FastGPT添加OpenAI o1系列模型的详细配置操作指南

在FastGPT的自建部署场景中，若需调用OpenAI o1-mini和o1-preview模型，无法直接通过平台默认配置完成适配，需手动修改平台的模型配置文件，补充对应模型的参数配置。这一操作可让平台识别并支持这两款模型，满足不同的对话与功能调用需求。

### 具体配置参数与步骤
找到FastGPT的模型配置文件，在已有的模型配置数组中插入以下两段JSON配置，即可完成新增模型的配置：
```json
{
"model": "o1-mini",
"name": "o1-mini",
"avatar": "/imgs/model/openai.svg",
"maxContext": 125000,
"maxResponse": 65000,
"quoteMaxToken": 120000,
"maxTemperature": 1.2,
"charsPointsPrice": 0,
"censor": false,
"vision": false,
"datasetProcess": true,
"usedInClassify": true,
"usedInExtractFields": true,
"usedInToolCall": true,
"toolChoice": false,
"functionCall": false,
"customCQPrompt": "",
"customExtractPrompt": "",
"defaultSystemChatPrompt": "",
"defaultConfig": {
"temperature": 1
}
},
{
"model": "o1-preview",
"name": "o1-preview",
"avatar": "/imgs/model/openai.svg",
"maxContext": 125000,
"maxResponse": 32000,
"quoteMaxToken": 120000,
"maxTemperature": 1.2,
"charsPointsPrice": 0,
"censor": false,
"vision": false,
"datasetProcess": true,
"usedInClassify": true,
"usedInExtractFields": true,
"usedInToolCall": true,
"toolChoice": false,
"functionCall": false,
"customCQPrompt": "",
"customExtractPrompt": "",
"defaultSystemChatPrompt": "",
"defaultConfig": {
"temperature": 1
}
}
```
配置中的各参数均为对应模型的预设属性，例如maxContext定义了模型支持的最大上下文token数量，maxResponse定义了模型单次回复的最大token数量，quoteMaxToken为引用上下文的最大token限制，charsPointsPrice为0表示使用该模型不消耗平台积分。其他参数如censor为false表示不开启内容审核，vision为false表示不支持视觉识别能力，datasetProcess为true表示可用于数据集处理流程，usedInClassify、usedInExtractFields、usedInToolCall均为true表示支持分类、字段提取与工具调用场景。

### 配置生效与验证
完成配置文件的修改后，需重启FastGPT的部署服务，使新配置生效。服务重启完成后，登录FastGPT平台，即可在模型选择列表中看到新增的o1-mini和o1-preview模型。可通过创建新应用或修改现有应用的模型配置，测试这两款模型的调用效果。使用该模型需确保已正确配置OpenAI的API密钥，且账户已开通对应模型的使用权限。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4811)
