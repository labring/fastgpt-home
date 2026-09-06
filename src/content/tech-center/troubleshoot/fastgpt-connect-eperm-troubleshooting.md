---
title: 解决FastGPT公有云环境输入文字触发connect EPERM报错的问题
slug: /zh/troubleshoot/fastgpt-connect-eperm-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/640
source_type: GitHub issue
---

# 解决FastGPT公有云环境输入文字触发connect EPERM报错的问题

## 现象
在FastGPT公有云网页版中，任何输入框输入文字时，均会得到connect EPERM提示。
## 可能原因
该报错与网络连接权限限制相关，具体原因需按实际使用环境确认。
## 排查步骤
1. 确认当前使用FastGPT公有云版本，且已使用自身可正常工作的密钥。
2. 尝试在所有输入框输入任意文字，复现报错触发场景。
3. 核对报错提示文本为connect EPERM，确认无其他额外报错信息。
## 解决与验证
可尝试重新加载页面后再次输入测试。若问题持续，需按实际使用环境排查相关配置。验证方式为输入文字后无connect EPERM提示，功能恢复正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/640)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
