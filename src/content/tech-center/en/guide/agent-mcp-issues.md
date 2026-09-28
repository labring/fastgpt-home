---
title: FastGPT Agent and MCP Issue List
slug: /en/guide/agent-mcp-issues
page_type: Issue list
article_section: Deployment
is_part_of: FastGPT Tech Center
delivery_source_type: Programmatic grouping of published pages
source_type: 官方文档
source: https://github.com/labring/FastGPT
meta_title: FastGPT Agent and MCP Issue List | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 聚合页-第2批/英文-fastgpt.io/guide/agent-mcp-issues.md
source_sha256: 827451eb044a4cf19946858ed3de513d69c53b4d296e6d881683b4776f9956a6
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Entries taken from published documents. Verified 2026-09-14.
stage_members_heading: Published documents (29)
meta_description: Find 29 FastGPT Agent and MCP troubleshooting articles by symptom, with checks for tool calls, connectivity, and version compatibility.
---

# FastGPT Agent and MCP Issue List

This page collects the 29 published documents about the agent runtime and MCP tool integration, grouped by symptom, so a document can be found directly from what the error looks like.

## Three symptoms that belong to this stage

1. An agent returns an empty response or stops partway
2. The MCP tool list fails to load or a tool call has no effect
3. Tool parameters or return structures do not match expectations

If none of the three match, go back to the [deployment and environment issue landscape](/en/guide/deployment-issue-landscape) and narrow down again.

## The general order for this stage

1. Take the full error from the backend service log for this stage's component, including the component name and error code
2. Verify from inside the deployment that the component can be reached on its own, ruling out network and permission causes
3. Check the component version against the main service version
4. Follow the entry below whose symptom is closest, then repeat the same operation to verify

## Published documents (29)

| Document | Area |
| --- | --- |
| [Archive and Clean Up Legacy FastGPT Sandboxes](/en/deploy/fastgpt-sandbox-archive-script) | deploy |
| [Bind Skills to FastGPT Agent Applications](/en/tutorial/fastgpt-agent-skill-binding-2) | tutorial |
| [Control Tool Call Cycles and Workflow Variables](/en/node/tool-calling-additional-nodes) | node |
| [Define and Use FastGPT AI Agent Skills](/en/tutorial/fastgpt-ai-agent-skills) | tutorial |
| [Describe FastGPT Agent Virtual Machine Features](/en/tutorial/fastgpt-agent-vm-overview) | tutorial |
| [Develop FastGPT Agent Plugin Standard Workflows](/en/model/fastgpt-agent-plugin-development) | model |
| [Enable FastGPT app exposure via MCP protocol](/en/integration/fastgpt-mcp-server-configuration) | integration |
| [Execute JavaScript in FastGPT Sandbox Nodes](/en/node/fastgpt-sandbox-javascript-examples) | node |
| [FastGPT 4.16 Sandbox and Runtime Enhancements](/en/deploy/fastgpt-416-sandbox-runtime-improvements) | deploy |
| [FastGPT Agent Loop and Workflow Bug Fixes](/en/deploy/fastgpt-agent-loop-fixes) | deploy |
| [FastGPT Agent V2 VM Session Isolation and Lifecycle](/en/tutorial/fastgpt-agentv2-vm-session-lifecycle) | tutorial |
| [FastGPT Skill Layer Core Design Philosophy](/en/tutorial/fastgpt-skill-layer-design) | tutorial |
| [FastGPT Virtual Machine Agent Startup Script Constraints & Fault Tolerance](/en/tutorial/fastgpt-vm-agent-startup-constraints) | tutorial |
| [General Debugging for FastGPT Agent Chat Previews](/en/tutorial/fastgpt-agent-chat-debugging) | tutorial |
| [List of Allowed JavaScript Modules in FastGPT Sandbox V2](/en/node/fastgpt-sandbox-v2-js-module-whitelist) | node |
| [List of Permitted Python Modules for FastGPT Sandbox V2](/en/node/fastgpt-sandbox-v2-permitted-python-modules) | node |
| [Make External HTTP Requests in FastGPT Sandbox](/en/node/fastgpt-sandbox-http-requests) | node |
| [Manage and Use FastGPT Backend Sandbox Terminal](/en/tutorial/fastgpt-backend-sandbox-terminal) | tutorial |
| [Prevent Repeated Execution of Skill Scripts](/en/tutorial/fastgpt-skill-deduplication-mechanism-2) | tutorial |
| [Run Custom Python Code in FastGPT Sandbox V2](/en/node/fastgpt-sandbox-v2-python-examples) | node |
| [Secure Code Execution via FastGPT Sandbox Node](/en/node/fastgpt-code-run-sandbox) | node |
| [Set Up Agent V2 For Dynamic Data Analysis](/en/tutorial/fastgpt-agent-v2-data-analysis-2) | tutorial |
| [Set Up FastGPT Intelligent Data Analysis Agent](/en/tutorial/fastgpt-agent-v2-data-analysis-setup) | tutorial |
| [Set Up a Dataset-Powered Legal Q&A Agent](/en/tutorial/fastgpt-civil-code-qna-agent-setup) | tutorial |
| [Set Up and Manage FastGPT MCP Servers](/en/integration/fastgpt-mcp-server-management) | integration |
| [Understand the FastGPT Sandbox Security Restrictions](/en/node/fastgpt-sandbox-security-restrictions) | node |
| [Unified Agent and Tool Call Execution for FastGPT](/en/deploy/fastgpt-agent-loop-refactor) | deploy |
| [Update FastGPT OpenSandbox for 4.15 Deployment](/en/deploy/fastgpt-opensandbox-upgrade-415) | deploy |
| [Verify FastGPT Agent V2 Analysis Outputs](/en/tutorial/fastgpt-agent-v2-analysis-verification) | tutorial |

## What this list does not cover

Entries cover cases that can be reproduced publicly, grouped by symptom. The following need separate confirmation:

- A symptom caused by several factors at once, which needs the order above to rule them out one by one
- The same symptom caused by configuration specific to the commercial edition
- Cases coupled to a particular infrastructure environment that cannot be reproduced in a standard deployment

## Keep reading

- [FastGPT deployment and environment issue landscape](/en/guide/deployment-issue-landscape)
- [FastGPT Containers and orchestration issue list](/en/guide/container-orchestration-issues)
- [FastGPT Databases and object storage issue list](/en/guide/database-storage-issues)
- [FastGPT Images and architecture issue list](/en/guide/image-architecture-issues)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## If the problem is still not located

The entries above cover cases that can be reproduced from public information. If the problem depends on configuration details of a specific deployment, or needs runtime logs to confirm, contact sales for deployment-stage support; the cloud service can be used directly without handling environment dependencies.

- [Contact sales](/en/contact): support for self-hosting and upgrades
- [Get started](/en/start): use the cloud service and skip environment setup
- [Pricing](/en/price): compare what the cloud and self-hosted forms cover
