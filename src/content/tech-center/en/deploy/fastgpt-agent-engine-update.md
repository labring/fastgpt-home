---
title: Update AGENT_ENGINE Environment Variables for FastGPT 4.15.2
slug: /en/deploy/fastgpt-agent-engine-update
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152
source_type: Official documentation
---

# Update AGENT_ENGINE Environment Variables for FastGPT 4.15.2

## AGENT_ENGINE Environment Variable Change Overview
FastGPT 4.15.2 introduces updated supported enum values for the `AGENT_ENGINE` environment variable. This change must be completed before upgrading to version 4.15.2 or later. Legacy values for this variable will no longer pass environment validation checks, and using them will prevent FastGPT from starting. If the `AGENT_ENGINE` variable is not explicitly configured, FastGPT will automatically use the `fastAgent` default value starting from this release.

## Deprecated and Valid AGENT_ENGINE Values
The following table maps the deprecated, unsupported `AGENT_ENGINE` values to their updated, supported equivalents:
| Previous Value | New Value   |
| -------------- | ----------- |
| `default`      | `fastAgent` |
| `pi`           | `piAgent`   |
All deployments using the legacy `default` or `pi` values must update their environment variables prior to launching the upgraded FastGPT instance. Failure to make this change will result in an environment variable validation failure that terminates the FastGPT startup process.

## Step-by-Step Update Procedure
Follow these concrete steps to update your `AGENT_ENGINE` configuration:
1.  Locate and review your existing `AGENT_ENGINE` environment variable settings.
2.  Update any matching legacy values:
    - Replace any instance of `default` with `fastAgent`
    - Replace any instance of `pi` with `piAgent`
3.  No action is required if you have not previously set the `AGENT_ENGINE` variable, as the default value has been updated to `fastAgent`.
4.  Restart your FastGPT service to apply the revised environment variables, ensuring the validation check passes and the application starts successfully.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
