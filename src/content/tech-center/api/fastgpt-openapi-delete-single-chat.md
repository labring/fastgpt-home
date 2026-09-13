---
title: 通过FastGPT OpenAPI删除单个会话的详细操作指南
slug: /zh/api/fastgpt-openapi-delete-single-chat
page_type: API
source: https://doc.fastgpt.cn/zh-CN/openapi/chat
source_type: 官方文档
---

# 通过FastGPT OpenAPI删除单个会话的详细操作指南

FastGPT OpenAPI的会话管理模块提供单个会话删除接口，该接口仅用于删除单条指定的会话记录。调用该接口需通过DELETE请求方式发起，同时需要携带合法的鉴权凭证与目标会话、所属应用的标识信息，确保请求的合法性与准确性。

## 调用配置与参数说明
该接口的完整请求示例如下：
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/chat/history/delHistory?chatId=[chatId]&appId=[appId]' \
--header 'Authorization: Bearer [apikey]'
```
请求需携带两个必填的查询参数：
- appId：应用ID，用于标识当前会话所属的应用
- chatId：会话ID，用于指定需要删除的目标会话
请求头必须携带Authorization字段，格式为Bearer [apikey]，其中[apikey]需替换为实际的API密钥，未携带有效鉴权信息将导致请求无法正常完成。

## 响应结果说明
接口调用成功时，将返回标准的JSON格式响应，示例如下：
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```
该响应中，code字段取值为200，代表接口调用成功；statusText与message字段均为空字符串，未附带额外的提示内容；data字段为null，无具体的业务返回数据。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/openapi/chat)

## 适用性与版本范围

本页适用于官方来源记录的 API 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
