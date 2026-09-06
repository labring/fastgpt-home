---
title: FastGPT HTTP状态码报错排查与处理
slug: /zh/glossary/fastgpt-http-status-code-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/750
source_type: 官方文档
---

# FastGPT HTTP状态码报错排查与处理

## 一句话定义
HTTP状态码报错是FastGPT功能调用或接口请求时返回的异常响应状态码，常见于知识库操作与接口调用场景中。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤
该报错常见于FastGPT私有部署场景中，触发场景包括知识库手动录入内容、导入文件后点击确认，以及调用接口的过程中，常见报错状态码包括404 status code (no body)和400 bad response status code。

## 容易搞错的地方
私有部署版本的ubuntu docker部署环境中易触发该报错；未确认使用的key可正常使用；未排查返回的状态码异常，需结合具体报错状态码定位问题。

> [FastGPT GitHub issue 750](https://github.com/labring/FastGPT/issues/750), [FastGPT GitHub issue 1400](https://github.com/labring/FastGPT/issues/1400)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
