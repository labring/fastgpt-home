---
title: FastGPT中HTTP请求method字段的含义与用法
slug: /zh/glossary/fastgpt-http-request-method
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1761
source_type: 官方文档
---

# FastGPT中HTTP请求method字段的含义与用法

## 一句话定义
method是FastGPT异常日志中用于标识HTTP请求类型的字段，用于记录发起请求所使用的HTTP方法类型。

## 在FastGPT里怎么用
该字段会自动生成在FastGPT的HTTP请求异常日志中，无需手动配置。在JS模块运行失败或调用外部应用的报错信息里，该字段会明确标注请求使用的HTTP方法，常见取值包括post，如报错信息中的"method": "post"。

## 容易搞错的地方
该字段仅为异常日志的记录项，无法手动修改。排查异常时，不能仅依赖该字段定位问题，需结合url、code等其他字段共同分析。例如出现"connect ECONNREFUSED ::1:80"或"self-signed certificate in certificate chain"报错时，该字段仅能说明请求类型，无法直接解决连接或证书相关问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1761)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
