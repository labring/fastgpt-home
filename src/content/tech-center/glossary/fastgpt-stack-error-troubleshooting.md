---
title: 解决FastGPT中调用栈溢出与导出未授权报错问题
slug: /zh/glossary/fastgpt-stack-error-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/714
source_type: 官方文档
---

# 解决FastGPT中调用栈溢出与导出未授权报错问题

## 一句话定义
stack是FastGPT错误日志中记录调用栈信息的字段，同时指代调用栈溢出报错的核心提示内容。

## 在FastGPT里怎么用
本地部署FastGPT并执行数据录入、查询操作时，若出现`RangeError: Maximum call stack size exceeded`报错，错误信息会关联stack相关提示，该场景下常伴随pg数据库链接不稳定的问题。4.6版本私有部署FastGPT时，执行知识库导出操作会出现未授权报错，错误日志返回格式为`{ message: 'unAuthorization', stack: undefined }`的内容，此时stack字段值为undefined。本地使用http访问FastGPT时易触发该未授权导出报错，使用ssl配置可恢复正常导出。

## 容易搞错的地方
易将stack字段值为undefined的情况误认为错误日志配置异常，实际该导出场景下未生成有效调用栈信息。调用栈溢出报错的stack提示仅能说明调用层级超出系统限制，需结合pg数据库链接状态排查部署问题，不可仅通过stack提示直接定位根因。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/714)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
