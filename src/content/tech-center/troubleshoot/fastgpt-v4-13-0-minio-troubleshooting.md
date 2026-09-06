---
title: FastGPT v4.13.0版本MinIO存储配置相关问题排查
slug: /zh/troubleshoot/fastgpt-v4-13-0-minio-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5942
source_type: GitHub issue
---

# FastGPT v4.13.0版本MinIO存储配置相关问题排查

## 现象
用户在FastGPT v4.13.0私有部署版本升级过程中，使用MinIO作为存储服务，提出是否可以不替换为S3，同时查看v4.13.0-fix代码库的yaml配置文件，发现其中仍保留MinIO相关配置，未明确说明存储配置的替换要求。

## 可能原因
当前版本升级后，存储配置的适配性存在疑问，且代码库配置未明确说明MinIO是否可直接替代S3使用，导致用户对存储配置的沿用存在困惑。

## 排查步骤
1. 确认当前FastGPT部署版本为v4.13.0私有部署版本。
2. 访问v4.13.0-fix代码库，查看其中的yaml配置文件，确认存储相关配置是否仍使用MinIO。
3. 核对当前实际使用的存储配置参数与代码库中的MinIO配置参数是否一致。
4. 需按实际环境确认存储配置的兼容性，排查是否存在配置不匹配的情况。

## 解决与验证
若v4.13.0-fix代码库的yaml配置仍保留MinIO相关配置，可尝试沿用当前MinIO存储配置，无需替换为S3。启动FastGPT服务后，验证文件上传、存储读取等相关功能是否正常可用。若出现存储相关异常，需按实际环境调整配置参数。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5942)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
