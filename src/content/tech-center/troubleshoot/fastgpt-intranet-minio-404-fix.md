---
title: 解决FastGPT内网部署MinIO文件访问404错误的问题
slug: /zh/troubleshoot/fastgpt-intranet-minio-404-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5944
source_type: GitHub issue
---

# 解决FastGPT内网部署MinIO文件访问404错误的问题

## 现象
FastGPT 4.14.2私有部署版本在内网环境中部署时，配置S3_ENDPOINT可正常访问MinIO存储服务，但当使用S3_EXTERNAL_BASE_URL配置项时，上传至MinIO的文件无法在工作流中正常打开，浏览器返回404错误。

## 可能原因
核心问题为代码中`s3ChatSource.createGetChatFileURL`方法的调用参数配置不符合当前内网访问环境。当S3_EXTERNAL_BASE_URL无法被FastGPT服务直接访问时，该方法的external参数应设置为false，以生成可通过内网访问的文件URL。

## 排查步骤
1. 确认FastGPT部署所在的内网环境是否无法直接访问S3_EXTERNAL_BASE_URL配置的地址。
2. 定位到代码中`s3ChatSource.createGetChatFileURL`方法的调用位置，核对其external参数的当前取值。
3. 核对当前配置的S3_EXTERNAL_BASE_URL是否符合内网访问的网络规则，确认该地址是否可被FastGPT服务所在环境访问。

## 解决与验证
将`s3ChatSource.createGetChatFileURL`方法的调用参数external设置为false，重启FastGPT服务。上传测试文件至MinIO，在工作流中尝试打开该文件，确认404错误不再出现，即可验证问题解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5944)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
