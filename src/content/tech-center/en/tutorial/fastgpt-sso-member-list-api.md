---
title: Call FastGPT SSO Member List API
slug: /en/tutorial/fastgpt-sso-member-list-api
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/sso
source_type: Official documentation
---

# Call FastGPT SSO Member List API

## Overview
This standard GET API endpoint provides a synchronized list of platform users for FastGPT single sign-on (SSO) integration. Administrators use this endpoint to pull user data to align FastGPT access controls with existing identity management systems. All requests require valid admin authentication via a Bearer [REDACTED_CREDENTIAL]

## Request Specification
The API follows standard REST conventions, with fixed formatting requirements:
- HTTP Method: `GET`
- Base Endpoint: `https://example.com/user/list` (replace `example.com` with your FastGPT deployment domain)
Required request headers are listed below:
| Header Name          | Requirement | Details |
|----------------------|-------------|---------|
| Authorization        | Required    | Bearer token for admin authentication, formatted as `Bearer [REDACTED_CREDENTIAL]` |
| Content-Type         | Required    | Must be set to `application/json` |

A complete curl request example is provided below:
```bash
curl -X GET "https://example.com/user/list" \
-H "Authorization: Bearer [REDACTED_CREDENTIAL]" \
-H "Content-Type: application/json"
```

## Response Schema & Examples
The API returns a JSON response matching the official `UserListResponseListType` TypeScript definition:
```typescript
type UserListResponseListType = {
  message?: string; // Error message
  success: boolean;
  userList: {
    username: string; // Unique ID. username must match the username returned by the SSO interface. Must include a prefix, e.g., sync-aaaaa, consistent with the SSO interface prefix
    memberName?: string; // Name, used as tmbname
    avatar?: string;
    contact?: string; // email or phone number
    orgs?: string[]; // IDs of organizations the member belongs to. Pass [] if no organization
  }[];
};
```
Each entry in the `userList` array has specific requirements:
- `username`: Mandatory unique identifier, must use a consistent prefix as defined by your SSO integration to match cross-system user records.
- `memberName`: Optional display name for the user within FastGPT.
- `avatar`: Optional URL linking to the user's profile image.
- `contact`: Optional email address or phone number for user communication.
- `orgs`: Array of organization IDs the user is associated with; use an empty array `[]` if the user has no assigned organizations.

A complete sample successful response is shown below:
```json
{
  "success": true,
  "message": "",
  "userList": [
    {
      "username": "fastgpt-123456789",
      "memberName": "John Doe",
      "avatar": "https://example.webp",
      "contact": "+861234567890",
      "orgs": ["od-125151515", "od-51516152"]
    },
    {
      "username": "fastgpt-12345678999",
      "memberName": "Jane Smith",
      "avatar": "",
      "contact": "",
      "orgs": ["od-125151515"]
    }
  ]
}
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/admin/sso)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
