---
title: 在FastGPT中配置接入ChatGLM2与M3E模型的操作方法
slug: /zh/reference/fastgpt-chatglm2-m3e-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/chatglm2-m3e
source_type: 官方文档小节
---

# 在FastGPT中配置接入ChatGLM2与M3E模型的操作方法

## 结论
本页讲解在FastGPT中配置接入ChatGLM2与M3E模型的具体操作。通过修改项目的config.json配置文件，在对应数组中添加对应模型的配置项，即可完成两类模型的接入。

## 具体怎么做
1. 打开FastGPT项目的config.json配置文件。
2. 在原有的`llmModels`数组中添加ChatGLM2模型配置，完整配置项如下：
```json
{
"model": "chatglm2",
"name": "chatglm2",
"maxToken": 8000,
"price": 0,
"quoteMaxToken": 4000,
"maxTemperature": 1.2,
"defaultSystemChatPrompt": ""
}
```
3. 在原有的`vectorModels`数组中添加M3E模型配置，完整配置项如下：
```json
{
"model": "m3e",
"name": "M3E（测试使用）",
"price": 0.1,
"defaultToken": 500,
"maxToken": 1800
}
```

## 注意事项
1. 配置文件需严格遵循JSON语法，出现语法错误会导致FastGPT服务启动失败。
2. 配置的maxToken、quoteMaxToken等参数需与实际部署的模型能力匹配，避免出现内容截断或运行报错。
3. 请勿修改原有其他模型的配置，防止影响FastGPT原有功能的正常运行。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/chatglm2-m3e)
