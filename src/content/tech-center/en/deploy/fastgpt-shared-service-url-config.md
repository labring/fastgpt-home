---
title: Configure FastGPT Shared Service URLs and Integrations
slug: /en/deploy/fastgpt-shared-service-url-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Configure FastGPT Shared Service URLs and Integrations

### Overview
This document covers environment variables that define external service connections for self-hosted FastGPT deployments. These variables control integrations with auxiliary services including plugin hosts, code sandboxes, AI model endpoints, CRM tools, and third-party platform APIs. Official deployment templates typically preconfigure internal service URLs, so manual configuration is only required for custom or external service setups.

### Environment Variable Reference
The following table lists all shared service and integration environment variables, their default values, and functional descriptions:
| Variable                 | Default                             | Description                                                                                               |
| ------------------------ | ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `PLUGIN_BASE_URL`        | `http://localhost:3004`             | FastGPT Plugin service URL. Deployment templates usually set this to the internal Plugin service URL.     |
| `PLUGIN_TOKEN`           | `token`                             | Authentication token for calling the Plugin service. It must match the Plugin service configuration.      |
| `CODE_SANDBOX_URL`       | `http://localhost:3002`             | Code Sandbox service URL. Deployment templates usually set this to the internal Code Sandbox service URL. |
| `CODE_SANDBOX_TOKEN`     | `codesandbox`                       | Token used by App when calling Code Sandbox. It must match the sandbox service `SANDBOX_TOKEN`.           |
| `AIPROXY_API_ENDPOINT`   | Empty                               | AI Proxy service URL. When configured, model requests prefer AI Proxy.                                    |
| `AIPROXY_API_TOKEN`      | Empty                               | Token for calling AI Proxy.                                                                               |
| `OPENAI_BASE_URL`        | `https://api.openai.com/v1`         | Default OpenAI-compatible model endpoint when AI Proxy is not configured.                                 |
| `CHAT_API_KEY`           | Empty                               | Default OpenAI-compatible model API key when AI Proxy token is not configured.                            |
| `CRM_API_URL`            | Empty                               | Lead attribution CRM API base URL (including `/api/v1`). Empty disables identity reporting.               |
| `CRM_API_KEY`            | Empty                               | CRM admin API key used to bind a FastGPT user to `visitor_id` after registration or login.                |
| `MARKETPLACE_URL`        | `https://v2.marketplace.fastgpt.cn` | Plugin marketplace API URL.                                                                               |
| `FEISHU_BASE_URL`        | `https://open.feishu.cn`            | Lark Open Platform URL. Use your private Lark domain when self-hosting Lark.                              |
| `DINGTALK_BASE_URL`      | `https://api.dingtalk.com`          | DingTalk new API base URL.                                                                                |
| `DINGTALK_OAPI_BASE_URL` | `https://oapi.dingtalk.com`         | DingTalk OAPI base URL.                                                                                   |
| `YUQUE_DATASET_BASE_URL` | `https://www.yuque.com`             | Yuque Dataset URL.                                                                                        |

### Applying Configuration Changes
To implement these variables, add them to your deployment’s environment configuration file (such as `.env.local`) or pass them as runtime arguments for containerized deployments. For example, to route AI model requests through a custom AI Proxy service, set `AIPROXY_API_ENDPOINT=https://your-proxy-service.example.com` and `AIPROXY_API_TOKEN=your-proxy-auth-token`. If you self-host the Lark platform, update `FEISHU_BASE_URL` to match your private domain. All authentication tokens for external services must exactly match the corresponding service’s configured secrets to prevent connection failures.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
