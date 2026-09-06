---
title: 解释FastGPT知识库导入索引时tmb_id非空约束报错问题
slug: /zh/glossary/fastgpt-tmb-id-notnull-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/772
source_type: 官方文档
---

# 解释FastGPT知识库导入索引时tmb_id非空约束报错问题

## 一句话定义
该报错指在FastGPT操作中，数据库`modeldata`表的`tmb_id`字段存在空值，违反了该字段的非空约束规则，属于数据库层面的写入异常。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该报错仅出现在私有部署版本的FastGPT中，触发场景包括创建支持库并上传文档后执行索引，以及直接传入知识库时。触发时会返回固定报错文本：`null value in column "tmb_id" of relation "modeldata" violates not-null constraint`。操作前需确认已使用正常可用的自有密钥，并完整查看项目官方文档与项目README，避免因基础配置遗漏引发异常。执行知识库索引流程时，系统会向`modeldata`表写入分片数据，若`tmb_id`字段未被正确赋值，就会触发该约束报错。

## 容易搞错的地方
需注意该报错仅针对私有部署版本，公有云版本不会出现此类问题。部分用户会将该报错与密钥有效性直接关联，但密钥正常时仍可能因数据库写入逻辑的配置问题触发该约束。需优先排查数据写入环节的字段赋值逻辑，确认`tmb_id`字段在写入时被正确传递有效值。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/772)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
