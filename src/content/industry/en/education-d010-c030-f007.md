---
title: Conversation Records and Traceability for Vocational School Student Internships: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c030-f007
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Chat Records | Operations
meta_description: Student Internships: review chat records for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Vocational School Student Internships: Coordinate Operations and Application Handover

## What this category's data looks like

This page focuses on vocational school student internship management materials, including three categories: internship agreements, internship plans, and internship logs. Internship agreements contain student, enterprise, position, start and end dates, and signature fields; internship plans contain batch, position rotation, week numbers, and supervising teacher signature; internship logs contain date, position, task content, and supervising staff signature. The three categories of materials are provided respectively by the school's academic affairs office, internship supervising teachers, and enterprise supervising staff, and are updated by batch and week; the field characteristics are the coexistence of dates, names, quantities, signatures, and receipts. When entering the conversation logs and auditing function, agreements serve as the basis for identity and position, plans serve as the basis for tasks and week numbers, and logs serve as the basis for process and signatures; the three each assume different roles for subsequent registration, export, and review.

## Configuration and implementation checks

This part is executed by the conversation record interface (by application and session dimension), outputting a session message list and total record count, including role and reference information. "Handover-ready deployment status and operation records" are then completed manually or by an external system.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Student, enterprise, position, start and end dates, and signature fields are complete, and match the names, quantities, and dates in the internship plan | Retrieve the agreement and plan by batch, compare name, position name, headcount, and start and end dates item by item, and check whether signatures and receipts are complete |
| Internship plan | Batch, week numbers, position rotation, and supervising teacher signature are consistent, and the version is synchronized with the current execution batch | Check the plan version number and execution records by week number, and confirm that the positions in the plan match the position names in the logs |
| Internship log | Date, position, task content, and supervising staff signature are verifiable item by item, and match the same record's name, quantity, and date in the agreement and plan | Extract logs by student and week number, compare them with the agreement and plan, and check entries missing signatures or receipts |
| Conversation record interface output | The total record count total and response `code` of 200 can be verified; after paginating to retrieve all, each message has an identified role, and a single entry contains reference and elapsed time | Paginate by `chatId` to retrieve, verify `dataId` and `value`, and sample one entry to inspect role, reference information, and time |

## Three common errors

- Phenomenon: The same student's position name, headcount, and date do not match between the agreement and the plan. Cause: The two materials are registered by different roles and were not checked uniformly under the same batch.
- Phenomenon: The internship plan version is not synchronized, and logs are still filled in according to the old week numbers. Cause: After the plan was updated, the supervising teacher and enterprise supervising staff were not notified, and the handover form did not record the version change.
- Phenomenon: Internship logs lack supervising staff signatures or receipts, and exported records lack references. Cause: During registration, the signature fields were not checked item by item, and the reference fields were not checked during export.

## How to verify the setup

This function's acceptance: paginate to retrieve all by total record count, and sample one entry to verify role, reference information, and time; verify `_id`, `dataId` and `value`, and confirm total and response `code` of 200.

Business test: check item by item once according to the handover form, see which record is missing, and focus on whether the dates, names, quantities, and signatures of the agreement, plan, and log are consistent.

- Export the three materials—agreement, plan, and log—by batch, compare the name, position, headcount, and date of the same record item by item, and mark inconsistent items.
- Paginate by `chatId` to retrieve conversation records, verify total and response `code` of 200, sample one entry to check role, reference information, and time, and register entries missing signatures or receipts.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
