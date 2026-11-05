---
title: Citations and Source Traceability for School Admissions and Enrollment Organization: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c008-f010
page_type: 行业问题页
application_area: education
meta_title: School Admissions | Citations | Intake
meta_description: School Admissions: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Admissions and Enrollment Organization: Handle Questions and Collect Missing Information

## What this category's data looks like

The materials of primary and secondary school admissions organizations mainly consist of admission plans, application material checklists, and admission lists, together with receipts and signature pages. The admission plan sets out batches, school districts, time nodes, and admission rules; the application material checklist lists required items such as household registration, property, and residence permit, along with the number of copies; the admission list contains names, numbers, admission status, and publication dates. The three materials are often maintained by different roles, and the same record's name, quantity, and date in the plan and the list easily fail to match, with versions not synchronized or signatures/receipts missing. When the materials enter the Q&A intake and missing-item follow-up function, the plan and checklist serve as the basis for follow-up questions, and the list serves as the basis for result verification; each provides original text snippets and source identifiers for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "intake records and items to be completed" are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Admission plan | Whether the fields for batches, school districts, time nodes, and admission rules are consistent with the application material checklist and admission list, and whether dates and signatures are complete | In the node, verify that the selected knowledge base uses the same vector model, open the search parameter panel and check the values item by item, and compare against the source documents to confirm that citations can point back to the original paragraphs |
| Application material checklist | Whether required items such as household registration, property, and residence permit and the number of copies match the admission plan and admission list, and whether missing items are identified and followed up | Run a test with a question missing key information to see whether it asks a follow-up question before answering, and record the citation array length and the `quoteMaxToken` budget |
| Admission list | Whether names, numbers, admission status, and publication dates are consistent with the admission plan and application material checklist, and whether signatures or receipts are missing | Open the citation markers in the conversation, compare against the source documents, and check whether the citation snippets in the `quoteList` field of `responseData` (non-streaming module results returned with detailed output enabled) correspond to the original text |

## Three common errors

- Symptom: the same record's name, quantity, and date in the admission plan and admission list fail to match. Cause: the two materials are maintained by different roles, versions are not synchronized, and field definitions are not unified.
- Symptom: the application material checklist lacks signatures or receipts, yet it still answers directly after follow-up. Cause: missing-item identification does not trigger follow-up questions, and intake records are forwarded to the handler before the items to be completed are filled in.
- Symptom: there are no citation markers in the answer, or there is an answer but the citation array is empty. Cause: when citations do not match the original text, this is mistakenly attributed to length truncation, without first checking whether this round hit anything and which material was hit.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, check whether the citation array and markers can point back to the original text, and record the number of array items; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through.

Business test: ask a question missing key information, see whether it asks a follow-up question before answering, and whether the follow-up items land on the fields, dates, and signatures of the admission plan, application material checklist, and admission list.

- In the node, verify that the selected knowledge base uses the same vector model, open the search parameter panel and check the values item by item, and confirm that the cited content is output as an array and that the length can be 0.
- Open the citation markers in the conversation, compare against the source documents to check whether the citation snippets in the `quoteList` field correspond to the original text, and separately record the number of array items and the `quoteMaxToken` budget, without making an equality comparison.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
