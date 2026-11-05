---
title: Conversation Records and Traceability for Vocational College Program Registration: Track Progress and Check Statistics
slug: /en/industry/education-d006-c028-f007
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Chat Records | Progress
meta_description: Vocational Programs: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational College Program Registration: Track Progress and Check Statistics

## What this category's data looks like

This page deals with vocational college program setup filing materials, including three types: program setup filing forms, talent demand justification, and faculty and equipment lists. The filing form records the program name, code, length of study, and signature fields; the justification materials record industry job demand, survey dates, and justification conclusions; the faculty and equipment list records the number of full-time teachers, the number of equipment sets, and dates. The three types of materials are updated by academic year or application batch, and the field characteristics are name, quantity, date, signature, and receipt. When entering the conversation record interface, the filing form and list serve as question-side attachments or description text, and the justification conclusion serves as a citation source on the answer side. Session messages are aggregated by application and session dimensions, forming a traceable chain of conversational evidence for subsequent registration and review.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting a session message list and the total number of records, including role and citation information. The progress table and statistical scope description are then completed manually or by an external system. The message list is not a version ledger of business materials; the total number of records is the number of message records, which is not the same quantity as the number of sessions.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | The same program name, code, quantity, and date are consistent between the filing form and the list, and signatures and receipts are complete | Pull records by application and session dimensions, verify `chatId` and `dataId`, and compare the filing form fields with the message citation content |
| Talent demand justification | The justification date, number of positions, and conclusion align between the filing form and the justification materials, and versions are synchronized | Page through to retrieve all records, use `value` to view a single citation and elapsed time, and verify whether the justification conclusion is consistent with the message answer |
| Faculty and equipment list | The number of full-time teachers, number of equipment sets, and dates are consistent across the three materials; missing signatures or receipts must be flagged | Pull two consecutive pages and compare the total number of records and the offset, and check whether question and answer each message has an identified role in the returned list |
| Conversation record interface output | The total number of records matches the number of paginated entries, and the role, citation, and elapsed time fields can be verified | Open one record to verify the citation and elapsed time, confirm that the number of citations is the array length, and that citation text tokens are recorded separately |

## Three common errors

- Phenomenon: The name, quantity, or date of the same program does not match between the filing form and the faculty list. Cause: The two materials are registered separately and are not checked in sync under the same batch.
- Phenomenon: The justification materials have been updated, but the filing form is still the old version. Cause: Versions are not synchronized, and there is a lack of a unified update cadence and receipt confirmation.
- Phenomenon: The interface returns empty but there are sessions in the UI, or only the first page is retrieved. Cause: The pagination parameters and identifier sources have not been verified, and the exported records lack citations.

## How to verify the setup

This feature acceptance: page through using the total number of records total to retrieve all records, sample one record to verify the role, citation information, and time, and confirm response `code` of 200.

Business test: use one week of records to verify the totals, and check whether the scope and exceptions are clearly stated.

- In the request parameters, verify the source of the application and session identifiers, and pull two consecutive pages to compare the total number of records and the offset.
- Open a single record to verify the citation and elapsed time fields, confirm that the number of citations is the array length, and that citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
