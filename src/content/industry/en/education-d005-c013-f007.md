---
title: Conversation Records and Traceability for School Teacher Training Credits: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c013-f007
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Chat Records | Versions
meta_description: Teacher Credits: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for School Teacher Training Credits: Maintain Document Versions and Changes

## What this category's data looks like

This page focuses on three types of materials in primary and secondary school teacher training credit management: training notices, credit recognition forms, and participant lists. Training notices come from education administrative departments or training institutions and are issued by project batch; their fields include project name, training dates, class hours, target participants, and registration requirements. Credit recognition forms are filled in by the training unit or school; their fields include teacher name, ID number, project name, recognized credits, recognition date, and signature of the person in charge. Participant lists are provided by the training organizer; their fields include name, unit, subject, participation date, and sign-in receipt. The three types of materials update at different rhythms: notices update as projects launch, lists update with registration and attendance, and recognition forms update with review and signature. When the materials enter the conversation log and auditing feature, notices serve as cited sources, while lists and recognition forms serve as verification evidence. The conversation record interface pulls the message list by application and session dimensions, for manual or external systems to register, export, and review.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimensions), which outputs the session message list and the total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system; the message list is not a version ledger for business materials.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Whether the project name, training dates, class hours, target participants, and signature field are consistent with the current version | In the request parameters, check that `chatId` matches the actual session; after paging through to retrieve all records, compare the notice fields with the cited sources |
| Credit recognition form | Whether the teacher name, project name, recognized credits, recognition date, and signature of the person in charge correspond to the participant list | Open a single record to check the role, citation information, and time; check whether the names, quantities, and dates in the recognition form and the list match |
| Participant list | Whether the name, unit, subject, participation date, and sign-in receipt are in sync with the notice and the recognition form | Page through by the total record count total to retrieve all records; sample one record to check `dataId` and the number of citations, and confirm that the list is consistent with the notice and the recognition form |
| Session record | The two role types, question and answer, appear alternately, and citation and elapsed-time fields are visible | Pull two pages in a row and compare the total and offset; open one record to check the citation and elapsed-time fields in `value` |

## Three common errors

- Symptom: The project name and class hours for the same record do not match between the training notice and the credit recognition form. Cause: The two materials are updated separately, versions are not synchronized, and cited sources are not adjusted to follow the current version.
- Symptom: The teacher names, quantities, and dates in the participant list and the recognition form are inconsistent. Cause: The list is updated by registration, while the recognition form is updated by review; intermediate changes are not written back, and signatures or receipts are missing.
- Symptom: The interface returns empty but there are sessions in the UI. Cause: The sources of the application and session identifiers are inconsistent, or only the first page is retrieved; the total record count total and the offset are not aligned, and exported records lack citations.

## How to verify the setup

This feature's acceptance: page through by the total record count total to retrieve all records, sample one record to check the role, citation information, and time, and confirm response `code` of 200 and that `_id`, `dataId` and `value` are queryable.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- Use the application and session identifiers to pull records, pull two pages in a row and compare the total and offset, and confirm that the number of records matches the total.
- Open a single record to check the role, citation, and elapsed-time fields, and check that the number of citations and the citation text tokens are recorded separately, without comparing them for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
