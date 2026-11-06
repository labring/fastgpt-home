---
title: Citations and Source Traceability for Vocational College Curriculum Planning: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c029-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Citations | Intake
meta_description: Vocational Curricula: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Curriculum Planning: Handle Questions and Collect Missing Information

## What this category's data looks like

The formulation of talent cultivation programs for vocational colleges involves three types of materials: talent cultivation programs, curriculum standards, and job competency analysis tables. The talent cultivation program provides the major name, program length, total credit hours, graduation requirements, and signature fields; the curriculum standard provides the course name, class hours, assessment method, and date; the job competency analysis table provides the job name, competency items, quantity, and signature receipt. When these three types of materials enter question-answer intake and missing-item follow-up, each plays a different role: the talent cultivation program is the master record, the curriculum standard is the course-level support, and the job competency analysis table is the basis on the job side. Materials are updated by academic year or revision batch, and fields include four categories: name, quantity, date, and signature. Common inconsistencies are concentrated in the same record having mismatched names, quantities, or dates across two materials, versions not being synchronized, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "intake records and items to be completed" are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Whether the major name, program length, total credit hours, graduation requirements, and signature fields match the curriculum standard and job competency analysis table | Retrieve the original paragraphs of the program, compare names, quantities, dates, and signatures item by item, and record missing items |
| Curriculum standard | Whether the course name, class hours, assessment method, date, and signature are consistent with the program, and whether the version is synchronized | Open the citation superscript to trace back to the original text, check the fields and version number, and mark unsynchronized items |
| Job competency analysis table | Whether the job name, competency items, quantity, signature, or receipt are complete | Check the quantity and signature item by item, and list those missing signatures or receipts as items to be followed up |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal; `quoteMaxToken` is only a content budget | Run a test with a question that has no matching materials, see that the array is empty while the pipeline runs through, and record the item count separately |

## Three common errors

- Phenomenon: The name or credit hours of the same major do not match across two materials. Cause: Different revision batches, the old version was not replaced, and cross-checking was not done during entry.
- Phenomenon: The curriculum standard version is not synchronized with the talent cultivation program. Cause: One side has been updated while the other still uses the old draft, and there is a lack of version number and date comparison.
- Phenomenon: The job competency analysis table is missing signatures or receipts. Cause: The circulation step was not closed-loop, the handler did not fill it back in, and no follow-up question was asked before answering during intake.

## How to verify the setup

Acceptance of this feature: Ask a question with original text support, and check whether the citation array and superscripts can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, record the item count according to the array length, and check only the citation text budget for `quoteMaxToken`.

Business test: Submit a question missing key information, see whether it asks a follow-up question before answering, and write the completed items into the intake record.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation superscripts, compare names, quantities, dates, and signatures against the source documents, and use `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` to view the cited fragments and source identifiers.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
