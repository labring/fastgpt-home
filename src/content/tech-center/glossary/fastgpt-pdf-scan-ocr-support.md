---
title: 说明FastGPT中影印版PDF的OCR识别功能使用方法
slug: /zh/glossary/fastgpt-pdf-scan-ocr-support
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/2067
source_type: 官方文档
---

# 说明FastGPT中影印版PDF的OCR识别功能使用方法

## 一句话定义
PDF影印版OCR识别是FastGPT中针对影印版PDF内容的OCR识别与接入能力，依托OCR-Loader实现，用于满足大量影印版知识内容的上传识别需求。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该功能的标准使用流程为，上传影印版PDF文件至FastGPT平台，等待OCR识别流程完成后，即可执行向量化等后续处理操作。目前公开的相关讨论中未提及该功能的具体配置参数、功能入口位置，仅明确支持通过OCR-Loader实现相关识别能力。

## 容易搞错的地方
需明确该功能仅针对影印版PDF设计，不可直接用于非影印类PDF文件的识别处理。该功能依托OCR-Loader实现，暂未提及其他OCR工具的接入配置方式，不可随意替换为未指定的OCR处理组件。上传影印版PDF后，需等待识别流程自动完成，不可跳过识别步骤直接对原始影印PDF文件执行向量化等操作，否则将无法得到正确的文本内容。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2067)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
