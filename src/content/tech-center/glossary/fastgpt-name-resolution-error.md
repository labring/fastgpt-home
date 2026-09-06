---
title: 说明FastGPT中名称解析失败报错的含义与排查方法
slug: /zh/glossary/fastgpt-name-resolution-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/4455
source_type: 官方文档
---

# 说明FastGPT中名称解析失败报错的含义与排查方法

## 一句话定义
名称解析失败是FastGPT中出现的服务连接类报错，完整报错文本为`fastgpt  14 UNAVAILABLE: Name resolution failed for target dns:milvusStandalone:19530`，核心表现为系统无法解析指定的DNS目标地址。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该报错触发于向FastGPT喂入大量数据的操作场景中，涉及的目标服务地址为dns:milvusStandalone，使用的端口为19530。该报错的出现与向系统喂入数据的操作存在关联，通常在数据量较大的场景下被观测到。

## 容易搞错的地方
容易将该报错误认为是内部milvus数据库崩溃导致的问题。部分用户在遇到该报错时，会猜测是喂入数据过多引发内部数据库崩溃，但该报错的核心原因是无法解析指定的DNS目标地址，与数据库本身的运行状态无直接关联。需要关注目标DNS地址的配置状态与网络连接情况，无需过度关注数据库本身的运行状态。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4455)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
