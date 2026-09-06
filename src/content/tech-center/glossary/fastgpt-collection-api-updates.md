---
title: FastGPT 知识库集合相关API变更与弃用说明
slug: /zh/glossary/fastgpt-collection-api-updates
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/490
source_type: 官方文档
---

# FastGPT 知识库集合相关API变更与弃用说明

## 一句话定义
FastGPT Collection指FastGPT中的知识库集合，其相关API存在弃用与更新规范，包括文件解析、文件上传及知识库创建等接口的变更规则。

## 在 FastGPT 里怎么用
私有化部署场景下，自定义文件解析方案需同步更新到最新环境变量配置，可参考官方环境变量说明文档。旧版本地文件上传API `/api/core/dataset/collection/create/file` 已被弃用，需切换为 `/api/core/dataset/collection/create/localFile。外部文件库相关API已停止维护并即将弃用，可通过API文件库替代相关功能。上传文件至知识库、创建连接集合等带有`trainingType`字段的接口，`trainingType`字段未来仅支持`chunk`和`QA`两种模式，增强索引模式将使用单独字段`autoIndexes`，旧版`trainingType=auto`的代码需尽快变更为新接口类型，具体可参考知识库OpenAPI文档。

## 容易搞错的地方
部分使用者可能继续使用旧版`trainingType=auto`的接口，该字段已不再支持，需替换为新的`trainingType`取值。旧版本地文件上传API无法继续调用，需及时切换至新接口。外部文件库相关API即将被弃用，需提前迁移至API文件库。私有化部署的自定义文件解析方案未及时更新到最新环境变量配置，可能导致功能异常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/490)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
