---
title: FastGPT对话反馈功能的迁移与使用说明
slug: /zh/glossary/fastgpt-chat-feedback-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4144
source_type: 官方文档
---

# FastGPT对话反馈功能的迁移与使用说明

## 一句话定义
FastGPT中的feedback（对话反馈）指对话场景下的用户反馈相关数据，包含旧版对话历史反馈数据迁移与自定义反馈模块功能。

## 在 FastGPT 里怎么用
1. 旧版对话反馈迁移：通过任意终端发起POST请求，请求地址为`https://{{host}}/api/admin/initv4144`，请求头需携带`rootkey: {{rootkey}}`（rootkey替换为环境变量中的rootkey值）与`Content-Type: application/json`，无需请求体。该迁移任务为异步执行，接口不会返回结果，需查看日志是否打印`Migration feedback completed!`以确认任务完成。
2. 自定义反馈模块：在V4.6.5及以上版本的高级编排工作流中，可添加自定义反馈模块，该模块为版本新增功能。

## 容易搞错的地方
1. 旧版对话反馈迁移任务执行较慢，无法通过接口返回结果判断任务完成状态，需通过日志确认。
2. 自定义反馈模块仅在V4.6.5及以上版本可用，低版本无法使用该模块。
3. 迁移脚本中的`{{host}}`需替换为实际部署的FastGPT域名，`{{rootkey}}`需替换为环境变量中配置的rootkey值，参数替换错误会导致请求失败。
4. 迁移请求无需携带请求体，错误添加请求体可能导致请求异常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4144)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
