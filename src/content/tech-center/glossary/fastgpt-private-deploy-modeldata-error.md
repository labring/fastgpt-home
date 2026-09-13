---
title: 解决FastGPT私有化部署中modeldata表不存在的报错问题
slug: /zh/glossary/fastgpt-private-deploy-modeldata-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/336
source_type: 官方文档
---

# 解决FastGPT私有化部署中modeldata表不存在的报错问题

## 一句话定义
modeldata是FastGPT私有化部署场景下，数据库中用于存储模型相关业务数据的必备业务数据表，未正确创建会引发知识库相关功能异常。

## 在 FastGPT 里怎么用
在FastGPT私有化部署流程中，需确保数据库初始化脚本内的表名使用小写的modeldata。当部署过程中或使用知识库功能时出现报错"relation \"modeldata\" does not exist"时，需检查数据库初始化脚本的表名大小写，将大写的modelData修正为小写的modeldata后重新执行初始化操作。该操作可修复因数据库表名大小写不匹配导致的初始化失败问题，保障后续业务功能正常运行。

## 容易搞错的地方
容易混淆该表名的大小写格式，将初始化脚本中的表名写为大写的modelData，导致数据库无法识别该表，触发"relation \"modeldata\" does not exist"的报错。该配置仅适用于私有化部署版本，公有云部署无需手动调整该表名。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/336)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
