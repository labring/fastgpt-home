---
title: FastGPT中tmb_id字段的含义与异常处理方法
slug: /zh/glossary/fastgpt-tmb-id-field
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/772
source_type: 官方文档
---

# FastGPT中tmb_id字段的含义与异常处理方法

## 一句话定义
tmb_id是FastGPT的modeldata数据库表中的必填非空字段，用于存储与知识库索引相关的关联标识信息。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该字段的赋值由系统自动完成，无需手动配置。在创建知识库并上传文档执行索引、导入知识库的流程中，系统会自动为modeldata表的tmb_id字段填充有效数值，以完成知识库索引数据与该表的关联写入。该字段的配置与使用完全依托FastGPT的内置流程，无额外参数需要用户调整。

## 容易搞错的地方
常见异常为执行知识库索引或导入操作时，触发报错"null value in column \"tmb_id\" of relation \"modeldata\" violates not-null constraint"。该报错表示modeldata表的tmb_id字段存在空值，违反了数据库表的非空约束规则。此类报错通常与系统自动赋值逻辑异常相关，需排查知识库创建、文档上传或导入流程的系统执行环节，确认系统是否正常完成了tmb_id字段的赋值操作。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/772)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
