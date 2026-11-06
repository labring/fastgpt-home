---
title: Citations and Source Traceability for Vocational School Student Internships: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c030-f010
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Citations | Intake
meta_description: Student Internships: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational School Student Internships: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data looks like this: For vocational school student internship management, materials include internship agreements, internship plans, internship logs, as well as tripartite agreements, internship assessment forms, safety responsibility statements, receipts, and signature pages. Agreements govern rights, responsibilities, and duration; plans govern positions, rotations, and week numbers; logs govern daily attendance and task completion; assessment forms govern stage evaluations; receipts and signature pages govern confirmation and delivery. Field characteristics center on names, quantities, dates, signatures, and version numbers: the same student's name may be written differently in the agreement and the plan, the same position may have different names in the plan and the log, the same batch's internship headcount may differ between the agreement attachment and the ledger, start and end dates and week numbers may be misaligned, signatures or receipts may be missing, and a revised version may be updated in only one of the materials. Materials enter the knowledge base as documents; the retrieval node recalls original text fragments using the same vector model and outputs an array of cited content, based on which subsequent nodes or humans compare fields, write ledgers, and generate reports. The update rhythm rolls by batch and semester; after a new version enters, the old version may still be recalled and must be distinguished by source identifier.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. Even if no content is retrieved, the output chain still runs through. Acceptance records and follow-up questions to be completed are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Whether the student name, position name, start and end dates, signature, and receipt in the agreement are consistent with the plan and log | In the conversation, open the citation markers and trace each one back to the original agreement paragraph to verify names, quantities, dates, and signatures; record the number of citations by the array length, and view the tokens of the cited text separately with `quoteMaxToken`, without equality comparison |
| Internship plan | Whether the positions, rotation week numbers, and batch headcount in the plan match the agreement attachment and log | Run a trial with a question missing key information, first see whether it asks follow-up questions to fill the gap; then verify the original plan fragments and source identifiers to confirm the version number and date; the output fields can be seen in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Internship log | Whether the attendance dates, task names, and mentor signatures in the log are consistent with the plan and assessment form | Compare against the original log paragraphs to verify dates and signatures; if the same record has mismatched names or quantities in two materials, first check which material was hit in this round, then see whether trimming is needed; when citations are empty, the chain still runs through |
| Internship assessment form and receipt | Whether the assessment conclusion, signature, and receipt are complete, and whether the version is synchronized with the agreement and plan | Open the search parameter panel and verify the values item by item; in the citation details, view the original text fragments and source identifiers in `quoteList` to confirm whether the receipt and signature page were recalled |

## Three common errors

- Phenomenon: The same student's name is written differently in the agreement and the plan, and the dates and batch headcount also do not match. Cause: The two materials were filled in by different steps and were not checked against the same field standard.
- Phenomenon: The plan has been revised, but the log and assessment form still cite the old version, and the week numbers and position names are misaligned. Cause: The versions were not synchronized; after the new version entered the knowledge base, the old version was still recalled.
- Phenomenon: The answer has content but the citation array is empty, or the cited fragments do not match the original text. Cause: No material was hit in this round, or a different material was hit, and this cannot be directly attributed to length trimming.

## How to verify the setup

How to verify the setup: For this feature's acceptance: ask a question with original-text support and check whether the citation array and markers can trace back to the original text; then ask a question with no matching material and confirm that the array is empty while the chain runs through; record the number of citations by the array length, and view the tokens of the cited text separately with `quoteMaxToken`, without equality comparison; the output structure can be seen in `quoteList` within `responseData`.

Business test: Ask a question missing key information and see whether it asks follow-up questions before answering; if it answers directly, check whether signature, date, or version fields in the agreement, plan, or log were omitted.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent; open the search parameter panel and verify the values item by item.
- Run a trial with a question that has no matching material and see whether the output is empty while the chain continues; in the conversation, open the citation markers and compare the original text fragments and source identifiers against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
