---
title: 解决FastGPT私有部署版SD文生图base64格式显示异常问题
slug: /zh/troubleshoot/fastgpt-sd-base64-display-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2391
source_type: GitHub issue
---

# 解决FastGPT私有部署版SD文生图base64格式显示异常问题

## 现象
FastGPT 4.8.9私有部署版本中，使用SD文生图API返回的base64格式无法正常显示。该功能在4.8.5版本可正常使用。

## 可能原因
仅已知该问题出现在4.8.9私有部署版本，4.8.5版本无此异常。具体原因需结合版本更新细节确认。

## 排查步骤
1. 确认当前使用的FastGPT私有部署版本为4.8.9。
2. 确认调用SD文生图API的key可正常使用。
3. 对比4.8.5版本与当前版本的API返回结果差异。
4. 查看相关日志或返回内容，获取异常细节。

## 解决与验证
验证时可先部署4.8.5版本，确认SD文生图API返回的base64格式可正常显示。具体解决方法需结合4.8.9版本的更新细节排查接口处理逻辑。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2391)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
