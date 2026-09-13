---
title: 解释FastGPT OpenAPI会话管理接口中statusText字段的含义与用法
slug: /zh/glossary/fastgpt-openapi-statustext
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/openapi/chat
source_type: 官方文档
---

# 解释FastGPT OpenAPI会话管理接口中statusText字段的含义与用法

## 一句话定义
statusText是FastGPT OpenAPI会话管理类接口返回的响应字段，用于承载接口执行状态的文本提示信息。

## 在FastGPT里怎么用
该字段仅出现在会话管理相关API的成功响应中，涵盖删除单个会话、清空应用会话两个具体接口。调用删除单个会话接口时，需向`http://localhost:3000/api/core/chat/history/delHistory`发送DELETE请求，传入appId、chatId参数与`Authorization: Bearer [apikey]`请求头；调用清空应用会话接口时，需向`http://localhost:3000/api/core/chat/history/clearHistories`发送DELETE请求，传入appId参数与相同的Authorization请求头。成功响应的JSON结构中，statusText字段值为空字符串，示例为`""`，同时响应还包含code、message、data三个固定字段。另外，清空应用会话接口仅会清空通过API Key创建的会话，不会清空在线使用、分享链接等其他来源的会话。

## 容易搞错的地方
部分使用者可能误以为该字段会携带详细的执行结果文本，但在当前文档给出的两个成功响应示例中，该字段值均为空字符串。同时需注意，该字段仅适用于会话管理类接口，未在其他类型的API文档片段中出现，不可直接套用至非会话管理类的接口场景。此外，删除单个会话接口需同时传入chatId与appId参数，清空应用会话接口仅需传入appId参数，两者的参数要求存在差异，需注意区分。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/openapi/chat)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
