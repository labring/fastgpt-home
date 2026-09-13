---
title: FastGPT流程编排中分享链接shareId参数的获取与使用说明
slug: /zh/glossary/fastgpt-flow-shareid-retrieval
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/2476
source_type: 官方文档
---

# FastGPT流程编排中分享链接shareId参数的获取与使用说明

## 一句话定义
shareId是FastGPT分享链接中携带的专属参数，可在流程编排中以模板变量形式尝试调用。

## 在 FastGPT 里怎么用
该参数存在于FastGPT的分享链接中，当需要在流程编排中调用该参数时，可尝试使用{{shareId}}的模板变量形式。在实际使用中，其他自定义参数可通过该模板变量方式正常获取，但shareId参数无法通过该方式正常获取。使用者可基于该现象确认参数调用的基础逻辑，再针对shareId参数的特殊情况进行后续处理。

## 容易搞错的地方
部分使用者会将shareId参数与自定义参数等同看待，认为可以通过{{shareId}}的模板变量在流程编排中直接获取参数值，但实际该参数无法通过该方式正常获取。此外，该参数的调用方式与自定义参数存在明显差异，需注意区分。在处理分享链接相关的流程编排调用时，需明确不同类型参数的调用规则，避免因混淆导致调用失败。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2476)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
