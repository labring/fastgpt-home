---
title: Citations and Source Traceability for School Exam Question Setting and Grading: Track Progress and Check Statistics
slug: /en/industry/education-d006-c011-f010
page_type: 行业问题页
application_area: education
meta_title: School Exams | Citations | Progress
meta_description: School Exams: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Exam Question Setting and Grading: Track Progress and Check Statistics

## What this category's data looks like

This category covers exam question setting and grading in primary and secondary schools. Materials include the two-way specification table for question setting, exam papers, scoring rubrics, progress schedules, and statistical scope notes. The two-way specification table carries content dimensions and cognitive levels, exam papers carry questions and score values, scoring rubrics carry scoring points and grading standards, progress schedules record completion milestones for each stage, and statistical scope notes specify aggregation rules and exceptions. When materials enter the knowledge base retrieval node, each participates in retrieval as a citation source: the specification table and exam papers are used to verify question names, quantities, and dates; scoring rubrics are used to verify scoring points and signed receipts; progress schedules and scope notes are used to verify whether record counts and statistical counts are consistent. The update cadence is weekly or monthly, and field characteristics include names, quantities, dates, signatures, version numbers, and receipts. If the same record's name, quantity, or date does not match across two materials, if versions are not synchronized, or if signatures or receipts are missing, statistical verification will be inaccurate.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length may be 0. "Progress schedules and statistical scope notes" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Fields, dates, and signatures are complete; content dimensions and cognitive levels can be traced back to the original text | Verify specification table snippets one by one in the citation array, and confirm that names, quantities, dates, and signatures can be traced back to the source documents |
| Exam papers | Question names, quantities, and dates are consistent with the specification table, and versions are synchronized | Use the same record to retrieve the exam paper and the specification table separately, compare names, quantities, and dates, and inspect the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) |
| Scoring rubrics | Scoring points, grading standards, and signed receipts are complete, and versions are synchronized with the exam papers | Open the citation markers to compare against the original scoring rubric text, verify scoring points and signatures, record the number of array entries, and separately verify the `quoteMaxToken` budget |
| Progress schedules and statistical scope notes | Record counts and statistical counts match; the scope is written in the header, and exceptions are clearly stated | Use one week of records to verify the totals, and check whether the cited snippets in `quoteList` cover the scope and exceptions |

## Three common errors

- Symptom: The same record's name, quantity, or date does not match between the specification table and the exam paper. Cause: The two materials were not updated in sync, or the cited snippet only matched one of them; you must first verify the materials matched in this round before making a judgment.
- Symptom: The scoring rubric version is not synchronized, and scoring points do not match the exam paper questions. Cause: After the materials were updated, the knowledge base was not re-associated, so citations still point to snippets from the old version.
- Symptom: The progress schedule lacks signatures or receipts, so statistical verification cannot be confirmed. Cause: Signatures were not completed during the record handoff stage, and the citation array lacks the corresponding source identifiers.

## How to verify the setup

Acceptance for this feature: ask a question that has supporting evidence in the original text, and verify whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline still runs through, and record the number of array entries and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: use one week of records to verify the totals, and check whether the scope and exceptions are clearly stated.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify each item one by one, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
