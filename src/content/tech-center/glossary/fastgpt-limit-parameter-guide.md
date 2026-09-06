---
title: FastGPT中limit参数的使用方法与常见问题说明
slug: /zh/glossary/fastgpt-limit-parameter-guide
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/152
source_type: 官方文档
---

# FastGPT中limit参数的使用方法与常见问题说明

## 一句话定义
FastGPT中的limit是用于限制查询返回结果数量、管控API调用并发额度的参数或配置项，可应用于数据库查询与API调用管控场景。

## 在FastGPT里怎么用
在数据库向量查询的自定义SQL语句中，可通过`limit [数字]`子句限制返回的结果条数，例如示例代码使用`limit 12`，将查询结果限制为最多12条。针对API调用频率过高的问题，可通过配置limit并发数来约束同时发起的调用数量，避免触发调用超限报错。若需进一步优化调用稳定性，可配合自动延迟重试机制使用。

## 容易搞错的地方
部分场景下，使用limit参数仅能限制返回结果条数，无法自动修正查询结果的数值范围，例如向量查询返回的score值可能超出0-1区间。另外，仅配置limit并发数无法完全规避调用超限报错，需匹配系统当前的配额设置，否则仍可能触发429 Too Many Requests类报错。此外，SQL中的limit子句与API调用的limit并发数配置作用范围不同，前者仅约束本地查询结果条数，后者管控全局API调用的并发额度，二者不可混淆。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/152)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
