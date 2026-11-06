---
title: Citations and Source Traceability for School Enrollment Records and Status Changes: Track Progress and Check Statistics
slug: /en/industry/education-d006-c007-f010
page_type: 行业问题页
application_area: education
meta_title: School Enrollment | Citations | Progress
meta_description: School Enrollment: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Enrollment Records and Status Changes: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on the establishment and changes of primary and secondary school student status. The materials include student status archives, transfer applications, and suspension/resumption materials. After entering the knowledge base retrieval node, each plays the role of a traceable fragment: student status archives provide basic student information fields, establishment date, and signature page; transfer applications provide the names of the transferring-out and transferring-in schools, quantities, and dates; suspension/resumption materials provide start and end dates, reasons, and receipts. The sources are paper or electronic forms from schools and student status management departments, archived weekly or monthly. Field characteristics include name, student status number, change type, effective date, and handler signature. In citation output, the three types of materials serve only as original text fragments and source identifiers for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The progress table and statistical scope description must be handled subsequently by AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Student status archives | Check whether the fields include name, student status number, establishment date, and handler signature, and whether the date and signature are complete | Use the citation marker to trace back to the original paragraph, compare field by field against the source document, and record the number of array items and the tokens of the cited text |
| Transfer applications | Check whether the names of the transferring-out and transferring-in schools, quantities, dates, and signature receipts are consistent with the student status archives | Open the cited source, compare the names, quantities, and dates of the same record in the two materials, and mark it if the signature or receipt is missing |
| Suspension/resumption materials | Check whether the start and end dates, reasons, and receipts of suspension/resumption are synchronized with the version in the student status archives | Run a test with a question that has no matching materials to confirm that the citation array is empty while the chain continues, then check the cited fragments for a question with matches against the original text |
| Search parameters | Check whether the values are consistent with those set in the knowledge base retrieval section; verify the citation upper limit by the tokens of the cited text, and record the number of array items separately | Open the search parameter panel and check item by item, and inspect the display of `quoteMaxToken`, `responseData` (non-streaming module results returned with detailed output enabled), and `quoteList` |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the student status archives and the transfer application. Cause: The two materials were entered separately and no field-level comparison was performed, so the cited fragments each trace back to different original paragraphs.
- Phenomenon: The version of the suspension/resumption materials is not synchronized, and an old receipt is still cited. Cause: The archiving update rhythm is inconsistent, multiple versions of the materials exist simultaneously in the knowledge base, and the effective date was not checked when citing.
- Phenomenon: The cited fragments do not match the original text, or there is no citation marker in the answer. Cause: First check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance of this feature: Ask a question with original text support, check whether the citation array and markers can trace back to the original text, and record the number of array items; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and also check that `quoteMaxToken` is the budget for cited content, not compared for equality with the number of items, and inspect the return structure of `quoteList` within `responseData`.

Business test: Use one week of records to verify the totals, see whether the scope and exceptions are clearly stated, and confirm that the number of records matches the statistical count and that the scope is written in the header.

- Open the citation markers in the conversation, compare against the source documents, check that each citation can trace back to the original paragraph, and record the citation array length and the tokens of the cited text.
- Run a test with a question that has no matching materials, observe that the output is empty while the chain continues, and then check whether the selected knowledge base uses the same vector model.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
