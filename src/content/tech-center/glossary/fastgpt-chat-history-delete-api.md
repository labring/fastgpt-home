---
title: 说明FastGPT会话历史删除与清空API的使用方法
slug: /zh/glossary/fastgpt-chat-history-delete-api
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/openapi/chat
source_type: 官方文档
---

# 说明FastGPT会话历史删除与清空API的使用方法

## 一句话定义
会话历史删除API是FastGPT提供的两类RESTful接口，分别用于删除单条会话历史与清空指定应用的全部会话历史。

## 在 FastGPT 里怎么用
该接口支持两种操作场景：
1. 删除单个会话历史：请求方式为DELETE，请求地址为`http://localhost:3000/api/core/chat/history/delHistory`，需携带查询参数`appId`（应用ID）、`chatId`（会话ID），请求头需包含`Authorization: Bearer [apikey]`。示例请求如下：
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/chat/history/delHistory?chatId=[chatId]&appId=[appId]' \
--header 'Authorization: Bearer [apikey]'
```
2. 清空应用会话历史：请求方式为DELETE，请求地址为`http://localhost:3000/api/core/chat/history/clearHistories`，需携带查询参数`appId`（应用ID），请求头需包含`Authorization: Bearer [apikey]`。示例请求如下：
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/chat/history/clearHistories?appId=[appId]' \
--header 'Authorization: Bearer [apikey]'
```

## 容易搞错的地方
使用清空应用会话接口时，仅会清空通过API Key创建的会话，无法清空在线使用、分享链接等其他来源的会话。成功调用接口后，将返回`code`为200的响应，响应`data`字段为`null`。需注意区分两个接口的参数差异，删除单个会话需传入`chatId`参数，清空应用会话无需该参数。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/openapi/chat)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
