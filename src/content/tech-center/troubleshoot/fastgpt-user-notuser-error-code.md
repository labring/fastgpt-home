---
title: FastGPT user模块notUser错误码说明
slug: /zh/troubleshoot/fastgpt-user-notuser-error-code
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts
source_type: 官方文档
---

# FastGPT user模块notUser错误码说明

## 这个错误是什么
该错误属于FastGPT user模块的notUser错误，对应错误码为503000，状态文本为notUser，国际化文案键为common:code_error.account_not_found，标准报错信息为账号未找到。

## 什么情况下会触发
当用户执行需要校验账号存在性的操作，且使用的账号未在系统中完成注册时，会触发该错误。

## 怎么定位（可照做的步骤）
1. 核对当前操作中使用的账号是否已在系统中完成注册；
2. 检查输入的账号信息是否存在拼写错误、格式错误或多余字符；
3. 查看系统返回的报错信息，确认状态文本为notUser且错误码为503000。

## 处理与验证
处理该错误时，若账号未注册，可前往注册页面完成账号注册；若账号已注册，重新输入正确的账号信息后重试原操作。若多次重试仍触发该错误，可联系系统管理员排查账号状态。完成上述操作后重新执行原流程，若不再返回该报错信息，则处理生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
