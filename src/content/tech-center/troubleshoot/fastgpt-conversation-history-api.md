---
title: FastGPT 对话历史 API 查询与日志导出：版本、权限和验证
slug: /zh/troubleshoot/fastgpt-conversation-history-api
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/450
source_type: GitHub issue
---

# FastGPT 对话历史 API 查询与日志导出：版本、权限和验证

FastGPT 已提供对话历史查询 API 和对话日志导出。历史查询从 v4.8.12 提供，日志导出在 v4.8.21 加入；排查时应同时核对部署版本、会话来源和访问权限。

## 适用范围与历史背景

[Issue #450 的维护者答复](https://github.com/labring/FastGPT/issues/450) 将历史 API 需求对应到 v4.8.12。[v4.8.21 更新说明](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4821) 列出了日志按来源分类、标题检索和导出。旧 Issue 中的功能诉求适用于当时的产品状态。

## 查询会话与消息

1. 在应用详情获取 `appId`，使用具有目标应用和会话访问权限的 APIKey。v4.15.0 起采用团队成员 APIKey 与显式 `appId` 的调用方式；旧版请对照对应版本文档。
2. 向 `POST /api/core/chat/history/getHistories` 发送 `appId`、`offset: 0`、`pageSize: 20` ，将 `source` 设为 `api`，请求头使用 `Authorization: Bearer YOUR_API_KEY`。该来源筛选面向 API 创建的会话。
3. 取返回列表中的 `chatId`，向 `POST /api/core/chat/record/getPaginationRecords` 发送 `appId`、`chatId`、`offset` 和 `pageSize`，分页读取消息。

请求字段与响应结构见[官方对话接口](https://doc.fastgpt.cn/zh-CN/openapi/chat)，凭证创建入口见[通过 API 访问应用](https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi)。

## 导出对话日志

打开目标应用的对话日志，选择时间范围与来源，检查筛选结果后点击“导出”并确认。当前[日志导出实现](https://github.com/labring/FastGPT/blob/2bf700cff08a9a6f453bbb241f7974c1bf1d0210/projects/app/src/pages/api/core/app/logs/exportLogs.ts) 校验登录身份及应用的日志读取权限，并生成 CSV；导出入口或权限异常时，应由应用管理员核对授权。

## 验证结果

用同一 `appId`、独立 `chatId` 发送两轮测试消息，确认 API 返回的会话、消息和日志导出内容对应一致。列表为空时核对 `source` 与时间范围；鉴权失败时核对凭证所属成员、应用授权和会话归属；接口返回 404 时检查部署版本及反向代理路径。
