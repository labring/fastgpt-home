---
title: Citations and Source Traceability for School Exam Question Setting and Grading: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c011-f010
page_type: 行业问题页
application_area: education
meta_title: School Exams | Citations | Handover
meta_description: School Exams: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Exam Question Setting and Grading: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on material drafting and handover of responsibility in the scenario of exam question setting and marking in primary and secondary schools, involving three types of materials: the two-way specification table for question setting, the exam paper, and the marking rubric. The two-way specification table for question setting carries the distribution of assessment points, the proportion of question types, and the expected score values; the exam paper presents the question stems and answering requirements; the marking rubric specifies the scoring points and the basis for awarding scores. When these three types of materials enter this function, the specification table comes first as the basis for question setting, and the exam paper and rubric follow afterward, each carrying a version number, date, and signature field. The update rhythm of the materials is synchronized with the exam batches. Each batch may undergo multiple rounds of changes through initial review, re-review, and final review. The name, quantity, and date of the same record must remain consistent across different materials, versions must be synchronized, and signatures and receipts must be complete.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. The signable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Assessment point names, question type quantities, score values, and dates are aligned item by item with the exam paper and marking rubric, version numbers are consistent, and signature fields and receipts are complete | Retrieve the specification table, exam paper, and marking rubric, compare names, quantities, and dates field by field, verify version numbers and signature receipts, and use `quoteList` to expand the citation sources |
| Exam paper | Question stem wording corresponds to the assessment points in the specification table, the total score is consistent with the specification table, and the version date is synchronized with the handover record | Open the citation markers in the conversation, compare them against the paragraphs in the source documents, and check whether the number of items in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |
| Marking rubric | Scoring points correspond to the question stems in the exam paper, the basis for awarding scores is consistent with the score values in the specification table, and there are no missing items in signatures and receipts | Check the mapping between scoring points and question stems one by one, inspect the version date and handover record, and confirm the value of `quoteMaxToken` as the citation content budget |
| Handover record | The four items of responsible person, date, version, and receipt status are complete, and they are mutually consistent with the three types of materials | Run a handover once according to the template, see whether missing items are blocked, and check whether the citation array can point back to the original paragraphs |

## Three common errors

- Phenomenon: The same assessment point name is written differently in the specification table and the exam paper. Cause: Terminology was not unified during drafting, and after the two places were modified separately, the versions were not synchronized, resulting in mismatched names.
- Phenomenon: The total score of the exam paper is inconsistent with the quantity in the specification table. Cause: After the specification table was adjusted, the exam paper was not updated synchronously, the version number was not synchronized, and the quantities were not checked item by item during handover.
- Phenomenon: The handover record lacks a signature or receipt. Cause: The responsible person was not clarified, the date and version were not fully filled in, the receipt step was skipped, and missing items were not blocked.

## How to verify the setup

Acceptance of this function: ask a question with source evidence, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching materials, see that the output is empty while the chain continues, and record the number of items in the citation array and the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
