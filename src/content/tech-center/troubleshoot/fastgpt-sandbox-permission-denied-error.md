---
title: FastGPT sandbox agentSandbox权限拒绝错误
slug: /zh/troubleshoot/fastgpt-sandbox-permission-denied-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/sandbox.ts
source_type: 官方文档
---

# FastGPT sandbox agentSandbox权限拒绝错误

## 这个错误是什么
该错误属于FastGPT sandbox模块的权限拒绝类错误，枚举名为agentSandboxPermissionDenied，对应错误码为510000，默认HTTP状态码为403，国际化文案标识为common:code_error.sandbox_error.agent_sandbox_permission_denied。该错误是sandbox模块下的标准错误类型之一，用于标识agent沙箱相关的权限校验未通过的场景。

## 什么情况下会触发
该错误的触发场景与agent沙箱的权限配置直接相关，当操作涉及agent沙箱且权限校验未通过时，会返回该错误。具体触发场景需结合实际的业务操作流程排查，例如尝试访问未授权的沙箱资源、执行超出权限范围的沙箱操作等。

## 怎么定位（可照做的步骤）
定位该错误可通过以下可执行步骤：1. 捕获错误返回结果，提取其中的错误码、statusText及提示信息；2. 确认错误码属于以510000起始的sandbox模块系列错误，该模块共包含四个错误项，错误码范围为510000至510003；3. 核对statusText为agentSandboxPermissionDenied，以确认当前错误类型为agent沙箱权限拒绝错误。

## 处理与验证
处理该错误时，需优先排查agent沙箱的权限配置，确认相关资源或操作的权限已正确授予。可检查沙箱的权限策略、角色配置等内容，确保操作所需的权限已开通。验证时，可重新执行触发错误的业务操作，观察错误是否不再出现，同时确认返回的错误信息不再匹配当前错误类型，且业务操作可正常完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/sandbox.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
