---
title: 解决FastGPT HTTP请求返回非200时缺少错误明细的问题
slug: /zh/troubleshoot/fastgpt-http-non200-error-body
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5679
source_type: GitHub issue
---

# 解决FastGPT HTTP请求返回非200时缺少错误明细的问题

## 现象
当FastGPT发起HTTP请求调用外部API时，若API返回非200状态码，系统展示的报错信息仅包含错误状态码，未包含API返回的JSON格式错误明细内容。例如报错仅显示类似"请求失败，状态码：xxx"的内容，无法看到API返回的具体错误描述。

## 可能原因
当前FastGPT处理HTTP请求返回非200状态码的异常时，未将API返回的JSON格式错误明细纳入报错信息的展示范围。

## 排查步骤
1. 复现HTTP请求调用外部API并触发非200状态码返回的场景。
2. 查看系统返回的报错信息，确认是否仅显示错误状态码，未包含API返回的JSON格式错误明细。

## 解决与验证
解决方法为调整FastGPT的HTTP请求异常处理逻辑，将API返回的JSON格式错误明细添加至报错信息中。验证流程为：1. 重新发起HTTP请求调用外部API，使其返回非200状态码。2. 查看系统返回的报错信息，确认已同时展示错误状态码与API返回的JSON格式错误明细内容。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5679)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
