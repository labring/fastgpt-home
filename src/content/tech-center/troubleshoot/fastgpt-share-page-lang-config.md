---
title: FastGPT分享页面语言配置功能失效的排错指南
slug: /zh/troubleshoot/fastgpt-share-page-lang-config
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3526
source_type: GitHub issue
---

# FastGPT分享页面语言配置功能失效的排错指南

## 现象
FastGPT 4.6.7左右版本支持通过路径或Query参数配置分享页面语言，例如`https://xx.com/en/chat/share?shareId=xxx`或`https://xx.com/chat/share?shareId=xxx&lang=en`。最新版FastGPT中，该语言配置功能失效，分享页面无法通过上述格式的链接指定页面语言。

## 可能原因
暂无可公开的官方说明，需结合实际部署环境与版本更新日志确认。

## 排查步骤
1. 确认当前使用的FastGPT版本，对比4.6.7左右版本的功能差异。
2. 检查分享页面的访问链接是否符合`https://域名/en/chat/share?shareId=xxx`或`https://域名/chat/share?shareId=xxx&lang=en`的格式。
3. 查看浏览器控制台，确认是否存在与语言参数加载相关的报错信息。

## 解决与验证
当前暂无公开的官方修复方案。验证方式为：使用符合要求的链接访问分享页面，确认页面语言是否与指定参数匹配。若需适配iframe嵌入官网的场景，可通过官网语言状态同步调整分享页面的语言配置。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3526)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
