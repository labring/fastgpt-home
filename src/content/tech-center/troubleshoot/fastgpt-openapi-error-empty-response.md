---
title: FastGPT 模型错误后空响应：工作流异常分支与 API 核对
slug: /zh/troubleshoot/fastgpt-openapi-error-empty-response
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3838
source_type: GitHub issue
---

# FastGPT 模型错误后空响应：工作流异常分支与 API 核对

## 适用场景与历史记录

原议题描述大模型组件报错后对外返回空内容，希望能够捕获异常；后续评论涉及 OpenAPI 调用。 原始讨论提交于 2025-02-20，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者当时表示已列入计划。现有代码包含 AI 节点错误输出与异常分支；工作流错误处理和对外 HTTP 响应格式应分别验证。

## 排查与复测

1. 在隔离测试应用中制造一次明确的上游失败，记录原始错误与请求 ID。
2. 检查支持该能力的节点异常分支，连接用于用户反馈或后续处理的节点。
3. 同时核对工作流日志、HTTP 状态和 API 错误体，分别回归流式和非流式调用。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：大模型组件返回错误的情况下，直接返回为空，希望可以有异常捕获的机制，做优化处理](https://github.com/labring/FastGPT/issues/3838)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/3838#issuecomment-2670328474)

> 来源: [FastGPT 异常分支界面实现](https://github.com/labring/FastGPT/blob/main/projects/app/src/pageComponents/app/detail/WorkflowComponents/Flow/nodes/render/RenderOutput/CatchError.tsx)

> 来源: [FastGPT AI 对话节点与错误输出定义](https://github.com/labring/FastGPT/blob/main/packages/global/core/workflow/template/system/aiChat/index.ts)
