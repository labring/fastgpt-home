---
title: FastGPT系统中name配置字段的详细使用与配置说明
slug: /zh/glossary/fastgpt-name-field-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# FastGPT系统中name配置字段的详细使用与配置说明

## 一句话定义
FastGPT中的name配置字段是用于标识模型别名的元数据项。
## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT中新增自定义模型时，需通过JSON格式的元数据配置name字段，该字段用于设置模型的易识别别名，需与model字段（实际调用的模型ID）区分。在语言模型配置中，可配置name为自定义别名，如“gpt-5”，同时需同步配置provider、maxContext、maxResponse等其他元数据参数；在索引模型配置中，可将name设置为“text-embedding-3-small”作为别名，同时配置defaultToken、maxToken等参数；在重排模型配置中，可将name设置为“ReRanker-Base”作为别名，同时配置requestUrl、requestAuth等参数。
## 容易搞错的地方
需注意name字段仅为别名，并非实际调用的模型ID，避免与model字段混淆；不同自定义模型的name字段需保持唯一，防止系统在模型选择时出现识别错误；部分元数据参数仅商业版生效，如charsPointsPrice、censor，需根据实际使用场景确认配置内容；fieldMap字段用于特定模型的参数映射，如o1模型需将max_tokens映射为max_completion_tokens，需根据模型类型正确配置。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/sso)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
