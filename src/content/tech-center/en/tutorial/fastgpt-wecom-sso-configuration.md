---
title: Configure WeCom Single Sign-On for FastGPT
slug: /en/tutorial/fastgpt-wecom-sso-configuration
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/sso
source_type: Official documentation
---

# Configure WeCom Single Sign-On for FastGPT

This document provides standardized setup steps and configuration parameters for enabling WeCom single sign-on (SSO) for FastGPT instances.

## Prerequisite Parameter Collection
Before deploying the SSO service, collect all required parameters from your WeCom enterprise admin console:
1.  **Enterprise CorpID**:
    a. Log in to the WeCom admin console at `https://work.weixin.qq.com/wework_admin/loginpage_wx`
    b. Navigate to the "My Enterprise" page to copy your unique enterprise ID.
2.  **FastGPT Internal WeCom App**:
    a. Create a new internal app dedicated to FastGPT, then retrieve its AgentID and Secret from the app dashboard.
    b. Set the app's visibility scope to the root department to grant full enterprise access.
3.  **Compliant Domain Name**:
    a. Must resolve to a publicly accessible server.
    b. Must serve static files at the root path for domain ownership verification (the test file may be removed after verification completes).
    c. Enable web authorization, JS-SDK, and WeCom authorization login for the domain in the admin console.
    d. Optional: Enable "Hide app in Studio" on the WeCom Authorization Login page.
4.  **Contact Sync Assistant Secret**:
    Access this secret via Security & Management > Management Tools > Contact Sync; it is required for syncing enterprise contact and organization member data.
5.  Enable interface sync for your WeCom enterprise.
6.  Copy all remaining required API secrets from your WeCom app settings.
7.  Configure enterprise trusted IPs in the WeCom admin console to allow API access from your FastGPT server.

## Docker Compose Configuration Example
Use the following official Docker Compose snippet to deploy the FastGPT SSO service, replacing all placeholder values with your collected parameters:
```yaml
fastgpt-sso:
  image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.9.0
  container_name: fastgpt-sso
  restart: always
  networks:
    - fastgpt
  environment:
    - AUTH_TOKEN=xxxxx
    - SSO_PROVIDER=wecom
    - WECOM_TARGET_URL_OAUTH=https://open.weixin.qq.com/connect/oauth2/authorize
    - WECOM_TARGET_URL_SSO=https://login.work.weixin.qq.com/wwlogin/sso/login
    - WECOM_GET_USER_ID_URL=https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo
    - WECOM_GET_USER_INFO_URL=https://qyapi.weixin.qq.com/cgi-bin/auth/getuserdetail
    - WECOM_GET_USER_NAME_URL=https://qyapi.weixin.qq.com/cgi-bin/user/get
    - WECOM_GET_DEPARTMENT_LIST_URL=https://qyapi.weixin.qq.com/cgi-bin/department/list
    - WECOM_GET_USER_LIST_URL=https://qyapi.weixin.qq.com/cgi-bin/user/list_id
    - WECOM_CORPID=
    - WECOM_AGENTID=
    - WECOM_APP_SECRET=
    - WECOM_SYNC_SECRET=
```

## Key Environment Variable Reference
The following table lists all required environment variables for the WeCom SSO service, with exact fixed values as defined in the official configuration:
| Variable Name | Purpose | Fixed Endpoint Value |
|---------------|---------|----------------------|
| AUTH_TOKEN | Secure authentication token for internal service communication | N/A (user-defined) |
| SSO_PROVIDER | Enables WeCom SSO deployment mode | `wecom` |
| WECOM_TARGET_URL_OAUTH | OAuth authorization endpoint for WeCom clients | `https://open.weixin.qq.com/connect/oauth2/authorize` |
| WECOM_TARGET_URL_SSO | QR code-based SSO login endpoint | `https://login.work.weixin.qq.com/wwlogin/sso/login` |
| WECOM_GET_USER_ID_URL | API endpoint to retrieve basic user ID | `https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo` |
| WECOM_GET_USER_INFO_URL | API endpoint to retrieve full user details | `https://qyapi.weixin.qq.com/cgi-bin/auth/getuserdetail` |
| WECOM_GET_USER_NAME_URL | API endpoint to retrieve user display names | `https://qyapi.weixin.qq.com/cgi-bin/user/get` |
| WECOM_GET_DEPARTMENT_LIST_URL | API endpoint to list enterprise department IDs | `https://qyapi.weixin.qq.com/cgi-bin/department/list` |
| WECOM_GET_USER_LIST_URL | API endpoint to list all enterprise user IDs | `https://qyapi.weixin.qq.com/cgi-bin/user/list_id` |
| WECOM_CORPID | Unique WeCom enterprise ID | N/A (user-defined) |
| WECOM_AGENTID | Agent ID of the FastGPT internal WeCom app | N/A (user-defined) |
| WECOM_APP_SECRET | Secret key for the FastGPT internal WeCom app | N/A (user-defined) |
| WECOM_SYNC_SECRET | Secret key for the WeCom Contact Sync Assistant | N/A (user-defined) |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/admin/sso)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
