---
title: FastGPT 发起会话API请求的参数说明与使用示例
slug: /zh/api/fastgpt-chat-api-request-usage
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# FastGPT 发起会话API请求的参数说明与使用示例

## 接口基本信息
FastGPT 发起会话的API接口地址为`http://localhost:3000/api/v1/chat/completions`，请求方式为POST，需携带两个请求头：`Authorization: Bearer [apikey]`和`Content-Type: application/json`。其中`[apikey]`需替换为你申请的FastGPT API密钥。

## 快速配置步骤
1. 准备你的应用ID`appId`和API密钥。
2. 构造请求体，普通文本对话的请求示例如下：
```curl
curl --location --request POST 'http://localhost:3000/api/v1/chat/completions' \
--header 'Authorization: Bearer fastgpt-xxxxxx' \
--header 'Content-Type: application/json' \
--data-raw '{
"appId": "your_app_id",
"chatId": "my_chatId",
"stream": false,
"detail": false,
"responseChatItemId": "my_responseChatItemId",
"variables": {
"uid": "asdfadsfasfd2323",
"name": "张三"
},
"messages": [
{
"role": "user",
"content": "导演是谁"
}
]
}'
```
如果需要携带图片或文件，需将`messages`中的`content`改为数组格式，支持`text`、`image_url`、`file_url`类型。注意目前不支持直接上传文件，需将文件上传至对象存储后获取链接。示例如下：
```curl
curl --location --request POST 'http://localhost:3000/api/v1/chat/completions' \
--header 'Authorization: Bearer fastgpt-xxxxxx' \
--header 'Content-Type: application/json' \
--data-raw '{
"appId": "your_app_id",
"chatId": "abcd",
"stream": false,
"messages": [
{
"role": "user",
"content": [
{
"type": "text",
"text": "导演是谁"
},
{
"type": "image_url",
"image_url": {
"url": "图片链接"
}
},
{
"type": "file_url",
"name": "文件名",
"url": "文档链接，支持 txt md html word pdf ppt csv excel"
}
]
}
]
}'
```

## 参数详细说明
`chatId`为可选参数，为空时不使用FastGPT提供的上下文功能，完全通过传入的`messages`构建上下文。为非空字符串时，使用该`chatId`加载会话上下文，仅取`messages`数组最后一个内容作为用户问题，其余消息会被忽略。需确保`chatId`唯一且长度小于250。
`responseChatItemId`为可选参数，传入后会将该值作为本次对话响应消息的ID，存入当前`chatId`对应的数据库中，需保证该ID在当前会话内唯一。
`detail`用于控制是否返回中间值，非`stream`模式下结果保存在`responseData`中，`stream`模式下通过`event`区分不同类型的中间数据。
`variables`为模块变量对象，会替换模块输入框中的`[key]`占位符。
`messages`结构与GPT接口chat模式一致，支持普通文本或带多媒体内容的数组格式。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
