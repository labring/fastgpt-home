---
title: Set Up Additional FastGPT App Environment Variables
slug: /en/deploy/fastgpt-additional-app-environment-variables
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Set Up Additional FastGPT App Environment Variables

## Overview of Additional FastGPT App Variables
These environment variables control front-end and app-layer behavior for self-hosted FastGPT deployments. They are primarily loaded by the `projects/app` codebase, with shared validation logic defined in `packages/service/env.ts`, even though their core consumption occurs in app-side code. This set of variables covers system branding, security settings, feature flags, and integration configurations.

## Full Variable Reference
| Variable                        | Default  | Description                                                                                         |
| ------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `DEFAULT_ROOT_PSW`              | `123456` | Default password for initializing the root user.                                                    |
| `SYSTEM_NAME`                   | `AI`     | Default system name for the page title.                                                             |
| `SYSTEM_DESCRIPTION`            | Empty    | Page meta description. If unset, the default i18n text is used.                                     |
| `SYSTEM_FAVICON`                | Empty    | Page favicon URL. If unset, the favicon from system config is used.                                 |
| `CHINESE_IP_REDIRECT_URL`       | Empty    | China IP redirect URL in frontend config.                                                           |
| `PAY_FORM_URL`                  | Empty    | Payment form URL in frontend config.                                                                |
| `SHOW_COUPON`                   | `false`  | Whether redemption codes are shown.                                                                 |
| `SHOW_DISCOUNT_COUPON`          | `false`  | Whether discount coupons are shown.                                                                 |
| `HIDE_CHAT_COPYRIGHT_SETTING`   | `false`  | Whether copyright settings are hidden.                                                              |
| `WECOM_LOGIN_AUTO_REDIRECT`     | `false`  | Whether WeCom terminals automatically redirect to login.                                            |
| `APP_REGISTRATION_URL`          | Empty    | App registration application URL. Currently kept mostly for compatibility.                          |
| `PASSWORD_EXPIRED_MONTH`        | Empty    | Password expiration period in months. Empty means passwords do not expire.                          |
| `OPENAPI_KEY_MAX_COUNT`         | `100`    | Maximum number of system API Keys one team member can create. Minimum is 1.                         |
| `SSE_MCP_SERVER_PROXY_ENDPOINT` | Empty    | MCP SSE server proxy URL. Do not include a trailing slash. Required when publishing an SSE MCP App. |

## Deployment and Usage Notes
To implement these variables for your self-hosted FastGPT instance, define them in your deployment environment—typically via a `.env` file or system environment variables—before starting the FastGPT services. Several variables have specific constraints: `SSE_MCP_SERVER_PROXY_ENDPOINT` must not include a trailing slash, and `OPENAPI_KEY_MAX_COUNT` has a minimum allowed value of 1, which will be enforced by the shared validation layer. Empty default variables will fall back to built-in system behaviors: for example, omitting `SYSTEM_FAVICON` will use the platform’s default system favicon, and leaving `PASSWORD_EXPIRED_MONTH` empty disables password expiration entirely. Variables requiring URLs, such as `CHINESE_IP_REDIRECT_URL` and `SYSTEM_FAVICON`, must use fully qualified addresses to function correctly.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
