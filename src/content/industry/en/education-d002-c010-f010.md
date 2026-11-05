---
title: Citations and Source Traceability for School Timetables and After-School Scheduling: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c010-f010
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Citations | Checks
meta_description: School Timetables: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Timetables and After-School Scheduling: Compare Documents and Locate Differences

## What this category's data looks like

This category's data looks like this: Material verification for primary and secondary school timetables and after-school service scheduling revolves around three types of materials: the master timetable, the teacher assignment table, and the after-school service program table. The master timetable is published by semester and contains class, period, course name, and assigned teacher; the teacher assignment table is updated with personnel changes and contains teacher, class, subject, and weekly class hours; the after-school service program table is submitted weekly or monthly and contains program name, number of participants, date, and signature or receipt. After these three types of materials enter the knowledge base retrieval node, they are recalled as citation sources: the master timetable provides the baseline for classes and periods, the teacher assignment table provides the baseline for assignments and class hours, and the after-school service program table provides the baseline for programs and participant counts. Discrepancy localization relies on citation snippets pointing back to the original text, comparing names, quantities, dates, and signatures field by field, to form a discrepancy list pending review.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text snippet and a source identifier, and the length may be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Class, period, course name, assigned teacher, and signature are complete, and correspond item by item with the teacher assignment table | Open the citation marker to point back to the original master timetable text, and verify the fields and signature column |
| Teacher assignment table | Teacher, class, subject, and weekly class hours are consistent with the master timetable, and the version date is the latest | Check the teacher and class hours against the citation snippet, and check whether the version date is synchronized |
| After-school service program table | Program name, number of participants, date, and receipt are consistent across the two materials | Compare the name, quantity, and date in the citation snippets item by item, and record inconsistent fields |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that matches no materials, and see whether the array is empty while the chain continues |

## Three common errors

- Symptom: The course name for the same record does not match between the master timetable and the teacher assignment table. Cause: The two materials are maintained by different steps, the naming convention is not unified, and the field discrepancy is only discovered after the citation snippet points back to the original text.
- Symptom: The date in the after-school service program table is misaligned with the period date in the master timetable. Cause: The version is not synchronized, the old material is still recalled in the knowledge base, and the citation source identifier points to an outdated paragraph.
- Symptom: The after-school service program table lacks a signature or receipt, and that column is empty in the citation snippet. Cause: The submission step did not complete it, the field is missing after retrieval hits, and it must be confirmed by the reviewer and written back.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, check whether the citation array and markers can point back to the original text, and record the number of citations and the `quoteMaxToken` budget; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use a real record to find fields inconsistent with the ledger, check the citation snippets in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and compare names, quantities, dates, and signatures field by field.

- In the node, check the selected collections and their vector models, and confirm that the knowledge bases associated are using the same vector model
- Open the search parameter panel and check item by item, keeping them consistent with the values set in the knowledge base retrieval section

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
