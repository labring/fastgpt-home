---
title: 解决FastGPT中百度API密钥无效导致的请求失败问题
slug: /zh/troubleshoot/fastgpt-baidu-apikey-invalid
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1555
source_type: GitHub issue
---

# 解决FastGPT中百度API密钥无效导致的请求失败问题

## 现象
调用FastGPT相关接口时，返回固定报错信息：`do_request_failed get request url failed: invalid baidu apikey`，附带请求ID为2024052107184059575531380117531。

## 可能原因
仅存在明确提及的触发因素：配置的百度API密钥无效，无法通过对应服务的合法性验证。

## 排查步骤
1.  确认当前配置的百度API密钥的实际有效性。
2.  核对FastGPT配置项中填写的百度API密钥与实际可用密钥的内容是否完全一致。
3.  检查密钥是否存在过期、被撤销或权限配置异常的情况，需按实际环境确认。

## 解决与验证
1.  将FastGPT配置中的百度API密钥替换为有效且符合要求的密钥。
2.  重新执行触发报错的接口调用操作，确认报错信息不再出现，请求执行成功。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1555)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
