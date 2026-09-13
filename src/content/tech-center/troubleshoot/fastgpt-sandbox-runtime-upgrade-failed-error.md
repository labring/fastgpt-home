---
title: FastGPT sandbox模块runtimeUpgradeFailed错误码说明
slug: /zh/troubleshoot/fastgpt-sandbox-runtime-upgrade-failed-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/sandbox.ts
source_type: 官方文档
---

# FastGPT sandbox模块runtimeUpgradeFailed错误码说明

## 这个错误是什么
该错误属于FastGPT sandbox模块的预定义错误，枚举名为runtimeUpgradeFailed，对应的错误码为510002。错误的statusText为runtimeUpgradeFailed，默认HTTP状态码为403，错误提示文案的国际化键为common:code_error.sandbox_error.runtime_upgrade_failed，错误数据字段默认值为null，符合FastGPT全局错误码的定义格式。

## 什么情况下会触发
当尝试升级sandbox运行时环境的操作执行失败时，会触发该错误。该场景通常出现在sandbox运行环境升级流程中出现异常，导致升级无法正常完成的情况。

## 怎么定位（可照做的步骤）
1. 查看接口返回的错误信息，确认statusText字段值为runtimeUpgradeFailed，且错误码为510002；
2. 核对sandbox运行时升级相关的配置参数，确认配置符合系统要求；
3. 查看系统日志中sandbox模块的相关日志，提取升级操作的执行记录，定位失败的具体环节；
4. 匹配错误提示文案common:code_error.sandbox_error.runtime_upgrade_failed的实际展示内容，确认错误场景与当前问题一致。

## 处理与验证
处理该错误需先定位并修复导致升级失败的根因，例如调整配置参数、修复依赖问题等。修复完成后，重新发起sandbox运行时升级操作。验证环节可通过检查sandbox运行环境的状态，确认升级成功且不再返回该错误码，同时验证相关依赖功能是否正常运行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/sandbox.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
