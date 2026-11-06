---
title: Citations and Source Traceability for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c011-f010
page_type: 行业问题页
application_area: education
meta_title: School Exams | Citations | Intake
meta_description: School Exams: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Exam Question Setting and Grading: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials in the primary and secondary school exam question setting and grading category mainly consist of question-setting two-way specification tables, exam papers, and scoring rubrics. Sources are school question-setting teams, teaching and research groups, and organizers, and the update cadence advances with exam rounds and version revisions. When entering the question-answering intake and missing-item follow-up function, the question-setting two-way specification table plays the role of field verification for assessment points, question types, and score distribution; the exam paper plays the role of original-text comparison for question numbers, question stems, reference answers, and page numbers; and the scoring rubric plays the role of traceability for scoring points, score tiers, and signature receipts. The three types of materials often show mismatches in the name, quantity, and date of the same record, unsynchronized versions, and missing signatures or receipts. Therefore, intake records and follow-up items to be completed must point back item by item to original-text fragments and source identifiers, and then be forwarded to the organizer for handling.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original-text fragment and a source identifier, and the length may be 0. The "intake records and follow-up items to be completed" are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | Whether the assessment point, question type, and score distribution fields, as well as the question-setting date and question setter's signature, are complete, and whether the version is synchronized with the exam paper | Open the citation superscript and compare it with the original paragraph of the specification table, and verify the source identifier and field rows in `quoteList` |
| Exam paper | Whether the question numbers, question stems, reference answers, page numbers, and exam date match between the two materials, and whether signatures or receipts are missing | Use `responseData` (non-streaming module results returned with detailed output enabled) to view the number of entries in the citation array, point back to the original exam paper text one by one, and record the array length separately |
| Scoring rubric | Whether the scoring points, score tiers, rubric date, and teaching and research group signature are consistent, and whether they match the current exam paper version | Verify `quoteMaxToken` as the citation content budget, check the tokens of the cited text, and do not compare it for equality with the number of array entries |
| Intake records and follow-up items to be completed | Whether missing items are identified and followed up on, whether answers are supported by material evidence, and whether they can be forwarded to the organizer for handling | Ask a question missing key information, see whether it follows up first before answering, and then verify the citation array and superscript |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the specification table and the exam paper. Cause: The two materials are filled in by different stages, and intake proceeds without field comparison.
- Phenomenon: The scoring rubric version is not synchronized, and the cited fragment points to an old score tier. Cause: The knowledge base was not updated with the revision, and retrieval hit old material.
- Phenomenon: There is no citation superscript in the answer, or the cited fragment does not match the original text. Cause: First verify whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this function: ask a question with original-text support, and verify whether the citation array and superscript can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through.

Business test: ask a question missing key information, and see whether it follows up first before answering.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item, keeping them consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
