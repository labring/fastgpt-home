---
title: 通过API清空FastGPT应用指定会话历史的操作指南
slug: /zh/api/clear-fastgpt-app-session-history
page_type: API
source: https://doc.fastgpt.cn/zh-CN/openapi/chat
source_type: 官方文档
---

# 通过API清空FastGPT应用指定会话历史的操作指南

该接口用于清空指定FastGPT应用下通过API Key创建的会话历史，仅作用于该来源的会话，无法影响在线使用、分享链接等其他渠道产生的会话。调用该接口前，需确认已获取目标应用的ID与对应的API密钥，确保具备操作权限。

## 操作配置与请求参数
完整的请求命令示例如下：
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/chat/history/clearHistories?appId=[appId]' \
--header 'Authorization: Bearer [apikey]'
```
该请求包含两个必填配置项：
1.  `appId`：应用ID，需替换为目标FastGPT应用的实际ID，作为查询参数拼接在接口地址后。
2.  请求头`Authorization`：需携带格式为`Bearer [apikey]`的认证信息，其中`[apikey]`替换为实际的API密钥。

## 响应结果说明
当请求执行成功时，将返回标准的JSON格式响应，示例结构如下：
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```
该响应中`code`字段为200表示请求成功，`statusText`与`message`字段为空字符串，`data`字段为null，不返回额外的业务数据。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/openapi/chat)

## 适用性与版本范围

本页适用于官方来源记录的 API 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
