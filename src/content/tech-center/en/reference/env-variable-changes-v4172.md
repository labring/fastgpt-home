---
title: FastGPT Environment Variable Changes: v4.16.2 to v4.17.2
slug: /en/reference/env-variable-changes-v4172
page_type: reference-data
source_type: Official documentation
source: https://doc.fastgpt.cn/en/self-host/config/env
description: Environment variables added, removed or given a new default between FastGPT v4.16.2 and v4.17.2: 5 added, 2 removed, 4 new defaults, each checked against the source.
language: en
check_day: 2026-10-13
---

# FastGPT Environment Variable Changes: v4.16.2 to v4.17.2

This page compares the official environment variable reference of FastGPT v4.16.2 and v4.17.2 line by line. It lists variables that were added, removed or given a new default, and checks each one against the 12 `env.ts` definition files in the v4.17.2 open-source repository.

| Change | Count |
| --- | --- |
| Added | 5 |
| Removed | 2 |
| New default | 4 |
| Updated description | 4 |

## Added variables (5)

| Variable | Group | Default | Description | Source check |
| --- | --- | --- | --- | --- |
| `DEFAULT_TEAM_BASIC_PERMISSIONS_ENABLED` | Feature Flags and Limits | `false` | Whether newly created teams grant their default all-members group permission to create Apps, Skills, and Datasets. Does not change existing teams. Configure consistently in FastGPT and Pro Admin. | Matches |
| `DISABLE_MARKETPLACE` | Additional App Variables | `false` | Hides the plugin marketplace installation entry when `true`; local file installation remains available. | Matches |
| `FILE_URL_EXPIRED_DAYS` | Domains, Frontend, and Runtime | `90` | Lifetime in days of file access short links persisted in chat records. Fractions are allowed. | Matches |
| `SYSTEM_MIGRATION_BATCH_SIZE` | Feature Flags and Limits | `100` | Number of records processed per system migration batch. Valid range: `50`–`1000`. | Matches |
| `SYSTEM_MIGRATION_DELAY_SECONDS` | Feature Flags and Limits | `0` | Delay before executing system migration tasks configured with delay, in seconds. Default is `0` (no delay). | Matches |

## Variables with a new default (4)

| Variable | v4.16.2 default | v4.17.2 default | Source check |
| --- | --- | --- | --- |
| `AIPROXY_API_ENDPOINT` | Empty | None, **required** | No default in source, consistent with required |
| `AIPROXY_API_TOKEN` | Empty | None, **required** | No default in source, consistent with required |
| `DB_MAX_LINK` | `5` | `10` | Matches |
| `SANDBOX_POOL_SIZE` | `20` | `5` | Matches |

## Variables with an updated description (4)

| Variable | v4.17.2 description |
| --- | --- |
| `AIPROXY_API_ENDPOINT` | AI Proxy service root URL, such as `http://aiproxy:3000`. Do not append `/v1`. |
| `AIPROXY_API_TOKEN` | A nonempty AI Proxy administrator token matching the server configuration. |
| `CHECK_INTERNAL_IP` | Whether internal IP checks are enabled to reduce SSRF risk. Applies only to outbound URLs controlled by users or workflows; operator-configured service addresses (SSO/external user system, model addresses, Feishu/DingTalk/Yuque base URLs, custom PDF parse, custom censor, fast login, chat log, SMS proxy, invoice webhook, enterprise auth, etc.) are unaffected. |
| `DB_MAX_LINK` | Maximum connection pool size for MongoDB, PG, OceanBase, openGauss, and other databases. Values are clamped to 10–1000. |

## Variables removed from the reference (2)

| Variable | v4.16.2 group | v4.16.2 description | In v4.17.2 env.ts definitions |
| --- | --- | --- | --- |
| `CHAT_API_KEY` | Service URLs and Integrations | Default OpenAI-compatible model API key when AI Proxy token is not configured. | No longer defined |
| `OPENAI_BASE_URL` | Service URLs and Integrations | Default OpenAI-compatible model endpoint when AI Proxy is not configured. | No longer defined |

## How to read it

1. The source check looks up each variable's `.default(...)` in the v4.17.2 `env.ts` files. "Matches" means the source default equals the documented one. "Not defined in open-source env.ts" usually means a commercial service reads the variable, or another module reads it directly.
2. "Removed from the reference" means the variable no longer appears in the v4.17.2 documentation. A variable that is still defined in v4.17.2 may have moved or still be read for compatibility; "No longer defined" only covers the env.ts definition files. Check your deployment before upgrading.
3. Before upgrading, start with the removed variables and the new defaults: deployments that relied on an old default may behave differently afterwards.

## Scope of this reference

Values come from the official documentation and open-source repository code of FastGPT v4.16.2 and v4.17.2. Self-hosted deployments follow their own configuration files; commercial services follow the commercial documentation.

## Sources

- [FastGPT environment variable documentation (current)](https://doc.fastgpt.cn/en/self-host/config/env)
- [FastGPT v4.16.2 service environment definitions](https://github.com/labring/FastGPT/blob/v4.16.2/packages/service/env.ts)
- [FastGPT v4.16.2 app environment definitions](https://github.com/labring/FastGPT/blob/v4.16.2/projects/app/src/env.ts)
- [FastGPT v4.16.2 code sandbox environment definitions](https://github.com/labring/FastGPT/blob/v4.16.2/projects/code-sandbox/src/env.ts)
- [FastGPT v4.17.2 service environment definitions](https://github.com/labring/FastGPT/blob/v4.17.2/packages/service/env.ts)
- [FastGPT v4.17.2 app environment definitions](https://github.com/labring/FastGPT/blob/v4.17.2/projects/app/src/env.ts)
- [FastGPT v4.17.2 code sandbox environment definitions](https://github.com/labring/FastGPT/blob/v4.17.2/projects/code-sandbox/src/env.ts)
