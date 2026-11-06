---
title: Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c026-f010
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Citations | Operations
meta_description: Degree Certificates: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Coordinate Operations and Application Handover

## What this category's data looks like

This page focuses on the category of degree conferral and certificate information reporting. Materials include degree application forms, thesis review forms, defense resolutions, as well as certificate information reporting field tables and receipts. The degree application form carries the applicant's basic information, discipline and major, and date; the thesis review form carries the review conclusion, reviewer signature, and date; the defense resolution carries the defense conclusion, committee member signatures, and date. The three types of materials jointly support the consistency of the name, quantity, date, and signatures of the same record. When the materials enter the knowledge base retrieval node, they are respectively associated as cited sources for subsequent nodes to compare fields, write ledgers, and generate reports. The update rhythm advances with batches: application forms are collected at the application stage, review forms at the review stage, resolutions after the defense, and receipts after reporting. Field characteristics are concentrated in name, student ID, major, date, conclusion, signature, and receipt number. The name and date of the same record in different materials need to be aligned item by item, and versions are distinguished by batch number and material signing date.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length can be 0. The handover-ready deployment status and operation records are completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the name, student ID, major, application date, and signature align item by item with the thesis review form and defense resolution | In the citation array, refer back to the original text entry by entry, check the fields and dates, and record missing items |
| Thesis review form | Whether the review conclusion, reviewer signature, and review date are consistent with the conclusion and date in the defense resolution | Open the citation marker to compare with the source document, and check whether the signature and receipt are complete |
| Defense resolution | Whether the defense conclusion, committee member signatures, and defense date are consistent with the same record in the application form and review form | Check item by item according to the handover sheet, and record version desynchronization or missing signatures |
| Certificate information reporting field table | Whether the reporting fields and receipt number correspond to the name, quantity, and date in the three types of materials | Check the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and record the array length separately |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record in the degree application form and thesis review form do not match. Cause: The two materials were entered separately and the fields were not aligned by the same batch number.
- Phenomenon: The defense resolution has been updated, but the citation still points to the old version of the review form. Cause: The version was not synchronized, the associated knowledge base was not updated with the batch, and the cited fragment does not match the original text.
- Phenomenon: The citation array is empty while the answer chain continues. Cause: No materials were matched in this round; an empty array is a normal output and does not equal retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a question with original-text evidence, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: check item by item once according to the handover sheet, see which item record is missing, and check whether the version, connection, and task record are consistent.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, check the tokens of the cited text and the `quoteMaxToken` budget, and record the array length separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
