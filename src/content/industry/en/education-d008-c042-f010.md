---
title: Citations and Source Traceability for Corporate Sales and Product Training: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c042-f010
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Citations | Access
meta_description: Sales Training: review citations for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Sales and Product Training: Manage Authorized Access and External Services

## What this category's data looks like

This category's data looks like this
For the enterprise sales product training category, materials include product manuals, sales response scripts, and channel training schedules. Product manuals provide the original text of parameters and terms, sales response scripts carry scenario examples and response points, and channel training schedules record scheduling, instructors, and audiences. When the three types of materials enter knowledge base retrieval, manuals and response scripts are hit as citation sources, while schedules are used to verify time and personnel fields. Field characteristics: name, quantity, date, version number, signature, and receipt. Update cadence: manuals iterate with versions, response scripts are revised quarterly, and schedules are updated by batch. Common inconsistencies: the name, quantity, and date of the same record do not match across two materials; versions are not synchronized; signatures or receipts are missing. Authorized access and external services require that visitor identity matches the visible scope, unauthorized access must not be visible, and when opened to parents or superiors, citation sources and traceability are displayed according to the entry point and authorization scope.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text fragment and source identifier, and the length can be 0. "Externally available entry points and authorization scope" are completed next by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Whether fields, dates, and signatures are consistent with the response scripts and schedules | Compare the names, quantities, and dates in the manual and response scripts, and verify the version number and signature receipt |
| Sales response scripts | Whether the name, quantity, and date of the same record match across the two materials | Extract citation fragments from the response scripts, trace them back to the original manual paragraphs, and record the array length and `quoteMaxToken` |
| Channel training schedules | Whether scheduling, instructors, audiences, and signature receipts are complete | Verify schedule dates and receipts, and check whether versions are synchronized |
| Citation content output | The number of returned items matches the materials hit, and being empty is also normal | Run a test with a question that matches no materials, see that the output is empty while the chain continues, and inspect `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match across two materials. Cause: the manual and response scripts are revised separately, without field-level comparison and version synchronization.
- Symptom: versions are not synchronized, and citation fragments do not match the original text. Cause: the knowledge base collection was not updated with the manual, so retrieval hits old paragraphs.
- Symptom: signatures or receipts are missing, and schedules and response scripts cannot be verified. Cause: channel training schedules did not return signatures, and completeness checks were missing before the materials entered retrieval.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and verify whether the citation array and footnote markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs.

Business test: access once with a restricted identity and see whether the visible scope matches the setting.

- In the node, verify the selected collections and their vector models, open the search parameter panel, and check the values item by item
- In the conversation, open the citation footnote markers, compare them with the source documents, record the number of citations and the `quoteMaxToken` budget, and inspect `quoteList` within `responseData`

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
