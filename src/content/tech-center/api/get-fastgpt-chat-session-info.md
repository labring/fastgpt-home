---
title: 使用FastGPT官方API获取对话会话的基本信息
slug: /zh/api/get-fastgpt-chat-session-info
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# 使用FastGPT官方API获取对话会话的基本信息

## 接口说明
该接口用于获取FastGPT对话会话的基本信息，包含会话标识、关联应用配置、变量配置等核心数据。请求方式为GET，请求地址为`http://localhost:3000/api/core/chat/init`，需携带两个查询参数：`appId`（应用ID）和`chatId`（会话ID），同时需通过`Authorization`请求头携带API密钥，格式为`Bearer [apikey]`。

## 调用步骤
1. 准备有效的应用ID`appId`、会话ID`chatId`和个人API密钥`apikey`；
2. 按照官方格式构造curl请求，将占位符替换为实际值：将`[appId]`替换为目标应用的ID，`[chatId]`替换为目标会话的ID，`[apikey]`替换为自己的API密钥；
3. 在终端执行构造完成的请求，获取接口返回结果。
具体的请求示例如下：
```bash
curl --location --request GET 'http://localhost:3000/api/core/chat/init?appId=[appId]&chatId=[chatId]' \
--header 'Authorization: Bearer [apikey]'
```

## 响应解析
当请求成功时，接口会返回`code`为200的响应，响应数据的`data`字段包含会话的详细信息。其中`chatId`为会话的唯一标识，`appId`为关联应用的ID，`variables`为会话的变量配置。`app`字段包含关联应用的完整配置，包括聊天配置`chatConfig`、可用模型列表`chatModels`、应用名称`name`、头像地址`avatar`等。例如示例响应中的`data`包含`chatId`为`sPVOuEohjo3w`，`appId`为`66e29b870b24ce35330c0f08`，`chatModels`为`["GPT-4o-mini"]`，`chatConfig`包含`questionGuide`为`true`、`ttsConfig`的`type`为`web`、`whisperConfig`的`open`为`false`、文件选择配置允许选择文件和图片等参数。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
