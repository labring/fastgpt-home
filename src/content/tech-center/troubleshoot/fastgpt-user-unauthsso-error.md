---
title: FastGPT user模块unAuthSso错误码的详细说明
slug: /zh/troubleshoot/fastgpt-user-unauthsso-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts
source_type: 官方文档
---

# FastGPT user模块unAuthSso错误码的详细说明

## 这个错误是什么
该错误为FastGPT user模块下的unAuthSso错误，对应状态文本为unAuthSso，国际化文案键为user:sso_auth_failed。该错误的错误码数值为503003（由基础码503000加上对应索引3计算得出），未额外配置关联的HTTP状态码。

## 什么情况下会触发
该错误对应单点登录认证失败场景，具体触发条件需结合系统单点登录认证流程的失败逻辑判断。可通过国际化文案键user:sso_auth_failed的语义，确认该错误属于单点登录认证环节的异常结果。

## 怎么定位（可照做的步骤）
第一步，查看接口返回的错误响应内容，确认statusText字段值为unAuthSso，错误码字段值为503003；第二步，通过系统内置的国际化工具，查找文案键user:sso_auth_failed，获取对应的错误提示文本，进一步明确错误类型；第三步，定位到系统单点登录认证相关的业务代码或配置环节，排查认证流程中的异常点。

## 处理与验证
首先，修正单点登录认证环节的异常配置或无效的认证凭证；其次，重新发起单点登录认证请求，验证错误是否不再出现；最后，再次调用相关接口，确认返回的错误信息中不再包含unAuthSso状态文本与503003错误码，确保认证流程恢复正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
