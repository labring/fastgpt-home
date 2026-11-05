---
title: Citations and Source Traceability for Compulsory Education Dropout Prevention: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c009-f010
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Citations | Intake
meta_description: Dropout Prevention: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Compulsory Education Dropout Prevention: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on compulsory education dropout prevention and control materials, covering three categories: dropout risk ledgers, persuasion-to-return records, and home visit records. The dropout risk ledger contains student name, risk level, determination date, and signature; the persuasion-to-return record contains the persuasion target, number of attempts, result, and receipt; the home visit record contains the home visit date, participants, and parent signature. Materials are updated by semester and by month, while persuasion-to-return and home visit entries are added as events occur. When these three categories of materials enter the Q&A intake and missing-item follow-up function, they respectively serve as the basis for risk identification, the basis for process documentation, and the basis for home-school communication, and are used to compare whether fields, dates, and signatures are complete, and to support citation sources and traceability.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0. The "accepted records and completed question items" are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Whether the fields include student name, risk level, determination date, and signature; whether the name, quantity, and date of the same record match across the two materials | Check the ledger fields and dates, compare the name and determination date in the persuasion-to-return record, see whether the signature column is empty, and check whether the citation superscript can point back to the original paragraph |
| Persuasion-to-return record | Whether the fields include the persuasion target, number of attempts, result, and receipt; whether versions are synchronized; whether missing signatures or receipts are identified | Check the number of persuasion attempts and the result, compare the date and participants in the home visit record, check whether the receipt attachment is missing, and see whether the number of items in the citation array matches the hit materials |
| Home visit record | Whether the fields include the home visit date, participants, and parent signature; whether the name, quantity, and date of the same record match across the two materials | Check the home visit date and participants, compare the student name in the dropout risk ledger, check the parent signature column, and when confirming that the cited snippet does not match the original text, first verify the hit materials |
| Knowledge base retrieval node | Whether it is linked to knowledge bases of the same vector model; the cited content is output as an array, and the length may be 0; even if no content is found, the output chain will still run through | In the node, check the selected collections and their vector models, open the search parameter panel and verify each item, and run a test with a question that has no matching materials to see that the output is empty while the chain continues |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the dropout risk ledger and the persuasion-to-return record. Cause: the two entries were made at different times, and field comparison and version synchronization were not performed.
- Symptom: the persuasion-to-return record lacks a receipt, or the home visit record lacks a parent signature. Cause: the material supplementation step did not include signature and receipt validation, so missing items were not identified and followed up.
- Symptom: there is no citation superscript in the answer, or the cited snippet does not match the original text. Cause: first verify whether this round hit anything and which material was hit, then verify `quoteMaxToken` trimming, and do not directly attribute it to length.

## How to verify the setup

This feature's acceptance check: ask a question with original-text support and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through. Record the number of items in the array, verify the `quoteMaxToken` budget separately, and do not compare the two for equality.

Business test: submit a question missing key information and see whether it first follows up before answering; check whether the follow-up points to missing fields, dates, and signatures in the dropout risk ledger, persuasion-to-return record, and home visit record.

- In the conversation, turn on citation superscripts, compare them against the source documents, check whether the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) are consistent with the original paragraphs, and record the number of items in the array.
- Open the search parameter panel and verify each item, confirm that the linked knowledge bases use the same vector model; run a test with a question that has no matching materials, and check that the output in `quoteList` is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
