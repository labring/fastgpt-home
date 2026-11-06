---
title: Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c021-f010
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Citations | Intake
meta_description: Graduation Eligibility: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Handle Questions and Collect Missing Information

## What this category's data looks like

The material chain for student status changes and graduation eligibility review commonly includes three types: leave-of-absence/resumption-of-study applications, major transfer applications, and graduation review checklists. Leave-of-absence/resumption-of-study applications carry the reason for the status change and the start and end dates; major transfer applications carry the transfer-in and transfer-out fields and approval signatures; graduation review checklists carry course names, quantities, credits, and the graduation conclusion. When these three types of materials enter the knowledge base retrieval node, each plays a different role: application-type materials provide the basis for fields and dates, checklist-type materials provide the basis for quantities and conclusions, and receipts and signature pages provide the basis for process closure. The material update cadence follows student status batches and graduation review milestones, and versions are prone to being out of sync. Field characteristics center on name, student ID, major name, course quantity, status change date, signature, and receipt; the same record may have mismatched names, quantities, or dates across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. The "intake record and items to be completed" is then handled by subsequent AI nodes, code nodes, or humans, and is used to compare fields, write ledgers, and generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave-of-absence/resumption-of-study application | Whether the reason for the status change, the start and end dates, and the signature are complete, and whether they match the receipt date | In the citation array, trace each entry back to the original paragraph, check the date and signature fields, and record missing items |
| Major transfer application | Whether the transfer-in and transfer-out major names, quantities, and approval signatures are consistent, and whether the versions are in sync | Open the citation markers to compare against the source documents, and compare the major names and quantities in the two materials |
| Graduation review checklist | Whether the course names, quantities, credits, and graduation conclusion are consistent with the grade materials | Use the cited snippets to compare the checklist and grade materials item by item, and flag entries whose names or quantities do not match |
| Cited content output | The number of returned entries is consistent with the materials hit; being empty is also normal, and the pipeline continues to run through | Run a test with a question that has no matching materials, and see whether the array is empty while the output pipeline is not interrupted |

## Three common errors

- Symptom: the same record has mismatched names, quantities, or dates across two materials. Cause: the materials are maintained independently, no field-level comparison is performed, and the cited snippets are not traced back to the original text item by item.
- Symptom: versions are out of sync, and an old-version application and a new-version checklist are both hit by retrieval. Cause: the knowledge base update cadence is out of sync with student status batches, and the citation source identifiers do not indicate versions.
- Symptom: a signature or receipt is missing, yet the answer still gives a conclusion. Cause: the missing item is not identified and followed up on, and when the citation array is empty the pipeline runs through as usual without triggering a follow-up question.

## How to verify the setup

Acceptance for this feature: ask a question that has textual support, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. Record the number of citations and the `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled); the number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: raise a question that is missing key information, and see whether it asks a follow-up question before answering; once the missing item is identified and followed up on and the answer has material support, it is forwarded to the handler.

- In the node, check the selected knowledge base collections and their vector models, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, and see whether the citation array is empty while the pipeline continues, and open the citation markers to compare against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
