---
title: Citations and Source Traceability for School Moral Education and Class Teacher Work: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c014-f010
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Citations | Operations
meta_description: Pastoral Education: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Moral Education and Class Teacher Work: Coordinate Operations and Application Handover

## What this category's data looks like

This page focuses on materials for school moral education and homeroom teacher work, involving themed class meeting plans, student comprehensive quality records, and home visit records. In deployment, operations, and application handover, these materials serve as knowledge base sources with different roles: themed class meeting plans provide activity design and implementation records, student comprehensive quality records present evaluation fields and semester trajectories, and home visit records carry time, subject, and signed receipts. Materials are usually updated by semester or month, sourced from school archived documents or collaborative spreadsheets. Field characteristics include student name, class, date, activity theme, evaluation grade, home visit subject, and signature column. The name, quantity, and date of the same record in two materials may not match; when versions are not synchronized or signed receipts are missing, item-by-item verification against the handover form will expose the gaps. After materials enter the knowledge base retrieval node, the citation output is used for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "handover-ready deployment status and operation records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Fields include activity theme, date, class, and signature column; the name and date of the same plan in two materials must be consistent | Open the original plan and cited fragment, verify the activity theme, date, class, and signature item by item, and record missing items |
| Student comprehensive quality record | Fields include student name, evaluation grade, semester, and quantity; the quantity and date in two materials must match | Compare the cited source with the original record, verify name, grade, semester, and quantity, and mark inconsistencies |
| Home visit record | Fields include home visit subject, time, receipt, and signature; the version must be synchronized and receipts complete | Retrieve the home visit record citation and original text, verify subject, time, receipt, and signature, and confirm version synchronization |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model; cited content is output as an array, and the length can be 0 | In the node, verify the selected collection and vector model, run a test with a no-match question, and check that the array is empty while the pipeline still works |

## Three common errors

- Symptom: the name, quantity, and date of the same record in two materials do not match. Cause: source document versions are not synchronized or there are manual transcription differences, and the cited fragment and original text were not verified item by item.
- Symptom: signatures or receipts are missing during item-by-item verification against the handover form. Cause: the home visit record or class meeting plan did not complete the signature process, and the receipt page was omitted during archiving.
- Symptom: there is no citation superscript in the answer, and the citation array is empty. Cause: no material was hit in this round, or the search parameters are inconsistent with the knowledge base retrieval settings; first check the hit situation, then check the trimming.

## How to verify the setup

This feature's acceptance: ask a question with original-text support and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the pipeline still works. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. When citation limits are involved, check the tokens of the cited text, and record the array item count separately.

Business test: perform one item-by-item verification against the handover form, see which record is missing, and verify the fields, dates, and signatures of the themed class meeting plan, student comprehensive quality record, and home visit record.

- Open the search parameter panel and verify item by item, confirming that the values are consistent with the knowledge base retrieval section, and check the correspondence between the citation array and superscripts in `responseData` (non-streaming module results returned with detailed output enabled).
- Open the citation superscript in the conversation, compare it with the source document, verify the original text fragment and source identifier in `quoteList`, and confirm that each citation can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
