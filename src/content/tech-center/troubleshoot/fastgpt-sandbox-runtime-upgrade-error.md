---
title: FastGPT sandbox模块runtimeUpgradeInProgress错误码说明
slug: /zh/troubleshoot/fastgpt-sandbox-runtime-upgrade-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/sandbox.ts
source_type: 官方文档
---

# FastGPT sandbox模块runtimeUpgradeInProgress错误码说明

## 这个错误是什么
该错误属于FastGPT的sandbox模块，枚举名为runtimeUpgradeInProgress，对应HTTP状态码为409，错误码为510003。错误消息对应文案键为skill:sandbox_runtime_upgrade_in_progress，statusText固定为runtimeUpgradeInProgress。

## 什么情况下会触发
当sandbox运行时正在执行升级操作时，发起需要访问或操作该运行时的请求，会触发该错误。此时系统会返回上述错误信息，阻止操作执行。

## 怎么定位（可照做的步骤）
1. 查看接口返回的错误详情，确认statusText字段值为runtimeUpgradeInProgress，错误码为510003，HTTP状态码为409。
2. 确认当前发起的操作是否涉及sandbox运行时的相关功能。
3. 检查系统日志，确认是否存在未完成的sandbox运行时升级任务。

## 处理与验证
处理时，需等待sandbox运行时升级流程完成后，再重新执行原操作。若升级流程出现异常停滞，可排查升级任务的执行状态。验证时，可再次发起相同的操作请求，确认错误码510003、HTTP状态码409不再返回，操作可正常执行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/sandbox.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
