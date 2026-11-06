---
title: Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c019-f010
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Citations | Multilingual
meta_description: Course Scheduling: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the category of course selection, scheduling, and classroom resource allocation. The materials come from three types of files: course offering plans, scheduling tables, and course selection rules, involving multilingual materials and terminology handling. Course offering plans provide fields such as course name, credits, and offering unit; scheduling tables carry classrooms, time slots, week numbers, and instructor signatures; course selection rules give selection conditions, capacity, and receipt requirements. The three types of materials each play a role in the citation sources and traceability feature: course offering plans are used to confirm the original wording of terminology, scheduling tables are used to verify dates and signatures, and course selection rules are used to validate quantities and versions. The material update cadence changes with semester batches. It is common for the same course to have inconsistent translated names, quantities, or dates across different materials, with versions not synchronized or signatures/receipts missing. Field characteristics are mixed multilingual text, many abbreviations, and multiple translations for the same concept, requiring citation snippets to point back to the original paragraphs.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text snippet and a source identifier, and the length can be 0. The unified terminology glossary and comparison draft are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | Whether the same course name and credits are written consistently across multilingual materials, and whether they can point back to the original paragraphs | Open the citation markers, compare against the original course offering plan, and record the original terminology wording and translated names |
| Scheduling table | Whether classrooms, time slots, week numbers, and instructor signatures match the fields in the course selection rules | Compare the dates, quantities, and signature receipts between the scheduling table and the course selection rules item by item |
| Course selection rules | Whether selection conditions, capacity, and version are synchronized with the course offering plan | Check the version number and receipt, and confirm that the citation snippets come from the same version of the materials |
| Citation content output | The number of returned entries matches the hit materials; being empty is also normal; `quoteMaxToken` is the content budget, and the number of entries is recorded separately | Run a test with a question that has no matching materials, and see whether the array is empty while the pipeline still works; check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: The same course has inconsistent names, quantities, or dates between the course offering plan and the scheduling table. Cause: Multilingual materials are maintained separately, without unified terminology and versions.
- Symptom: Citation snippets do not match the original text, and there are no citation markers in the answer. Cause: First check whether this round hit anything and which material was hit, then look at trimming; do not directly attribute it to length trimming.
- Symptom: Course selection rules lack signatures or receipts, and versions are not synchronized. Cause: Material update cadences are inconsistent, and old versions are still being retrieved as hits.

## How to verify the setup

Feature acceptance: Ask a question with original-text evidence, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still works; when citation limits are involved, check the tokens of the citation text, and record the number of array entries separately.

Business testing: Sample three terms and check whether their wording is consistent throughout the document, and whether the translated names can point back to the original text.

- In the node, check whether the selected knowledge base collections and their vector models are consistent
- Open the search parameter panel and check the values item by item, and check `responseData`, `quoteList`, and the citation markers

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
