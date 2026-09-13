---
title: FastGPT team模块网站同步配额不足错误说明
slug: /zh/troubleshoot/fastgpt-team-website-sync-enough-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块网站同步配额不足错误说明

## 这个错误是什么
这个错误属于FastGPT团队（team）模块的标准化错误码，枚举名为websiteSyncNotEnough，对应的statusText为websiteSyncNotEnough，绑定的国际化文案键为common:code_error.team_error.website_sync_not_enough，用于标识团队在网站同步相关操作中出现资源不足的场景。

## 什么情况下会触发
当执行与团队网站同步相关的操作时，若当前团队的网站同步资源配额不足以支撑该操作，将触发该错误。此类操作包括但不限于网站内容同步、增量同步等依赖团队配额的网站同步任务。

## 怎么定位
1. 首先确认触发错误时执行的操作类型，是否为网站同步相关的任务；2. 查看系统返回的错误提示内容，确认提示信息包含websiteSyncNotEnough枚举名或对应国际化文案；3. 进入团队管理页面，核对网站同步相关的资源配额使用情况，确认当前可用额度是否不足以支撑当前操作。

## 处理与验证
处理该错误可通过两种方式：一是升级团队套餐，获取更多的网站同步资源配额；二是减少当前待执行的网站同步任务数量，等待配额恢复或适配现有额度。验证时，重新执行原触发错误的网站同步操作，确认错误提示不再出现，且任务能够正常执行完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
