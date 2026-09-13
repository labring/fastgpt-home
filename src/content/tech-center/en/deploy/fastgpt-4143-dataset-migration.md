---
title: Migrate FastGPT Datasets for 4.14.3 Upgrade
slug: /en/deploy/fastgpt-4143-dataset-migration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4143
source_type: Official documentation
---

# Migrate FastGPT Datasets for 4.14.3 Upgrade

## Migration Scope Overview
This administrative script is a required step in the FastGPT 4.14.3 self-hosted upgrade process. Its sole purpose is to migrate dataset storage from MongoDB GridFS to S3-compatible storage across your FastGPT deployment. The migration covers two core dataset types: text collections and image collections. Critically, this script does not migrate images extracted from uploaded documents such as .docx files; those assets require separate handling outside this dedicated migration workflow.

## Required Preparations
Before running the migration script, you must retrieve two critical configuration values for your FastGPT instance:
1. The `rootkey` value from your FastGPT environment variables: This is a secure administrative credential required to access the upgrade API endpoint without unauthorized access.
2. Your official FastGPT domain: This is the public or internal domain name used to access your FastGPT deployment, formatted without any trailing path components.
You may execute the curl command from any terminal with outbound network access to your FastGPT domain’s API endpoint, ensuring the deployment is running and accessible during the migration.

## Execute the Migration Script
Run the following exact curl command in your terminal, replacing the placeholder values as specified for your deployment:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4143' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
### Command Component Details
- The `--location` flag ensures the request follows any temporary or permanent redirects issued by the FastGPT API server.
- The `POST` HTTP method targets the `/api/admin/initv4143` administrative endpoint, which triggers the official 4.14.3 dataset migration workflow.
- The `rootkey` header authenticates the request using your deployment’s secure administrative credential, preventing unauthorized execution of the migration.
- The `Content-Type: application/json` header specifies the expected request format, even though this specific endpoint does not require a request body payload.

Once the command is executed successfully, the script will automatically process and migrate all eligible dataset files from MongoDB GridFS to your configured S3 storage. No additional user intervention is required during the active migration phase.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4143)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
