---
title: FastGPT OpenAPI更新对话点赞与点踩反馈的操作方法
slug: /zh/reference/fastgpt-openapi-update-chat-feedback
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# FastGPT OpenAPI更新对话点赞与点踩反馈的操作方法

## 结论
该OpenAPI用于更新FastGPT对话的用户点赞或点踩反馈。成功调用后将返回code为200的标准响应。

## 具体怎么做
1. 整理必填与可选参数：
| 参数名 | 说明 |
| ------ | ---- |
| appId | 应用ID |
| chatId | 会话ID |
| dataId | 对话ID |
| userGoodFeedback | 可选，点赞时传`yes`，取消点赞时移除该字段 |
| userBadFeedback | 可选，点踩时传`yes`，取消点踩时移除该字段 |
2. 准备认证信息：请求头需携带`Authorization: Bearer [apikey]`，替换`[apikey]`为实际密钥。
3. 发起POST请求，以下为两种操作的示例：
   点赞/取消点赞请求：
   ```bash
   curl --location --request POST 'http://localhost:3000/api/core/chat/feedback/updateUserFeedback' \
   --header 'Authorization: Bearer [apikey]' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "appId": "appId",
   "chatId": "chatId",
   "dataId": "dataId",
   "userGoodFeedback": "yes"
   }'
   ```
   点踩/取消点踩请求：
   ```bash
   curl --location --request POST 'http://localhost:3000/api/core/chat/feedback/updateUserFeedback' \
   --header 'Authorization: Bearer [apikey]' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "appId": "appId",
   "chatId": "chatId",
   "dataId": "dataId",
   "userBadFeedback": "yes"
   }'
   ```
4. 成功响应示例：
   ```json
   {
   "code": 200,
   "statusText": "",
   "message": "",
   "data": null
   }
   ```

## 注意事项
1. 请勿同时传递`userGoodFeedback`和`userBadFeedback`参数，仅需根据操作选择其一。
2. 取消对应反馈时，只需移除对应的参数字段，无需传递其他值。
3. 接口地址固定为`http://localhost:3000/api/core/chat/feedback/updateUserFeedback`。
4. 请求必须携带正确的Authorization头，格式为`Bearer [apikey]`。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
