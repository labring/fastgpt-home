---
title: Citations and Source Traceability for School Exam Question Setting and Grading: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c011-f010
page_type: 行业问题页
application_area: education
meta_title: School Exams | Citations | Versions
meta_description: School Exams: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Exam Question Setting and Grading: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of exam question setting and grading in primary and secondary schools. Materials include the question-setting two-way specification table, exam papers, and scoring rubrics. Sources are the finalized versions from the teaching research department and school receipts. The update cadence follows syllabus adjustments and revision by school session. The three types of materials play different roles when entering the knowledge base retrieval node: the two-way specification table carries the distribution of assessment points and question types, the exam paper carries the question stems and score values, and the scoring rubric carries the scoring points and signature fields. Field characteristics center on names, quantities, dates, signatures, and receipts. The same record often fails to match across two materials, with versions not synchronized or the old version still being cited. Material versioning and change maintenance require that the current version be unique, the old version be traceable, and citations be synchronized. After changing one piece of content, the version number and citations must be updated together, and the knowledge base or external documents must be updated accordingly.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manually. The citation array itself is not a difference list or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Assessment point names, question type quantities, dates, and signature fields must be consistent with the exam paper | Open the citation corner mark to trace back to the original paragraph, and verify the assessment point names, question quantities, and dates between the specification table and the exam paper |
| Exam paper | Question stem score values and scoring rubric scoring points must correspond to the specification table | Check each scoring point and score value against the scoring rubric, and see whether the cited snippet can trace back to the original text of the exam paper |
| Scoring rubric | Signatures and receipts must be complete, and the version number must be consistent with the current version | Check the signature fields and receipts of the rubric, and compare whether the version number is synchronized with the current version |
| Cited content output | The number of returned entries must be consistent with the matched materials; being empty is also normal | Run a test with a question that matches no materials, see that the array is empty while the pipeline continues, and record the number of array entries |

## Three common errors

- Symptom: The names, quantities, and dates of the same record fail to match between the specification table and the exam paper. Cause: The two materials were revised separately, without field-level comparison and version synchronization.
- Symptom: The scoring rubric version is not synchronized, and the old version is still being cited. Cause: The current version is not unique, the old version is not marked as traceable, and citations are not updated with revisions.
- Symptom: The scoring rubric lacks signatures or receipts. Cause: The finalization process did not collect all signatures, and the cited snippet only covers the body text, without checking the signature fields.

## How to verify the setup

Acceptance of this feature: ask a question that has textual support, and check whether the citation array and corner marks can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When the citation upper limit is involved, check the tokens of the cited text, and record the number of array entries separately.

Business test: change one piece of content, and see whether the version number and citations are updated synchronously; check whether the cited snippets and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` remain consistent with the revision.

- In the node, check the selected knowledge base collections and their vector models, and verify the values in the search parameter panel item by item
- Open the conversation citation corner marks, and check against the source documents whether each citation can trace back to the original paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
