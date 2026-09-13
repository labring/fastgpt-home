---
title: FastGPT本地部署后分享与API访问合规性排查指南
slug: /zh/troubleshoot/fastgpt-private-deployment-compliance-check
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5845
source_type: GitHub issue
---

# FastGPT本地部署后分享与API访问合规性排查指南

## 现象
FastGPT 4.8.13私有部署版本中，出现本地部署后免登录窗口分享多人、API访问的license合规性相关疑问，附带未显示具体内容的报错截图。

## 可能原因
未明确FastGPT私有部署版本的license使用范围，包括免登录分享的人数限制、API访问的调用规模限制。

## 排查步骤
1. 确认当前FastGPT私有部署的版本为4.8.13。
2. 查阅FastGPT官方文档中关于私有部署license的相关条款。
3. 核对本地部署的使用场景，包括免登录分享的使用方式、API访问的调用规模。
4. 联系项目维护方确认license使用的具体限制。

## 解决与验证
若官方文档明确了license使用范围，按照文档要求调整使用场景。若文档未明确相关限制，需联系项目维护方获取准确信息。验证方式为确认使用场景符合license条款后，正常开展业务。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5845)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
