---
title: Set Up FastGPT Share Link Authentication
slug: /en/integration/fastgpt-share-link-authentication
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/link
source_type: Official documentation
---

# Set Up FastGPT Share Link Authentication

## Share Link Identity Verification Overview
This feature adds custom identity validation for publicly shared FastGPT application links. When configured, you provide a root URL for POST requests. FastGPT will automatically send authenticated requests to endpoints under this root URL during three critical share link events: share link initialization, chat session start, and chat session completion. Your backend server only needs to evaluate the request and return a standardized validation response; no additional data is required for the integration.

## Standardized Server Response Format
Your backend must return a JSON object with the following structure. All fields except where noted are required for proper validation:
```jsonc
{
  "success": true,
  "message": "Error message",
  "msg": "Same as message, error message",
  "data": {
    "uid": "Unique user identifier" // Required
  }
}
```
Breakdown of key fields:
- `success`: A boolean value that FastGPT uses to confirm access. If set to `true`, the user is granted access to the shared link. Any other value will display the provided error message to the user.
- `message` and `msg`: Equivalent error message strings. Only used when `success` is `false`, these values are identical and either can be provided.
- `data.uid`: A required unique string identifier for the end user. This ID must not contain the characters `|`, `/`, or `\`, and must be 255 bytes or fewer in length. If the UID format is invalid, FastGPT will return an `Invalid UID` error. This UID is used to pull and save user chat history across sessions.

## Configuration and Request Flow
To enable identity verification for a shared link:
1. Access the publish and share configuration page for your FastGPT application.
2. Locate the `Identity Verification` input field.
3. Enter your custom POST root URL (referred to as `host` in technical documentation).
4. Save the updated share link settings.

FastGPT will send POST requests to endpoints under the provided root URL for each of the three tracked events. A visual breakdown of the full request workflow is available in the included diagram at `/imgs/sharelink_process.png`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/link)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
