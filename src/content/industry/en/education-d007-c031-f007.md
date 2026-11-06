---
title: Conversation Records and Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c031-f007
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Chat Records | Review
meta_description: Apprenticeships: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Trace Exceptions and Review Results

## What this category's data looks like

Modern apprenticeship and order class management involves three types of materials: school-enterprise cooperation agreements, order class training plans, and master-apprentice records. School-enterprise cooperation agreements include cooperation entities, majors, program duration, signing date, and signatures of both parties; order class training plans include course modules, credit hour allocation, assessment methods, version numbers, and approval signatures; master-apprentice records include apprentice names, positions, apprenticeship periods, master signatures, and receipts. The three types of materials are updated by semester or training cycle, with frequent version iterations, and field naming and date formats differ across source systems. When entering the conversation logs and auditing function, the three types of materials serve as the basis for exception determination: agreements are used to verify cooperation scope and signing entities, training plans are used to verify courses and versions, and apprenticeship records are used to verify the correspondence between masters and apprentices and receipts.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and citation information. The "exception list and review conclusions" are then completed manually or by an external system. The total record count is the number of message records, not the number of sessions.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Cooperation entities, majors, program duration, signing date, and signatures of both parties are complete, and consistent with the major names and program duration in the order class training plan | In the request parameters, verify that `chatId` matches the actual session, retrieve all pages, and sample one record to compare the major names, program duration, and signing date between the agreement and the training plan |
| Order class training plan | Course modules, credit hour allocation, assessment methods, version numbers, and approval signatures are complete, and correspond to the positions and apprenticeship periods in the master-apprentice records | Paginate through all records by total record count total, and sample one record to verify whether the plan version number is synchronized with the positions and periods in the apprenticeship records |
| Master-apprentice record | Apprentice names, positions, apprenticeship periods, master signatures, and receipts are complete, and correspond to the course modules and assessment methods in the training plan | Open one record to verify `dataId`, citation information, and time, and compare the apprentice names, positions, and periods between the apprenticeship record and the training plan |

## Three common errors

- Phenomenon: The same apprentice name is written differently in the training plan and the apprenticeship record. Cause: The two materials are entered by different systems without name alignment, making direct matching impossible during exception tracing.
- Phenomenon: The training plan version number does not match the course modules in the apprenticeship record. Cause: After the plan was updated, it was not synchronized to the apprenticeship record, the old version is still in circulation, and there is no version comparison basis during review.
- Phenomenon: The apprenticeship record lacks a master signature or receipt. Cause: Paper receipts were not archived, electronic records were not supplemented, and the exception list cannot be supported by complete original records.

## How to verify the setup

Acceptance of this function: Paginate through all records by total record count total, sample one record to verify the role, citation information, and time, confirm response `code` of 200, and verify the message identifiers and content fields `_id`, `dataId` and `value`; the number of citations is recorded by array length, and the tokens of the citation text are verified separately, not compared for equality with `quoteMaxToken`.

Business test: Create an exception record and see whether the source material can be traced.

- Pull two pages consecutively and compare total with the offset to confirm that the number of records matches the total, avoiding retrieving only the first page
- Open one record to verify the role field, citations, and time-consuming field, confirming that message roles correspond to the original conversation and citation information is complete

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
