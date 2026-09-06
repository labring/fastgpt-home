---
title: FastGPT team模块sandboxNotSupport错误码说明
slug: /zh/troubleshoot/fastgpt-team-sandbox-support-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块sandboxNotSupport错误码说明

## 这个错误是什么
该错误是FastGPT team模块下的标准化错误项，枚举名为sandboxNotSupport，对应statusText为sandboxNotSupport，关联的国际化文案键为common:code_error.team_error.sandbox_not_support。该错误用于标识与团队沙箱功能支持相关的异常情况，属于FastGPT全局错误码体系的组成部分，用于统一团队层面沙箱相关异常的错误返回格式。

## 什么情况下会触发
该错误的触发场景与团队沙箱功能的使用权限、配置状态直接相关。当执行涉及团队沙箱功能的操作时，若当前团队无法满足沙箱功能的启用条件或权限要求，将返回该错误。具体触发逻辑需结合系统沙箱配置规则与团队资源权限体系进行判断。

## 怎么定位
1. 提取错误返回的statusText字段，确认其值为sandboxNotSupport，完成错误类型的初步识别；
2. 回溯触发错误的完整操作流程，定位涉及团队沙箱功能调用或配置的具体环节；
3. 查看系统生成的错误日志与上下文信息，获取当前团队的配置状态、权限设置等关联数据，辅助缩小排查范围。

## 处理与验证
1. 核对当前团队的沙箱功能启用配置，确认是否符合系统支持的范围与要求；
2. 调整团队的权限设置或资源配置，使其满足沙箱功能的使用条件；
3. 重新执行触发错误的操作，验证错误是否不再返回，确认问题已解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
