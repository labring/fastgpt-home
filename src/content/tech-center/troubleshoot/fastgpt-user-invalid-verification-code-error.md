---
title: FastGPT user模块invalidVerificationCode错误码说明
slug: /zh/troubleshoot/fastgpt-user-invalid-verification-code-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts
source_type: 官方文档
---

# FastGPT user模块invalidVerificationCode错误码说明

## 这个错误是什么
该错误属于FastGPT user模块，枚举名为invalidVerificationCode，对应statusText为invalidVerificationCode，文案键为common:error.code_error，HTTP状态码为400，错误码数值为503004。错误信息为common:error.code_error对应的国际化文案内容。

## 什么情况下会触发
当用户提交的验证码无效时触发该错误，包括验证码已过期、输入的验证码与系统生成的不一致，或使用了已失效的验证码。

## 怎么定位（可照做的步骤）
1. 提取接口返回的错误信息，确认statusText为invalidVerificationCode，错误码为503004，HTTP状态码为400。
2. 核对提交的验证码与系统发送的验证码是否一致。
3. 检查验证码是否在有效期内。
4. 确认未使用已过期或已被使用的验证码。

## 处理与验证
处理该错误需重新获取有效的验证码，输入正确的验证码后重新提交请求。若多次尝试仍失败，检查请求参数是否符合要求。验证方式为重新提交正确的验证码，确认接口返回正常，无该错误信息。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
