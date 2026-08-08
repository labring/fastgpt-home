---
title: 使用FastGPT应用API获取应用日志与统计数据
slug: /zh/api/fastgpt-app-log-stat-api
page_type: API与文档
source: https://doc.fastgpt.cn/zh-CN/openapi/app
source_type: 官方文档
---

# 使用FastGPT应用API获取应用日志与统计数据

### 接口概述
FastGPT提供了应用日志与统计数据的专属API接口，包含两个子功能：获取应用总体数据统计、获取应用图表数据，用于开发者快速查询应用的累积使用情况和按时间维度的细分统计信息，帮助监控应用运行状态与用户行为。使用该类接口需提前准备全局API Key和目标应用的AppId，且仅可查询已授权访问的应用数据。

### 调用步骤与总体数据接口
首先需获取全局API Key与目标应用的AppId。调用获取应用总体数据统计接口时，需使用GET请求，请求地址为`https://cloud.fastgpt.cn/api/proApi/core/app/logs/getTotalData`，请求头需携带`Authorization: Bearer {你的API Key}`，URL参数需传入`appId`为目标应用的ID。以下为标准请求示例：
```curl
curl --location --request GET "https://cloud.fastgpt.cn/api/proApi/core/app/logs/getTotalData?appId=68c46a70d950e8850ae564ba" \
--header "Authorization: Bearer apikey"
```
该接口的入参仅需`appId`，成功调用后将返回包含`totalUsers`（累积使用用户数量）、`totalChats`（累积对话数量）、`totalPoints`（累积积分消耗）的统计数据。

### 图表数据接口说明
获取应用图表数据的接口需使用POST请求，请求地址为`https://cloud.fastgpt.cn/api/proApi/core/app/logs/getChartData`，请求头需携带`Authorization: Bearer {你的API Key}`与`Content-Type: application/json`。请求体需包含必填参数`appId`、`dateStart`、`dateEnd`，其中`dateStart`与`dateEnd`需符合ISO 8601时间格式，例如`2025-09-19T16:00:00.000Z`。可选参数包括`source`（日志来源数组，可选值为`test, online, share, api, cronJob, team, feishu, official_account, wecom, mcp`）、`offset`（用户留存偏移量）、`userTimespan`/`chatTimespan`/`appTimespan`（时间跨度，可选值为`day|week|month|quarter`）。该接口的出参包含`userData`、`chatData`、`appData`三个数组，分别对应用户、对话、应用的按时间统计数据，每个元素包含时间戳与对应的汇总字段，例如`chatData`中的`chatItemCount`为对话次数，`chatCount`为会话次数。

### 注意事项与边界
使用该类接口时需注意：若传入无效的`appId`或API Key，将返回非200状态码的响应；`source`参数仅支持预设的来源值，传入未定义的来源可能导致统计数据异常；该接口仅能查询已授权的应用数据，无法获取未绑定的应用统计信息。

> 来源：https://doc.fastgpt.cn/zh-CN/openapi/app
