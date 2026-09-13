---
title: Configure FastGPT Admin-Specific Environment Variables
slug: /en/deploy/fastgpt-admin-specific-environment-variables
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Configure FastGPT Admin-Specific Environment Variables

## Admin-Specific Environment Variable Overview
These environment variables are loaded exclusively by the `pro/admin` service layer of self-hosted FastGPT deployments, and inherit all shared App and Admin variables from the base configuration. These settings control admin panel behavior, automated background tasks, external service integrations, and operational guardrails for your FastGPT instance.

## Admin Variable Reference
The following table lists all admin-specific environment variables, their default values, and functional descriptions:
| Variable                              | Default            | Description                                                                                                              |
| ------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `PRO_TOKEN`                           | None, **required** | Service-to-service token for FastGPT app calls to pro/admin internal APIs. Must be at least 32 characters and match App. |
| `EVAL_LINE_LIMIT`                     | `1000`             | Maximum number of rows allowed when creating one evaluation task. Also sent to frontend config.                          |
| `BATCH_UPDATE_TIME`                   | `3000`             | Wallet balance batch update interval, in milliseconds.                                                                   |
| `INVOICE_FEISHU_WEBHOOK_URL`          | Empty              | Lark webhook URL for invoice request notifications.                                                                      |
| `INVOICE_FEISHU_WEBHOOK_CALLBACK_URL` | Empty              | Callback URL for buttons in invoice notifications.                                                                       |
| `SMS_PROXY`                           | Empty              | SMS sending proxy service URL.                                                                                           |
| `MAX_CRAWL_PAGE`                      | `2000`             | Maximum number of pages to crawl during website sync.                                                                    |
| `CRAWL_MAX_HTML_SIZE`                 | `10`               | Estimated maximum HTML size for one static crawled page, in MB.                                                          |
| `CRAWL_EXCLUDE_LIST`                  | Empty              | Crawler exclusion rules for domains or paths. Use commas to separate values.                                             |
| `SHOW_GIT`                            | `false`            | Whether Git information is shown in Admin.                                                                               |
| `CLEAR_FREE_ACCOUNT`                  | `false`            | Whether free account resource cleanup is enabled.                                                                        |
| `SYNC_MEMBER_CRON`                    | Empty              | Cron expression for automatic member sync. Empty disables the sync task.                                                 |
| `WORKORDER_BASE_URL`                  | Empty              | Work order system URL. When set, the frontend shows work order entry points.                                             |
| `WORKORDER_JWT_SECRET`                | Empty              | Secret used to sign JWTs when creating work orders.                                                                      |
| `EXTERNAL_USER_SYSTEM_BASE_URL`       | Empty              | External user system URL.                                                                                                |
| `EXTERNAL_USER_SYSTEM_AUTH_TOKEN`     | Empty              | Authentication token for the external user system.                                                                       |
| `BAIDU_CONVERSION_TOKEN`              | Empty              | Baidu conversion tracking token.                                                                                         |
| `BAIDU_CONVERSION_BASE_URL`           | Empty              | Baidu conversion tracking API URL.                                                                                       |
| `BING_ADS_DEVELOPER_TOKEN`            | Empty              | Bing Ads developer token.                                                                                                |
| `BING_ADS_CUSTOMER_ID`                | Empty              | Bing Ads customer ID.                                                                                                    |
| `BING_ADS_CUSTOMER_ACCOUNT_ID`        | Empty              | Bing Ads customer account ID.                                                                                            |
| `BING_ADS_CONVERSION_NAME`            | `fastgptcn`        | Bing Ads conversion goal name.                                                                                           |
| `BING_OAUTH_CLIENT_ID`                | Empty              | Bing OAuth client ID.                                                                                                    |
| `BING_OAUTH_CLIENT_SECRET`            | Empty              | Bing OAuth client secret.                                                                                                |
| `BING_OAUTH_REFRESH_TOKEN`            | Empty              |                                                                                                |

## Critical Configuration Guidance
The mandatory `PRO_TOKEN` variable is required for secure internal communication between the FastGPT frontend and the admin API layer; it must be a minimum of 32 characters and must match the token configured for the FastGPT app. For automated tasks, `SYNC_MEMBER_CRON` uses standard cron syntax to schedule automated member synchronization, and leaving this variable empty disables the task entirely. Crawl-related variables control the scope and limits of website data collection during document syncs, with `CRAWL_EXCLUDE_LIST` accepting comma-separated domain or path exclusion rules. For external integrations, variables like `INVOICE_FEISHU_WEBHOOK_URL` enables Lark notifications for invoice requests, while `WORKORDER_BASE_URL` adds work order entry points to the FastGPT frontend when configured.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
