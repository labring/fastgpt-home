---
title: Conversation Records and Traceability for Undergraduate Program Establishment and Adjustment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c017-f007
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Chat Records | Progress
meta_description: Undergraduate Programs: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Undergraduate Program Establishment and Adjustment: Track Progress and Check Statistics

## What this category's data looks like

Materials for progress records and statistical verification of undergraduate program establishment and dynamic adjustment come from three types: program establishment application forms, talent training plans, and expert demonstration opinions. The application form provides the proposed program name, code, application date, and responsible person's signature; the training plan provides the course structure, credits and class hours, and revision date; the demonstration opinions provide the expert list, demonstration conclusion, and signature receipt. Materials enter by application batch, and the update rhythm is synchronized with the university's internal approval nodes. Field characteristics are concentrated in four items: name, quantity, date, and signature. When the three types of materials enter the conversation record function, each serves as a verification basis: the application form verifies the application subject and date, the training plan verifies the courses and credit standards, and the demonstration opinions verify the number of experts and signature completeness. The conversation record interface retrieves the message list and total record count by application and session dimensions, for manual or external system registration, export, and review, forming a progress table and statistical standard description.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting the session message list and total record count, including role and citation information. The "progress table and statistical standard description" is then completed manually or by an external system. The interface only retrieves conversation evidence and does not write business ledgers; the number of messages and the number of sessions are not the same quantity.

| Object | Check | Verification action |
| --- | --- | --- |
| Program establishment application form | Name, code, application date, and signature are consistent between the application form and the demonstration opinions | Pull conversation records by `chatId`, compare the program name and application date in the application form and demonstration opinions, and list separately those missing signatures or receipts |
| Talent training plan | Course names, credits and class hours, and revision date match between the plan and the application form | Page through to retrieve all records, verify the number of courses in the plan against the number listed in the application form, and mark those with inconsistent dates as having unsynchronized versions |
| Expert demonstration opinions | The number of experts, demonstration conclusion, and signature receipts are complete and connect with the application form date | Open a single record to verify role, citation information, and time, use `dataId` to locate the specific message, and confirm that the number of demonstration opinion entries corresponds to the signature receipts |
| Conversation record interface output | The total record count matches the paginated count, and each message has an identified role | Pull two pages consecutively to compare total and offset; when the status code is 200, sample one record to inspect the citation and elapsed time fields in `value`, and record the citation count separately by array length |

## Three common errors

- Phenomenon: The same program's name and application date do not match between the application form and the demonstration opinions. Cause: The two materials were filled in separately, no field-level comparison was done before submission, and versions were not synchronized.
- Phenomenon: The number of courses in the training plan is inconsistent with the number listed in the application form, and a discrepancy appears during total verification. Cause: After the plan was revised, the application form was not backfilled, and the standard was not written into the header.
- Phenomenon: Expert demonstration opinions lack signatures or receipts; the record count appears complete but cannot be archived. Cause: The signature step is disconnected from record registration, and exceptions are not marked in the progress table.

## How to verify the setup

This function's acceptance: page through by total record count total to retrieve all records, sample one to verify role, citation information, and time, and confirm the status code is 200 and the message list can be located item by item.

Business test: use one week of records to verify the total, check whether the standard and exceptions are clearly written, and whether the four items of name, quantity, date, and signature correspond item by item.

- Pull records by `chatId` and session dimension, pull two pages consecutively to compare total and offset, and confirm the record count matches.
- Open a single record to verify role, citation information, and elapsed time, use `dataId` and `value` to locate the citation text, and record the array count separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
