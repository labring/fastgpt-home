---
title: 解决FastGPT私有部署版Azure OpenAI Whisper自定义header配置问题
slug: /zh/troubleshoot/fastgpt-azure-whisper-custom-header
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4011
source_type: GitHub issue
---

# 解决FastGPT私有部署版Azure OpenAI Whisper自定义header配置问题

## 现象
私有部署版本V4.8.22的FastGPT中，配置Azure OpenAI的Whisper模型时，无法自定义请求头。Azure OpenAI认证的请求头key为api-key，FastGPT默认的自定义请求头key为Authorization，无法使用该配置。

## 可能原因
FastGPT当前版本的自定义请求头配置仅支持默认的Authorization key，未适配Azure OpenAI要求的api-key头字段，导致无法完成认证。

## 排查步骤
1. 确认使用的FastGPT版本为V4.8.22私有部署版。
2. 检查Azure OpenAI Whisper模型的认证请求头要求，确认需使用api-key作为头字段。
3. 查看FastGPT的自定义请求头配置项，确认默认仅支持Authorization头字段。

## 解决与验证
当前可通过等待FastGPT版本更新支持自定义header功能实现需求。如需临时适配，需按实际环境修改FastGPT源码中的请求头配置逻辑，添加对api-key头字段的支持。验证时，配置正确的api-key头字段并发起请求，确认可正常完成认证。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4011)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
