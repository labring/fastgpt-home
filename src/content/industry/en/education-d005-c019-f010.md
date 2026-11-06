---
title: Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c019-f010
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Citations | Versions
meta_description: Course Scheduling: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Maintain Document Versions and Changes

## What this category's data looks like

Course selection, scheduling, and classroom resource scheduling materials enter the knowledge base retrieval node in three categories: course offering plans, scheduling tables, and course selection rules. Course offering plans provide the course name, teaching class, semester, and start and end weeks; scheduling tables provide the week number, period, classroom, and capacity; course selection rules provide the credit cap, prerequisites, and signed receipt. The three categories of materials are often maintained separately by academic affairs, departments, and classroom management, and their update cadence changes as the semester progresses, so field names, dates, and quantities are prone to discrepancies between versions. When the materials enter this feature, each participates in retrieval as a citation source, and the node only returns matched snippets and source identifiers and does not assume ledger responsibilities.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original snippet and a source identifier, and the length can be 0. The "version ledger and change records" are completed afterward by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether the course name, teaching class, semester, and start and end weeks are consistent across the three materials, and whether signatures and receipts are complete | Compare the course name, semester, and start and end weeks in the course offering plan and the scheduling table item by item, record discrepancies, and check the signature field |
| Scheduling table | Whether the week number, period, classroom, and capacity match the dates and quantities in the course selection rules | Extract the scheduling records for the same teaching class, compare them against the date and capacity fields in the course selection rules, and check whether the version numbers are synchronized |
| Course selection rules | Whether the credit cap, prerequisites, and receipt uniquely correspond to the current version, and whether the old version can be traced | Check the rule version number and effective date, confirm that the old version is queryable, and that the cited snippet can point back to the original paragraph |
| Cited content output | Whether the number of returned items matches the matched materials, and an empty result is also normal | Run a test with a question that matches no materials, see that the array is empty while the chain continues, and record `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: The course name or classroom capacity for the same teaching class does not match between two materials. Cause: The course offering plan and the scheduling table are maintained separately, and the fields are not unified.
- Symptom: The course selection rules have been changed, but the scheduling table still references the old version's dates. Cause: The versions are not synchronized, and the old version is not marked as invalid.
- Symptom: The cited snippet does not match the original text. Cause: First check whether this round matched anything and which material was matched, then look at `quoteMaxToken` trimming.

## How to verify the setup

Feature acceptance: ask a question that has support in the original text, and check whether the citation array and the citation markers can point back to the original text; then ask a question that matches no materials, confirm that the array is empty while the chain runs through, and record `quoteList` within `responseData`.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- Turn on citation markers and check against the source documents whether each citation can point back to the original paragraph.
- Check whether the selected knowledge bases use the same vector model, and verify the search parameter values item by item.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
