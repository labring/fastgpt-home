---
title: FastGPT知识库自定义元数据的配置与使用说明
slug: /zh/glossary/fastgpt-knowledgebase-metadata
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4152
source_type: 官方文档
---

# FastGPT知识库自定义元数据的配置与使用说明

## 一句话定义
FastGPT中的元数据（metadata）是可自定义关联到知识库条目的附加信息字段。
## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
可通过API、CSV或Excel模板为知识库数据导入JSON格式的元数据。模板导入需使用`q`、`a`、`index`、`metadata`作为表头，其中`q`、`a`、`metadata`各占一列，`index`可设置多列且顺序无要求。使用Excel文件导入时，仅支持单个工作表且不能包含合并单元格，无法正确解析的文件会提示文件格式异常。导入的元数据会在知识库检索结果和备份导出中保留。此外，早期版本存在文件元数据丢失的问题，已在对应更新中修复。
## 容易搞错的地方
使用Excel导入时未遵循仅单个工作表、无合并单元格的要求，会触发文件格式异常提示。未按要求配置`q`、`a`、`index`、`metadata`表头，会导致元数据无法正确关联到知识库条目。早期版本中，在调用上传、草稿上传及首轮媒体消息场景下，可能出现元数据丢失的问题。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4152)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
