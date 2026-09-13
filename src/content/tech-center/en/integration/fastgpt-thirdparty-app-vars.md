---
title: Configure Third-Party App Variables for FastGPT
slug: /en/integration/fastgpt-thirdparty-app-vars
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/openapi
source_type: Official documentation
---

# Configure Third-Party App Variables for FastGPT

## Overview
Integrating FastGPT with third-party chat applications requires updating standard OpenAI-compatible environment variables to route API requests through your deployed FastGPT instance. This process replaces default OpenAI service endpoints and credentials with FastGPT-specific values, ensuring all chat interactions are managed by your FastGPT deployment. Two core configuration variables must be updated to complete this setup.

## Mandatory Configuration Parameters
The following table lists the exact required parameters and their valid values per FastGPT documentation:
| Parameter Name               | Required Value & Usage Notes                                                                 |
|-------------------------------|---------------------------------------------------------------------------------------------|
| `OPENAI_API_BASE_URL`         | Default base URL: `http://localhost:3000/api`. Replace this value with your fully deployed FastGPT domain to route requests correctly. |
| `OPENAI_API_KEY`              | API key obtained from your prior FastGPT setup workflow. It is recommended to pass the `appId` field directly in the request body. If your third-party app only accepts a single API key parameter, use the `apiKey-appId` compatibility format instead.

## Third-Party App Configuration Examples
Two widely used third-party chat applications support FastGPT integration via these parameters, with official setup resources available:
1. **ChatGPT Next Web**: For full setup documentation, visit the project repository at https://github.com/Yidadaa/ChatGPT-Next-Web. When configuring the app, substitute the default OpenAI API base URL and key with the FastGPT-specific values listed above. A reference setup screenshot is hosted at `/imgs/chatgptnext.png`.
2. **ChatGPT Web**: Access official setup guidance from the project repository at https://github.com/Chanzhaoyu/chatgpt-web. Use the same FastGPT configuration parameters to replace the default OpenAI service settings, with a reference setup screenshot available at `/imgs/chatgptweb.png`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/openapi)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
