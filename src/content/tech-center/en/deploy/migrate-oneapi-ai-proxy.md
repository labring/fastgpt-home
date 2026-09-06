---
title: Migrate OneAPI Channels to AI Proxy
slug: /en/deploy/migrate-oneapi-ai-proxy
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/intro
source_type: Official documentation
---

# Migrate OneAPI Channels to AI Proxy

## Migration Overview
For users of older FastGPT deployments using OneAPI for model channel configuration, the official migration script simplifies transitioning to AI Proxy by automating the transfer of existing channel settings. The script executes a straightforward data mapping process, copying only core channel attributes: proxy URLs, associated AI models, and API keys. No additional custom OneAPI configurations are transferred, so post-migration manual validation is recommended to confirm all critical channel details are properly imported.

## Required Configuration Parameters
Before running the migration, gather the three required parameters:
| Parameter | Details |
|-----------|---------|
| `{{host}}` | Base URL of your live AI Proxy deployment |
| `{{admin_key}}` | Admin API key for AI Proxy, set via the ADMIN_KEY environment variable |
| `dsn` | MySQL connection string for your OneAPI database, formatted as `mysql://[REDACTED_CREDENTIAL]@tcp(host:port)/database_name` |

## Run the Migration Command
Execute the following HTTP POST request from any terminal to start the migration. Replace the placeholder values with your collected parameters:
```bash
curl --location --request POST '{{host}}/api/channels/import/oneapi' \
--header 'Authorization: Bearer {{admin_key}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dsn": "mysql://[REDACTED_CREDENTIAL]@tcp(dbconn.sealoshzh.site:33123)/mydb"
}'
```
Replace the example `dsn` value with your actual OneAPI database connection string.

## Validate Migration Success
A successful migration will return the JSON response `{"success": true}`. If the command returns an error, confirm that your AI Proxy instance is reachable, the admin key is correct, and the OneAPI MySQL DSN is valid. Since the script only transfers core channel data, manually verify all imported channels to ensure all models, proxy URLs, and API keys are correctly mapped to your AI Proxy environment.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/intro)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
