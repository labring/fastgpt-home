---
title: Conversation Records and Traceability for Continuing Education Training Hour Recognition: Track Progress and Check Statistics
slug: /en/industry/education-d006-c038-f007
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Chat Records | Progress
meta_description: Continuing Education: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Continuing Education Training Hour Recognition: Track Progress and Check Statistics

## What this category's data looks like

Continuing education credit recognition materials include three types: course filing forms, study certificates, and credit recognition forms. Sources are training organizers, learning platforms, and HR departments, with updates summarized weekly or monthly. Course filing forms provide the course name, number, and filing date; study certificates provide the learner, course, and completion date; credit recognition forms provide recognized credits, review date, and signature. When these three types of materials enter the conversation log interface, they respectively assume the roles of course basis, learning fact, and recognition conclusion. Field characteristics include name, quantity, date, signature, and receipt, and must be aligned item by item in the progress table and statistical scope description to ensure the number of records matches the statistical count.

## Configuration and implementation checks

This step is executed by the conversation log interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. The "progress table and statistical scope description" is then completed manually or by an external system. The interface only retrieves session evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Course name, number, filing date, and signature are complete, and are consistent item by item with the study certificate and credit recognition form | Pull records by application and session dimension, verify that `chatId` matches the actual session, and check whether the course name and filing date are aligned across materials |
| Study certificate | Learner, course name, completion date, and quantity match; unsynchronized versions or date misalignment must be flagged | Open a single record to verify the role field and reference information, confirm that message roles correspond to the original conversation, and record the number of references and tokens budget |
| Credit recognition form | Recognized credits, review date, signature, and receipt are complete; the statistical scope is written in the header, and exceptional cases are explained separately | Pull two pages consecutively to compare total and offset, sample one record to verify `dataId` and `value`, and confirm that the total record count matches the statistical count |

## Three common errors

- Phenomenon: The course name, quantity, or date of the same record does not match between the course filing form and the study certificate. Cause: Registration was not filled in according to a unified scope, and versions were not synchronized.
- Phenomenon: The credit recognition form lacks a signature or receipt, and the progress table and statistical scope description cannot be reconciled. Cause: The review step was not closed-loop, and materials were not archived in time.
- Phenomenon: The interface returns empty but there are sessions in the interface, or only the first page is retrieved. Cause: The application and session identifiers are inconsistent, and pagination offsets were not pulled consecutively.

## How to verify the setup

Acceptance of this feature: page through using the total record count total to retrieve all records, sample one record to verify role, reference information, and time, and confirm response `code` of 200.

Business test: use one week of records to verify the totals, check whether the scope and exceptions are clearly written, and whether the total record count matches the statistical count.

- Verify the application and session identifiers in the request parameters, confirm that `chatId` matches the actual session, and avoid an empty return.
- Pull two pages consecutively to compare total and offset, check whether the number of records matches the total, and record the number of references and tokens budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
