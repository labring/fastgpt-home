---
title: FastGPT中no attribute model_spec报错的排查与使用说明
slug: /zh/glossary/fastgpt-attribute-model-spec-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/2428
source_type: 官方文档
---

# FastGPT中no attribute model_spec报错的排查与使用说明

## 一句话定义
FastGPT中出现的no attribute model_spec报错，指系统检测到目标模型配置缺少名为model_spec的属性字段。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在配置XF的whisper模型渠道时，需确保配置中包含model_spec属性参数。该报错会在oneapi测试该渠道，或FastGPT进行语音测试时触发，此时需检查模型配置是否缺失该参数。完成model_spec参数的添加后，重新进行测试即可验证报错是否解决。该参数为XF的whisper模型渠道特有的配置项，添加后可有效规避该报错。

## 容易搞错的地方
配置XF的whisper模型渠道时，容易遗漏model_spec属性参数，从而触发no attribute model_spec报错。部分用户在配置过程中，未将该参数放置在正确的配置层级下，也会导致系统无法识别该属性，引发相同报错。需注意该报错仅在调用XF的whisper模型时出现，其他类型的模型渠道配置无需添加该参数。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2428)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
