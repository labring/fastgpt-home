---
title: Citations and Source Traceability for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c018-f010
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Citations | Intake
meta_description: Program Revision: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Curriculum Planning: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data covers Q&A intake and missing-item follow-up for undergraduate program revision, and is aimed at three types of materials: program plans, course syllabi, and credit structure tables. The program plan gives the major direction, total credits, and study requirements; the course syllabus gives the course name, credits, class hours, and assessment method; the credit structure table gives the credit amount and proportion of each module. Materials are usually updated by academic year or revision batch, and fields include course name, course code, credits, class hours, semester offered, signature, and date. When materials enter this feature, the knowledge base retrieval node first recalls original text fragments by question as citation sources; the intake records and completed follow-up items are then used by subsequent AI nodes, code nodes, or humans to compare fields, write ledgers, and generate reports. Common inconsistencies center on the same record having mismatched names, quantities, or dates across two materials, versions not being synchronized, or missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing an original text fragment and a source identifier, and the length can be 0. The "intake records and completed follow-up items" are then completed by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Whether the course name, credits, date, and signature are consistent between the program plan and the course syllabus | Open the citation marker and check the name, quantity, date, and signature against the source document; record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality |
| Course syllabus | Whether the course name, credits, class hours, assessment method, and semester offered match the program plan | Check the cited fragments against the original paragraphs one by one, and verify whether the versions are synchronized and whether signatures or receipts are missing; use `responseData` (non-streaming module results returned with detailed output enabled) to view the length of the citation array |
| Credit structure table | Whether the credit amount and proportion of each module are consistent with the records in the program plan and course syllabus | Compare the quantity and date of the same record across the two materials; when citations are empty, confirm that the chain still works and do not directly attribute it to length truncation |
| Intake records and completed follow-up items | Whether missing items are identified and followed up on, and whether answers are grounded in materials | Ask a question that lacks key information and see whether it follows up before answering; check whether the citation sources and original text in `quoteList` can be traced back |

## Three common errors

- Symptom: the name, credits, or date of the same course do not match between the program plan and the course syllabus. Cause: the two materials are from different revision batches, and field-level comparison and version synchronization were not performed.
- Symptom: the module quantities and proportions in the credit structure table and the program plan are inconsistent. Cause: versions are not synchronized, and old-version materials are still being recalled in the knowledge base.
- Symptom: the answer has content but the citation array is empty, or the cited fragments do not match the original text. Cause: no material was hit in this round, or the hit material does not match the question fields, so hits must be checked before truncation.

## How to verify the setup

This feature's acceptance check: ask a question that has original-text support, and check whether the citation array and marker can be traced back to the original text; then ask a question with no matching material, confirm that the array is empty while the chain still works, and separately record the number of citations and the `quoteMaxToken` budget.

Business test: ask a question that lacks key information, see whether it follows up before answering, and check whether the intake records and completed follow-up items are routed to the person in charge for handling.

- In the node, check whether the selected knowledge base uses the same vector model, and open the search parameter panel to check the values item by item.
- Open the conversation citation marker, check the name, quantity, date, and signature against the source document, and confirm that the cited fragments can be traced back to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
