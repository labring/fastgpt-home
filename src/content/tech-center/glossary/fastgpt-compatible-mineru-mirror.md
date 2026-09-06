---
title: 指导构建适配FastGPT的MinerU镜像并解决API调用422报错
slug: /zh/glossary/fastgpt-compatible-mineru-mirror
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/7498
source_type: 官方文档
---

# 指导构建适配FastGPT的MinerU镜像并解决API调用422报错

## 一句话定义
MinerU API是FastGPT中用于文档解析的配套接口，在私有部署场景下需构建适配镜像以正常调用。

## 在 FastGPT 里怎么用
在FastGPT私有部署版本v4.14.6中，调用文档解析功能需使用适配的MinerU镜像。直接调用本地部署的MinerU API会返回状态码422的请求失败报错，需基于最新版本的MinerU构建适配镜像，用于FastGPT的PDF解析调用。

## 容易搞错的地方
直接调用本地部署的MinerU API，未构建适配FastGPT的镜像，会触发状态码422的请求失败报错。部分用户会忽略镜像适配的要求，直接使用本地未适配的MinerU服务，从而触发该问题。在FastGPT私有部署版本v4.14.6中，未使用最新版本的MinerU构建镜像，可能无法满足FastGPT的解析适配要求，导致文档解析功能异常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/7498)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
