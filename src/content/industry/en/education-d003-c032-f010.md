---
title: Citations and Source Traceability for Technical College Program Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c032-f010
page_type: 行业问题页
application_area: education
meta_title: Technical Colleges | Citations | Intake
meta_description: Technical Colleges: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Technical College Program Management: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data involves three types of materials: student registration forms, teaching plans, and skills training records. Student registration forms record student identity, registration date, and approval signature; teaching plans state course names, credit hours, and execution versions; skills training records register training items, completion dates, and instructor signatures. Materials are updated at semester milestones: registration and plans are entered before the term starts, training records are added after training ends, and versions are synchronized with teaching adjustments. When entering the question acceptance and missing-item follow-up function, these three types of materials serve as knowledge base sources for retrieval nodes to match and output citation snippets; names, quantities, and dates of records with the same name across different materials must be comparable, and versions and signature receipts are common triggers for missing-item follow-up questions.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text snippet and source identifier, and the length can be 0. "Accepted records and items to be completed" are subsequently handled by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Student registration form | Whether the name, registration date, and approval signature are consistent with the corresponding fields in the teaching plan, and whether the version is synchronized | Extract the original snippet from the registration form, compare the name and date in the teaching plan, and flag entries missing a signature or receipt |
| Teaching plan | Whether the course name, credit hours, and execution version match the skills training records | Retrieve the original plan text, check the item names and quantities in the training records, and record discrepancies where versions are not synchronized |
| Skills training record | Whether the training item, completion date, and instructor signature are complete and correspond to the identity in the registration form | Retrieve the training record snippet, refer back to the identity field in the registration form, mark missing items, and generate follow-up questions |
| Citation content array | The number of returned entries matches the matched materials; being empty is also normal | Run a test with a question that matches no materials, and observe the array length in `responseData` (non-streaming module results returned with detailed output enabled) and whether the chain continues |

## Three common errors

- Symptom: The same student's name is written differently in the registration form and the training record. Cause: The two materials are entered separately without proofreading against a unified field, causing citation snippets to point to inconsistent information.
- Symptom: After the teaching plan version is updated, the training record still cites the old course name. Cause: The version is not synchronized, so retrieval matches the old snippet, and the citation does not match the current plan.
- Symptom: The training record lacks an instructor signature or receipt, but the answer gives a complete conclusion. Cause: The missing item is not identified and followed up on; although the citation array is non-empty, the material basis is insufficient.

## How to verify the setup

This function's acceptance: ask a question with original-text support, and check whether the citation array and footnote markers can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check that the citation count in `quoteList` and the `quoteMaxToken` budget are recorded separately.

Business test: ask a question missing key information and see whether it follows up first before answering

- Turn on conversation citation footnote markers, compare them one by one against the source documents, confirm that the citation snippets are consistent with the original paragraphs, and check the array length in `responseData`
- Run a test with a question that matches no materials, confirm that the citation array is empty while the output chain continues, and then check that the search parameters match the values in the knowledge base retrieval section

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
