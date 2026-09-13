---
title: FastGPT user模块verifyCodeTooFrequently错误码详细说明
slug: /zh/troubleshoot/fastgpt-user-verify-code-too-frequently-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts
source_type: 官方文档
---

# FastGPT user模块verifyCodeTooFrequently错误码详细说明

## 这个错误是什么
该错误属于FastGPT user模块的错误枚举verifyCodeTooFrequently，对应状态文本为verifyCodeTooFrequently，错误提示关联的文案键为common:error.verify_code_too_frequently，HTTP状态码为429，错误码数值为503006。该错误用于标识验证码相关操作触发频率超限的场景。

## 什么情况下会触发
当短时间内多次提交验证码验证请求，或多次尝试使用错误的验证码进行验证时，会触发该错误。

## 怎么定位
1. 查看接口返回的statusText字段，确认是否为verifyCodeTooFrequently；
2. 核对错误码数值，确认是否为503006；
3. 检查当前请求的接口路径，确认属于用户验证码验证相关的接口；
4. 统计短时间内的请求次数，判断是否超出频率限制规则。

## 处理与验证
1. 暂停当前的验证码验证操作，等待一段时间后再尝试发起请求；
2. 检查是否存在重复提交的请求，避免重复触发频率限制；
3. 重新获取合法的验证码后，再次发起验证请求。
在等待限制时间过后，重新发起符合频率要求的验证请求，可验证该错误是否已不再出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
