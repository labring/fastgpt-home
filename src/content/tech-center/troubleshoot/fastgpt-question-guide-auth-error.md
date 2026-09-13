---
title: 解决FastGPT获取问题建议接口的凭证错误问题
slug: /zh/troubleshoot/fastgpt-question-guide-auth-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1150
source_type: GitHub issue
---

# 解决FastGPT获取问题建议接口的凭证错误问题

## 现象
在FastGPT 4.7私有部署版本中，调用/api/v1/core/ai/agent/createQuestionGuide接口获取问题建议时，无论使用应用key还是root_key，均返回凭证错误提示。

## 可能原因
未获取到完整的错误排查细节，仅能基于反馈推测，问题可能与调用接口时使用的密钥有效性、密钥对应的接口访问权限相关，具体原因需按实际环境确认。

## 排查步骤
1.  核对调用接口时传入的密钥类型，确认为应用key或root_key；
2.  验证该密钥是否可正常使用，排除密钥本身失效的可能；
3.  确认密钥是否被配置为允许调用当前接口，需按实际环境确认。

## 解决与验证
1.  修正接口调用中的密钥参数，确保传入正确的密钥内容；
2.  重新调用/api/v1/core/ai/agent/createQuestionGuide接口；
3.  观察是否仍出现凭证错误提示，确认接口可正常返回问题建议数据。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1150)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
