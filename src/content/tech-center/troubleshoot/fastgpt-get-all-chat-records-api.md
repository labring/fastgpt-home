---
title: FastGPT获取全量对话记录的API参数调整与排错指南
slug: /zh/troubleshoot/fastgpt-get-all-chat-records-api
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5062
source_type: GitHub issue
---

# FastGPT获取全量对话记录的API参数调整与排错指南

## 现象
调用/api/core/chat/getPaginationRecords接口时，接口限定必须传入appId和chatId参数。当未传入该两个参数时，接口返回{"list": [], "total": 0}，无法获取所有对话记录。

## 可能原因
该接口的代码逻辑中包含参数校验代码，当appId或chatId为空时，直接返回空结果，导致无法获取全量对话记录。

## 排查步骤
1. 确认调用的目标接口为/api/core/chat/getPaginationRecords。
2. 检查请求参数，确认是否未传入appId和chatId参数。
3. 查看接口代码，确认是否存在`if (!appId || !chatId)`的判断分支。

## 解决与验证
解决方法为修改/api/core/chat/getPaginationRecords接口的代码，删除`if (!appId || !chatId) { return { list: [], total: 0 }; }`这段代码。验证操作：使用POST请求调用http://localhost:3000/api/core/chat/getPaginationRecords，请求头携带`Authorization: Bearer {{apikey}}`与`Content-Type: application/json`，请求体仅包含offset、pageSize、loadCustomFeedbacks参数，不传入appId和chatId，查看返回结果是否包含符合条件的对话记录。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5062)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
