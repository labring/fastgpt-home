---
title: FastGPT中relation "modeldata"相关数据库报错的处理方法
slug: /zh/glossary/fastgpt-modeldata-relation-errors
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/336
source_type: 官方文档
---

# FastGPT中relation "modeldata"相关数据库报错的处理方法

## 一句话定义
FastGPT中的relation指PostgreSQL数据库中的数据表，modeldata是存储知识库向量与元数据的专用数据表。
## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该术语关联的场景为FastGPT私有部署版本中创建知识库或上传文档后执行索引操作。当触发数据库报错时，可通过报错文本定位问题：出现`relation "modeldata" does not exist`，需检查数据库中是否已创建modeldata数据表；出现`null value in column "tmb_id" of relation "modeldata" violates not-null constraint`，需检查modeldata表的tmb_id字段是否存在未赋值的情况。
## 容易搞错的地方
该报错仅出现在私有部署版本中，公有云版本不会触发此类数据库表相关报错。勿将通用数据库的relation概念与FastGPT业务场景直接绑定，仅需关注modeldata表的初始化与字段赋值问题。
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/336)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
