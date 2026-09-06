---
title: Understand the FastGPT Sandbox Security Restrictions
slug: /en/node/fastgpt-sandbox-security-restrictions
page_type: 工作流节点
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2
source_type: 官方文档
---

# Understand the FastGPT Sandbox Security Restrictions

## Sandbox Security Protection Overview
The FastGPT sandbox v2 node implements multiple layered security controls to safely execute untrusted JS and Python code within FastGPT workflows. These protections are automatically enabled for all sandbox node runs, eliminating the need for manual security configuration for standard deployments. All controls are designed to mitigate common code execution risks without impacting core workflow functionality.

## Full Security Control Specifications
The following table outlines all core security controls and their specific, documented implementations:
| Security Control | Exact Implementation |
|-------------------|------------------------|
| Module Restrictions | Only whitelisted modules are allowed for both JS and Python execution environments |
| Network Isolation | All requests to internal IP addresses are automatically blocked, providing built-in SSRF protection |
| File Isolation | No read or write access is permitted to the container’s underlying file system |
| Timeout Protection | A default 60-second execution timeout is enforced to stop infinite loops and runaway code |
| Process Isolation | Every code execution runs in a completely independent sandbox process, preventing cross-execution data leaks or interference |

## Automatic Enforcement Workflow
Each security control activates in a standardized sequence during every sandbox execution. First, the allowed module list is validated to block any unauthorized imports before code loading begins. Next, all outbound network requests are scanned and filtered to block access to internal IP ranges, eliminating SSRF attack vectors. Filesystem read and write operations are intercepted at the container boundary and rejected entirely. If execution exceeds the 60-second default timeout threshold, the sandbox process is immediately terminated to prevent resource exhaustion. Finally, the isolated sandbox process is fully destroyed after execution completes to remove all temporary execution data and ensure no residual state remains.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2)
