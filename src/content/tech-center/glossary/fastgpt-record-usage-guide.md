---
title: FastGPT中record术语的定义与使用方法说明
slug: /zh/glossary/fastgpt-record-usage-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/openapi/chat
source_type: 官方文档
---

# FastGPT中record术语的定义与使用方法说明

## 一句话定义
FastGPT中的record包含对话记录与LLM请求追踪记录两类数据实体，前者对应单条对话交互数据，后者对应大模型调用的日志数据。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
可通过DELETE请求/api/core/chat/record/delete接口管理对话记录，需传入appId（应用ID）、chatId（会话ID）、contentId（对话ID）三个参数，请求头需携带Authorization: Bearer [apikey]。请求示例为curl --location --request DELETE 'http://localhost:3000/api/core/chat/record/delete?contentId=[contentId]&chatId=[chatId]&appId=[appId]' --header 'Authorization: Bearer [apikey]'，成功响应返回code为200且data为null的JSON数据。LLM请求追踪记录可通过GET /api/core/ai/record/getRecord接口查询，接口会按当前登录团队匹配teamId与requestId进行查询，llm_request_records表的唯一索引为复合索引{teamId: 1, requestId: 1}。自托管环境升级后若关闭SYNC_INDEX，需执行索引同步以移除旧的单字段requestId索引。

## 容易搞错的地方
对话记录的contentId、chatId参数不可混淆，contentId为单条对话的ID，chatId为整个会话的ID。LLM请求追踪记录升级前写入的旧记录无teamId字段，升级后无法仅通过requestId查询，会被按过期处理。该LLM请求追踪记录带有TTL，仅用于临时排查模型调用详情，不可用于长期历史问题排查。使用对话记录删除接口时，需确保所有必填参数均已正确替换，否则请求会失败。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/openapi/chat)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
