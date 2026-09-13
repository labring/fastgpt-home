---
title: 解决FastGPT 4.9.7版本webm格式文件上传报错问题
slug: /zh/troubleshoot/fastgpt-497-webm-upload-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4761
source_type: GitHub issue
---

# 解决FastGPT 4.9.7版本webm格式文件上传报错问题

## 现象
FastGPT 4.9.7版本中，上传webm格式音频文件时出现报错。日志显示`WARNING:root:Uploaded file name: cmZe6eAUedCbDbxO.webm`，随后抛出`ERROR:root:400: Unsupported file format: .webm`，接口返回`500 Internal Server Error`。完整报错栈信息包含`fastapi.exceptions.HTTPException: 400: Unsupported file format: .webm`，请求路径为`POST /v1/audio/transcriptions`。

## 可能原因
当前仅能基于报错信息推断，可能为4.9.7版本中音频转录接口的允许格式白名单未包含`.webm`格式，具体需按实际部署环境的配置确认。

## 排查步骤
1.  查看服务日志，确认报错文本为`400: Unsupported file format: .webm`，且请求路径为`/v1/audio/transcriptions`。
2.  确认当前运行的FastGPT版本为4.9.7。
3.  查找音频转录功能对应的格式白名单配置（具体配置路径需按实际环境确认）。
4.  核对白名单列表中是否包含`.webm`格式。

## 解决与验证
若排查发现格式白名单未包含`.webm`，需将该格式添加至白名单配置中。重启FastGPT服务后，上传webm格式音频文件，验证是否不再抛出`Unsupported file format: .webm`报错，且接口可正常完成转录流程。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4761)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
