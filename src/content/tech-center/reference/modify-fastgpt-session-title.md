---
title: 使用 FastGPT 官方 OpenAPI 修改会话标题的具体操作步骤
slug: /zh/reference/modify-fastgpt-session-title
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# 使用 FastGPT 官方 OpenAPI 修改会话标题的具体操作步骤

# 使用 FastGPT 官方 OpenAPI 修改会话标题的具体操作步骤

## 结论
通过FastGPT官方提供的OpenAPI，可以修改指定会话的自定义标题或置顶状态。调用成功后会返回固定格式的响应结果，响应code字段固定为200，data字段为null。

## 具体怎么做
1. 确定请求地址：`http://localhost:3000/api/core/chat/history/updateHistory`
2. 配置请求头：
   - 认证头：`Authorization: Bearer [apikey]`，需将`[apikey]`替换为实际的API密钥
   - 内容类型头：`Content-Type: application/json`
3. 构造请求体，需包含以下必填参数，根据操作选择对应参数：
   | 通用参数 | 说明 |
   | ---- | ---- |
   | appId | 应用ID，字符串形式的目标应用ID |
   | chatId | 会话ID，字符串形式的目标会话ID |
   | customTitle | 自定义会话名（修改会话标题时必填） |
   | top | 置顶状态（修改会话置顶状态时必填，布尔值，`true`为置顶，`false`为取消置顶） |
4. 发送PUT请求完成调用。

### 修改会话标题的curl示例
```curl
curl --location --request PUT 'http://localhost:3000/api/core/chat/history/updateHistory' \
--header 'Authorization: Bearer [apikey]' \
--header 'Content-Type: application/json' \
--data-raw '{
"appId": "appId",
"chatId": "chatId",
"customTitle": "自定义标题"
}'
```

### 修改会话置顶状态的curl示例
```bash
curl --location --request PUT 'http://localhost:3000/api/core/chat/history/updateHistory' \
--header 'Authorization: Bearer [apikey]' \
--header 'Content-Type: application/json' \
--data-raw '{
"appId": "appId",
"chatId": "chatId",
"top": true
}'
```

成功响应的格式示例：
```json
{
"code" : 200 ,
"statusText" : "" ,
"message" : "" ,
"data" : null
}
```

## 注意事项
1. 必须使用PUT请求方法发起请求，使用其他HTTP方法会触发请求错误。
2. 请求头中的API密钥需替换为实际密钥，且必须保留`Bearer `前缀。
3. 需根据操作传入对应必填参数：修改会话标题需传入appId、chatId、customTitle；修改会话置顶状态需传入appId、chatId、top，缺少任意参数将导致请求失败。
4. 需确保appId和chatId与目标会话匹配，否则无法正确执行操作。
5. 成功调用后，响应的`code`字段值固定为200，`data`字段为null。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
