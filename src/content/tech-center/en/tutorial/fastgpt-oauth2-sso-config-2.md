---
title: Set Up FastGPT OAuth 2.0 SSO Integration
slug: /en/tutorial/fastgpt-oauth2-sso-config-2
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/sso
source_type: Official documentation
---

# Set Up FastGPT OAuth 2.0 SSO Integration

## OAuth 2.0 SSO Overview
FastGPT integrates with standard OAuth 2.0 using the authorization code grant flow defined in RFC 6749. This integration follows the official OAuth 2.0 specification, with auto-populated fixed parameters including grant_type and redirect_uri (redirect_uri is automatically populated based on your runtime environment). Supported references include the RFC 6749 documentation and Ruan Yifeng’s OAuth 2.0 guide.

## Required Endpoints & Workflow
The integration requires three core endpoints, with a defined end-to-end flow:
1.  **Login Authorization Endpoint**: Users are redirected here after clicking the FastGPT SSO button. A sample GET request follows:
    ```bash
    curl -X GET\
    "http://example.com/oauth/authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz&redirect_uri=https%3A%2F%2Ffastgpt.cn%2Flogin%2Fprovider"
    ```
    After successful credential entry, users are redirected back to the FastGPT redirect URI with a `code` and `state` parameter, e.g., `https://fastgpt.cn/login/provider?code=4/P7qD2qAz4&state=xyz`.
2.  **Access Token Endpoint**: A server-side POST request to this endpoint exchanges the authorization code for an access token. The request must use `application/x-www-form-urlencoded` content type (not application/json). Sample request:
    ```bash
    curl -X POST\
        -H "Content-Type: application/x-www-form-urlencoded"\
    "http://example.com/oauth/access_token?grant_type=authorization_code&client_id=s6BhdRkqt3&client_secret=xxx&code=4/P7qD2qAz4&redirect_uri=https%3A%2F%2Ffastgpt.cn%2Flogin%2Fprovider"
    ```
3.  **User Info Endpoint**: A GET request to this endpoint retrieves user details using the issued access token, passed via the `Authorization: Bearer <token>` header. Sample request:
    ```bash
    curl -X GET\
        -H "Authorization: Bearer [REDACTED_CREDENTIAL]"\
        "http://example.com/oauth/user_info"
    ```

## Configuration Parameters & Deployment Example
Required and optional configuration parameters include:
- Mandatory: `CLIENT_ID`, `OAUTH2_AUTHORIZE_URL`, `OAUTH2_TOKEN_URL`, `OAUTH2_USER_INFO_URL`, `OAUTH2_USERNAME_MAP`
- Optional: `CLIENT_SECRET`, `SCOPE`, `OAUTH2_AVATAR_MAP`, `OAUTH2_MEMBER_NAME_MAP`, `OAUTH2_CONTACT_MAP`

The following Docker Compose snippet shows a standard deployment configuration for the FastGPT SSO service:
```yaml
fastgpt-sso:
  image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.9.0
  container_name: fastgpt-sso
  restart: always
  networks:
    - fastgpt
  environment:
    - SSO_PROVIDER=oauth2
    - AUTH_TOKEN=xxxxx
    # OAuth2.0
    # === Request URLs ===
    # 1. OAuth2 login authorization URL (required)
    - OAUTH2_AUTHORIZE_URL=
    # 2. OAuth2 access token URL (required)
    - OAUTH2_TOKEN_URL=
    # 3. OAuth2 user info URL (required)
    - OAUTH2_USER_INFO_URL=
    # === Parameters ===
    # 1. client_id (required)
    - OAUTH2_CLIENT_ID=
    # 2. client_secret (optional)
    - OAUTH2_CLIENT_SECRET=
    # 3. scope (optional)
    - OAUTH2_SCOPE=
    # === Field Mapping ===
    # OAuth2 username field mapping (required)
    - OAUTH2_USERNAME_MAP=
    # OAuth2 avatar field mapping (optional)
    - OAUTH2_AVATAR_MAP=
    # OAuth2 member name field mapping (optional)
    - OAUTH2_MEMBER_NAME_MAP=
    # OAuth2 contact field mapping (optional)
    - OAUTH2_CONTACT_MAP=
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/admin/sso)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
