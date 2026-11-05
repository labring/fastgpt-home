---
title: Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c044-f010
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Citations | Multilingual
meta_description: Training Schedules: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the course scheduling and course consumption scenarios of training institutions, schedules, course consumption records, and course change applications are the three core types of materials. A schedule contains fields such as course name, class date, time slot, teacher, and classroom; a course consumption record contains student, course, consumption date, number of class hours, and signature or receipt; a course change application contains the original session, target session, reason for the change, and approval signature. When materials exist in parallel in multiple languages, the same terminology is prone to diverging in how it is written across different materials, the name, quantity, and date of the same record may fail to match between two materials, versions may be out of sync, and signatures or receipts may be missing. After materials enter the citation output of the knowledge base retrieval node, each assumes the role of a source of original text fragments: the schedule provides scheduling facts, the course consumption record provides consumption facts, and the course change application provides change facts. The update cadence is weekly or per batch, and after each update the cited fragments must be re-checked for consistency with the original paragraphs.

## Configuration and implementation checks

This step is performed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and its length may be 0. The unified terminology glossary and comparison draft are completed afterward by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Schedule | Fields such as course name, class date, time slot, teacher, and classroom are written consistently across multilingual versions and can be traced back to the original paragraphs | Open the citation marker in the conversation, compare field by field against the source document, and check the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Course consumption record | Student, course, consumption date, number of class hours, and signature or receipt match across materials, and the name, quantity, and date of the same record do not conflict | Run a test with a question that has no matching material, see that the citation array is empty while the chain continues, then sample three course consumption records and check their wording throughout the entire document |
| Course change application | The original session, target session, reason for the change, and approval signature are complete, the version is in sync with the latest schedule, and no date mismatches occur | Open the search parameter panel and check each item, confirm that the values are consistent with those in the knowledge base retrieval section, and record the number of citations and the `quoteMaxToken` budget |

## Three common errors

- Symptom: The student name, number of class hours, and date of the same course consumption record do not match between the schedule and the course consumption record. Cause: Multilingual materials are maintained separately, and terminology and fields have not been uniformly cross-referenced.
- Symptom: The course change application has been updated, but the schedule still shows the old session, and the versions are out of sync. Cause: The material update cadences are inconsistent, and the cited fragments point back to old paragraphs.
- Symptom: The course consumption record lacks a signature or receipt, and the cited fragments cannot prove the fact of course consumption. Cause: The signature field was not completed when the material entered the knowledge base.

## How to verify the setup

Acceptance of this feature: ask a question that has supporting original text, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching material, confirm that the array is empty while the chain still runs, and record the number of citations and the `quoteMaxToken` budget, without comparing the two for equality.

Business testing: sample three terms and check whether their wording is consistent throughout the entire document, confirm that the translated names can point back to the original text, and check the source identifiers in `quoteList`.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and turn on citation markers to compare against the source documents.
- Run a test with a question that has no matching material, see that the citation array is empty while the chain continues, then check each item in the search parameter panel.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
