---
title: Retrieve FastGPT SSO Authenticated User Data
slug: /en/tutorial/fastgpt-sso-user-info-api
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/sso
source_type: Official documentation
---

# Retrieve FastGPT SSO Authenticated User Data

# Interface Overview
This endpoint supports single sign-on (SSO) integration for FastGPT by validating an authentication code and returning standardized user profile information. The interface consumes the provided authentication code upon successful validation, preventing reuse of the same code for subsequent requests. All requests must use the GET HTTP method and include required authentication headers.

# Request Specifications
This table outlines all required request components:
| Component | Details |
|-----------|---------|
| HTTP Method | GET |
| Query Parameter | `code`: Required string, authentication code issued by the SSO identity provider |
| Required Headers | 1. `Authorization: Bearer {your_token_here}`: Bearer token for API authentication<br>2. `Content-Type: application/json`: Standard JSON content type header |
| Example Endpoint | `https://oauth.example/login/oauth/getUserInfo?code=xxxxxx` |

# Example Requests and Responses
### Request Example
```bash
curl -X GET "https://oauth.example/login/oauth/getUserInfo?code=xxxxxx" \
-H "Authorization: Bearer [REDACTED_CREDENTIAL]" \
-H "Content-Type: application/json"
```

### Success Response
```json
{
  "success": true,
  "message": "",
  "username": "fastgpt-123456789",
  "avatar": "https://example.webp",
  "contact": "+861234567890",
  "memberName": "Member name (optional)"
}
```

### Failure Response
```json
{
  "success": false,
  "message": "Error message",
  "username": "",
  "avatar": "",
  "contact": ""
}
```

# Response Field Reference
All responses include a top-level `success` boolean flag indicating request outcome. Standardized response fields are defined as follows:
- `success`: Boolean, true for successful validation, false for failed requests
- `message`: String, empty on success, contains detailed error information on failure
- `username`: String, unique user identifier, returns empty string on failed requests
- `avatar`: String, HTTPS URL to the user's profile image, returns empty string on failure
- `contact`: String, user's contact information, returns empty string on failure
- `memberName`: Optional string, user's display name, only included in successful responses

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/admin/sso)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
