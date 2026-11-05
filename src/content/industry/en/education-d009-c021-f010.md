---
title: Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c021-f010
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Citations | Multilingual
meta_description: Graduation Eligibility: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enrollment Changes and Graduation Eligibility: Handle Multilingual Materials and Terminology

## What this category's data looks like

Student status changes and graduation eligibility review involve three types of materials: leave/resumption of studies applications, major transfer applications, and graduation review checklists. Fields include name, student ID, change type, date, signature, and receipt. Leave/resumption of studies applications and major transfer applications often come from different departments and languages, while the graduation review checklist summarizes the conclusions of the first two; terminology must be consistent across all materials. When materials enter the knowledge base retrieval node, each document serves as a traceable source, and the citation array provides the original text snippet and source identifier item by item, for subsequent comparison of fields, ledger writing, and report generation. The update cadence advances by batch and semester. The name, quantity, and date of the same record in two materials must match. When versions are not synchronized or signatures/receipts are missing, the citation snippets themselves remain faithful to the original text and do not assume the responsibility of judgment.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "unified terminology table and comparison draft" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave/resumption of studies application | The name, student ID, and date of the same student in the leave and resumption records must be consistent; the change type, signature, and receipt must be complete | Open the source markers one by one in the citation array, and verify the record's fields and dates against the original paragraphs |
| Major transfer application | The names of the transfer-out and transfer-in majors, effective date, and approval signature must correspond to the graduation review checklist | Use the same terminology to compare the wording in the two citations, and record the number of array items and source identifiers |
| Graduation review checklist | The graduation conclusion, credit quantity, and date in the checklist must be traceable to the first two materials, and signatures or receipts must not be missing | Verify whether each citation can be traced back to the original text, and separately record the array length and `quoteMaxToken` budget |
| Search parameters | Consistent with the values set in the knowledge base retrieval section, and associated with the knowledge base of the same vector model | Open the search parameter panel and check each item, and view the cited content in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record in two materials do not match. Cause: Materials enter in batches, and terminology and field definitions were not unified first; the citation snippets are each faithful but cannot refer to each other.
- Phenomenon: Versions are not synchronized, and an old application and a new checklist are retrieved at the same time. Cause: The update cadence was not aligned by batch, and the citation array returns original text snippets from multiple versions at the same time.
- Phenomenon: A signature or receipt is missing, but the review checklist is still cited. Cause: Completeness was not checked when the materials were collected; the citation output only refers back to the original text and does not replace manual judgment.

## How to verify the setup

Acceptance of this feature: Ask a terminology question that has an original-text basis, and check whether the citation array and source markers can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the array length and `quoteMaxToken` budget.

Business test: Sample three terms and check whether their wording is consistent throughout the entire text, verify the citation sources against the original paragraphs, and confirm that the translated names can refer back to the original text.

- In the node, check the selected knowledge base collections and their vector models, and open the search parameter panel to check each value item by item.
- Run a trial with a question that has no matching materials, view `quoteList` within `responseData`, and confirm that the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
