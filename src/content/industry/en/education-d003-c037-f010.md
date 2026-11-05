---
title: Citations and Source Traceability for Vocational Training Subsidy Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c037-f010
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Citations | Intake
meta_description: Training Subsidies: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational Training Subsidy Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

For Q&A intake and missing-item follow-up for vocational training subsidy applications, the materials mainly consist of training class opening filings, attendance records, and completion assessment forms, supplemented by application receipts and version markers. The class opening filing provides the institution, class number, course, and opening date; the attendance record provides the student roster, number of attendance days, and personal signature; the completion assessment form provides the assessment date, score, and assessor signature. After these three types of materials enter the knowledge base retrieval node, each serves as a citable original-text passage and plays the role of the basis for field comparison and for checking dates and signatures. The update cadence rolls forward by class batch, and it is common for the same record to have mismatched names, quantities, or dates across two materials, with versions not synchronized, or missing signatures or receipts.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original-text fragment and a source identifier, and the length may be 0. The "intake record and items to be completed" are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class opening filing | Whether the institution name, class number, course name, opening date, signature or receipt are complete | Retrieve the original-text passage of the filing, and compare field by field with the attendance record and completion assessment form for names, quantities, and dates |
| Attendance record | Whether the student roster, number of attendance days, attendance date, and personal signature are consistent with the filed class | Open the citation marker to trace back to the original text, and check whether the number of roster entries matches the filed headcount and the assessment roster |
| Completion assessment form | Whether the assessment date, score, and assessor signature corroborate each other with the class opening filing and attendance record | Compare whether the assessment date falls after the opening date, and check whether the assessor signature and receipt are missing |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: the same student's name, quantity, or date does not match across two materials. Cause: the class opening filing and attendance record were entered separately, without field-level traceback comparison.
- Symptom: the cited fragment does not match the original text, and there is no citation marker in the answer. Cause: first check whether this round hit anything and which material was hit, then look at trimming.
- Symptom: the completion assessment form is missing a signature or receipt, and the version is not synchronized. Cause: the material update cadences are inconsistent, and the old version is still being retrieved in the knowledge base.

## How to verify the setup

This feature's acceptance: ask a question that has original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: submit a question missing key information, and see whether it first asks a follow-up before answering.

- Open the citation markers, check against the source documents whether each citation can trace back to the original-text passage, and record the array length and the `quoteMaxToken` budget.
- Run a test with a question that has no matching materials, see that the output is empty while the chain continues, then check the matched material identifier in `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
