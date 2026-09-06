---
title: FastGPT team模块userNotActive错误码说明
slug: /zh/troubleshoot/fastgpt-team-user-active-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块userNotActive错误码说明

## 这个错误是什么
该错误属于FastGPT team模块的标准错误枚举，枚举名为userNotActive，对应statusText为userNotActive，错误文案通过国际化文案键common:code_error.team_error.user_not_active加载，用于标识团队相关操作中涉及未激活用户的异常场景。

## 什么情况下会触发
该错误触发于FastGPT团队模块的各类操作场景，当操作涉及的目标用户未完成账号激活流程时，相关操作会触发此错误。涉及的操作包括团队成员权限校验、团队邀请流程、团队成员信息修改等团队相关操作。

## 怎么定位
1. 提取接口返回的statusText字段，确认其值为userNotActive；
2. 结合接口所属模块，确认当前操作属于team模块范畴；
3. 核对操作涉及的用户账号的激活状态，确认用户是否未完成账号激活流程。

## 处理与验证
处理该错误需先完成目标用户的账号激活流程，激活完成后重新执行触发错误的操作。验证时可再次发起原操作，确认接口不再返回该错误，业务流程可正常推进。同时可通过查看接口返回的错误文案，确认错误提示与userNotActive枚举项对应。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
