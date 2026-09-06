---
title: FastGPT 4.13.2 Critical Application Bug Fixes
slug: /en/deploy/fastgpt-4132-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4132
source_type: Official documentation
---

# FastGPT 4.13.2 Critical Application Bug Fixes

This document details the bug fixes included in the FastGPT 4.13.2 update for self-hosted deployments, addressing critical runtime and configuration errors that impacted prior versions.

## Resolved Bug Details
The following table lists all fixed issues, with their core impact:
| Bug Description | Operational Impact |
|-------------------|---------------------|
| LLM models defaulting to image support caused request errors. | Text-only LLM inference requests failed when using models configured with default image support enabled. |
| Mongo watch was not re-triggered during multi-replica failover. | Database event listening failed after primary replica failover, delaying cross-service sync operations. |
| Text chunking did not process the remaining `LastText` data after all strategies were exhausted. | Unprocessed trailing text segments remained in datasets after completed chunking jobs. |
| Variable input field failed validation when number value was 0. | Numeric input values of 0 were incorrectly rejected as invalid. |
| Incorrect parallel execution detection in complex workflow loops. | Workflows with parallel nested loops were halted by false parallel execution limit detections. |

## Post-Upgrade Validation Steps
To confirm all fixes are active after upgrading, follow this step-by-step workflow:
1.  **LLM Image Support Test**: Configure an LLM model with default image support enabled, then submit a text-only inference request. Verify the request completes without error messages.
2.  **Mongo Replica Failover Test**: Initiate a primary replica failover in your MongoDB deployment. Confirm database event listening resumes automatically without manual service restarts.
3.  **Text Chunking Test**: Upload a dataset containing trailing unprocessed text segments. Run the chunking job and confirm all text, including final trailing segments, is properly divided into valid chunks.
4.  **Numeric Zero Validation Test**: Create a variable input field configured for numeric values, then submit `0` as the input. Confirm the input passes validation and is accepted for use.
5.  **Complex Workflow Loop Test**: Deploy a workflow with parallel nested loop branches. Execute the workflow and confirm no false parallel execution detection errors interrupt the run.

## Key Deployment Notes
No additional configuration changes are required beyond standard self-hosted upgrade procedures for FastGPT 4.13.2. All fixes resolve issues present in prior 4.13.x releases without introducing new operational overhead.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4132)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
