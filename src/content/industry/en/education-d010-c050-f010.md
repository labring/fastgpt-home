---
title: Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c050-f010
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Citations | Operations
meta_description: Foreign Teachers: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Coordinate Operations and Application Handover

## What this category's data looks like

Foreign teacher appointment and course scheduling involves three types of materials: appointment contracts, work permit materials, and course schedules. Fields include name, passport number, position, number of class hours, start and end dates, signatures, and receipts. The contract defines the appointment relationship and compensation terms, the work permit materials define qualifications and validity period, and the course schedule defines weeks, classes, and teaching tasks. The update cadence rolls forward according to semesters and visa cycles: contract renewals, permit extensions, and schedule adjustments each produce new versions, and old versions must be retained for traceability. When the materials enter the knowledge base retrieval node, each is cited as an independent source, and the cited snippets point back to the original paragraphs, allowing subsequent comparison of fields, dates, and signatures, forming a handover-ready deployment state and operation record.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original snippet and a source identifier, and the length can be 0. The handover-ready deployment state and operation record are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether the fields, dates, and signatures are consistent with the work permit materials and course schedule | Compare name, passport number, position, start and end dates, and signature receipts item by item, and record any missing items |
| Work permit materials | Whether the permit validity period aligns with the contract appointment period and the schedule weeks | Check the permit number, validity period, and contract dates, and confirm version synchronization |
| Course schedule | Whether the number of class hours, classes, and instructor names are consistent with the contract | Check class hours and instructor names by week, and inspect signatures or receipts |
| Cited content output | The number of citations matches the materials hit, and being empty is also normal | Run a trial with a question that matches no materials, see that the array is empty while the chain still runs through, and record `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The same teacher's name is written differently in the contract and the schedule, and the number of class hours does not match. Cause: The two materials were entered separately, and fields and dates were not compared against the same record.
- Symptom: The work permit materials have been extended, but the contract is still the old version. Cause: The versions were not synchronized, and only one of the materials was checked during handover.
- Symptom: The course schedule lacks a signature or receipt, but the handover form records it as complete. Cause: During verification, only the existence of fields was checked, and signatures and receipts were not confirmed item by item.

## How to verify the setup

Acceptance for this feature: ask a question that has a basis in the original text, and check whether the citation array and superscripts can point back to the original text; then ask a question that matches no materials, and confirm that the array is empty while the chain still runs through; the number of citations is recorded separately according to the array length, and `quoteMaxToken` is only the citation content budget, so the two are not compared for equality.

Business test: check item by item once according to the handover form, see which item is missing from the record, and after confirming that the version, connection, and task record are consistent, hand over to operations or the next shift.

- Turn on citation superscripts, point back to the original paragraphs one by one against the source documents, and record `responseData` and the array length.
- Open the search parameter panel and check the values item by item, confirm that the associated knowledge base uses the same vector model, and record `quoteMaxToken` and `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
