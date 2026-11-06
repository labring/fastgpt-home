---
title: Citations and Source Traceability for Corporate Sales and Product Training: Track Progress and Check Statistics
slug: /en/industry/education-d006-c042-f010
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Citations | Progress
meta_description: Sales Training: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Sales and Product Training: Track Progress and Check Statistics

## What this category's data looks like

In the enterprise sales product training scenario, three types of materials—product manuals, sales sales language, and channel training schedules—jointly enter the knowledge base retrieval node. Product manuals carry product names, function definitions, version numbers, and effective dates, and serve as the field baseline; sales sales language carries the wording, quantity commitments, and scenario Q&A for the same product, and often disagrees with the manual on names and quantities; channel training schedules carry training sessions, participating channels, instructors, and signed receipts, with dates and signatures being the key points of verification. The three types of materials are updated weekly or by version, and after entering the retrieval node each serves as a citation source participating in traceability; the cited content is output as an array for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length may be 0. The "progress table and statistics scope description" is completed afterward by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Fields, dates, and signatures: whether the product name, version number, and effective date are consistent with the sales language and the schedule | Open the citation marker to trace back to the manual paragraph, and check the original text snippet and source identifier in `quoteList` |
| Sales sales language | Whether the name, quantity, and date of the same record match across the two materials | Compare a one-week record item by item, and check that the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |
| Channel training schedule | Whether unsynchronized versions, missing signatures, or missing receipts are reflected in the schedule fields | Check the schedule sessions, instructor signatures, and receipt dates, record exceptions, and write them into the scope description |
| Citation content output | The number of returned entries matches the hit materials; being empty is also normal | Run a trial with a question that matches no materials, see that the output is empty while the chain continues, and record the number of entries separately |

## Three common errors

- Symptom: the name and quantity of the same record do not match between the manual and the sales language. Cause: the two materials are updated separately and their fields are not aligned by the same version number and effective date.
- Symptom: the schedule date and the receipt date are inconsistent, and signatures are missing. Cause: versions are not synchronized, and after training sessions are adjusted, signatures and receipts are not backfilled.
- Symptom: there is no citation marker in the answer, or the cited snippet does not match the original text. Cause: whether this round hit anything and which material was hit were not checked, and the issue was directly attributed to length truncation.

## How to verify the setup

Acceptance of this feature: ask a question with textual support and check whether the citation array and markers can trace back to the original text; then ask a question that matches no materials, confirm that the array is empty while the chain runs through, and record that `quoteMaxToken` is the citation content budget and the number of entries is the array length, without comparing the two for equality.

Business test: use a one-week record to check the totals, see whether the scope and exceptions are clearly written, and verify that the number of records matches the statistics count and that the scope is written into the header.

- Open the search parameter panel and check item by item, confirm that the values are consistent with those set in the knowledge base retrieval section, and check the selected collections and their vector models.
- Open the citation markers in the conversation, compare them against the source documents, check that each citation can trace back to the original paragraph, and write exceptions into the scope description.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
