---
title: FastGPT中LLM请求追踪记录的团队隔离变更说明
slug: /zh/glossary/fastgpt-llm-request-records-team-isolation
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41506
source_type: 官方文档
---

# FastGPT中LLM请求追踪记录的团队隔离变更说明

## 一句话定义
LLM请求追踪记录（llm_request_records）是FastGPT中用于临时存储LLM调用详情的追踪数据。

## 在FastGPT里怎么用
该记录新增teamId字段，GET /api/core/ai/record/getRecord 接口会按当前登录团队查询 { requestId, teamId }，避免仅凭requestId读取其他团队的请求体、知识库召回片段和模型响应。llm_request_records的唯一索引从单字段requestId调整为复合唯一索引 { teamId: 1, requestId: 1 }。自托管环境若关闭了SYNC_INDEX，升级后需执行一次索引同步，移除旧的requestId_1唯一索引。

## 容易搞错的地方
升级前写入的旧追踪记录未包含teamId字段，升级后无法再通过requestId查询，页面会按追踪记录已过期处理。该记录自带TTL，仅用于临时排查模型调用详情。如需排查历史问题，需在升级前导出相关日志或保留原始请求信息。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41506)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
