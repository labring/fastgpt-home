---
title: Set Up Lark Single Sign-On for FastGPT
slug: /en/tutorial/fastgpt-lark-sso-configuration
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/sso
source_type: Official documentation
---

# Set Up Lark Single Sign-On for FastGPT

## Collect Application Credentials
Navigate to the Lark developer console, access your enterprise self-built application, and view your App ID and App Secret on the Credentials & Basic Info page.
![](/imgs/sso3.png)

## Configure Application Permissions
Navigate to the Permission Management page under Development Configuration for your self-built app. Use the Batch Import/Export Permissions feature to import the following permission configuration:
```json
{
  "scopes": {
    "tenant": [
      "contact:user.phone:readonly",
      "contact:contact.base:readonly",
      "contact:department.base:readonly",
      "contact:department.organize:readonly",
      "contact:user.base:readonly",
      "contact:user.department:readonly",
      "contact:user.email:readonly",
      "contact:user.employee_id:readonly"
    ],
    "user": []
  }
}
```
Ensure the accessible data scope is set to visible to all enterprise members.
![](/imgs/sso4.png)

## Set Redirect URI
Go to the Security Settings page under Development Configuration for your Lark app. Configure the redirect URL using the format `https://<your-fastgpt-domain>/login/provider`, replacing the domain with your publicly accessible FastGPT domain. This URL must exactly match the value set in the SSO service configuration.
![](/imgs/sso5.png)

## SSO Service Configuration
Use the following Docker Compose example to deploy the FastGPT SSO service. The following table outlines key required environment variables:

| Environment Variable | Description |
|----------------------|-------------|
| `SSO_PROVIDER` | Set to `feishu` for Lark SSO |
| `AUTH_TOKEN` | Secure authentication token for the SSO service |
| `SSO_TARGET_URL` | Lark OAuth authorization endpoint |
| `FEISHU_TOKEN_URL` | Lark OAuth token exchange endpoint |
| `FEISHU_GET_USER_INFO_URL` | Lark user info retrieval endpoint |
| `FEISHU_REDIRECT_URI` | Must match the redirect URL configured in Lark |
| `FEISHU_APP_ID` | Your Lark enterprise app ID, typically starts with `cli` |
| `FEISHU_APP_SECRET` | Your Lark enterprise app secret |

Full Docker Compose configuration:
```yaml
fastgpt-sso:
  image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.9.0
  container_name: fastgpt-sso
  restart: always
  networks:
    - fastgpt
  environment:
    - SSO_PROVIDER=feishu
    - AUTH_TOKEN=xxxxx
    # OAuth endpoint (for private Lark deployments, replace with your private address; same below)
    - SSO_TARGET_URL=https://accounts.feishu.cn/open-apis/authen/v1/authorize
    # Token endpoint
    - FEISHU_TOKEN_URL=https://open.feishu.cn/open-apis/authen/v2/oauth/token
    # User info endpoint
    - FEISHU_GET_USER_INFO_URL=https://open.feishu.cn/open-apis/authen/v1/user_info
    # Redirect address — must match the URL from step 3 exactly
    - FEISHU_REDIRECT_URI=https://fastgpt.cn/login/provider
    # Lark App ID, usually starts with cli
    - FEISHU_APP_ID=xxx
    # Lark App Secret
    - FEISHU_APP_SECRET=xxx
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/admin/sso)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
