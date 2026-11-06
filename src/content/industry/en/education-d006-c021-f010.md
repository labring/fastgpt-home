---
title: Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Track Progress and Check Statistics
slug: /en/industry/education-d006-c021-f010
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Citations | Progress
meta_description: Graduation Eligibility: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on student status changes and graduation qualification review, consolidating three types of materials: leave-of-absence and return-to-school applications, major transfer applications, and graduation review checklists. Leave-of-absence and return-to-school applications record the start and end dates of a student's suspension or resumption of student status, approval opinions, and signature fields; major transfer applications record the proposed transfer major, assessment conclusion, and two-level signatures; graduation review checklists list conclusions and review signatures by items such as credits, courses, and thesis. These materials serve as the retrieved source text in knowledge base retrieval nodes. After a retrieval hit, they are returned as citation snippets and source identifiers for subsequent field comparison, ledger writing, and report generation. The update cadence advances by semester batches and weekly report cycles. Within the same batch, materials may be revised multiple times. Fields are mainly names, quantities, dates, signatures, and receipts, and version differences mostly appear between revised drafts and final drafts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing a source text snippet and a source identifier, and the length may be 0. The "progress table and statistical scope description" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence and return-to-school applications | Whether fields, dates, and signatures are complete, and whether the names, quantities, and dates of the same record are consistent between the application and the receipt | Open the citation marker to point back to the original paragraph, check item by item the leave start and end dates, return date, and approval signature, and separately mark those missing signatures or receipts |
| Major transfer applications | Whether the proposed transfer major, assessment conclusion, two-level signatures, and dates match, and whether versions are synchronized | Check names and dates against the source documents, confirm that the revised draft and final draft are consistent, and that the number of items in the citation array matches the hit materials |
| Graduation review checklist | Whether credits, courses, thesis items, and review signatures are clearly written, and whether the number of records matches the statistical count | Use one week of records to check the totals, see whether the scope and exceptions are clearly written, and compare `quoteList` and `responseData` (non-streaming module results returned with detailed output enabled) item by item |
| Citation content array | The number of returned items matches the hit materials; being empty is also normal; `quoteMaxToken` is only a content budget | Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, and record the number of array items separately |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the application and the receipt. Cause: The two materials were revised separately without field-level comparison, and the citation snippet covers only one of them.
- Phenomenon: Revised drafts and final drafts coexist, and versions are not synchronized. Cause: The update cadence advances by batch, old versions are not marked invalid, and retrieval hits old snippets.
- Phenomenon: Signatures or receipts are missing, but the review checklist still shows as passed. Cause: Signature fields and receipts are not included in the check items, and citation snippets do not cover the signature page.

## How to verify the setup

Acceptance of this feature: ask a question with source evidence, check whether the citation array and markers can point back to the original text, and record the number of items; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business testing: use one week of records to check the totals, see whether the scope and exceptions are clearly written; `quoteMaxToken` and `quoteList` are only for budget and detail checking, and are not compared for equality with the number of array items.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item
- In the conversation, open the citation markers, and against the source documents check whether each citation can point back to the original paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
