---
title: FastGPT team模块unPermission错误码的详细说明
slug: /zh/troubleshoot/fastgpt-team-unpermission-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块unPermission错误码的详细说明

## 这个错误是什么
该错误属于FastGPT team模块的错误枚举类型，枚举名为unPermission，对应statusText为unPermission，国际化文案键为common:error_un_permission，用于标识团队场景下的权限校验失败问题。

## 什么情况下会触发
该错误触发于团队模块下的权限校验失败场景，当执行的团队相关操作未获得对应权限时，会抛出该错误。

## 怎么定位
定位该错误可按以下步骤操作：1. 查看接口返回的statusText字段，确认其值为unPermission；2. 核对当前操作关联的团队信息，确认操作对象属于当前账号有权限访问的团队范围；3. 结合国际化文案键common:error_un_permission，确认错误类型为团队权限相关的校验失败，排除其他团队模块错误的可能。

## 处理与验证
处理该错误需先调整对应团队的权限配置，为当前执行操作的账号授予目标操作所需的权限。权限配置完成后，重新执行目标操作，若接口返回的statusText不再为unPermission，且操作成功完成，则验证该错误已解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
