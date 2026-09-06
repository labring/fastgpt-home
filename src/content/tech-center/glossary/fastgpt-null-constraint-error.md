---
title: 讲解FastGPT中not-null数据库约束报错的相关处理方法
slug: /zh/glossary/fastgpt-null-constraint-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/772
source_type: 官方文档
---

# 讲解FastGPT中not-null数据库约束报错的相关处理方法

## 一句话定义
not-null是FastGPT数据库表的非空约束规则，用于强制指定列必须存储有效值，无法插入空值，当违反该规则时会触发数据库报错。
## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该约束应用于FastGPT的modeldata表的tmb_id列。两个相关issue均提及，当执行创建支持库上传文档执行索引、导入知识库这两个涉及modeldata表数据写入的操作时，若该列未被正确赋值为有效值，会触发对应报错。触发报错的完整文本为：null value in column "tmb_id" of relation "modeldata" violates not-null constraint。
## 容易搞错的地方
容易在创建支持库、导入知识库的流程中忽略tmb_id列的必填要求，未提前生成或传入该列的有效值，导致空值插入触发约束报错。部分用户未排查该列的赋值逻辑，直接触发报错，无法快速定位问题根源。
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/772)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/832)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
