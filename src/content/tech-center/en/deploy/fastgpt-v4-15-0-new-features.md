---
title: Official FastGPT v4.15.0 New Feature Reference
slug: /en/deploy/fastgpt-v4-15-0-new-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500
source_type: Official documentation
---

# Official FastGPT v4.15.0 New Feature Reference

## Core Agent and Plugin Updates
FastGPT v4.15.0 revamps its agent and plugin framework for improved reliability and functionality. Agent V2 now supports binding and running static Skills, with reworked loop logic to enhance stability during multi-step tool calls and orchestration. The plugin system architecture has been fully reworked, adding plugin-level runtime configuration and moving system tool execution to the local-pool. Commercial edition users gain local direct-connect debugging for FastGPT plugins. A new Loop node is introduced, replacing the deprecated legacy batch execution node.

## Infrastructure and Configuration Enhancements
Several infrastructure and configuration updates reduce resource strain and add flexibility. New worker pools for file parsing, HTML-to-Markdown conversion, and text chunking prevent resource exhaustion during high concurrency. A new environment variable, `MAX_FOLDER_DEPTH`, allows administrators to set a maximum directory depth to avoid infinitely nested directories. Additional configuration options include:
| Configuration Option | Details |
|----------------------|---------|
| Sandbox Package Sources | Custom npm and pip sources are now supported in the sandbox environment |
| S3 Storage | CDN configuration support added for S3 storage |
| Rerank Models | `defaultConfig` support implemented for rerank models |
| HTTP Node | Added ability to ignore TLS certificate verification and return complete error objects |
| Chat API | Validates duplicate `dataId` values to prevent invalid Workflow execution and stream-resume merging |

## UI, Multimodal and Workflow Improvements
The update includes targeted improvements to user interfaces, multimodal support, and workflow tools. The chatbox UI has been reworked with quick scroll-to-bottom functionality, LLM-generated chat titles, and smoother streaming output. Share links and portal pages now support language switching, eliminating forced browser-based language detection. Dataset search now supports native multimodal embedding models, image-to-image search, and permission filtering in Agent mode. Multimodal models now accept audio and video input. Quick-reply output syntax is added, and workflow template exports now include template names and descriptions. Global variable inputs support object-type data, and in tool call mode with the VM feature enabled, user-uploaded chat files are injected directly into the VM. Other updates include unified API key management with explicit app context in requests, separated DevAPI and System OpenAPI documentation, DingTalk Dataset integration for third-party datasets, and added model reasoning configuration.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
