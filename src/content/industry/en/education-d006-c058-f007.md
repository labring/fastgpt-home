---
title: Conversation Records and Traceability for Research Project Task Agreement Signing: Track Progress and Check Statistics
slug: /en/industry/education-d006-c058-f007
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Chat Records | Progress
meta_description: Research Agreements: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Project Task Agreement Signing: Track Progress and Check Statistics

## What this category's data looks like

At the signing stage of a research project task book, the materials usually include three documents: the project task book, the subject task breakdown table, and the budget book. The task book gives the overall objectives and period; the breakdown table assigns tasks to subjects and responsible persons; the budget book corresponds to funding categories and amounts. The three documents are generated synchronously at the signing stage, with fields concentrated on names, quantities, dates, and signature receipts, and the update rhythm follows the signing progress. After entering this function, the task book and the breakdown table serve as the verification baseline, and the budget book serves as the reference for funding definitions. The conversation message list and total record count retrieved by the conversation records interface by application and session dimensions serve as the evidence source for progress records and statistical verification, based on which manual staff or external systems register, export, and review.

## Configuration and implementation checks

This step is executed by the conversation records interface (by application and session dimensions), which outputs the conversation message list and total record count, including role and citation information. The "progress table and statistical definition description" is then completed by manual staff or external systems. The message list is not a version ledger of business materials; it is used only as conversation evidence.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Check the name, quantity, date, and signature against the subject task breakdown table, and confirm that the two documents describe the same record consistently | Check the source of the application and session identifiers in the request parameters, use `chatId` to locate the session, retrieve all pages, and compare the total record count total |
| Subject task breakdown table | Check the subject name, responsible person, and start/end dates against the budget book, and confirm that versions are synchronized and there are no missing signatures or receipts | Pull two pages in succession and compare the offset and total, open one record to check the role field and citation information, and record the elapsed-time field separately |
| Budget book | Check the funding categories, amounts, and dates against the task book, and confirm that the name and quantity of the same record match across the three documents | Retrieve all pages by total record count, sample one record to check `dataId` and the tokens of the cited text, and record the array length separately |
| Conversation records interface | Paginate by application and session dimensions; the returned results distinguish the two role types of question and answer, and carry citation and elapsed-time fields | Check response `code` of 200 and the total record count total, and use `value` to view the role, citation, and elapsed time of a single record |

## Three common errors

- Symptom: the name, quantity, or date of the same record does not match between the task book and the breakdown table. Cause: the two documents are registered separately, not backfilled according to a unified definition, and versions are not synchronized.
- Symptom: the funding categories or dates in the budget book and the task book are inconsistent. Cause: after budget adjustments, they were not synchronized to the task book, and signatures or receipts are missing, causing the definitions to diverge.
- Symptom: the interface returns empty but there are sessions in the interface, or only the first page is retrieved. Cause: the sources of the application and session identifiers are inconsistent, the pagination offset is not advanced, and the exported records lack citations.

## How to verify the setup

Acceptance of this function: retrieve all pages by total record count, sample one record to check the role, citation information, and time, confirm that response `code` of 200 matches the total record count total, and record the citation count separately by array length.

Business test: use one week of records to check the totals, see whether the definitions and exceptions are clearly written, confirm that the record count matches the statistical count, and write the definitions into the header.

- Check the source of the application and session identifiers in the request parameters, use `chatId` to locate the session, and pull two pages in succession to compare the offset and total.
- Open one record to check the role field and citation information, use `value` to view the elapsed-time field, and record the tokens of the cited text and the array length separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
