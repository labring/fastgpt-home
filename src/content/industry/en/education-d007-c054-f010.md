---
title: Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c054-f010
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Citations | Review
meta_description: Self-Study Exams: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Trace Exceptions and Review Results

## What this category's data looks like

This category's data looks like this: exception tracing and manual review for self-taught examination registration records and graduation review revolve around three types of materials: registration records, course qualification certificates, and graduation application forms. Registration records carry the candidate's identity information, specialization plan, and historical grades, and are the baseline source for checking name, admission ticket number, and course name; course qualification certificates record individual subject grades, examination dates, and seals, and are used to compare whether the name, quantity, and date of the same course in the registration records are consistent; graduation application forms summarize the specialization, number of courses, credits, and signed receipts, and are the final evidence for reviewing graduation conditions. The three types of materials are updated by examination session and batch, and their fields include date, signature, receipt, and version number. When the materials enter the knowledge base retrieval node, each serves as a citable original text passage, for later field comparison, ledger writing, and report generation to trace back to the source.

## Configuration and implementation checks

Configuration and implementation checks: this step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. The exception list and review conclusions are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether name, admission ticket number, course name, and historical grades are consistent across materials | Check the original text fragments and source identifiers one by one in the citation array, use `quoteList` to expand the source document, and confirm that the fields and dates match |
| Course qualification certificates | Whether individual subject grades, examination dates, seals, and course name quantities are consistent with the registration records | Compare the cited fragments with the original text passages, check whether the name, quantity, and date of the same course in the two materials are consistent, and record missing signatures or receipts separately |
| Graduation application forms | Whether the specialization, number of courses, credits, signature, and receipt are complete and the version is synchronized | Check whether the number of citation entries in `responseData` (non-streaming module results returned with detailed output enabled) matches the number of hit material entries; list those with unsynchronized versions or missing signatures/receipts in the exception list |
| Cited content output | The number of returned entries matches the hit materials; being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; `quoteMaxToken` only checks the citation text budget, and the array entry count is recorded separately |

## Three common errors

- Symptom: the name, quantity, and date of the same course in the registration records and the course qualification certificate do not match, and during review it is impossible to determine which one prevails. Cause: the two materials are entered in different steps, and field-level comparison and version synchronization were not performed.
- Symptom: the graduation application form lacks a signature or receipt, and the review conclusion lacks traceable original record support. Cause: during material circulation, the completeness of signatures and receipts was not verified, and the cited fragments did not point back to the corresponding passages.
- Symptom: there are no citation superscripts in the answer, or the cited fragments do not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming; an empty citation array does not mean retrieval failed.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, check whether the citation array and superscripts can point back to the original text, and use `quoteList` to expand the source identifiers for item-by-item comparison; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business testing: create an exception record, see whether the source material can be traced, and confirm that the exception is supported by original records and, after the reviewer signs, is handed to the responsible person for handling.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, turn on citation superscripts, compare each citation against the source document to check whether it can point back to the original text passage, and record the number of citation entries and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
