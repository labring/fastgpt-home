---
title: FastGPT RAG API 文件上传支持相关说明
slug: /zh/glossary/rag-api-file-upload-support
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/2584
source_type: 官方文档
---

# FastGPT RAG API 文件上传支持相关说明

## 一句话定义
FastGPT 中的 RAG API 是用于检索增强生成的核心接口，主要用于对接各类api站的整合操作，是FastGPT实现检索增强生成相关功能的重要组成部分，可用于搭建自定义的api服务。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
根据相关内容，可通过拉取api站，将fastapi与其他api整合的方式对接RAG API。目前未提及该接口的具体参数、操作位置或标准调用流程，仅能通过整合api站的方式进行尝试。在该整合过程中，无法实现文件上传相关的支持功能，这是当前该接口的相关限制。

## 容易搞错的地方
部分使用者容易将fastapi与其他api的整合操作，等同于实现RAG API的文件上传支持功能。实际通过该方式整合后，无法达成文件上传支持的效果，需注意该限制，避免无效的整合尝试。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2584)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
