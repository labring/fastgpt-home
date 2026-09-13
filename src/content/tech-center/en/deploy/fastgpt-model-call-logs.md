---
title: Manage and Access FastGPT Model Call Logs
slug: /en/deploy/fastgpt-model-call-logs
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/intro
source_type: Official documentation
---

# Manage and Access FastGPT Model Call Logs

## Overview of Model Call Logs
All model API calls initiated through configured FastGPT distribution channels are automatically recorded and stored on the dedicated `Call Logs` page. Captured log data includes core operational and performance metrics: input token consumption, output token generation counts, exact request timestamp, total round-trip latency, and the target model endpoint request URL. For requests that fail to complete successfully, logs include additional diagnostic context: full original request parameters and detailed error messages returned by the connected model service, to streamline troubleshooting and resolution.

## Log Retention Settings
By default, all captured model call logs are retained for a period of 1 hour. This default retention window can be adjusted using environment variables, granting administrators flexibility to align log storage with their operational monitoring and compliance needs.

## Accessing and Reviewing Logs
To review model call logs, follow this structured procedure:
1. Authenticate into the FastGPT administrative dashboard using your authorized user credentials.
2. Locate and select the `Call Logs` page from the main navigation menu of the dashboard.
3. For successful completed requests, review the pre-populated log fields to analyze token usage, call timing, and target endpoint details.
4. For failed requests, expand the corresponding log entry to view the full set of original request parameters and the exact error message returned by the model endpoint, to diagnose configuration or connectivity issues.

A standard view of the `Call Logs` interface is shown below:
![aiproxy11](../../../../public/imgs/aiproxy-11.png)

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/intro)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
