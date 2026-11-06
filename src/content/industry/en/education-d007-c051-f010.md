---
title: Citations and Source Traceability for College Entrance Exam Application Eligibility: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c051-f010
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Citations | Review
meta_description: Entrance Exam Eligibility: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Entrance Exam Application Eligibility: Trace Exceptions and Review Results

## What this category's data looks like

General college entrance examination registration qualification verification uses three types of materials as the underlying documents: the college entrance examination registration form, household registration and student status certificates, and materials for children accompanying migrant workers. The registration form carries the candidate's basic information and examination category; the household registration and student status certificates carry the household registration address, start and end of student status, and school signature; the materials for children accompanying migrant workers carry the residence permit, social insurance contributions, and parents' employment receipts. The three types of materials are usually uploaded in batches by registration batch, updated incrementally as verification progresses, and versions iterate as seals and receipts are completed. Field characteristics center on name, ID number, household registration address, student status number, start and end dates of attendance, number of social insurance months, signature, and receipt number. When the materials enter this feature, each serves as a hit source for knowledge base retrieval, providing original text fragments and source identifiers for exception tracing, so that reviewers can refer back to specific paragraphs.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The "exception list and review conclusions" are completed subsequently by AI nodes, code nodes, or manual work; the citation array itself is not a discrepancy list, ledger, report, or authorization scope.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Whether the name, ID number, examination category, signature, and date are consistent with the household registration and student status certificates | Open the citation marker in the citation output, refer back to the original paragraph in the registration form, and compare field by field |
| Household registration and student status certificates | Whether the household registration address, student status number, start and end dates of attendance, and school signature match the registration form | Check the cited fragments against the source documents, and confirm that the date and signature fields are not missing |
| Materials for children accompanying migrant workers | Whether the residence permit, number of social insurance contribution months, and parents' employment receipts are complete and version-synchronized | Check whether the number of items in the citation array matches the hit materials; an empty array also goes through the chain |
| Citation output | Whether each citation can refer back to the original text, and whether `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) carries a source identifier | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues; record the number of citations separately, and `quoteMaxToken` only checks the citation text budget |

## Three common errors

- Phenomenon: the same candidate's name is written differently in the registration form and the household registration and student status certificates. Cause: the two materials are entered separately, no field-level comparison is performed, and the cited fragments are independent of each other.
- Phenomenon: the number of social insurance months in the materials for children accompanying migrant workers does not match the number filled in on the registration form. Cause: versions are not synchronized; the old receipt enters the knowledge base first, and the new receipt uploaded later does not overwrite it.
- Phenomenon: the household registration and student status certificates lack a school signature or receipt number. Cause: only the main text pages were scanned during upload, and the signature page and receipt were not attached; the citation hits the main text but there is no seal or signature.

## How to verify the setup

Feature acceptance: ask a question with original text support, check whether the citation array and citation markers can refer back to the original text, and inspect the source identifier of `quoteList` in `responseData`; then ask a question with no matching materials, confirm that the array is empty while the chain goes through, record the number of citations separately, and `quoteMaxToken` only checks the citation text budget.

Business test: create an exception record, see whether it can be traced back to the source material, and confirm that the exception is supported by original records and has a reviewer's signature.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, open the search parameter panel, and check the values item by item.
- Open the conversation citation markers, compare them against the source documents, and confirm that each citation can refer back to the original paragraph and that the cited fragments match the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
