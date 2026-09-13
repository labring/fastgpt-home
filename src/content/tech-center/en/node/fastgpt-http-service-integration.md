---
title: Integrate HTTP Services in FastGPT Workflows
slug: /en/node/fastgpt-http-service-integration
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/http
source_type: Official documentation
---

# Integrate HTTP Services in FastGPT Workflows

### HTTP Service Integration Overview
FastGPT workflow nodes include a configurable HTTP request node that allows connecting to custom backend services to extend workflow functionality. This reference covers implementing a POST-compatible HTTP service aligned with FastGPT’s HTTP node input requirements, using the provided TypeScript code example.

### Request Payload Specification
The service accepts a JSON POST request body with the following required fields, as defined in the `RequestType` TypeScript type:
| Field Name | Type | Allowed Values | Purpose |
|------------|------|----------------|---------|
| appId | string | Any valid string | Unique identifier for the target application or resource set |
| appointment | string | Any valid string | Serialized JSON string containing data for the target record |
| action | string | `post`, `delete`, `put`, `get` | CRUD operation to execute against the target resource |

### Step-by-Step Service Implementation
Start by defining the type-safe request structure to validate incoming data:
```ts
type RequestType = {
  appId: string;
  appointment: string;
  action: 'post' | 'delete' | 'put' | 'get';
};
```
Next, implement the core request handler function. The `handleAppointmentRequest` function extracts and validates the incoming body, parses the serialized `appointment` string, and routes requests to the appropriate CRUD operation function:
```ts
export async function handleAppointmentRequest(body: RequestType) {
  try {
    const { appId, appointment, action } = body;

    const parseBody = JSON.parse(appointment);
    if (action === 'get') {
      return await getRecord(appId, parseBody);
    }
    if (action === 'post') {
      return await createRecord(appId, parseBody);
    }
    if (action === 'put') {
      return await putRecord(appId, parseBody);
    }
    if (action === 'delete') {
      return await removeRecord(appId, parseBody);
    }

    return {
      response: 'Error'
    };
  } catch (err) {
    return {
      response: 'Error'
    };
  }
}
```
The handler supports four CRUD operations, each calling a corresponding backend function (`getRecord`, `createRecord`, `putRecord`, `removeRecord`) with the `appId` and parsed appointment data. If an invalid action is provided, or any error occurs during parsing or execution, the handler returns a standardized error response.

### Standardized Response Format
All requests return a JSON object with a top-level `response` field. Successful requests return operation-specific data from the called backend function. Failed requests—including invalid actions, malformed `appointment` JSON, or runtime errors—return `{ response: 'Error' }`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/http)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
