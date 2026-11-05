---
title: Conversation Records and Traceability for Undergraduate Program Establishment and Adjustment: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c017-f007
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Chat Records | Versions
meta_description: Undergraduate Programs: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Undergraduate Program Establishment and Adjustment: Maintain Document Versions and Changes

## What this category's data looks like

This category's materials for undergraduate program setup and dynamic adjustment include three types: program setup application forms, talent cultivation plans, and expert review opinions. The program setup application form carries fields such as the proposed program name, code, degree-granting category, length of study, faculty and conditions, and includes the filing date and the signature of the person in charge. The talent cultivation plan carries fields such as cultivation objectives, curriculum system, allocation of class hours and credits, and practical components, and includes the approval date and the seal of the school or department. The expert review opinions carry the review conclusion, list of experts, their titles and affiliations, voting results, and signature dates. The sources of the three types of materials are the on-campus teaching management process and external review meetings, and the update cadence changes with application batches, talent cultivation plan revision cycles, and review meeting schedules. When entering the conversation logs and audit function, the application form and the plan are retrieved as cited sources, and the review opinions are cited as supporting materials; together the three form the basis for version comparison.

## Configuration and implementation checks

This step is performed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The "version ledger and change records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Fields, dates, and signatures must be consistent with the talent cultivation plan; names, quantities, and dates must not mismatch | Check the program name, number of courses, and filing date in the application form and the plan, and verify whether the signature fields and receipts are complete; locate the corresponding record in the session message list and view the role and citation information |
| Talent cultivation plan | The current version must be unique, old versions must be traceable, and citations must be in sync; the approval date and seal must be complete | Compare the plan version number with the version number filled in the application form to confirm that the old version is still traceable; use `chatId` and `dataId` to locate the session record that cites this plan, and check whether the citation points to the current version |
| Expert review opinions | The expert list, titles and affiliations, voting results, and signature dates must be consistent with the corresponding records in the application form and the plan | Check item by item the program name, number of experts, and dates in the review opinions against the other two materials; check whether signatures and receipts are missing; view the cited text and elapsed-time fields in the record details `value` |
| Conversation record interface output | The total record count total and response `code` of 200 must match the number of items obtained by paging, and roles must alternate | Page through by application and session identifier, pull two consecutive pages and compare the offset and total; sample one record and check the role field, citation information, and elapsed-time fields |

## Three common errors

- Symptom: the name, course count, or date of the same program does not match across the two materials. Cause: the materials were revised separately without write-back, versions were not synchronized, and no cross-comparison was done at registration.
- Symptom: the current version is not unique, the old version cannot be traced, and citations still point to the old version. Cause: when updating the knowledge base or external documents, citations were not replaced in sync, and the version number did not change with the content.
- Symptom: expert review opinions lack signatures or receipts, and the signature field on the application form is blank. Cause: the material circulation step was not closed-loop, and review looked only at content, not at seals and receipts.

## How to verify the setup

This feature's acceptance: page through by the total record count total to retrieve all records, sample one record and check the role, citation information, and time; confirm response `code` of 200, and use `_id`, `dataId` and `value` to locate the record.

Business test: change one piece of content and see whether the version number and citations are updated in sync; check the names, quantities, dates, and signature receipts of the application form, talent cultivation plan, and expert review opinions.

- Page through the session message list by application and session identifier, compare the total record count and offset, and confirm that each message has an identified role and that citation and elapsed-time fields are readable.
- Compare the application form, talent cultivation plan, and expert review opinions field by field, register the version ledger and change records, mark the current version, and retain a traceability path for old versions.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
