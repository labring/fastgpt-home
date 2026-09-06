---
title: Initialize API Key App Names for 4.15.1 Upgrade
slug: /en/deploy/fastgpt-api-key-appname-initialization
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4151
source_type: Official documentation
---

# Initialize API Key App Names for 4.15.1 Upgrade

## Purpose of 4.15.1 API Key Initialization
FastGPT v4.15.1 added global API key tag management and appName display snapshots for historical app-level API keys. This update maintains backward compatibility for older API keys and simplifies identifying keys linked to specific applications. After upgrading to v4.15.1, run the provided initialization script once to backfill appName values for existing API keys that retain an `appId` field.

## Prerequisites
Before executing the initialization script, confirm you have three required items:
1. A terminal with network access to your FastGPT deployment
2. The `rootkey` value from your FastGPT environment variables
3. Your FastGPT domain host URL, including the appropriate protocol (http or https) and custom port if non-standard

## Run the Initialization Script
The initialization script is triggered via an authenticated HTTP POST request. Use the following curl command, replacing the placeholder values as specified:
```bash
curl -X POST "{{host}}/api/admin/initv4151" \
  -H "rootkey: {{rootkey}}"
```
### Script Operational Constraints
The script follows strict, non-destructive rules as defined in the v4.15.1 update:
- Only populates missing `appName` field values for eligible API keys
- Does not overwrite existing, pre-configured `appName` values
- Leaves the `appId` field unchanged for all API keys
- Does not create or bind API key tags
- Can be run multiple times without causing data issues

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4151)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
