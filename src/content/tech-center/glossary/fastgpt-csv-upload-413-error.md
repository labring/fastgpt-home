---
title: 解决FastGPT上传CSV文件时出现的413请求实体过大报错
slug: /zh/glossary/fastgpt-csv-upload-413-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/379
source_type: 官方文档
---

# 解决FastGPT上传CSV文件时出现的413请求实体过大报错

## 一句话定义
413请求实体过大是FastGPT上传文件时，由Nginx返回的请求实体大小超出限制的报错，该报错的页面会显示"413 Request Entity Too Large"与"nginx"标识。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该报错出现在FastGPT上传文件的流程中，当上传包含1万多条新闻文章的CSV文件时，可能会触发该报错。目前公开的相关片段中未提及该报错的具体调整参数或解决步骤，仅能确认触发场景与上传CSV文件的大小相关。

## 容易搞错的地方
部分使用者会错误认为该报错由FastGPT自身限制导致。实际该报错由Nginx返回，与请求实体大小超出Nginx的配置限制直接相关。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/379)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
