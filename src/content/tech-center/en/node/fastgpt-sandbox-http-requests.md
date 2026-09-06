---
title: Make External HTTP Requests in FastGPT Sandbox
slug: /en/node/fastgpt-sandbox-http-requests
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2
source_type: Official documentation
---

# Make External HTTP Requests in FastGPT Sandbox

## Overview
The built-in `SystemHelper.httpRequest` function enables external HTTP request execution directly within FastGPT sandbox v2 nodes. The implementation includes built-in SSRF protection, which automatically blocks requests to internal network IP addresses to mitigate security risks.

## Code Implementation Examples
Two syntax variants are supported for JavaScript and Python sandbox environments:

### JavaScript Example
```js
async function main({url}){
    const res = await SystemHelper.httpRequest(url, {
        method: 'GET',       // Request method, default GET
        headers: {},         // Custom request headers
        body: null,          // Request body (objects are auto JSON-serialized)
        timeout: 60          // Timeout in seconds, max 60s
    })
    return {
        status: res.status,
        data: res.data
    }
}
```

### Python Example
```python
def main(url):
    res = SystemHelper.httpRequest(url, method="GET", headers={}, timeout=10)
    return {"status": res["status"], "data": res["data"]}
```

## Request Parameter Reference
All configuration for the HTTP request is passed via the optional `options` object (JavaScript) or keyword arguments (Python). The full parameter set is listed below:

| Parameter | Type | Default Value | Description |
|-----------|------|---------------|-------------|
| `url` | string | Required | Target HTTP/HTTPS endpoint for the request |
| `method` | string | `GET` | HTTP request method |
| `headers` | object | `{}` | Custom request headers to include in the request |
| `body` | any | `null` | Request body payload; objects are automatically JSON-serialized |
| `timeout` | integer | `60` | Maximum time in seconds to wait for a response, capped at 60s |

## Usage Limitations
The `httpRequest` function has strict operational constraints to ensure secure and reliable execution:
- Maximum of 30 HTTP requests per single sandbox execution run
- Individual request timeout is limited to 60 seconds
- Maximum allowed size for response bodies is 2MB
- Only `http` and `https` network protocols are supported
- Internal private IP addresses are automatically blocked, including ranges: 127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, and additional private IP subnets.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
