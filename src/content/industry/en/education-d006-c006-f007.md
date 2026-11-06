---
title: Conversation Records and Traceability for Kindergarten Operations and Quality Self-Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c006-f007
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Chat Records | Progress
meta_description: Kindergarten Quality: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Kindergarten Operations and Quality Self-Assessment: Track Progress and Check Statistics

## What this category's data looks like

This category's data involves three types of materials: self-assessment reports, issue lists, and rectification plans. Self-assessment reports describe the current status and scores item by item according to kindergarten operation behavior indicators; issue lists enumerate deduction items, responsible persons, and rectification deadlines one by one; rectification plans state measures, completion dates, and signatures. Fields across the three types of materials include indicator name, observation records, date, signature, and receipt. Materials are updated monthly or weekly, and versions tend to diverge. When entering the conversation record function, self-assessment reports serve as background explanations, issue lists serve as items to be verified, and rectification plans serve as the source of follow-up actions; each leaves traces of questions and answers in the session for comparison during registration and review.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and the total record count, including role and reference information. The "progress table and statistical criteria description" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Indicator name, observation records, date, and signature are consistent throughout the report | Pull by application and session dimension, check `chatId` and `value`, and see whether the message role matches the original conversation |
| Issue list | The name, quantity, and date of the same issue match across the two materials | Pull two pages consecutively and check the total record count and advance the offset by the number of records retrieved, confirming that the pagination parameters match the total count |
| Rectification plan | Measures, completion date, and signature or receipt are complete and versions are synchronized | Open a single record to check the reference and duration fields, and record the number of references and `dataId` |
| Progress table and statistical criteria description | The record count matches the statistical count, and the criteria are written in the header | Page through by total record count to retrieve all, and sample one record to check role, reference information, and time |

## Three common errors

- Symptom: The name, quantity, and date of the same issue do not match between the self-assessment report and the issue list. Cause: The two materials are updated separately, without verification using the same total record count and criteria.
- Symptom: The rectification plan version is not synchronized, and the old signature page is still in circulation. Cause: Session records only capture session evidence, and the business ledger is not re-registered according to the total record count.
- Symptom: The issue list lacks a signature or receipt, but the progress table shows it as rectified. Cause: The statistical criteria are not written in the header, and exceptions and receipts are not separately marked.

## How to verify the setup

This feature's acceptance: page through by total record count total to retrieve all, with response `code` of 200, sample one record to check role, reference information, and time, and record the number of references and `dataId`.

Business test: use one week of records to verify the totals, and see whether the criteria and exceptions are clearly stated.

- Pull paginated data by application and session dimension, check `chatId` and `value`, and confirm that the offset advances by the number of records retrieved until the total is covered
- Open a single record to check role, reference, and duration fields, record the number of references, and separately view the tokens of the reference text

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
