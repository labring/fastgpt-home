---
title: FastGPT中Xinference模块引擎的选择方法与注意事项
slug: /zh/glossary/fastgpt-xinference-engine-selection
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/2262
source_type: 官方文档
---

# FastGPT中Xinference模块引擎的选择方法与注意事项

## 一句话定义
Xinference module engine是FastGPT中用于对接Xinference框架的大模型推理引擎，涵盖llama.cpp、Transformers、vLLM等多种推理引擎类型。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT中使用该引擎时，需先在Xinference框架内完成模型下载与配置。当前支持llama.cpp、Transformers、vLLM等引擎类型，可根据实际需求选择适配的引擎。使用过程中若模型无法正常加载，可能触发"无可用渠道"报错。

## 容易搞错的地方
部分情况下，在Xinference中下载多个模型后，仅单个模型可用，其余模型触发"无可用渠道"报错。需参照官方标准完成模型下载配置，避免出现此类问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2262)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
