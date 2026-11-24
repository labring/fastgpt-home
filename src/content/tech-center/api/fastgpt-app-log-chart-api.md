---
title: 使用API获取FastGPT应用日志图表数据的调用指南
slug: /zh/api/fastgpt-app-log-chart-api
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/app
source_type: 官方文档小节
---

# 使用API获取FastGPT应用日志图表数据的调用指南

该接口用于获取指定FastGPT应用的用户活跃、对话统计、应用反馈等维度的日志图表数据，支持按不同时间跨度聚合统计结果。请求需通过POST方式发起，需携带Bearer类型的API密钥作为Authorization请求头，请求体格式为JSON。

### 完整请求配置步骤
1. 配置请求目标地址：`https://cloud.fastgpt.cn/api/proApi/core/app/logs/getChartData`
2. 设置请求头：
   - `Authorization: Bearer 你的应用API密钥`
   - `Content-Type: application/json`
3. 构造JSON请求体，需包含必填参数与可选参数：
   - 必填参数：`appId`（应用ID）、`dateStart`（查询开始时间，ISO8601格式）、`dateEnd`（查询结束时间，ISO8601格式）
   - 可选参数：
     - `source`：日志来源数组，支持`test`、`online`、`share`、`api`、`cronJob`、`team`、`feishu`、`official_account`、`wecom`、`mcp`
     - `offset`：用户留存偏移量，单位随`userTimespan`变化
     - `userTimespan`、`chatTimespan`、`appTimespan`：分别指定用户、对话、应用数据的时间跨度，支持`day`、`week`、`month`、`quarter`
   以下为示例请求体：
   ```json
   {
     "appId": "68c46a70d950e8850ae564ba",
     "dateStart": "2025-09-19T16:00:00.000Z",
     "dateEnd": "2025-09-27T15:59:59.999Z",
     "offset": 1,
     "source": ["test", "online", "share", "api", "cronJob", "team", "feishu", "official_account", "wecom", "mcp"],
     "userTimespan": "day",
     "chatTimespan": "day",
     "appTimespan": "day"
   }
   ```

### 响应数据结构说明
当请求成功时，接口将返回状态码200，响应数据的`data`字段包含三个核心数组：
1.  `userData`：用户维度统计数据，每个元素包含`timestamp`（时间戳）与`summary`对象。`summary`包含活跃用户数`userCount`、新用户数`newUserCount`、留存用户数`retentionUserCount`、总积分消耗`points`，以及各来源的用户数量分布`sourceCountMap`。
2.  `chatData`：对话维度统计数据，每个元素包含`timestamp`与`summary`对象。`summary`包含对话次数`chatItemCount`、会话次数`chatCount`、错误对话次数`errorCount`、总积分消耗`points`。
3.  `appData`：应用维度统计数据，每个元素包含`timestamp`与`summary`对象。`summary`包含好评反馈数`goodFeedBackCount`、差评反馈数`badFeedBackCount`、对话次数`chatCount`、总响应时间`totalResponseTime`。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/app)
