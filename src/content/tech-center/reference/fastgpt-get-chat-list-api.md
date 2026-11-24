---
title: 使用FastGPT OpenAPI获取对话列表的操作方法
slug: /zh/reference/fastgpt-get-chat-list-api
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# 使用FastGPT OpenAPI获取对话列表的操作方法

## 结论
该接口用于获取FastGPT的对话历史分页列表。通过传入指定参数，可自定义查询范围与是否加载自定义反馈数据。

## 具体怎么做
1. 构造POST请求，接口地址为`http://localhost:3000/api/core/chat/record/getPaginationRecords`
2. 添加两个请求头：
   - `Authorization: Bearer [apikey]`，需将`[apikey]`替换为真实API密钥
   - `Content-Type: application/json`
3. 传入JSON格式的请求体，支持参数如下：
| 参数名 | 说明 |
| ---- | ---- |
| appId | 应用ID |
| chatId | 会话ID |
| offset | 偏移量 |
| pageSize | 记录数量 |
| loadCustomFeedbacks | 是否读取自定义反馈（可选） |

完整请求示例：
```curl
curl --location --request POST 'http://localhost:3000/api/core/chat/record/getPaginationRecords' \
--header 'Authorization: Bearer [apikey]' \
--header 'Content-Type: application/json' \
--data-raw '{
"appId": "appId",
"chatId": "chatId",
"offset": 0,
"pageSize": 10,
"loadCustomFeedbacks": true
}'
```

## 注意事项
1. 需替换请求示例中的`[apikey]`、`appId`、`chatId`为真实有效值
2. `offset`与`pageSize`需为非负整数，否则可能导致查询异常
3. 未提供有效apikey将触发认证失败
4. 成功响应的`code`为200，`data.list`包含对话记录列表，`data.total`为总记录数
5. `loadCustomFeedbacks`为可选参数，未指定时按接口默认逻辑处理

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
