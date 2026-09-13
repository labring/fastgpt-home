---
title: Run FastGPT 4810 Administrative Initialization Tasks
slug: /en/deploy/fastgpt-4810-admin-initialization
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4810
source_type: 官方文档
---

# Run FastGPT 4810 Administrative Initialization Tasks

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Initialization Purpose for FastGPT 4810
This document covers the required administrative initialization step for self-hosted FastGPT deployments at version 4810. The initialization process executes two critical system setup actions: it initializes publish record version markers, and initializes invoice records. These steps ensure the FastGPT 4810 release has properly configured core system data structures.

## Required Input Values
To run the initialization command, you must have two specific values from your FastGPT environment:
1. `rootkey`: The administrative key stored in your FastGPT environment variables. This key authenticates requests to the `/api/admin` endpoint.
2. `{{host}}`: Your public FastGPT domain name, formatted with the appropriate protocol (e.g., `https://your-fastgpt-domain.com`). Do not add trailing slashes or additional path segments to this value.

## Execution Command
Use a terminal with `curl` installed to send the required HTTP POST request. Replace the placeholder values exactly as specified, then run the following command:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4810' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Each component of the command serves a specific function:
- The `--location` flag allows the request to follow any server-side redirects.
- The `POST` HTTP method targets the `/api/admin/initv4810` administrative initialization endpoint.
- The `rootkey` header authenticates the request using your environment's administrative key.
- The `Content-Type: application/json` header specifies the required request content type, even though this endpoint does not accept a request body.

## Successful Execution Confirmation
When the command runs successfully, the FastGPT server will complete the two predefined initialization tasks. The endpoint does not return a visible success message in the terminal. If the request fails, the server will return a structured JSON error response with details about the issue.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4810)
