---
title: Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Find Supporting Evidence
slug: /en/industry/education-d001-c054-f010
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Citations | Evidence
meta_description: Self-Study Exams: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Find Supporting Evidence

## What this category's data looks like

This page focuses on the business basis query for self-taught examination registration records and graduation review. The materials include registration records, course qualification certificates, and graduation application forms. Registration records document the candidate's basic information, examination registration number, major name, and the status of each examination, with updates synchronized to the data of the provincial examination office; course qualification certificates indicate the course code, name, credits, qualification date, and seal, and are updated with each round of score release; graduation application forms carry the name, ID number, major, number of courses, signature, and receipt date, and circulate with each application batch. When these three types of materials enter the knowledge base retrieval node, each plays a different role: registration records provide the basis for identity and enrollment status, course qualification certificates provide the basis for course completion and credits, and graduation application forms provide the basis for the graduation conclusion and approval. Field characteristics center on names, quantities, dates, signatures, and receipts. When comparing across materials, each item must be traced back to the original text to avoid the same record having inconsistent wording across different materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. The basis entries that can be traced back to the original text are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | The name, examination registration number, major name, and enrollment status fields are complete, and the dates and signatures can be traced back to the original text | Open the citation marker in the conversation, compare it with the original paragraph of the registration record, and check whether the fields and dates are consistent |
| Course qualification certificates | The course code, name, credits, qualification date, and seal match the original text, and the quantity does not conflict with the number of courses in the registration record | Open the citation source one by one, compare the course names, quantities, and dates in the original text of the course qualification certificate, and record any discrepancies |
| Graduation application forms | The name, ID number, major, number of courses, signature, and receipt date match the original text, and the version is current | Open the citation marker to trace back to the original text of the graduation application form, check the signature and receipt date, and mark it if the version has not been synchronized |
| Citation content output | The number of returned entries is consistent with the matched materials; being empty is also normal, and `quoteMaxToken` is only used as a content budget | Run a trial with a question that has no matching materials, and see that the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues; `quoteList` can be used to check the cited snippets |

## Three common errors

- Symptom: The same candidate's name is written inconsistently in the registration record and the graduation application form. Cause: The two entries were not unified at the time of input, and the mismatch in names was only discovered after the cited snippets were each traced back to the original text.
- Symptom: The number of course qualification certificates is inconsistent with the number of courses in the graduation application form. Cause: The versions were not synchronized, the old qualification certificates were not updated with the new application form, and the citation sources point to materials from different batches.
- Symptom: The graduation application form lacks a signature or receipt date. Cause: The signature and seal step in the application process was not completed, the cited snippet only captured the main body of the form, and the signature field is empty when traced back to the original text.

## How to verify the setup

Acceptance of this feature: ask a question that has a basis in the original text, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of array entries and the `quoteMaxToken` budget for separate inspection.

Business test: ask a cross-material basis question, see whether the answer provides a traceable source, and check whether the cited snippets are consistent with the original paragraphs.

- In the node, check the selected knowledge base collections and their vector models, and confirm that knowledge bases using the same vector model are selected.
- Open the search parameter panel and check the values item by item; run a trial with a question that has no matching materials, and see that the citation array in `responseData` is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
