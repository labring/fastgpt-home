---
title: FastGPT文心一言-Speed模型知识库图片展示配置
slug: /zh/glossary/fastgpt-speed-model-image-config
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1145
source_type: 官方文档
---

# FastGPT文心一言-Speed模型知识库图片展示配置

## 一句话定义
Speed是FastGPT集成的文心一言系列问答模型，适配知识库问答场景。

## 在 FastGPT 里怎么用
使用私有部署版本的FastGPT时，需在知识库配置中关联文心一言-Speed模型。调用知识库应用API时，若返回的图片仅包含路径地址，需手动拼接部署的BASE_URL，以正常展示图片。知识库里的图片需确保地址可访问，使用该模型时可触发图文形式的回复。当知识库包含图片内容时，该模型可生成包含图片的回复内容。

## 容易搞错的地方
混淆公有云与私有部署版本的配置差异，私有部署版本需额外处理图片地址的BASE_URL拼接。误以为模型会自动完成图片地址的BASE_URL拼接，实际需手动操作。未确认知识库图片的原始地址有效性，导致无法正常展示图片。部分场景下无法触发图文回复，需确保模型配置与知识库内容正确。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1145)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
