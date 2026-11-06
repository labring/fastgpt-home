---
title: Citations and Source Traceability for School Timetables and After-School Scheduling: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c010-f010
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Citations | Multilingual
meta_description: School Timetables: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Timetables and After-School Scheduling: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of primary and secondary school timetables and after-school service scheduling. Materials include the master timetable, teacher assignment tables, after-school service program tables, and multilingual materials and terminology comparison materials. The master timetable carries class, week, period, and course name; the teacher assignment table carries assigned teacher, subject, class, and weekly class hours; the after-school service program table carries program name, participating classes, time slot, and responsible personnel. All three types of materials contain fields, dates, and signatures or receipts; names, quantities, and dates must be consistent across tables. When multilingual materials enter this feature, they serve as candidate source text for knowledge base retrieval; the terminology glossary and comparison draft are completed by subsequent nodes or manually based on cited fragments, and citations are only responsible for referring back to the original paragraphs. The update rhythm follows semester and monthly adjustments; unsynchronized versions, missing signatures, or missing receipts are common sources of inconsistency.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original fragment and source identifier, and the length can be 0. "Unified terminology glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Check whether the master timetable and the teacher assignment table are consistent in class, subject, weekly class hours, and effective date, and whether signatures or receipts are complete | Open the citation corner mark to compare against the source document, compare fields and dates item by item, and record discrepancies |
| Teacher assignment table | Check whether the same teacher's name, assigned classes, and number of class hours match between the master timetable and the teacher assignment table | View the cited fragments and source identifiers in the conversation, and confirm that each citation can refer back to the original paragraph |
| After-school service program table | Check whether the after-school service program table and the master timetable are consistent in program name, participating classes, time slot, and responsible personnel | Run a test with a question that has no matching materials, and see whether the citation array is empty while the chain continues |
| Multilingual materials and terminology comparison draft | Check whether the same term is written consistently throughout the whole text, and whether the translated name can refer back to the original text | Open the search parameter panel to check the values, record the number of citations and the `quoteMaxToken` budget, and view the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the master timetable and the teacher assignment table. Cause: The two materials are maintained separately, without cross-table field comparison and version synchronization.
- Symptom: The after-school service program table lacks signatures or receipts. Cause: Receipts were not fully collected during material circulation, and no completeness check was performed before entering the knowledge base.
- Symptom: Cited fragments do not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming; an empty citation array does not equal retrieval failure.

## How to verify the setup

Feature acceptance: Ask a question with source-text support, check whether the citation array and corner marks can refer back to the original text, and view the `quoteList` within `responseData` fields; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: Sample three terms and check whether their writing is consistent throughout the whole text

- In the node, check the selected collections and their vector models, and confirm that the associated knowledge bases use the same vector model
- Open the search parameter panel and check the values item by item, record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
