---
title: FastGPT 4.14.10 Bug and Security Fixes
slug: /en/deploy/fastgpt-41410-bug-security-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41410
source_type: Official documentation
---

# FastGPT 4.14.10 Bug and Security Fixes

This page documents the official bug fixes and security vulnerability patches released with FastGPT 4.14.10 for self-hosted deployments. All content is sourced directly from the official FastGPT 4.14.10 upgrade documentation, with no additional external information included.

## Resolved Issues Table
The following table lists all resolved issues as published in the official update notes, including a repeated entry preserved from the official documentation:

| Issue Category       | Fixed Description                                                                 |
|----------------------|-----------------------------------------------------------------------------------|
| Bug Fix              | Sub-workflow global variable default values failing to take effect                 |
| Bug Fix              | Configured rerank model not displaying in agent mode                               |
| Bug Fix              | BGE-M3 embedding vector model output consistently returning 0                     |
| Bug Fix              | MCP call failures caused by connection exceptions during concurrent requests       |
| Security Patch       | Login API security vulnerability resolved                                          |
| Security Patch       | MCP SSRF security vulnerability resolved                                           |
| Bug Fix              | Workflow tool errors not being properly caught and handled                         |
| Bug Fix              | Sub-workflow global variable default values failing to take effect                 |

*Note: The duplicate entry for sub-workflow global variable default values is retained exactly as it appears in the original source documentation.*

## Key Operational and Security Improvements
This release addresses workflow reliability, model configuration accuracy, and system security. The workflow fixes ensure sub-workflow global variable defaults apply correctly, and catch workflow tool errors to prevent unreported execution failures. The model configuration fixes restore configured rerank model visibility in agent mode, and resolve the BGE-M3 embedding model's constant 0 output. The security patches resolve the login API vulnerability and block MCP SSRF attacks, hardening self-hosted deployments.

> [FastGPT 4.14.10 upgrade notes](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41410)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
