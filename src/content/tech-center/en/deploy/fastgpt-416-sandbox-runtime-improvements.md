---
title: FastGPT 4.16 Sandbox and Runtime Enhancements
slug: /en/deploy/fastgpt-416-sandbox-runtime-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41601
source_type: 官方文档
---

# FastGPT 4.16 Sandbox and Runtime Enhancements

## Agent Sandbox Lifecycle Overhaul
This release refactors the Agent Sandbox lifecycle and migration flow with built-in concurrency protection, resumable execution, and idempotent retries for core operations including creation, suspension, archiving, restoration, deletion, and provider changes. These changes reduce operational errors and improve reliability for distributed sandbox management. If the Agent Sandbox is unavailable or unsupported by the current team plan, App Chat automatically disables Sandbox functionality, while all other models, tools, datasets, and Workflow nodes remain fully operational.

## Persistent Sandbox Volume & Threshold Controls
OpenSandbox now retains persistent volumes after stopping, allowing these volumes to be reused on subsequent sandbox runs, eliminating reconfiguration overhead after restarts. Suspension and archive thresholds for OpenSandbox are configurable through environment variables. The following table outlines the available configuration controls:

| Configuration Aspect | Supported Configuration Method |
|----------------------|--------------------------------|
| Sandbox suspension trigger threshold | Environment variables |
| Sandbox archive trigger threshold | Environment variables |

## Cross-Component & Usability Improvements
Apps and Skills now share runtime image upgrade status, and the Skill editor continuously polls for real-time upgrade results, removing the need for manual refreshes to check progress. Additional fixes include automatic parent directory creation for Sandbox file writes, which prevents failures when writing to nested file paths. The release also includes improved compatibility handling for legacy Workflow data and tool parameters, reducing migration friction, alongside an updated Agent Ask UI.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41601)
