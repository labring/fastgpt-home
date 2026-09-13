---
title: 解决FastGPT调用API时base64格式图片超1MB报错问题
slug: /zh/troubleshoot/fastgpt-api-base64-body-limit-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1241
source_type: GitHub issue
---

# 解决FastGPT调用API时base64格式图片超1MB报错问题

## 现象
调用FastGPT应用API接口时，传输大于1MB的base64格式图片，返回报错文本“Body exceeded 1mb limit”。

## 可能原因
该报错由请求体大小限制触发。当传入的base64图片数据总大小超过系统预设的请求体最大允许阈值时，触发该限制报错。

## 排查步骤
1. 确认请求中传输的base64图片实际大小是否超过1MB。
2. 检查FastGPT部署环境中的请求体大小配置项，需按实际环境确认具体配置位置与参数。
3. 确认自身API密钥及基础API调用链路可正常使用。

## 解决与验证
调整部署环境中的请求体大小限制配置，将阈值设置为大于实际传输的base64图片总大小。配置完成后，重新发起包含对应base64图片的API请求，确认不再返回“Body exceeded 1mb limit”报错，且请求正常完成并返回预期结果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1241)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
