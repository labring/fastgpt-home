---
title: 解释FastGPT中text-embedding-ada-002的配置与报错处理
slug: /zh/glossary/fastgpt-ada-002-model-config
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/414
source_type: 官方文档
---

# 解释FastGPT中text-embedding-ada-002的配置与报错处理

## 一句话定义
text-embedding-ada-002是FastGPT中用于将文本转换为向量格式的嵌入模型，支持数据导入、知识库构建等依赖向量计算的核心业务场景。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该模型的可用渠道需在对应分组中配置。私有化部署场景下，可通过修改VectorModels配置参数调整系统使用的向量模型。接入外部服务后，需确保对应分组下存在该模型的可用渠道，否则会触发调用报错。配置完成后需确认配置正确应用，以保证模型调用流程正常运行。

## 容易搞错的地方
常见报错文本为“当前分组default下对于模型text-embedding-ada-002无可用渠道”，该报错通常出现在数据导入环节。部分用户修改VectorModels配置参数后，仍会默认请求text-embedding-ada-002，需核对配置是否正确生效，以及分组内的渠道配置是否匹配当前实际使用的向量模型，避免出现配置与实际调用不一致的问题。

> [FastGPT GitHub issue 414](https://github.com/labring/FastGPT/issues/414), [FastGPT GitHub issue 586](https://github.com/labring/FastGPT/issues/586)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
