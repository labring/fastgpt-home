---
title: Unified Agent and Tool Call Execution for FastGPT
slug: /en/deploy/fastgpt-agent-loop-refactor
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152
source_type: 官方文档
---

# Unified Agent and Tool Call Execution for FastGPT

## Core Execution Unification
Prior to this 4.15.2 update, FastGPT’s Workflow Agent and ToolCall features utilized separate execution cores. The refactor unifies both systems under a single Agent Loop execution core. ToolCall functionality disables plan and ask capabilities, while retaining full access to shared loop execution logic, context handling workflows, tool event pipelines, interactive recovery processes, and standard billing rules as the Workflow Agent. This consolidation removes redundant code paths and ensures consistent behavior across both agent types.

## Standardized Interfaces and Event Lifecycles
The Provider interface for both `fastAgent` and `piAgent` has been fully standardized. The `AGENT_ENGINE` environment variable enables selection of the desired execution engine, and both providers now follow identical input, runtime, and result contracts to simplify integration and maintenance. Additionally, the event lifecycle for all core agent operations — including plan, ask, sandbox interactions, file reading, Dataset search, and runtime tools — has been unified. This standardization ensures consistent delivery of SSE events, execution details, and error handling across every agent workflow.
| Parameter | Description |
|-----------|-------------|
| AGENT_ENGINE | Environment variable for selecting the execution engine for fastAgent and piAgent providers |

## Unified State and Usage Tracking
The refactor consolidates the generation and persistence of several critical state objects: `assistantResponses`, node responses, Provider state, and context-compression checkpoints. Legacy execution paths contained duplicate adapters, which have now been removed to reduce technical overhead. Usage collection for model calls, context compression, and tool execution has also been unified, eliminating the risk of duplicate billing or incorrect usage aggregation to ensure accurate resource tracking.

## Enhanced Tool Scheduling
Tool scheduling logic has been improved to balance parallel execution and ordered response handling. Safe, non-stateful tools can now run in parallel to improve throughput, while all tool responses are written back in the exact order of the original model calls to maintain data consistency. Stateful tools such as plan and ask continue to execute sequentially, preventing race conditions and preserving the integrity of stateful workflow operations.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152)
