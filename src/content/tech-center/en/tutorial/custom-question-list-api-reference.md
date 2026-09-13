---
title: Retrieve matched custom chat input questions
slug: /en/tutorial/custom-question-list-api-reference
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/chat_input_guide
source_type: Official documentation
---

# Retrieve matched custom chat input questions

## Custom Question List API Overview
This API enables retrieval of pre-defined custom chat input questions matched to a specific FastGPT application, using a search keyword as the matching criteria. The configured API endpoint must be directly accessible from the end user’s browser to support client-side integration of question suggestions.

## Request Configuration
The API accepts a GET request with query string parameters for targeting the application and filtering matches. The full sample request command is provided below:
```bash
curl --location --request GET 'http://localhost:3000/api/core/chat/inputGuide/query?appId=663c75302caf8315b1c00194&searchKey=you'
```
All request parameters are required URL query values. The complete parameter reference is listed below:

| Parameter | Required | Details |
|-----------|----------|---------|
| appId | Yes | The unique application ID for the target FastGPT deployment |
| searchKey | Yes | The search keyword used to locate matching custom chat questions, with a maximum allowed length of 50 characters |

## Successful Response Structure
A valid successful request returns a JSON response object with standardized top-level fields. The sample response from the official documentation is shown here:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": ["it's you", "who are you", "you're great", "hello there", "who are you!", "hello"]
}
```
Each field in the response has a defined purpose:
- `code`: Numeric status code, returns 200 for successful requests
- `statusText`: Empty string for successful execution, per official documentation standards
- `message`: Empty string for successful execution, used to convey error details for failed calls
- `data`: An array of string values representing matched custom chat input questions. The API returns a maximum of 5 results per request, as specified in the official guidelines.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/chat_input_guide)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
