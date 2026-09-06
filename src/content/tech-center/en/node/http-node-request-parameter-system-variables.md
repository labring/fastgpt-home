---
title: Use System Variables in HTTP Node Request Parameters
slug: /en/node/http-node-request-parameter-system-variables
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/http
source_type: Official documentation
---

# Use System Variables in HTTP Node Request Parameters

## Overview
FastGPT’s HTTP workflow nodes support dynamic parameter injection using built-in system variables, eliminating the need for hardcoded request parameter values. This functionality ensures consistent, context-aware data across conversations and workflows, reducing manual configuration overhead and errors.

## Available System Parameter Reference
The following system variables are available for use in HTTP node request parameters, accessible via the in-app tooltip next to the Request Parameters field:

| Parameter Name         | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `appId`                | Unique identifier for the current FastGPT application                       |
| `chatId`               | Unique ID for the active conversation; unavailable in test mode              |
| `responseChatItemId`   | ID of the current conversation’s outgoing response message; unavailable in test mode |
| `variables`            | Global custom variables configured for the active conversation               |
| `cTime`                | Current system timestamp when the HTTP request is executed           |
| `histories`            | Recent chat message history, limited to a maximum of 10 entries with non-configurable length |

## Accessing and Using Variables
To view the full list of supported system variables, hover over the question mark icon positioned adjacent to the Request Parameters configuration field. This in-app tooltip displays all valid parameters and their intended use cases, allowing direct reference without external documentation.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/http)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
