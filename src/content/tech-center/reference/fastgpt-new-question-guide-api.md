---
title: FastGPT 4.8.16后新版猜你想问OpenAPI接口调用指南
slug: /zh/reference/fastgpt-new-question-guide-api
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# FastGPT 4.8.16后新版猜你想问OpenAPI接口调用指南

## 结论
FastGPT 4.8.16及之后版本的猜你想问接口，需携带appId和chatId参数调用。该接口会基于最近6轮对话上下文生成推荐问题，支持自定义生成规则。

## 具体怎么做
### 调用方式
POST请求，接口地址为`http://localhost:3000/api/core/ai/agent/v2/createQuestionGuide`，需携带以下请求头：
- `Authorization: Bearer [apikey]`
- `Content-Type: application/json`

### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| appId | string | ✅ | 应用ID |
| chatId | string | ✅ | 会话ID |
| questionGuide | object | ❌ | 自定义配置，不传则使用应用最新发布版本的配置 |

其中`questionGuide`的子参数：
| 子参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| open | boolean | ✅（传入questionGuide时） | 是否开启猜你想问 |
| model | string | ❌ | 生成使用的模型，如`GPT-4o-mini` |
| customPrompt | string | ❌ | 自定义生成提示词 |

### 请求示例
```bash
curl --location --request POST 'http://localhost:3000/api/core/ai/agent/v2/createQuestionGuide' \
--header 'Authorization: Bearer [apikey]' \
--header 'Content-Type: application/json' \
--data-raw '{
"appId": "appId",
"chatId": "chatId",
"questionGuide": {
"open": true,
"model": "GPT-4o-mini",
"customPrompt": "你是一个智能助手，请根据用户的问题生成猜你想问。"
}
}'
```

### 响应示例
```json
{
"code": 200,
"statusText": "",
"message": "",
"data": ["你对AI有什么看法？", "想了解AI的应用吗？", "你希望AI能做什么？"]
}
```

## 注意事项
1. 该接口仅支持FastGPT 4.8.16及之后版本使用。
2. 调用时必须正确填写appId和chatId参数，否则无法获取对话上下文。
3. 若不传入questionGuide参数，将自动调用应用最新发布版本的猜你想问配置。
4. 请求头需配置正确的apikey和Content-Type，否则会返回认证或格式错误。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
