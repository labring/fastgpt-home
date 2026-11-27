---
title: Knowledge Retrieval and Business APIs in FastGPT
slug: /en/compare/fastgpt-v4174-history-vs-live-data-source-monitoring
page_type: matrix
source: https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search
source_type: 深度场景内容
meta_title: Knowledge Retrieval and Business APIs in FastGPT
meta_description: Choose knowledge retrieval or a business API in FastGPT by the information needed, keeping document versions, query times and response fields.
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-v4174-history-vs-live-data-source-monitoring-en","task_id":"W19-matrix-06","article_id":"W19-matrix-06-en","language":"en","content_type":"matrix","meta_title":"Knowledge Retrieval and Business APIs in FastGPT","meta_description":"Choose knowledge retrieval or a business API in FastGPT by the information needed, keeping document versions, query times and response fields.","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-v4174-history-vs-live-data-source-monitoring","source_language":"zh","source_sha256":"b226b6c868a9c8a4db095c8dc478a662cf7fe4215da2438413a59fd97707bf88","keywords":"[\"knowledge retrieval\",\"business API\",\"current records\"]"},"editorial_notes":[]}
keywords: knowledge retrieval, business API, current records
schema_type: Article
date_modified: 2026-11-23
---

# Knowledge Retrieval and Business APIs in FastGPT

## Identify the kind of fact being requested

A question about using a feature usually needs product documentation. A question about whether a customer has activated it needs a current business record. Both can appear in one conversation, but their sources are maintained differently. FastGPT knowledge search returns document references, while HTTP requests can call existing business APIs. Separate documented explanation from current state before choosing a source.

## Compare update patterns and business objects

Manuals change with products or policies, while records change with transactions or service state. Retrieval suits documented explanations and conditions; APIs suit current fields defined by the business system. When combining them, align both results with the same question and object. The table organizes this division without removing the need to check API authorization, document applicability or processing state.

| Question | Primary source | Evidence to inspect |
| --- | --- | --- |
| Explain a feature or policy | Applicable document retrieval | Version, conditions and reference |
| Current customer or order state | Authorized business API | Object, fields and query time |
| Does this customer meet a condition? | Documents combined with API results | Alignment of stated conditions and current fields |

## Keep document versions and references

[Knowledge search](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search) can combine knowledge bases sharing an embedding model and returns references as an array. Keep versions, applicable conditions and source access so the answer can be traced to a passage. An empty array means this search returned no usable material. Clarify the request or check the source next. Use the business API result to determine whether a customer record exists.

## Keep the object and time with API results

Before reading records through an [HTTP request](https://doc.fastgpt.io/guide/build/workflow/nodes/http), define the object identifier, caller identity, query conditions and fields. Structured response values can be used directly, with explanatory text organized around them. Null values, no matching record and request failure have different meanings under the API contract. Retain query time to explain why a later lookup may show a changed state.

## Preserve both evidence types in a combined answer

If documentation requires a configuration that the customer record does not contain, preserve the difference and identify what needs confirmation. Inspect the document passage and API response side by side, checking product conditions and customer state separately. Send unresolved differences to the business owner with the original passage and fields. Support or sales staff then have evidence to inspect and can locate the document or record needing maintenance.
