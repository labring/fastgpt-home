---
title: Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c054-f010
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Citations | Versions
meta_description: Self-Study Exams: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Maintain Document Versions and Changes

## What this category's data looks like

This category's data mainly includes three types: registration records, course qualification certificates, and graduation application forms. Registration records record the candidate's basic information, registered courses, and grade status; course qualification certificates mark the course code, name, qualification date, and seal; graduation application forms summarize the qualification status of each course, name, ID number, major name, and include the candidate's signature and review receipt. The material sources are the provincial examination office, the main examining institution, and submissions by candidates, and the update rhythm changes with examination sessions, transfer examinations, exemption examinations, and graduation application batches. When these materials enter the knowledge base retrieval node, each is split and stored as a cited source; registration records provide identity and enrollment status, course qualification certificates provide the basis for single-subject qualification, and graduation application forms provide graduation review fields and signature receipts. The version ledger and change records require subsequent nodes or manual work to compare fields, dates, and signatures accordingly, maintaining a unique current version, traceable old versions, and synchronized citations.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. The "version ledger and change records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether the name, ID number, examination registration number, and enrollment status are consistent across materials, and whether dates and signatures are complete | Locate the original text fragment of the registration record in the citation array, compare field by field with the course qualification certificate and graduation application form, and record inconsistencies |
| Course qualification certificate | Whether the course code, name, qualification date, and seal correspond to the registration record and graduation application form | Use `quoteList` to view the cited source identifier, refer back to the original paragraph, and check whether the course names and quantities match |
| Graduation application form | Whether the name, major name, number of courses, signature, and receipt are consistent with the registration record and course qualification certificate | Open the citation marker to compare with the source document, check for missing signatures or receipts, and confirm that the version number and citation are synchronized |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; record the number of citations separately, and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Phenomenon: the same candidate's name is written differently in the registration record and the graduation application form. Cause: different material sources and different entry times, the versions are not synchronized, and the old version is still cited.
- Phenomenon: the number of course qualification certificates does not match the total number of courses summarized in the graduation application form. Cause: exemption or transfer examination records were not incorporated into the current version in time, and the cited fragments point to old-version materials.
- Phenomenon: the graduation application form lacks the candidate's signature or review receipt. Cause: the scanned copy is incomplete; although the citation array returns the original text fragment, the missing fields are not recognized by subsequent nodes.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record that the number of citations and the `quoteMaxToken` budget are each independent.

Business test: change one piece of content, and see whether the version number and citation are updated synchronously

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item
- In the conversation, open the citation markers, compare with the source document, and use `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` to check that the cited fragments correspond to the original text

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
