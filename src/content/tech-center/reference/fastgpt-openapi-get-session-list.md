---
title: FastGPT通过OpenAPI获取会话列表的操作方法
slug: /zh/reference/fastgpt-openapi-get-session-list
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# FastGPT通过OpenAPI获取会话列表的操作方法

## 结论
你可以通过FastGPT的OpenAPI接口获取指定应用的会话列表。该接口支持分页查询，可筛选API渠道创建的会话数据。

## 具体怎么做
### 完整请求示例
```bash
curl --location --request POST 'http://localhost:3000/api/core/chat/history/getHistories' \
--header 'Authorization: Bearer [apikey]' \
--header 'Content-Type: application/json' \
--data-raw '{"appId": "appId", "offset": 0, "pageSize": 20, "source": "api"}'
```
### 请求参数说明
| 参数名 | 说明 |
| ---- | ---- |
| appId | 应用ID |
| offset | 偏移量，从第几条数据开始获取 |
| pageSize | 单次查询的记录数量 |
| source | 对话源，设为`api`时仅获取API创建的会话 |

## 注意事项
1. 仅当source参数设为`api`时，接口仅获取通过API创建的会话，无法获取页面端创建的会话。
2. 响应数据的`list`字段包含会话详情列表，`total`字段为符合查询条件的会话总数量。
3. 每个会话对象包含chatId、updateTime、appId、customTitle、title、top等字段，chatId为会话唯一标识。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
