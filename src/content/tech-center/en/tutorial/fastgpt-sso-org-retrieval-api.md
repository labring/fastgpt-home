---
title: Retrieve FastGPT Organizational Data via SSO Interface
slug: /en/tutorial/fastgpt-sso-org-retrieval-api
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/sso
source_type: Official documentation
---

# Retrieve FastGPT Organizational Data via SSO Interface

## Interface Overview
This document details the FastGPT SSO standard `Get Organizations` interface, used to synchronize organizational department data between FastGPT and your integrated identity management system. A mandatory prerequisite for using this interface: only one root department is supported. If your identity system contains multiple root departments, you must first create a virtual root department to aggregate all top-level departments before submitting requests via this API.

## Request Specification
This is an authenticated GET request with two required HTTP headers. The endpoint URL should be replaced with your organization's configured SSO API endpoint.
### Request Details
| HTTP Method | Endpoint Pattern               |
|-------------|--------------------------------|
| GET         | `https://your-domain/org/list` |

### Required Headers
| Header Name               | Format Example                          | Purpose                                  |
|---------------------------|-----------------------------------------|------------------------------------------|
| Authorization             | `Bearer [REDACTED_CREDENTIAL]`              | Authenticate the API request with a valid bearer token |
| Content-Type              | `application/json`                      | Declare the request content type for proper parsing |

A complete curl request example is provided below:
```bash
curl -X GET "https://example.com/org/list" \
-H "Authorization: Bearer [REDACTED_CREDENTIAL]" \
-H "Content-Type: application/json"
```

## Response Structure & Examples
All responses follow the `OrgListResponseType` TypeScript definition. The response includes a success flag, optional error message, and an array of department objects.
### Core Response Fields
| Field Name | Type         | Description                                                                 |
|------------|--------------|-----------------------------------------------------------------------------|
| success    | boolean      | Indicates whether the request completed successfully                         |
| message    | string?      | Optional error message provided if the request fails                         |
| orgList    | Department[] | Array of department objects matching the FastGPT organizational structure    |

Each department object in `orgList` includes these fields:
| Field Name | Type   | Description                                                                 |
|------------|--------|-----------------------------------------------------------------------------|
| id         | string | Unique alphanumeric identifier for the department                           |
| name       | string | Human-readable display name of the department                                |
| parentId   | string | Unique identifier of the parent department; empty string for root departments|

A critical note: Only one root department can exist in the synchronized organization data. If your source system has multiple root departments, you must add a virtual root department first.

### TypeScript Response Type
```ts
type OrgListResponseType = {
  message?: string; // Error message
  success: boolean;
  orgList: {
    id: string; // Unique department ID
    name: string; // Name
    parentId: string; // parentId — empty string for root department
  }[];
};
```

### Sample Successful Response
```json
{
  "success": true,
  "message": "",
  "orgList": [
    {
      "id": "od-125151515",
      "name": "Root Department",
      "parentId": ""
    },
    {
      "id": "od-51516152",
      "name": "Sub Department",
      "parentId": "od-125151515"
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
