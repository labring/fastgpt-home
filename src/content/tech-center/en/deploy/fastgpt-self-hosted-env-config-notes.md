---
title: Official FastGPT Self-Hosted Environment Configuration Notes
slug: /en/deploy/fastgpt-self-hosted-env-config-notes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Official FastGPT Self-Hosted Environment Configuration Notes

# Core Service Modules
FastGPT self-hosted deployments include three core service modules, each with defined operational responsibilities:
- `projects/app`: The primary Next.js application, which includes application pages, API routes, Workflow management, Dataset administration, object storage integration, and vector storage configuration.
- `pro/admin`: The commercial administrative service. It includes its own dedicated administrative environment variables, while also reusing shared App and Service configuration settings such as database connections, secrets management, object storage, model configurations, and logging pipelines.
- `projects/code-sandbox`: A dedicated code execution sandbox service. It exposes a `/sandbox` API endpoint, and is invoked by the main App service using the `CODE_SANDBOX_URL` environment variable.

# Shared Configuration Standards
All shared boolean configuration variables for the App and Admin services follow a standard enablement pattern: a feature is enabled only if the variable value is exactly `true`, `1`, `yes`, or `y`; any other value will disable the associated feature.
Two standardized environment configuration files are provided for centralized variable management:
- `packages/service/env.ts`: Exports a `serviceEnv` object for shared service-level environment variables
- `projects/app/src/env.ts`: Exports an `appEnv` object for application-specific environment variables

# Mandatory Runtime Secrets
Three environment secrets are required for successful runtime operation, and must not use default example values in production environments:
| Secret Variable Name             |
|----------------------------------|
| `FILE_TOKEN_KEY`                 |
| `AES256_SECRET_KEY`              |
| `INVOKE_TOKEN_SECRET`            |

Each of these secrets must be generated using cryptographically strong random values to prevent unauthorized access to FastGPT resources.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
