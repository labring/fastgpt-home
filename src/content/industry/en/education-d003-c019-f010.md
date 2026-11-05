---
title: Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c019-f010
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Citations | Intake
meta_description: Course Scheduling: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the category of course selection, scheduling, and classroom resource dispatch. Materials include three types: course offering plans, scheduling tables, and course selection rules. Course offering plans provide course name, course code, credits, offering semester, instructor, and capacity; scheduling tables provide course time, week numbers, classroom number, capacity, and adjustment records; course selection rules provide selection rounds, priority, restriction conditions, withdrawal and modification deadlines, and effective version. The three types of materials each have a role in Q&A acceptance: course offering plans are used to confirm whether a course is offered and its capacity, scheduling tables are used to confirm time, location, and conflicts, and course selection rules are used to confirm eligibility and rounds. The update cadence rolls with the semester, and it is common for the same course's name, quantity, or date to mismatch across two materials, for versions to be out of sync, or for signatures and receipts to be missing. When materials enter the knowledge base retrieval node, they are recalled as citation sources, and the cited snippets and source identifiers are used for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. The "acceptance record and follow-up questions to complete" is then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether course name, course code, credits, offering semester, instructor, capacity, and signature date are complete, and whether they match the scheduling table field by field | Open the original course offering plan, verify the fields and dates; compare against the same course record in the scheduling table, and record differences in name, quantity, and date; check whether the citation superscript points back to the original paragraph |
| Scheduling table | Whether course time, week numbers, classroom number, capacity, and adjustment records match the course offering plan, and whether versions are in sync | Open the original scheduling table, verify the time and classroom fields; compare against the same course record in the course offering plan; use `quoteList` to view the cited snippet and source identifier |
| Course selection rules | Whether selection rounds, priority, restriction conditions, withdrawal and modification deadlines, and effective version match the dates in the course offering plan and scheduling table, and whether signatures or receipts are complete | Open the original course selection rules, verify the rounds and deadlines; compare against the dates and versions in the course offering plan and scheduling table; use `responseData` (non-streaming module results returned with detailed output enabled) to view the number of entries in the citation array and the source identifiers |
| Cited content array | The number of returned entries matches the materials hit; being empty is also normal; cited snippets can point back to the original text; do not compare the number of entries and the content budget for equality | Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; run a test with a question that has original-text support, and verify the citation superscripts; use `quoteMaxToken` to verify the citation text budget, and record the number of array entries separately |

## Three common errors

- Symptom: The same course's name, quantity, or date mismatches between the course offering plan and the scheduling table. Cause: The two materials are updated separately, no field-level comparison is performed, and cited snippets do not point back to the same paragraph.
- Symptom: The course selection rules version is out of sync, with old rounds coexisting with new semester dates. Cause: The old version was not replaced after the material was updated, retrieval recalls both old and new snippets at the same time, and the citation source identifiers do not distinguish versions.
- Symptom: The scheduling table lacks a signature or receipt, yet the acceptance record is still treated as complete material. Cause: Signature and receipt fields were not verified before the material was ingested into the knowledge base, and the citation array only reflects hits, not whether the material is complete.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and verify whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: submit a question missing key information, and see whether it asks a follow-up question before answering.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to verify the values item by item.
- Run one test each with two types of questions: one with original-text support and one with no matching materials, record the number of citation array entries, citation superscripts, and source identifiers, and verify whether the cited snippets can point back to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
