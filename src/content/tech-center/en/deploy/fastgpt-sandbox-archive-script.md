---
title: Archive and Clean Up Legacy FastGPT Sandboxes
slug: /en/deploy/fastgpt-sandbox-archive-script
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41505
source_type: Official documentation
---

# Archive and Clean Up Legacy FastGPT Sandboxes

## About the FastGPT Sandbox Archive Script
This utility is part of the FastGPT 4.15 self-hosted upgrade workflow, built to manage legacy sandbox environments. Its core purpose is to archive inactive sandbox workspaces to S3 storage, which frees up consumed system resources. Some older sandboxes may encounter timeout errors when attempting to install zip packages, a common issue this script resolves by moving inactive environments to archival storage rather than leaving them active. Administrators have two valid options for managing old sandboxes: run this archive script, or directly delete all pre-existing old sandboxes if preferred. Critically, this script only impacts legacy sandboxes created prior to the upgrade; newly created sandboxes remain entirely unaffected by the archive process.

## Script Command and Parameter Reference
The archive utility is accessed via an authenticated POST API request. The full standardized command structure is provided below, with placeholders that must be replaced for your specific deployment:
```shell
curl --location --request POST 'https://{{host}}/api/admin/initSandboxArchive' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json' \
-d '{"runArchive":true,"inactiveDays":0}'
```
The following request body parameters are supported to customize the archive process:
| Parameter | Type | Required | Default Value | Description |
|-----------|------|----------|---------------|-------------|
| runArchive | boolean | Yes | N/A | Enables the sandbox archive workflow when set to `true` |
| inactiveDays | integer | No | 0 | Filters which sandboxes are archived: a value of 0 archives all inactive sandboxes, while a specified integer will only archive sandboxes inactive for that number of days or more |
Additional request headers are required for valid authentication and content parsing: the `rootkey` header must include your FastGPT admin root key, and the `Content-Type` header must be set to `application/json`. The `{{host}}` placeholder refers to your self-hosted FastGPT deployment’s public domain name or IP address.

## Execution and Verification
Before running the script, confirm that your FastGPT deployment has a properly configured S3 storage integration, as the script will transmit archived sandbox data to this storage location. If you choose to delete old sandboxes directly instead of running the archive script, no additional command is needed, though this will permanently remove all associated legacy sandbox data rather than moving it to archival storage. After executing the modified script, you can verify successful archiving via your FastGPT admin dashboard or S3 storage console to confirm that inactive sandboxes have been transferred to archival storage.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41505)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
