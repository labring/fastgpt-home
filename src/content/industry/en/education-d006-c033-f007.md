---
title: Conversation Records and Traceability for Vocational College Skills Competition Organization: Track Progress and Check Statistics
slug: /en/industry/education-d006-c033-f007
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Chat Records | Progress
meta_description: Skills Competitions: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational College Skills Competition Organization: Track Progress and Check Statistics

## What this category's data looks like

Vocational college skills competition organization involves three types of materials: competition regulations, registration forms, and training plans. The sources are the academic affairs and competition affairs departments, updated weekly. Competition regulations contain the event name, group, date, and responsible person's signature; registration forms contain the contestant's name, class, event, and supervising teacher's signature; training plans contain the stage, class hours, venue, and coach's receipt. When the three types of materials enter the conversation record function, each serves as a reference for session evidence: regulations and registration forms are used to verify the event and personnel names in the records, and training plans are used to verify dates and stage progress. Conversation records are retained by application and session dimensions; the message list distinguishes questions from answers and carries citation and duration fields, for manual registration of the progress table and statistical scope explanation.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting the session message list and the total record count, including role and citation information. The "progress table and statistical scope explanation" is then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Competition regulations | Event name, group, date, and signature are consistent between the regulations and the records | Search records by event name, compare the regulation date and signature field, and verify the `chatId` source |
| Registration form | Contestant name, class, event, and supervising teacher's signature are consistent between the registration form and the records | Extract one record, verify the name and event, and check the correspondence of `dataId` |
| Training plan | Stage, class hours, venue, and coach's receipt are consistent between the plan and the records | Pull records weekly, compare the plan stage and class hours, and open `value` to verify citations and duration |
| Conversation records | The total record count matches the number of paginated entries, and each message has an identified role | Pull two pages consecutively, compare the offset and total, and confirm response `code` of 200 |

## Three common errors

- Symptom: the same contestant's name or event does not match across two materials. Cause: the registration form and regulation versions were not synchronized, and registration was not verified under the same scope.
- Symptom: the training plan date differs from the record date by one week. Cause: no receipt after the plan was updated, the old version was still in circulation, and exceptions were not marked during statistics.
- Symptom: exported records lack citations and signature receipts. Cause: only the first page was retrieved, pagination was not performed according to the total to retrieve everything, and citation fields were not verified.

## How to verify the setup

This feature's acceptance: paginate according to the total record count to retrieve everything, sample one record to verify the role, citation information, and time, and confirm `_id`, `dataId` and `value`, total, and response `code` of 200.

Business test: use one week of records to verify the total, and check whether the scope and exceptions are clearly stated.

- Pull two pages by application and session identifiers, compare the offset and total, and confirm response `code` of 200.
- Open one record, verify the role, citation, and duration fields, and register the progress table header scope.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
