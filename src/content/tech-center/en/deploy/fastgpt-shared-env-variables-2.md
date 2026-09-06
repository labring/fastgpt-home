---
title: Set Up FastGPT Shared Environment Variables
slug: /en/deploy/fastgpt-shared-env-variables-2
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Set Up FastGPT Shared Environment Variables

# Overview
Shared environment variables for self-hosted FastGPT deployments control core platform behaviors, including feature flags, resource limits, and operational concurrency. These values are configured via the platform’s root .env file, and changes require a service restart to take effect. All variables include documented default values and, where applicable, valid range constraints to prevent misconfiguration.

# Full Environment Variable Reference
| Variable                               | Default     | Description                                                                                                                                                                   |
| -------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AGENT_ENGINE`                         | `fastAgent` | Agent engine. Supported values are `fastAgent` and `piAgent`.                                                                                                                 |
| `SKIP_FILE_TYPE_CHECK`                 | `false`     | Whether upload file type checks are skipped.                                                                                                                                  |
| `WECHAT_CHANNEL_CONCURRENCY`           | `1000`      | WeChat channel poll worker concurrency. Minimum value is `10`.                                                                                                                |
| `PARSE_FILE_WORKERS`                   | `5`         | Resident file parsing worker count.                                                                                                                                           |
| `HTML_TO_MARKDOWN_WORKERS`             | `10`        | Resident HTML-to-Markdown worker count.                                                                                                                                       |
| `TEXT_TO_CHUNKS_WORKERS`               | `10`        | Resident text chunking worker count.                                                                                                                                          |
| `PARSE_FILE_TIMEOUT_SECONDS`           | `600`       | Timeout for one file parsing task, in seconds.                                                                                                                                |
| `WORKFLOW_MAX_RUN_TIMES`               | `500`       | Maximum workflow run count to avoid extreme infinite loops.                                                                                                                   |
| `WORKFLOW_MAX_LOOP_TIMES`              | `100`       | Maximum input array length for loop and parallel nodes.                                                                                                                       |
| `WORKFLOW_PARALLEL_MAX_CONCURRENCY`    | `10`        | Parallel node concurrency limit. It must not exceed `WORKFLOW_MAX_LOOP_TIMES`.                                                                                                |
| `SYSTEM_MAX_STRING_LENGTH_M`           | `100`       | Maximum character length for synchronous system string operations such as variable replacement, in M characters. `1` means `1,000,000` characters. Valid range: `1` to `100`. |
| `CHAT_MAX_QPM`                         | `5000`      | Chat QPM limit. User plan limits take precedence when configured.                                                                                                             |
| `SERVICE_REQUEST_MAX_CONTENT_LENGTH`   | `10`        | Maximum request body size accepted by the service, in MB.                                                                                                                     |
| `MAX_FOLDER_DEPTH`                     | `4`         | Maximum folder depth. The default allows up to 4 folder levels under the root. Valid range: `2` to `20`.                                                                      |
| `APP_FOLDER_MAX_AMOUNT`                | `1000`      | Maximum number of App folders.                                                                                                                                                |
| `DATASET_FOLDER_MAX_AMOUNT`            | `1000`      | Maximum number of Collection folders.                                                                                                                                         |
| `UPLOAD_FILE_MAX_SIZE`                 | `1000`      | Maximum upload file size, in MB.                                                                                                                                              |
| `UPLOAD_FILE_MAX_AMOUNT`               | `1000`      | Maximum upload file count.                                                                                                                                                    |
| `LLM_REQUEST_TRACKING_RETENTION_HOURS` | `6`         | LLM request tracking retention, in hours.                                                                                                                                     |
| `MAX_HTML_TRANSFORM_CHARS`             | `1000000`   | Maximum number of characters for HTML-to-Markdown                                                                                                                             |

# Configuration Steps
1. Navigate to the root directory of your self-hosted FastGPT deployment.
2. Open the .env file in a text editor.
3. Locate the target variable, or add it if missing, using the format `VARIABLE_NAME=value`.
4. Save the .env file and restart all FastGPT services to apply the new configuration.
Note that some variables have mandatory minimum or range constraints; for example, `WECHAT_CHANNEL_CONCURRENCY` cannot be set lower than 10, and `MAX_FOLDER_DEPTH` must be between 2 and 20.

# Key Usage Constraints
Several variables have interdependent rules to ensure platform stability:
- `WORKFLOW_PARALLEL_MAX_CONCURRENCY` must not exceed `WORKFLOW_MAX_LOOP_TIMES` to avoid resource oversubscription.
- User-specific plan limits will override the global `CHAT_MAX_QPM` value if configured.
- The `SYSTEM_MAX_STRING_LENGTH_M` unit is 1,000,000 characters per unit, so a value of 1 equals 1,000,000 total characters.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
