---
title: 说明FastGPT第三方与开放API的调用方法
slug: /zh/glossary/fastgpt-api-usage-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset
source_type: 官方文档
---

# 说明FastGPT第三方与开放API的调用方法

## 一句话定义
FastGPT的第三方API与开放API支持自动化调用数据集文件访问、会话管理等功能。

## 在 FastGPT 里怎么用
包含两类接口调用方式：
1. 获取文件阅读链接接口：请求方式为GET，请求地址为`{{baseURL}}/v1/file/read?id=xx`，需携带请求头`Authorization: Bearer {{authorization}}`，参数`id`为文件ID。响应返回JSON格式数据，成功时`success`为`true`，`data`字段包含可直接打开的文件访问链接`url`。
2. 删除单个会话接口：请求方式为DELETE，请求地址为`/api/core/chat/history/delHistory?chatId=[chatId]&appId=[appId]`，需携带请求头`Authorization: Bearer [apikey]`，参数`appId`为应用ID，`chatId`为会话ID。响应返回`code`为`200`，`data`为`null`表示执行成功。

## 容易搞错的地方
1. 两类接口均需携带正确的Authorization请求头，未携带或令牌无效会导致认证失败。
2. 获取文件阅读链接接口的`id`参数必须为已存在的文件ID，否则无法生成有效链接。
3. 删除单个会话接口的`chatId`与`appId`需匹配对应会话与应用，参数不匹配将无法执行删除操作。
4. 请求地址中的`{{baseURL}}`、`[chatId]`、`[appId]`、`[apikey]`等占位符需替换为实际部署或获取的值，否则请求无效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
