---
title: Citations and Source Traceability for School Exam Question Setting and Grading: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c011-f010
page_type: 行业问题页
application_area: education
meta_title: School Exams | Citations | Operations
meta_description: School Exams: review citations for operational handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Exam Question Setting and Grading: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the scenario of exam question setting and marking in primary and secondary schools. The materials include three types: the question-setting two-way specification table, the exam paper, and the marking rubric. The question-setting two-way specification table carries the assessed content, cognitive levels, question types, and score distribution, and serves as the basis for question setting; the exam paper carries the questions, question numbers, scores, answers, and marking points; the marking rubric carries the scoring points, deduction points, marking instructions, and signature fields. When these three types of materials enter the knowledge base retrieval node, they serve as retrieved objects in the associated knowledge base, and the citation output returns fragments and source identifiers for subsequent field comparison, ledger writing, and report generation. The materials are updated by semester, subject, grade, and exam batch; version numbers, dates, signatures, and receipts are field characteristics. For the same record, the names, quantities, and dates in the specification table, exam paper, and marking rubric must be consistent, versions must be synchronized, and signatures and receipts must be complete.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text fragment and a source identifier, and the length may be 0. The handover-ready deployment status and operation records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Fields, dates, and signatures are complete, and the names, quantities, and dates match those in the exam paper and marking rubric | In the node, check the selected collection and its vector model, and compare item by item the question numbers, scores, dates, and signature fields of the specification table and the exam paper |
| Exam paper | The version is synchronized with the marking rubric, and the question numbers, scores, answers, and marking points are consistent | Open the search parameter panel and check item by item; run a test with a query that has no matching materials, and see whether the output is empty while the pipeline continues |
| Marking rubric | Scoring points, deduction points, marking instructions, and signature receipts are complete, and the version is not lagging behind | In the conversation, open the citation superscript and compare against the source document to check whether each citation can point back to the original paragraph |
| Citation content output | The number of returned entries matches the hit materials; being empty is also normal | Record the array length and the `quoteMaxToken` budget, check the tokens of the citation text, record the number of array entries separately, and do not compare the two for equality |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the specification table and the exam paper. Cause: The two materials are maintained separately, and fields were not checked item by item against the handover form.
- Symptom: The marking rubric version is not synchronized; the exam paper has been changed but the rubric has not. Cause: Version updates were not written back, and the version number and date were not checked during handover.
- Symptom: Citation fragments do not match the original text. Cause: First check whether there was a hit in this round and which material was hit, then look at trimming; do not directly attribute it to length trimming.

## How to verify the setup

This feature's acceptance: ask a question with original-text support and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and record the number of citations in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled).

Business test: check item by item once according to the handover form, see which item is missing from the record, and check whether the version, connection, and task record are consistent.

- Check whether the associated knowledge base uses the same vector model, and check the search parameter values item by item
- Run a test with a query that has no matching materials, confirm that the output is empty while the pipeline continues, and record the array length and the `quoteMaxToken` budget

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
