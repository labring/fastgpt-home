---
title: FastGPT Agent V2 VM Session Isolation and Lifecycle
slug: /en/tutorial/fastgpt-agentv2-vm-session-lifecycle
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/agentv2/vm
source_type: Official documentation
---

# FastGPT Agent V2 VM Session Isolation and Lifecycle

## Session-Level Isolation
FastGPT Agent V2 virtual machine instances are tightly coupled to individual user chat sessions. Every execution environment is fully isolated across distinct users and separate sessions. No shared resources, state, or data are exposed between distinct containers; each session’s code execution, context storage, and operational state remain confined exclusively to its assigned virtual machine. This strict isolation eliminates cross-session interference and prevents unintended access to sensitive session-specific data, ensuring secure and predictable operation for each user interaction.

## Container Lifecycle Management
A keepalive mechanism is implemented to sustain active containers during ongoing user interactions. This system ensures that containers remain running and available for continued chat sessions as long as user activity is detected. When a session remains idle for a period exceeding the configured timeout threshold, the associated container is automatically collected and destroyed. This automated cleanup process releases host machine resources for other active sessions, optimizing overall platform resource utilization without manual oversight.

## Configurable Idle Timeout Settings
The idle timeout period is fully configurable to align with specific operational requirements. The default configuration sets the timeout to a few minutes, providing a balanced default for most standard deployment scenarios. The following table details the standard configurable parameter for this session cleanup system:
| Parameter Name | Default Value | Description |
|----------------|---------------|-------------|
| Session Idle Timeout | A few minutes | Maximum duration a virtual machine container can remain inactive prior to automatic destruction and resource reclamation |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/agentv2/vm)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
