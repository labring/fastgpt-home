---
title: FastGPT app模块invalidOwner错误码的说明与处理方法
slug: /zh/troubleshoot/fastgpt-app-invalidowner-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/app.ts
source_type: 官方文档
---

# FastGPT app模块invalidOwner错误码的说明与处理方法

## 这个错误是什么
该错误属于FastGPT的app模块，枚举名为invalidOwner，状态文本为invalidOwner，错误码为502002，对应国际化文案键为common:code_error.app_error.invalid_owner，用于标识操作权限与应用归属不匹配的场景。

## 什么情况下会触发
该错误触发于应用管理类操作中，具体为当操作仅允许应用所有者执行，而当前操作账号未被授权为该应用的合法所有者时，会触发该错误。

## 怎么定位
首先查看接口返回的错误信息，确认statusText字段的值为invalidOwner；其次核对错误码，该错误对应的错误码为502002；最后排查当前操作账号与目标应用的归属关系，确认账号并非该应用的合法所有者。

## 处理与验证
处理环节需切换至该应用的合法所有者账号执行对应操作，或由应用所有者完成操作权限的授权。验证环节使用合法所有者账号重新执行目标操作，确认错误不再出现，操作流程正常完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/app.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
