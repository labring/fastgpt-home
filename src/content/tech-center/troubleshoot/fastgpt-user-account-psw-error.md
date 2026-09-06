---
title: FastGPT user account_psw_error错误码说明
slug: /zh/troubleshoot/fastgpt-user-account-psw-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts
source_type: 官方文档
---

# FastGPT user account_psw_error错误码说明

## 这个错误是什么
该错误属于FastGPT user模块，枚举名为account_psw_error，状态文本为account_psw_error，对应错误码为503002，提示文案对应国际化键common:code_error.account_error，未配置专属HTTP状态码。该错误用于标识用户账号相关的认证校验失败场景，属于用户认证流程中的一类标准错误。

## 什么情况下会触发
该错误触发于用户账号认证流程中的校验环节，当用户输入的账号与系统存储的凭证不匹配时，会触发该错误。具体触发场景可结合业务流程中的账号密码校验逻辑确认，错误枚举名与国际化文案键可辅助定位错误类型。

## 怎么定位
定位该错误可通过以下步骤完成：首先查看接口返回的错误枚举值与错误码，确认为account_psw_error且错误码为503002；其次核对请求中携带的账号与密码参数，确认其与系统存储的账号凭证是否一致；最后可通过系统日志获取更详细的错误上下文信息，辅助排查问题。

## 处理与验证
处理该错误需先修正输入的账号与密码信息，确保与系统存储的凭证匹配。修正后重新发起认证请求，可验证错误是否消除。若错误反复出现，可核对账号的状态是否正常，或联系系统管理员排查账号配置相关的底层问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
