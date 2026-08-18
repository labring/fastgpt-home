---
title: FastGPT应用接口日志及统计数据查询操作说明
slug: /zh/api/fastgpt-app-log-query-api
page_type: API与文档
source: https://doc.fastgpt.cn/zh-CN/openapi/app
source_type: 官方文档
---

# FastGPT应用接口日志及统计数据查询操作说明

## 前置准备与接口说明
使用FastGPT应用接口的日志与统计查询功能，需提前准备两个必要信息：全局API Key，以及目标应用的AppId。当前提供两类查询接口：获取应用总体数据统计、获取应用分时段图表数据，均可通过标准HTTP请求调用。

## 可执行的查询配置步骤
首先完成基础请求配置：所有接口需在请求头中携带`Authorization: Bearer {your_apikey}`进行身份验证。
### 获取应用总体数据统计
发送GET请求到`https://cloud.fastgpt.cn/api/proApi/core/app/logs/getTotalData`，请求参数仅需传入`appId`，示例curl命令如下：
```bash
curl --location --request GET "https://cloud.fastgpt.cn/api/proApi/core/app/logs/getTotalData?appId=68c46a70d950e8850ae564ba" --header "Authorization: Bearer apikey"
```
### 获取应用分时段图表数据
发送POST请求到`https://cloud.fastgpt.cn/api/proApi/core/app/logs/getChartData`，请求头需额外添加`Content-Type: application/json`，请求体需包含`appId`、`dateStart`、`dateEnd`，可选参数包括`source`（日志来源数组，可选值为`test`/`online`/`share`/`api`/`cronJob`/`team`/`feishu`/`official_account`/`wecom`/`mcp`）、`offset`、`userTimespan`/`chatTimespan`/`appTimespan`（时间跨度可选`day`/`week`/`month`/`quarter`）。示例curl命令如下：
```bash
curl --location --request POST "https://cloud.fastgpt.cn/api/proApi/core/app/logs/getChartData" --header "Authorization: Bearer apikey" --header "Content-Type: application/json" --data-raw '{"appId":"68c46a70d950e8850ae564ba","dateStart":"2025-09-19T16:00:00.000Z","dateEnd":"2025-09-27T15:59:59.999Z","offset":1,"source":["test","online"],"userTimespan":"day","chatTimespan":"day","appTimespan":"day"}'
```

## 响应参数说明
对于获取应用总体数据统计的接口，成功响应的`data`字段包含三个核心统计值：`totalUsers`（累积使用用户数量）、`totalChats`（累积对话数量）、`totalPoints`（累积积分消耗）。
对于获取应用图表数据的接口，成功响应的`data`包含三个数组：`userData`为用户分时段统计数据，每个元素包含`timestamp`（时间戳）与`summary`，其中`summary`包含`userCount`（活跃用户数）、`newUserCount`（新用户数）、`retentionUserCount`（留存用户数）、`points`（总积分消耗）、`sourceCountMap`（各来源用户数量）；`chatData`为对话分时段统计数据，包含`chatItemCount`（对话次数）、`chatCount`（会话次数）、`errorCount`（错误对话次数）、`points`（总积分消耗）；`appData`为应用分时段统计数据，包含`goodFeedBackCount`（好评反馈数）、`badFeedBackCount`（差评反馈数）、`chatCount`（对话次数）、`totalResponseTime`（总响应时间）。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/openapi/app)
