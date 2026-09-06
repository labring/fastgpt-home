---
title: Run FastGPT 4.14.0 System Tool Migration
slug: /en/deploy/fastgpt-4140-system-tool-migration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4140
source_type: Official documentation
---

# Run FastGPT 4.14.0 System Tool Migration

## Eligibility Prerequisites
This migration script is exclusively required for commercial edition FastGPT users who have deployed custom system tools prior to upgrading to version 4.14.0. All other self-hosted FastGPT users do not need to run this command. Executing this script will migrate existing custom system tool data to the updated data tables compatible with the 4.14.0 release.

## Required Configuration Parameters
Two dynamic placeholders must be replaced before running the API request:
1.  `{{rootkey}}`: The root administrator key stored in your FastGPT environment variables. This key grants elevated administrative access required to trigger the migration endpoint.
2.  `{{host}}`: Your official FastGPT domain name, used to route the API request to the correct FastGPT instance.

## Step-by-Step Command Execution
Run the following HTTP POST request from any terminal session on a machine that can reach your FastGPT domain:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4140' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Before executing the command, substitute both `{{rootkey}}` and `{{host}}` with your actual environment-specific values. No additional request body is needed for this API call, as authentication and migration triggers are handled exclusively via the provided request headers.

## Expected Outcome and Validation
Upon successful execution, the script will complete the transfer of custom system tool data to the new 4.14.0 data tables, and return a standard API confirmation response. If the command fails, first verify that your `rootkey` matches the value stored in your FastGPT environment variables, confirm that your FastGPT domain is reachable from the active terminal session, and ensure that the FastGPT service is running prior to reattempting the command.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4140)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
