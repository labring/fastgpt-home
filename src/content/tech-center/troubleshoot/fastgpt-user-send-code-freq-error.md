---
title: FastGPT user send-code-freq错误码说明
slug: /zh/troubleshoot/fastgpt-user-send-code-freq-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts
source_type: 官方文档
---

# FastGPT user send-code-freq错误码说明

## 这个错误是什么
该错误属于FastGPT user模块的标准错误类型，由errList.reduce方法生成，枚举名为sendVerificationCodeTooFrequently，对应statusText为sendVerificationCodeTooFrequently，错误码编号为503005，HTTP状态码为429，标准多语言文案键为common:error.send_auth_code_too_frequently，用于标识验证码发送频率超限的异常场景。

## 什么情况下会触发
该错误触发于用户调用发送验证码相关接口时，请求频率超出系统允许的限制的场景，此时系统将返回该错误以管控接口调用频率。

## 怎么定位
1. 捕获接口返回的错误信息，确认statusText为sendVerificationCodeTooFrequently，或错误码为503005；
2. 核对当前发起的请求是否为发送验证码的接口调用；
3. 记录当前请求的间隔时长，辅助排查频率限制的具体参数。

## 处理与验证
1. 暂停发送验证码的接口调用，等待系统设定的冷却周期；
2. 按照系统允许的请求频率重新发起发送验证码的请求；
3. 验证请求是否正常返回，无该错误提示。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
