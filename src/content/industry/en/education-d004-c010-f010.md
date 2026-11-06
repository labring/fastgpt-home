---
title: Citations and Source Traceability for School Timetables and After-School Scheduling: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c010-f010
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Citations | Handover
meta_description: School Timetables: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Timetables and After-School Scheduling: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the scenario of primary and secondary school timetables and after-school service scheduling, the raw materials that enter the material drafting and responsibility handover stage include the master timetable, teacher assignment table, after-school service project table, as well as the scheduling explanations and change requests submitted by each school. The master timetable determines the class weekly lesson hours and class periods, the teacher assignment table determines the assigned teachers, subjects, and weekly period counts, and the after-school service project table determines project names, participating students, tutoring teachers, and week numbers. The fields of the three types of materials intersect, and dates, class names, teacher names, and lesson hour quantities must correspond to one another. The update rhythm follows a semester cycle, and version updates are triggered when there are schedule adjustments, teacher changes, or project additions or removals. When the materials enter the knowledge base retrieval node, each assumes the role of citation source for field verification and responsibility traceability, providing the original textual basis for the subsequent drafting of issuable drafts and handover records.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text snippet and a source identifier, and the length may be 0. The issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Class name, weekly lesson hours, class periods, date, and signature fields are complete and consistent with the teacher assignment table | Check the class name and lesson hour quantity against the source document, and inspect the version date and signature column |
| Teacher assignment table | Assigned teacher, subject, weekly period count, and class correspond one by one with the master timetable, with no missing signatures or receipts | Open the citation marker to point back to the original paragraph, and verify the teacher name and weekly period count |
| After-school service project table | Project name, participating students, tutoring teacher, week number, and date are consistent, and the version has been synchronized | Check whether the project name and number of participants are the same in the two materials, and inspect the receipt |
| Handover record | Responsible person, handover date, version number, and receipt column are complete, and missing items are blocked | After drafting according to the template, go through one handover, and check the number of citation entries and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Phenomenon: The name or lesson hour quantity of the same class does not match between the master timetable and the teacher assignment table. Cause: The two materials were drafted separately and the fields were not checked against the same version.
- Phenomenon: The after-school service project table has been updated, but the master timetable is still the old version. Cause: The versions were not synchronized, and the date and version number were not checked during handover.
- Phenomenon: The handover record lacks a signature or receipt, and the material cannot enter the next stage. Cause: During drafting, the responsible person, date, and receipt column were not checked according to the template.

## How to verify the setup

Acceptance of this function: ask a question with an original textual basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record `quoteMaxToken` and the number of array entries.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, verify that the selected knowledge base uses the same vector model, open the search parameter panel, and check the values item by item
- Run a trial with a question that has no matching materials, see that the citation array is empty while the output chain continues, and check `quoteList` and `responseData`

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
