---
title: Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c031-f010
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Citations | Intake
meta_description: Apprenticeships: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the modern apprenticeship and order class management scenario. Core materials include school-enterprise cooperation agreements, order class training plans, and master mentorship records. School-enterprise cooperation agreements usually contain the cooperation term, number of positions, signatures of both parties, and dates; order class training plans contain course arrangements, number of students, start and end dates, and approval signatures; master mentorship records contain the mentorship roster, work hours, master's signature, and receipt. The three types of materials each play a role during Q&A intake: agreements are used to confirm the cooperation framework and scope of authorization, training plans are used to verify class size and teaching arrangements, and mentorship records are used to trace individual training processes. In terms of field characteristics, names, quantities, dates, and signatures are high-frequency comparison items. The update cadence of materials changes with semesters, batches, and agreement renewals; if old versions are not synchronized, they can easily coexist with new versions. After entering the Q&A intake function, the retrieval node recalls relevant snippets based on the question, providing the basis for missing-item identification and follow-up questions.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original snippet and source identifier, and the length can be 0. The "intake records and completed question items" are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Check whether the agreement name, cooperation term, number of positions, signatures of both parties, and dates are complete and consistent | Open the citation marker to trace back to the original agreement paragraph, and record the fields and source identifier |
| Order class training plan | Check whether the class name, number of students, start and end dates, approval signature, and version number correspond to the agreement | Compare against the original plan text, and check whether the name, quantity, and dates of the same record match across the two materials |
| Master mentorship record | Check whether the mentorship roster, work hours, master's signature, and receipt are complete | Trace back to the original mentorship record item by item, and confirm whether missing signatures or receipts are identified as missing items |
| Citation content output | The number of returned items matches the hit materials; being empty is also normal | Run a test with a question that has no matching materials, see whether the array is empty while the pipeline continues, and check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: The name, quantity, and dates of the same record do not match across two materials. Cause: The standards were not unified during entry, or the cited snippet covers only a single material and no cross-comparison was performed.
- Symptom: Versions are not synchronized, and an old training plan coexists with a new agreement. Cause: The update cadences differ, retrieval hits an old snippet, and the citation source identifier does not point to the latest version.
- Symptom: Materials with missing signatures or receipts are still treated as complete. Cause: Missing signature fields are not identified during intake, and the follow-up step is not triggered, causing missing items to be overlooked.

## How to verify the setup

Acceptance for this feature: ask a question that has original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. Check the number of citations, i.e. the array length; `quoteMaxToken` is only the citation content budget, and the two are not compared for equality; if a citation upper limit is involved, check the tokens of the cited text, and record the array item count separately.

Business test: ask a question missing key information, and see whether it asks a follow-up question before answering.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, confirm that the output is empty while the pipeline continues, then open the citation markers to compare against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
