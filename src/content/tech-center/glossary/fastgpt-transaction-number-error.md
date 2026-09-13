---
title: 说明FastGPT中Transaction numbers相关报错的含义与场景
slug: /zh/glossary/fastgpt-transaction-number-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/857
source_type: 官方文档
---

# 说明FastGPT中Transaction numbers相关报错的含义与场景

## 一句话定义
该报错提示“Transaction numbers are only allowed on a replica set member or mongos”，是FastGPT执行数据库事务操作时触发的错误提示。

## 在 FastGPT 里怎么用
该报错会在更新至4.6.8版本的私有部署FastGPT中出现，触发场景包含两个操作：一是通过URL导入知识库时，二是删除无用的知识库及应用时。触发该报错时，知识库导入文档的操作可正常完成。

## 容易搞错的地方
部分使用者会将该报错归因于FastGPT自身功能异常或版本问题，实际该报错与MongoDB数据库的部署配置相关，未满足事务操作的运行要求，即未将MongoDB配置为副本集或未使用mongos路由。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/857)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
