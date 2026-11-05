---
title: Conversation Records and Traceability for Research Outcome Registration and Intellectual Property: Track Progress and Check Statistics
slug: /en/industry/education-d006-c061-f007
page_type: 行业问题页
application_area: education
meta_title: Research IP | Chat Records | Progress
meta_description: Research IP: review chat records for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Research Outcome Registration and Intellectual Property: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on research achievement registration and intellectual property management, covering three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms come from registration records submitted weekly by research groups, with fields including achievement name, completer, date, and signature; patent disclosure documents come from technical disclosure documents submitted by inventors, with fields including invention name, technical solution, date, and signature; software copyright materials come from source programs and specifications compiled by the development team, with fields including software name, version number, date, and seal. When these three types of materials enter the conversation log and audit function, they serve respectively as record sources to be checked, used to compare whether the name, quantity, and date of the same achievement are consistent across two materials, and to check whether signatures or receipts are complete. The update rhythm is rolling submission along with registration progress, and the field characteristics are that the four items—name, quantity, date, and signature—need to be checked one by one.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and total record count, including role and citation information. The "progress table and statistical scope description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, quantity, and date of the same achievement match across the two materials | Paginate by application and session dimension, verify the total record count total and response `code` of 200, and sample one record to compare role and citation information |
| Patent disclosure document | Whether the version is synchronized, and whether signatures or receipts are complete | Use `chatId` to locate the session, page through to retrieve all records, and check whether `dataId` and `value` correspond to the same disclosure version |
| Software copyright materials | Whether the software name, version number, date, and seal are consistent | Retrieve the message list by `chatId` and session dimension, verify that the two role types, question and answer, appear alternately, and record the number of citations |

## Three common errors

- Phenomenon: The name, quantity, and date of the same achievement do not match between the achievement registration form and the patent disclosure document. Cause: The two materials are registered separately, and the total record count and fields are not checked by the same session dimension.
- Phenomenon: The version of the software copyright materials is not synchronized, and the dates of the source program and specification are inconsistent. Cause: After the materials are updated, the session records are not retrieved again, and the old version remains in the progress table.
- Phenomenon: The patent disclosure document lacks a signature or receipt, but the registration form shows it is complete. Cause: The signature status is not compared item by item with the citation information in the conversation records, and the statistical scope is not written into the table header.

## How to verify the setup

This function's acceptance: page through by total record count total to retrieve all records, and when the status code is 200, sample one record to check the role, citation information, and time, and confirm that the message identifiers and content fields `_id`, `dataId` and `value` correspond to the record.

Business test: use one week of records to verify the total, see whether the scope and exceptions are clearly stated, and whether the total record count matches the statistical count.

- Paginate by application and session dimension, retrieve two consecutive pages and compare the total and offset, and confirm that the number of records matches the total record count.
- Open one record to check the role, citation, and elapsed time fields, and check that the number of citations and the citation text tokens are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
