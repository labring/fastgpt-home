---
title: FastGPT中Jina重排模型与late chunking功能的具体使用说明
slug: /zh/glossary/fastgpt-jina-rerank-latechunk
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1822
source_type: 官方文档
---

# FastGPT中Jina重排模型与late chunking功能的具体使用说明

## 一句话定义
Jina相关功能指FastGPT可支持的Jina重排模型与Jina提出的late chunking方法，用于优化知识库匹配效果。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该功能为社区建议新增的知识库优化功能，可通过配置接入第三方Jina重排模型以提升知识库匹配度，也可配置接入Jina提出的late chunking方法。

## 容易搞错的地方
需注意该功能的应用场景为知识库，配置前需确认当前FastGPT版本已支持对应功能。

> [FastGPT GitHub issue 1822](https://github.com/labring/FastGPT/issues/1822), [FastGPT GitHub issue 2853](https://github.com/labring/FastGPT/issues/2853)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
