---
title: Conversation Records and Traceability for New Employee Onboarding and Training: Track Progress and Check Statistics
slug: /en/industry/education-d006-c040-f007
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Chat Records | Progress
meta_description: Employee Onboarding: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for New Employee Onboarding and Training: Track Progress and Check Statistics

## What this category's data looks like

The progress records and statistical verification for enterprise new employee onboarding training draw on three types of materials: onboarding training plans, course sign-in sheets, and job descriptions. The onboarding training plan lists courses, class hours, and responsible persons by batch; the course sign-in sheet records participants, sign-in times, and signatures by session; the job description specifies required modules and assessment milestones by position. When these three types of materials enter the conversation logs and auditing function, they respectively play the roles of plan definitions, attendance evidence, and position requirements, with fields concentrated in names, quantities, dates, signatures, and receipts. The update rhythm is to register sign-ins after each training session, summarize progress once a week, and align with the training plan version once a month. Field characteristics are multiple sources, multiple versions, and multiple signature positions. The same participant's name spelling, class hour quantities, and dates in the plan and sign-in sheet are easily scattered across different records and need to be traced one by one through the conversation message list.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the conversation message list and total record count, including role and reference information. The progress table and statistical definition explanation are then completed manually or by an external system. The interface only retrieves conversation evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Course names, class hour quantities, start and end dates, and responsible person fields need to be aligned item by item with the sign-in sheet | Pull records by application and session dimension, check the course names in the plan against the session names in the sign-in sheet, and mark exceptions when dates and quantities do not match |
| Course sign-in sheet | Participant names, sign-in dates, and signatures or receipts need to be consistent with the required modules in the job description | Open a record to check the role, reference information, and time, use `chatId` to locate the session, use `dataId` to locate a single message, and use `value` to view references and elapsed time |
| Job description | Position required modules, assessment milestones, and version numbers need to be synchronized with the training plan | Pull two pages in succession to compare the total record count total and offset, confirm response `code` of 200, and then check whether the job description version is consistent with the plan batch |
| Statistical definition explanation | The total record count is the number of message records, counted separately from the number of sessions, and the definition is written in the header | Page through to retrieve all records by total record count, sample one record to check the role, reference information, and time, and record the number of references separately by array length |

## Three common errors

- Symptom: The same participant's name spelling, class hour quantities, and dates in the plan and sign-in sheet do not match. Cause: The two materials are registered separately and are not checked against the same definition.
- Symptom: The job description version is not synchronized, and the required modules are inconsistent with the training plan batch. Cause: After the version update, the training plan and sign-in sheet were not written back.
- Symptom: The sign-in sheet lacks a signature or receipt but is counted as attended during statistics. Cause: The registration step did not verify the signature position, and exceptions were not marked during summarization.

## How to verify the setup

Acceptance for this function: page through to retrieve all records by total record count, sample one record to check the role, reference information, and time; use `chatId` to locate the session, use `dataId` to locate a single message, use `value` to view references and elapsed time, and confirm that response `code` of 200 and the total record count total match.

Business test: Use one week of records to verify the totals and see whether the definitions and exceptions are clearly written; record the number of references by array length, view the reference content budget separately, and do not perform equality comparisons.

- Pull pages by application and session dimension, pull two pages in succession to compare the total record count and offset, and confirm that only the first page was not retrieved.
- Open a record to check the role, reference information, and time, check whether the exported record is missing references, and when the interface returns empty, first check the source of the application and session identifiers.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
