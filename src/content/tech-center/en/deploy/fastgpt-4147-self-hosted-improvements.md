---
title: FastGPT 4.14.7 Self-Hosted Platform Improvements
slug: /en/deploy/fastgpt-4147-self-hosted-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4147
source_type: Official documentation
---

# FastGPT 4.14.7 Self-Hosted Platform Improvements

This document details the technical improvements released in FastGPT 4.14.7 for self-hosted deployments, focusing on usability, stability, compatibility, and error reduction across core platform features.

## Core User Experience & Tooling Updates
This section addresses front-end usability and tool call reliability:
- Enhanced user experience for tool selection and Dataset selection within the Chat Agent interface, streamlining configuration for chatbot builders.
- Tool calls now automatically populate empty arguments with `"{}"` to avoid runtime errors from model providers that do not support empty string values.
- Added native compatibility for Kimi 2.5 tool calls when the model operates in thinking mode, aligning platform support with the latest model capabilities.
- Improved internal network domain validation to restrict access to authorized resources and reduce security risks.

## Backend Stability & Compatibility Fixes
These changes reinforce platform reliability and compatibility with standard infrastructure:
- The MCP component automatically filters out extraneous fields during save operations, maintaining full compatibility with MongoDB 4.x deployments.
- The backend layer now automatically filters unconfigured tools to prevent model errors caused by attempts to call undeployed or unconfigured tools. A shared filter function is used across both frontend and backend to ensure consistent behavior between the two layers.
- Orphaned edges in workflow diagrams are automatically removed prior to workflow execution, eliminating broken triggers that would cause execution failures.

## Workflow and API Configuration Enhancements
This section covers targeted improvements to workflow and API functionality, with key changes summarized in the table below:

| Improvement Area               | Technical Change                                                                 |
|--------------------------------|----------------------------------------------------------------------------------|
| Workflow AI Model Setup        | Added memory selection support for workflow AI models when operating in chat log mode |
| API File Link Processing       | When calling workflows via API with file links, save file type directly from input instead of inferring from URL, ensuring 100% accurate file type detection |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4147)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
