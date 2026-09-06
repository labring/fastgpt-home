---
title: FastGPT 4.15.1 Resolved Bug Fix Summary
slug: /en/deploy/fastgpt-4151-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4151
source_type: Official documentation
---

# FastGPT 4.15.1 Resolved Bug Fix Summary

## Bug Fix Overview
This document outlines all resolved functional and UI issues included in the FastGPT 4.15.1 self-hosted release. All fixes target core platform workflows, user interface behavior, and background system processes to improve reliability and user experience.

## Categorized Resolved Issues
The following table lists all fixed issues grouped by their functional category, with direct descriptions pulled from the 4.15.1 release notes:

| Issue Category               | Fixed Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------------|
| Workflow Debugging UI         | Workflow tool debugging did not display run details for executed nodes.            |
| Authentication UI Flow        | Chat page failed to automatically render the login component after user credentials expired. |
| Sub-workflow Variable Loading | Corrected incorrect reading of runtime variables (default and system variables) when sub-workflow tools did not initialize variables from the parent tool app’s global variable configuration. |
| Loop/Parallel Node State Sync | Fixed failure to synchronize global variable or node output updates back to the main workflow from `Variable Update` nodes inside loop or parallel execution containers. Successful execution rounds or tasks now write back changes; failed rounds or tasks do not commit any changes. |
| Dataset Collection Retry      | Retrying all Dataset collections did not trigger an immediate UI component refresh.  |
| Embedded Marketplace Behavior | Stopped repeated shallow route updates in the embedded FastGPT Marketplace when filter parameters remained unchanged, which caused the top progress bar to load indefinitely. |

## Critical Workflow Fix Details
Two key fixes address workflow execution reliability: the sub-workflow variable initialization fix ensures that sub-workflows can access the full set of global variables configured for the parent tool app, eliminating runtime variable mismatches that broke workflow logic. The loop and parallel node sync fix resolves a state persistence bug, ensuring that only successful workflow segments apply changes to the main workflow, preventing unintended state leakage from failed execution attempts. Additional UI fixes resolve minor usability gaps, including immediate UI refreshes after dataset collection retries and correct login prompt display after credential expiration.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4151)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
