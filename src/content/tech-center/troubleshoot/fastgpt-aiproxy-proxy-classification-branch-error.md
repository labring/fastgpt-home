---
title: 解决FastGPT使用aiproxy.io代理时的问题分类分支异常问题
slug: /zh/troubleshoot/fastgpt-aiproxy-proxy-classification-branch-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/593
source_type: GitHub issue
---

# 解决FastGPT使用aiproxy.io代理时的问题分类分支异常问题

## 现象
1. 使用openai官方代理或自建代理时，FastGPT的相关功能可正常使用；
2. 使用aiproxy.io代理时，使用问题分类功能，默认会走最底部的一个分支。

## 可能原因
具体原因未明确，仅推测与代理服务的配置或接口响应逻辑相关，需结合实际代理服务的返回参数确认。

## 排查步骤
1. 确认当前使用的代理服务为aiproxy.io，对比openai官方代理或自建代理的使用场景，复现问题分类分支异常现象。
2. 采集代理服务的请求与响应日志，记录相关参数。
3. 检查代理服务的接口返回参数，需按实际环境确认具体校验规则。

## 解决与验证
根据排查步骤获取的日志与参数，调整代理服务的配置或响应逻辑，使问题分类功能的分支选择符合预期。验证方式为：使用aiproxy.io代理调用问题分类功能，确认分支选择匹配实际需求。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/593)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
