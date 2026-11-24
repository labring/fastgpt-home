---
title: 将本地Qwen模型接入FastGPT的完整配置操作步骤
slug: /zh/reference/add-local-qwen-model-fastgpt
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/xinference
source_type: 官方文档小节
---

# 将本地Qwen模型接入FastGPT的完整配置操作步骤

## 结论
通过修改FastGPT的config.json配置文件添加Qwen模型配置，重启服务后即可在应用中使用该模型。完成配置后，可在FastGPT应用配置界面选择Qwen模型发起对话。

## 具体怎么做
1. 打开FastGPT的config.json配置文件，定位到`llmModels`数组。
2. 在数组中插入以下模型配置：
```json
{
  "model": "qwen-chat",
  "name": "Qwen",
  "avatar": "/imgs/model/Qwen.svg",
  "maxContext": 125000,
  "maxResponse": 4000,
  "quoteMaxToken": 120000,
  "maxTemperature": 1.2,
  "charsPointsPrice": 0,
  "censor": false,
  "vision": true,
  "toolChoice": true,
  "functionCall": false,
  "customCQPrompt": "",
  "customExtractPrompt": "",
  "defaultSystemChatPrompt": "",
  "defaultConfig": {}
}
```
3. 保存修改后的config.json文件，重启FastGPT服务。
4. 进入FastGPT应用配置界面，即可选择Qwen模型进行对话。

## 注意事项
1. 配置中的`model`字段值`qwen-chat`需与OneAPI中配置的渠道模型名保持一致。
2. `charsPointsPrice`、`censor`参数仅商业版生效，非商业版可忽略相关配置。
3. `toolChoice`优先于`functionCall`，若两者同时配置，将优先启用`toolChoice`能力。
4. 配置文件需严格遵循JSON语法规范，避免出现语法错误导致服务启动失败。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/xinference)
