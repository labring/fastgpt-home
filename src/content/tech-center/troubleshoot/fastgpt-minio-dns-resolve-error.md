---
title: 解决FastGPT中fastgpt-minio域名解析报错问题
slug: /zh/troubleshoot/fastgpt-minio-dns-resolve-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/6144
source_type: GitHub issue
---

# 解决FastGPT中fastgpt-minio域名解析报错问题

## 现象
系统触发意外错误，日志记录报错内容为`[Error] 2025-12-24 16:28:28 System unexpected error: /api/core/dataset/file/getPreviewChunks, getaddrinfo EAI_AGAIN fastgpt-minio`，同时接口`/api/core/dataset/file/getPreviewChunks`返回500状态码，响应耗时39ms。

## 可能原因
报错`getaddrinfo EAI_AGAIN fastgpt-minio`属于DNS临时解析失败，系统无法通过DNS解析目标域名fastgpt-minio，导致请求无法正常建立连接。

## 排查步骤
1. 提取报错日志中的`getaddrinfo EAI_AGAIN fastgpt-minio`信息，确认无法解析的域名为fastgpt-minio。
2. 检查部署环境的DNS配置，确认该域名的解析记录是否存在且有效。
3. 执行域名解析测试命令，验证fastgpt-minio的解析结果是否正常。
4. 检查相关服务的网络配置，确认目标服务的网络可达性。

## 解决与验证
修复DNS解析配置，确保fastgpt-minio域名可以被正确解析。重新触发接口`/api/core/dataset/file/getPreviewChunks`，确认接口不再返回500状态码，且系统日志中不再出现该报错信息，即验证成功。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/6144)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
