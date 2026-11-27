---
title: FastGPT Model Hosting and Request Path Matrix
slug: /en/compare/fastgpt-decision-matrix-08
page_type: matrix
source: https://doc.fastgpt.io/guide/build/workflow/nodes/ai_chat
source_type: 深度场景内容
meta_title: FastGPT Model Hosting and Request Path Matrix
meta_description: Compare local, remote and mixed model paths for FastGPT by compute, endpoint access, request fields, business APIs and handling of unavailable services.
delivery_metadata: {"source_front_matter":{"task_id":"W19-matrix-08","content_type":"matrix","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-decision-matrix-08","article_id":"W19-matrix-08-en","slug":"fastgpt-decision-matrix-08-en","language":"en","meta_title":"FastGPT Model Hosting and Request Path Matrix","meta_description":"Compare local, remote and mixed model paths for FastGPT by compute, endpoint access, request fields, business APIs and handling of unavailable services.","keywords":"[\"model integration\",\"private cloud\",\"model endpoint\"]","source_language":"zh","source_sha256":"eb055f773a5bedb659d3e07a45b3eac659f4d8163d61109a684aadd059b1600d"},"editorial_notes":[]}
keywords: model integration, private cloud, model endpoint
schema_type: Article
date_modified: 2026-11-23
---

# FastGPT Model Hosting and Request Path Matrix

## List three model paths for one application

Define what the application handles, such as answering from an internal manual and using a company API to check device status. Compare a model on the application’s network, a controlled remote endpoint, or different endpoints for different tasks. Record where each request can include the question, references, chat context or business records.

## Compare resources and access

For a model in the company environment, check available compute, configured concurrency and ownership. For a remote endpoint, check its address, network access and accepted data. A mixed design needs a record of each workflow’s model selection and failure path. Keep endpoints, access conditions and inputs together so they can be checked when a model changes.

| Path | What to check | What to inspect on failure |
| --- | --- | --- |
| Local endpoint | Compute, model service and proxy | Model status and application logs |
| Remote endpoint | Egress, authorization and fields | Network records and endpoint response |
| Mixed paths | Node model, allowed fields and trigger | Identify which path ran on this request |

## Check what the model and business API receive

Use the [AI Chat node](https://doc.fastgpt.io/guide/build/workflow/nodes/ai_chat) to configure the dialogue model and its upstream inputs. When a business service is connected through the [HTTP Request node](https://doc.fastgpt.io/guide/build/workflow/nodes/http), record query fields and response structure from the contract, then decide which fields the model actually needs. Device state can be taken directly from the response. Supply checked fields when an explanation is required.

## Review components and failure boundaries

Use the [self-hosted deployment](https://doc.fastgpt.io/self-host/deploy/docker) to review how the application and model gateway are actually arranged, including network restrictions and configuration locations. Test model unavailability, no matching business record and no retrieved references. Record which step ends first, what the user sees and where the owner can trace the reason. Give each error an inspectable path.

## Keep evidence from a real task

Use the same task to inspect source references, device API results and the model endpoint. If endpoints have different access rules, record where the workflow selects one and whether another route may be used when it is unavailable. Ground resource decisions in actual usage and operations records. Use the matrix to describe paths and task tests to evaluate fit. If model execution fails, retain the retrieved material and API status for retry.
