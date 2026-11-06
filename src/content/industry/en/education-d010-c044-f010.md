---
title: Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c044-f010
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Citations | Operations
meta_description: Training Schedules: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Coordinate Operations and Application Handover

## What this category's data looks like

In the deployment, operations, and application handover stage for course scheduling and course consumption in training institutions, the core materials are of three types: class schedules, course consumption records, and course adjustment applications. Class schedules carry the class, course, teacher, classroom, and class date; course consumption records carry the student, number of class hours, course consumption date, and signature; course adjustment applications carry the original session, target session, application date, and approval receipt. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source, used to compare whether fields, dates, and signatures are consistent. The update rhythm follows scheduling adjustments, course consumption confirmations, and course adjustment approvals being added to the database one by one, and the version is based on the time the materials are added to the database. Field characteristics are concentrated in five items: name, quantity, date, signature, and receipt. If the same record does not match across two materials, item-by-item verification before handover is triggered.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The deployable deployment status and operation records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Whether the class, course, teacher, classroom, and class date correspond item by item with the course consumption records | Open the citation marker to compare against the source document, and record differences between the class schedule and course consumption records in names and dates |
| Course consumption record | Whether the student, number of class hours, course consumption date, and signature are complete and consistent with the course adjustment application | Check the signature and receipt of the course consumption record one by one, and record missing items in the handover form for supplementation |
| Course adjustment application | Whether the original session, target session, application date, and approval receipt are synchronized with the class schedule version | Check the version time of the course adjustment application and the class schedule, and confirm whether they were added to the database in the same batch |
| Citation content output | The number of returned entries matches the hit materials, and being empty is also normal | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues; record the number of citations separately, and `quoteMaxToken` only checks the tokens of the cited text, without performing an equality comparison |

## Three common errors

- Phenomenon: The number of class hours for the same course consumption record does not match between the class schedule and the course consumption material. Cause: The two materials were added to the database separately and the fields were not checked against the same version.
- Phenomenon: The course adjustment application date is inconsistent with the class date on the class schedule. Cause: After course adjustment approval, the class schedule was not updated synchronously, and the versions were not synchronized.
- Phenomenon: The course consumption record lacks a signature or the course adjustment application lacks a receipt. Cause: The signature page and receipt were not included when the materials were added to the database, so the handover form has missing items.

## How to verify the setup

Acceptance for this feature: ask a question with source evidence, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. Check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifier in `quoteList`, record the number of citations separately, and `quoteMaxToken` only checks the tokens of the cited text.

Business test: check item by item once according to the handover form, and see which item is missing. Check the fields, dates, and signatures of the class schedule, course consumption records, and course adjustment applications, and confirm that the version, connection, and task records are consistent.

- Open the search parameter panel and check item by item, confirming that the associated knowledge base selected is a knowledge base with the same vector model
- Open the citation markers in the conversation, and compare each citation against the source document to check whether it can point back to the original paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
