---
title: Troubleshoot Common FastGPT Frontend Page Crashes
slug: /en/deploy/fastgpt-frontend-page-crash-troubleshooting
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/troubleshooting/faq
source_type: Official documentation
---

# Troubleshoot Common FastGPT Frontend Page Crashes

FastGPT self-hosted deployments may experience unexpected frontend page crashes. Below are official troubleshooting steps aligned with FastGPT documentation.

## Model Configuration Fixes (90% of Cases)
This is the leading cause of frontend page crashes. Follow these step-by-step actions:
1.  Ensure every defined model category has at least one enabled, active model. No category may be left without an assigned enabled model.
2.  Inspect all `object` type parameters in your deployed model configurations, which support both array and object data structures.
3.  Replace any empty `object` parameter with the appropriate empty structure: use `[]` for array-type parameters, or `{}` for object-type parameters.
4.  Save the updated configuration and restart the FastGPT frontend service to apply all changes.

## Browser Compatibility Adjustments
A small subset of crashes stem from browser limitations. The FastGPT frontend uses modern JavaScript syntax, which may not be supported by older browser versions. If crashes occur, collect exact user operation steps and full error strings from the browser’s developer console for further debugging.

## Disable Browser Translation Tools
Built-in or third-party browser translation tools can interfere with FastGPT’s frontend rendering, leading to unexpected crashes. Turn off translation for the FastGPT deployment domain, or disable all translation extensions in your browser to resolve this issue.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/troubleshooting/faq)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
