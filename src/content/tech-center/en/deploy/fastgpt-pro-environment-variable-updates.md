---
title: Configure FastGPT Pro Environment Variables for v4.15.1
slug: /en/deploy/fastgpt-pro-environment-variable-updates
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4151
source_type: Official documentation
---

# Configure FastGPT Pro Environment Variables for v4.15.1

## Configure FastGPT Pro Environment Variables for v4.15.1
Starting with FastGPT version 4.15.1, the FastGPT main application has updated internal API authentication for Pro/Admin services. The legacy `rootkey` credential is no longer used for service-to-service calls between the main app and Pro/Admin tools. Two new required environment variables, `PRO_TOKEN` and `FE_DOMAIN`, replace the old authentication flow for these internal requests. You must configure matching `PRO_TOKEN` values across both the FastGPT main application and the Pro/Admin service.

## Mandatory Environment Variables
The following environment variables are required for Pro deployments starting in v4.15.1:

| Variable Name | Requirements |
|---------------|--------------|
| `PRO_TOKEN` | A minimum 32-character random string. Must use the exact same value across both the FastGPT main application and the Pro/Admin service. |
| `FE_DOMAIN` | The public domain name of your FastGPT deployment, used for internal service routing configuration. |

Key configuration notes:
- If the FastGPT main application is configured with `PRO_URL`, you must define `PRO_TOKEN`; otherwise the main service will fail to start.
- The Pro/Admin service requires `PRO_TOKEN` to validate incoming internal API requests; missing this value will cause authentication failures for internal calls.
- The legacy `rootkey` variable is no longer used for internal Pro/Admin API calls. It now only serves as the system admin secret for calling `/api/admin/**` endpoints, such as initial setup scripts.
- Open-source FastGPT deployment files do not include `PRO_TOKEN` by default. You must manually add this variable to your private Pro deployment environment configurations.

## Step-by-Step Configuration
1. Generate a secure `PRO_TOKEN`: Use a cryptographically random string of at least 32 characters.
2. Update the FastGPT main application’s environment configuration: Add both `PRO_TOKEN` and `FE_DOMAIN` to your deployment’s environment variables (e.g., docker-compose.yml, .env file, or cloud deployment secrets manager).
3. Update the Pro/Admin service’s environment configuration: Use the exact same `PRO_TOKEN` value configured for the main application, and add it to the Pro/Admin service’s environment variables alongside any required existing settings.
4. Validate your configuration: Ensure no deployment conflicts exist, and confirm that all services reference the correct `PRO_TOKEN` and `FE_DOMAIN` values.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4151)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
