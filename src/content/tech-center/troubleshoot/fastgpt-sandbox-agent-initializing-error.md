---
title: FastGPT sandbox模块agentSandboxInitializing错误码详细说明
slug: /zh/troubleshoot/fastgpt-sandbox-agent-initializing-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/sandbox.ts
source_type: 官方文档
---

# FastGPT sandbox模块agentSandboxInitializing错误码详细说明

## 这个错误是什么
agentSandboxInitializing是FastGPT sandbox模块下的错误码，对应错误码值为510001，HTTP状态码为409，错误提示文案的国际化键为common:code_error.sandbox_error.agent_sandbox_initializing。该错误用于标识代理沙箱处于初始化流程中的异常交互场景。

## 什么情况下会触发
该错误会在尝试与尚未完成初始化的代理沙箱进行交互时触发。当代理沙箱正处于初始化流程时，其尚未就绪以处理各类业务请求，此时发起的相关操作会触发该错误。该错误的statusText字段值固定为agentSandboxInitializing。

## 怎么定位（可照做的步骤）
1. 提取错误信息中的statusText字段，确认其值为agentSandboxInitializing，同时核对错误码为510001、HTTP状态码为409，以此确认对应此错误。
2. 查看系统日志中sandbox模块的相关日志，检索代理沙箱初始化的执行记录，确认当前沙箱的初始化状态。
3. 排查初始化流程的执行日志，确认是否存在初始化卡住、中断等异常情况，定位触发错误的具体原因。

## 处理与验证
处理该错误需等待代理沙箱初始化完成后，再发起相关交互请求。验证时可重新发起原业务请求，确认错误提示不再出现，且代理沙箱可正常处理对应业务。需注意，该错误的HTTP状态码为409，属于请求冲突类状态码，重复发起未等待初始化完成的请求无法解决问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/sandbox.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
