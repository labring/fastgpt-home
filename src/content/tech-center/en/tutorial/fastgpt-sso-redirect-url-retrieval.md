---
title: Retrieve FastGPT SSO Login Redirect URL
slug: /en/tutorial/fastgpt-sso-redirect-url-retrieval
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/sso
source_type: Official documentation
---

# Retrieve FastGPT SSO Login Redirect URL

## Overview
This GET endpoint returns a pre-configured SSO login redirect URL for FastGPT administrative single sign-on setups. When invoked, FastGPT automatically appends the required `redirect_uri` query parameter to the generated URL, which specifies the callback location the identity provider will use to return to FastGPT after successful authentication.

## Request Specifications
All requests must include the required query parameters and HTTP headers as outlined below:
| Field | Type | Requirement | Details |
|-------|------|-------------|---------|
| `redirect_uri` | Query string | Required | Callback URI for post-authentication redirection |
| `state` | Query string | Required | Opaque random value to mitigate cross-site request forgery (CSRF) risks |
| `Authorization` | HTTP Header | Required | Bearer token for administrative API access, formatted as `Bearer [REDACTED_CREDENTIAL]` |
| `Content-Type` | HTTP Header | Required | Must be set to `application/json` |

The following curl command demonstrates a valid request:
```bash
curl -X GET "https://redict.example/login/oauth/getAuthURL?redirect_uri=xxx&state=xxxx" \
-H "Authorization: Bearer [REDACTED_CREDENTIAL]" \
-H "Content-Type: application/json"
```

## Response Formats
The endpoint returns a JSON object with three top-level fields: `success` (boolean status indicator), `message` (human-readable status details), and `authURL` (the generated SSO login redirect URL).

### Success Response
A successful request returns a `200 OK` HTTP status code with the following JSON structure:
```json
{
  "success": true,
  "message": "",
  "authURL": "https://example.com/somepath/login/oauth?redirect_uri=https%3A%2F%2Ffastgpt.cn%2Flogin%2Fprovider%0A"
}
```

### Failure Response
A failed request returns a `200 OK` HTTP status code (consistent with FastGPT API standards) with the following JSON structure, where `message` contains a descriptive error string:
```json
{
  "success": false,
  "message": "Error message",
  "authURL": ""
}
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/admin/sso)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
