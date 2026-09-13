---
title: Resolve Stalled or Slow Dataset Indexing
slug: /en/deploy/dataset-indexing-troubleshooting
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/troubleshooting/faq
source_type: Official documentation
---

# Resolve Stalled or Slow Dataset Indexing

Dataset indexing issues, including stalled progress or slow performance, are common during FastGPT self-hosted deployments. The first critical troubleshooting step is to review application log error messages to identify the specific failure mode, as this directly points to the root cause of the problem.

## Standardized Troubleshooting Symptom Matrix
Use the following matrix to map observed indexing issues to their confirmed root causes, based on official FastGPT diagnostic data:

| Observed Symptom | Confirmed Root Cause |
|-------------------|----------------------|
| Successful external service connectivity verification, but no indexing progress is recorded | The `vectorModels` configuration field is not properly configured for the deployment |
| Failed connectivity verification attempts, and no indexing workflow initiates at all | API call failure; the deployment cannot establish a connection to OneAPI or OpenAI services |
| Visible incremental indexing progress, but task completion occurs at an extremely slow rate | Suboptimal API key configuration or account rate limitations on the connected LLM/vector service |

## Resolving Stalled Indexing with Successful Verification
When the system can confirm connectivity to required services but indexing does not advance, the only required fix is to validate the `vectorModels` configuration. This field must be populated with the correct vector model details for the deployment; missing or empty configuration will block indexing entirely even if basic connectivity checks pass.

## Fixing Complete Indexing Failure
If both connectivity verification and indexing fail entirely, the root cause is a failed API connection. Confirm that the deployment has valid access to OneAPI or OpenAI endpoints, and that all authentication credentials (including API keys) are correctly entered. Any failed API calls during pre-deployment checks will prevent both verification and indexing from starting.

## Addressing Slow Indexing with Visible Progress
For deployments where indexing progresses but at an unacceptably slow pace, the primary issue is often related to API key quality or account tier restrictions. Free-tier OpenAI accounts have strict rate limits, including per-minute request caps and daily request limits that will throttle indexing speed. Switching to a paid-tier API key or upgrading the associated account will resolve this slowdown.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/troubleshooting/faq)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
