---
title: Citations and Source Traceability for School Exam Question Setting and Grading: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c011-f010
page_type: 行业问题页
application_area: education
meta_title: School Exams | Citations | Checks
meta_description: School Exams: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Exam Question Setting and Grading: Compare Documents and Locate Differences

## What this category's data looks like

In the primary and secondary school exam question setting and grading scenario, materials include the question-setting two-way specification table, the exam paper, and the grading rubric. The three form a mutually corroborating relationship around the same exam: the specification table defines the assessment points and question type distribution, the exam paper carries the actual questions and score values, and the grading rubric specifies the answers and scoring points. The material source is the finalized version from the teaching and research group, and the update rhythm advances round by round with question-setting revisions, review receipts, and recheck signatures. Field characteristics center on names, quantities, dates, and signatures: the question number names, sub-question quantities, total score values, and question-setting dates of the same record in the specification table and the exam paper must be consistent, and the scoring point numbers in the grading rubric must correspond to the question numbers in the exam paper. When the materials enter the knowledge base retrieval node, each participates in retrieval as an independent source document, and the citation output returns the original text and source identifier according to the hit snippet, providing a traceable snippet basis for subsequent comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manual work; the citation array itself is not a discrepancy list, ledger, or report.

| Object | Check | Verification action |
| --- | --- | --- |
| Question-setting two-way specification table | The question number names, sub-question quantities, total score values, and question-setting dates are item-by-item consistent with the exam paper, and the signature column has signatures from the question setter and reviewer | Use one real record to retrieve the original text of the specification table, check the question number and quantity fields, and then compare with the same question number in the exam paper |
| Exam paper | The question numbers, scoring point numbers, and answer dates are consistent with the grading rubric, and the version number and receipt are complete | Retrieve the original text snippet of the exam paper, check the total score value and date, and then compare with the corresponding question number in the grading rubric |
| Grading rubric | The assessment point names, quantities, and dates are consistent with the specification table; missing signatures or receipts are considered incomplete | Retrieve the original text of the grading rubric, check the scoring point numbers and signature column, and then compare with the assessment point names in the specification table |
| Citation content output | The number of returned entries is consistent with the hit materials; being empty is also normal; `quoteMaxToken` only constrains the citation text budget | Run a test with a question that has no matching materials, observe that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, and record the array entry count separately |

## Three common errors

- Symptom: The names and quantities of the same record in the specification table and the exam paper do not match. Cause: After a question-setting revision, only one material was changed and the other was not synchronized; it is necessary to first check the hit snippet and then locate the field.
- Symptom: The scoring point numbers in the grading rubric are misaligned with the question numbers in the exam paper. Cause: The versions were not synchronized; the old rubric entered retrieval together with the new exam paper, and the cited snippet points back to the old paragraph.
- Symptom: The cited snippet does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming; do not directly attribute it to length trimming; an empty array is a normal output.

## How to verify the setup

Acceptance of this feature: Ask a question with original text evidence, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the array entry count and the `quoteMaxToken` budget; do not compare the two for equality.

Business test: Use one real record to find fields inconsistent with the ledger, check names, quantities, dates, and signatures, and submit the discrepancies to the reviewer for confirmation and write-back.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, turn on citation superscripts, compare each citation against the source document to check whether it can point back to the original paragraph, and view the source identifier in `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
