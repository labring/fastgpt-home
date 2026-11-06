---
title: Conversation Records and Traceability for Vocational College Curriculum Planning: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c029-f007
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Chat Records | Versions
meta_description: Vocational Curricula: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational College Curriculum Planning: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses the scenario of formulating talent cultivation programs in vocational colleges. Materials include talent cultivation programs, curriculum standards, and job competency analysis tables. The three types of materials come from different sources: programs are revised under the leadership of the academic affairs office, curriculum standards are compiled by secondary colleges, and job competency analysis tables are formed through research by professional teams. In terms of update cadence, programs are revised on a rolling academic-year basis, curriculum standards are adjusted with industry needs, and job competency analysis tables are reviewed every two to three years. Field characteristics center on program name, course name, class hours and credits, applicable grade, compilation date, and signature fields. When entering the conversation record function, programs and curriculum standards serve as the context sources for questions and answers, and job competency analysis tables serve as citation evidence. Together, the three constitute the citation materials in the session, but they do not directly generate a version ledger.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and the total number of records, including role and citation information. The version ledger and change records are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Program name, class hours and credits, compilation date, and signature fields are consistent across the three materials | Retrieve the session records and check whether the program fields match the curriculum standards and job competency analysis table |
| Curriculum standard | Course name, applicable grade, date, and signature or receipt are complete | Pull paginated records by `chatId` and compare the name and quantity of the same course in the two materials |
| Job competency analysis table | Job title, competency items, research date, and signature fields have no missing entries | Open a single record and check the citation information in `dataId` and `value` |
| Conversation record interface | The total number of records total matches response `code` of 200, and each message has an identified role | Pull two pages consecutively and compare the offset and total to confirm the order of the two role types: question and answer |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the program and the curriculum standard. Cause: The two materials were revised separately, without field-level comparison and receipt confirmation.
- Phenomenon: The version is not synchronized, and the old version is still cited. Cause: After revision, the knowledge base or external documents were not updated, and citation entries still point to the old version.
- Phenomenon: Signatures or receipts are missing, and the materials cannot be traced. Cause: Signature fields were not left in the compilation and review steps, or receipts were not archived.

## How to verify the setup

This function's acceptance: page through and retrieve all records by the total number of records total, sample one record to check the role, citation information, and time, and confirm response `code` of 200.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- Pull paginated records by application and session identifier, and check whether the sources of `chatId` and `dataId` match reality.
- Open a single record, check the citation and elapsed time fields in `value`, and separately record the number of citations.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
