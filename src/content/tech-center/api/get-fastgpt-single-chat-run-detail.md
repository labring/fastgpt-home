---
title: 获取FastGPT单个对话运行详情的API调用方法
slug: /zh/api/get-fastgpt-single-chat-run-detail
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# 获取FastGPT单个对话运行详情的API调用方法

## 接口功能说明
该API用于获取FastGPT平台内单个对话的完整运行节点详情，可查询每个执行模块的运行时长、使用模型、消耗点数、对话历史预览等信息，帮助开发者排查对话流程异常，确认模块执行结果。

## 调用步骤与参数说明
1. 构造请求URL，格式为`http://localhost:3000/api/core/chat/record/getResData?appId=[appId]&chatId=[chatId]&dataId=[dataId]`，其中需替换三个占位参数：
   - `appId`：目标应用的唯一标识ID
   - `chatId`：当前会话的唯一标识ID
   - `dataId`：需要查询的单个对话的唯一标识ID
2. 添加请求头，携带认证信息：`Authorization: Bearer [apikey]`，其中`[apikey]`需替换为用户的FastGPT平台API密钥。
完整的curl调用示例如下：
```
curl --location --request GET 'http://localhost:3000/api/core/chat/record/getResData?appId=[appId]&chatId=[chatId]&dataId=[dataId]' \
--header 'Authorization: Bearer [apikey]'
```

## 响应结果说明
请求成功时，将返回状态码为200的响应，响应体结构如下（示例）：
```json
{
"code": 200,
"statusText": "",
"message": "",
"data": [
{
"id": "mVlxkz8NfyfU",
"nodeId": "448745",
"moduleName": "common:core.module.template.work_start",
"moduleType": "workflowStart",
"runningTime": 0
},
{
"id": "b3FndAdHSobY",
"nodeId": "z04w8JXSYjl3",
"moduleName": "AI 对话",
"moduleType": "chatNode",
"runningTime": 1.22,
"totalPoints": 0.02475,
"model": "GPT-4o-mini",
"tokens": 75,
"query": "测试",
"maxToken": 2000,
"historyPreview": [
{
"obj": "Human",
"value": "你好"
},
{
"obj": "AI",
"value": "你好！有什么我可以帮助你的吗？"
},
{
"obj": "Human",
"value": "测试"
},
{
"obj": "AI",
"value": "测试成功！请问你有什么具体的问题或者需要讨论的话题吗？"
}
],
"contextTotalLen": 4
}
]
}
```
响应的`data`数组包含所有对话执行过的节点详情，不同类型的模块包含的字段有所差异：例如`workflowStart`类型的节点仅包含基础的标识与运行时长字段；`chatNode`类型的节点则会额外包含消耗点数、使用模型、请求token数、用户查询内容、上下文预览等详细信息。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
