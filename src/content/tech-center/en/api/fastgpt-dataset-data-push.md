---
title: Push Dataset Data to FastGPT Processing Queue
slug: /en/api/fastgpt-dataset-data-push
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Push Dataset Data to FastGPT Processing Queue

# Introduction to Dataset Data Push Endpoint
This API endpoint submits dataset content to FastGPT’s built-in processing queue for automated indexing and preparation for retrieval-augmented workflows. Each individual request can send up to 200 data groups. FastGPT automatically creates processing usage records, so you do not need to provide a `billId` parameter when making requests. The endpoint uses a POST method and is accessible at `http://localhost:3000/api/core/dataset/data/pushData`.

# Request Parameters
All request parameters are submitted via a JSON body in the POST request. The full parameter list is below:
| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `collectionId` | Yes | String | Unique identifier of the target dataset collection |
| `trainingType` | Yes | String | Indexing mode; valid values include `chunk` for standard chunk-based indexing |
| `prompt` | No | String | Custom QA split prompt, ignored when `trainingType` is set to `chunk`. Must follow the official template strictly, and is recommended to omit unless custom splitting is needed |
| `data` | Yes | Array | List of data groups to process. Each data group supports the following fields: |
| → `q` | Yes | String | Primary data (typically a question or core content snippet) |
| → `a` | No | String | Auxiliary data (typically an answer or supplementary content) |
| → `indexes` | No | Array | Custom index entries. Each entry is an object with a `text` field. If omitted, FastGPT automatically generates indexes from the `q` and `a` fields |

# Example Requests and Responses
A sample curl request is shown below, which submits two data groups to a target collection:
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/data/pushData' \
--header 'Authorization: Bearer [REDACTED_CREDENTIAL]' \
--header 'Content-Type: application/json' \
--data-raw '{
    "collectionId": "64663f451ba1676dbdef0499",
    "trainingType": "chunk",
    "prompt": "Optional. QA split guide prompt, ignored in chunk mode",
    "data": [
        {
            "q": "Who are you?",
            "a": "I'm FastGPT Assistant"
        },
        {
            "q": "What can you do?",
            "a": "I can do anything",
            "indexes": [
                {
                    "text":"Custom index 1"
                },
                {
                    "text":"Custom index 2"
                }
            ]
        }
    ]
}'
```
A successful response returns a JSON object with processing results:
```json
{
  "code": 200,
  "statusText": "",
  "data": {
    "insertLen": 1,
    "overToken": [],
    "repeat": [],
    "error": []
  }
}
```
The response `data` field includes four keys: `insertLen` for the total number of successfully inserted items, `overToken` for items exceeding token limits, `repeat` for duplicate items, and `error` for items that failed for other reasons.

# Custom QA Split Prompt Template
When using a training type other than `chunk`, you can use the official QA split prompt template to auto-generate question-answer pairs from raw text. The template is:
```
I'll give you a text, [theme], learn it, and organize the learning results, requirements:
1. Propose up to 25 questions.
2. Provide answers to each question.
3. Answers should be detailed and complete, and can include plain text, links, code, tables, formulas, media links, and other markdown elements.
4. Return multiple questions and answers in format:

Q1: Question.
A1: Answer.
Q2:
A2:
……

My text:"""{{text}}"""
```
The `[theme]` placeholder can be replaced with a specific data theme; the default value is "They may contain multiple theme contents".

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
