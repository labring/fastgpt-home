---
title: FastGPT对话删除接口的使用与参数说明
slug: /zh/api/fastgpt-delete-chat-api
page_type: API
source: https://doc.fastgpt.cn/zh-CN/openapi/chat
source_type: 官方文档
---

# FastGPT对话删除接口的使用与参数说明

该接口属于FastGPT开放API的对话管理模块，用于删除指定的单条对话记录，可用于清理无效对话、归档历史会话、管理用户对话数据等业务场景。调用该接口需遵循指定的请求格式与鉴权规则，确保请求的合法性与有效性，避免因参数错误或鉴权失败导致调用失败。

# 调用参数与请求示例
调用该接口需传入三个必填查询参数，并携带鉴权请求头。具体参数说明如下：
- appId：应用ID，用于标识当前调用所属的应用，为平台分配的唯一标识
- chatId：会话ID，用于将对话归属到对应的会话组，确保删除操作定位到正确的会话范围
- contentId：对话ID，用于精准定位需要删除的单条对话记录
请求头需携带Authorization字段，格式为Bearer [apikey]，其中[apikey]为平台分配的API密钥，用于完成接口鉴权。
完整的curl请求示例如下：
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/chat/record/delete?contentId=[contentId]&chatId=[chatId]&appId=[appId]' \
--header 'Authorization: Bearer [apikey]'
```
使用时需将命令中的[contentId]、[chatId]、[appId]分别替换为实际的对话ID、会话ID、应用ID，[apikey]替换为实际的API密钥，[localhost:3000]替换为实际部署的平台服务地址。

# 响应格式与说明
接口调用成功后，将返回标准JSON格式的响应数据，示例如下：
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```
该响应结构包含四个固定字段：code为状态码，调用成功时固定返回200；statusText为状态文本，成功时为空字符串；message为提示信息，成功时为空字符串，失败时包含具体错误提示；data为返回数据，成功时为null，表示删除操作已顺利完成。若调用失败，将返回对应非200的code值与对应的错误信息，具体错误内容可通过message字段查看。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/openapi/chat)

## 适用性与版本范围

本页适用于官方来源记录的 API 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
