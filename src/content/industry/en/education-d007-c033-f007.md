---
title: Conversation Records and Traceability for Vocational College Skills Competition Organization: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c033-f007
page_type: 行业问题页
application_area: education
meta_title: Skills Competitions | Chat Records | Review
meta_description: Skills Competitions: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational College Skills Competition Organization: Trace Exceptions and Review Results

## What this category's data looks like

Vocational college skills competition organization involves three types of materials: competition regulations, registration forms, and training plans. Competition regulations are issued by the organizer and include the event name, date, signature field, and version number; registration forms are submitted by participating teams and include competitor names, quantity, date, and receipt; training plans are filled in by instructors and include phase arrangements, signature, and version. The three types of materials enter the conversation logs and auditing function as paper or electronic files, respectively serving the roles of rule basis, personnel credential, and process record. The update rhythm advances through the three stages before the competition, during the competition, and after the competition, and the field characteristics are concentrated in name, quantity, date, signature, and version number. When materials enter this function, the conversation record interface provides message evidence by application and session dimensions, and the anomaly list and review conclusions are registered, exported, and reviewed by manual or external systems based on this.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimensions), outputting a session message list and total record count, including role and citation information. The "anomaly list and review conclusions" are then completed by manual or external systems.

| Object | Check | Verification action |
| --- | --- | --- |
| Conversation record interface | Paginated retrieval by application and session dimensions; the returned results distinguish the two role types, question and answer, and include citation and duration fields | In the request parameters, verify the source of the application and session identifiers, pull two consecutive pages and check the total record count and advance the offset by the number of records retrieved, and open one record to verify the role, citation, and duration |
| Competition regulations | The event name, date, signature field, and version number match between the regulations and the registration form | Compare item by item the event name, date, and signature in the regulations and registration form, and check whether the version number is synchronized |
| Registration form | Competitor names, quantity, date, and receipt are consistent between the registration form and the training plan | Verify the competitor names, quantity, and date in the registration form and training plan, and check whether the receipt and signature are complete |
| Training plan | Phase arrangements, signature, and version number do not conflict between the training plan and the regulations | Compare the phase dates and version numbers in the training plan and regulations, and check whether any signature field is missing |

## Three common errors

- Phenomenon: The same competitor name is written differently in the registration form and the training plan. Cause: The two materials are entered separately, without aligning the name field or synchronizing the version.
- Phenomenon: The dates in the registration form and the training plan do not match. Cause: The materials have different update rhythms, the old version is not marked as invalid, and the new version is not confirmed by receipt.
- Phenomenon: The regulations lack a signature or receipt. Cause: The signature field was not synchronized with the version update, and the review step did not check the signature and receipt item by item.

## How to verify the setup

This function's acceptance: page through using the total record count total to retrieve all records, open one record to verify the role, citation information, and time, and confirm that response `code` of 200 matches the total record count total; the number of citations is recorded separately by array length, and the citation upper limit checks the tokens of the citation text; do not compare the two for equality; verify the message identifiers and content fields `_id`, `dataId` and `value`.

Business test: create one anomaly record and see whether it can be traced back to the source material.

- Pull two consecutive pages and check the total record count and advance the offset by the number of records retrieved, confirming that the number of records matches the total.
- Open one record to verify the role, citation, and duration fields, and verify the sources of `_id`, `dataId` and `value`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
