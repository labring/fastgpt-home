---
title: 解决FastGPT中modeldata表tmb_id非空约束报错问题
slug: /zh/glossary/fastgpt-modeldata-tmbid-notnull-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/772
source_type: 官方文档
---

# 解决FastGPT中modeldata表tmb_id非空约束报错问题

## 一句话定义
该报错指FastGPT私有部署版本中，在知识库创建、文档上传后执行索引，或导入知识库的操作时，modeldata表的tmb_id字段出现空值，违反数据库非空约束的数据库操作错误。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该报错触发于FastGPT私有部署版本的知识库核心操作环节，具体包括创建自定义知识库、上传文档后执行索引，以及直接导入知识库的流程。操作过程中后台会返回完整报错文本：null value in column "tmb_id" of relation "modeldata" violates not-null constraint。根据官方issue的排查记录，该报错与用户使用的API密钥有效性无关，即使密钥正常可用仍可能触发该错误。

## 容易搞错的地方
该报错仅出现在私有部署版本中，公有云版本未出现同类问题。部分用户可能误将该报错与密钥配置或网络问题关联，但官方排查步骤已确认密钥正常使用时仍会触发该错误。触发该报错的核心原因为modeldata表的tmb_id字段未被正确赋值，导致数据库插入操作违反非空约束规则。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/772)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
