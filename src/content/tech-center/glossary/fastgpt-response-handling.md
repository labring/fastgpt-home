---
title: 解释FastGPT中response的定义与异常处理
slug: /zh/glossary/fastgpt-response-handling
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/56
source_type: 官方文档
---

# 解释FastGPT中response的定义与异常处理

## 一句话定义
Response是FastGPT中两类场景下的返回结果，包括Docker拉取镜像的服务响应与代码层数据库查询的返回对象。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
Response有两种典型使用场景。其一为Docker拉取镜像场景，执行拉取命令时会返回服务响应信息，示例报错文本为`Error response from daemon: Get "https://registry.cn-hangzhou.aliyuncs.com/v2/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)`，可通过调整网络配置排查问题。其二为代码层数据库查询场景，response作为变量承接PgClient.query的返回结果，相关参数包括`global.systemEnv.pgIvfflatProbe`（默认值10）、kb_id、user_id等，示例代码为`const response: any = await PgClient.query(...)`。

## 容易搞错的地方
一是拉取镜像时，即使`ping registry.cn-hangzhou.aliyuncs.com`成功，`curl https://registry.cn-hangzhou.aliyuncs.com/v2/`仍可能失败，导致response报错；二是向量查询时，返回的score值可能大于1，不符合预期的0-1范围，需关注该异常表现。

> [FastGPT GitHub issue 56](https://github.com/labring/FastGPT/issues/56), [FastGPT GitHub issue 244](https://github.com/labring/FastGPT/issues/244)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
