---
title: 解释FastGPT中query术语的含义与常见异常处理场景
slug: /zh/glossary/fastgpt-query-usage-errors
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/244
source_type: 官方文档
---

# 解释FastGPT中query术语的含义与常见异常处理场景

## 一句话定义
query在FastGPT中包含数据库查询执行与用户搜索请求提交两种场景，用于触发数据检索或向量匹配操作。
## 在 FastGPT 里怎么用
数据库查询场景下，通过PgClient.query方法执行PostgreSQL SQL语句，可传入包含向量匹配逻辑的SQL字符串，支持配置pgIvfflatProbe参数，默认值为10。用户搜索请求场景下，query作为用户输入的检索文本，用于触发知识库向量匹配或工具调用流程。
## 容易搞错的地方
向量查询时，PgClient.query返回的score值需对(vector <#> '[向量]')的结果乘以-1，若未执行该转换，返回的score会大于1，不在0-1区间内。当用户搜索query无法获取VQD时，会触发报错文本Failed to get the VQD for query "X"。
> [FastGPT GitHub issue 244](https://github.com/labring/FastGPT/issues/244), [FastGPT GitHub issue 2208](https://github.com/labring/FastGPT/issues/2208)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
