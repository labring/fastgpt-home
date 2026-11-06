---
title: Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c019-f010
page_type: 行业问题页
application_area: education
meta_title: Course Scheduling | Citations | Handover
meta_description: Course Scheduling: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Course Selection, Timetables and Classroom Allocation: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the drafting of materials and handover of responsibilities in course selection, scheduling, and classroom resource allocation scenarios, involving three types of materials: course offering plans, scheduling tables, and course selection rules. Course offering plans carry the course name, credits, instructor, teaching weeks, and signature field; scheduling tables carry the class, classroom, time slot, capacity, and version number; course selection rules carry the selection batch, priority, capacity limit, and effective date. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source, and the original text snippet is returned together with the source identifier for subsequent field comparison, ledger writing, and report generation. The update cadence rolls with the semester: course offering plans are confirmed first, scheduling tables undergo multiple version changes as classroom resources are adjusted, and course selection rules are finalized before course selection opens. Field characteristics center on name consistency, quantity correspondence, date continuity, and complete signatures and receipts; a missing item in any material will affect sign-off in the next stage.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length may be 0. The material drafts and handover records that can be issued are completed subsequently by AI nodes, code nodes, or humans; the citation array itself does not perform difference comparison, nor does it replace ledgers and reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Course offering plan | The course offering plan has complete fields, clear responsible persons, and consistent version and date, and the course names and quantities match those in the scheduling table and course selection rules | Open the search parameter panel and check item by item, confirm that the selected knowledge base uses the same vector model, then compare the signature field and effective date against the original course offering plan, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the `quoteMaxToken` budget |
| Scheduling table | The scheduling table has complete fields, clear responsible persons, and consistent version and date, and the classroom, time slot, and capacity do not conflict with the course offering plan | Open the citation markers in the conversation, compare against the source document of the scheduling table, check whether the version number and version change date are synchronized, record separately any entries missing signatures or receipts, and verify the original text snippet in the `quoteList` field |
| Course selection rules | The course selection rules have complete fields, clear responsible persons, and consistent version and date, and the selection batch and capacity limit correspond to the capacity in the scheduling table | Run a trial with a question that has no matching materials, see that the cited content output is empty while the chain continues, then verify the effective date and receipt in the original course selection rules, and confirm that an array length of 0 in `responseData` is normal |

## Three common errors

- Symptom: The name, quantity, and date of the same course do not match across two materials. Cause: During drafting, different versions of the original text were cited separately, and the fields were not checked against the same source.
- Symptom: The scheduling table has already changed versions, but the course selection rules still cite the old capacity. Cause: The versions were not synchronized, and the handover record was not updated with the version change date and responsible person.
- Symptom: The material draft has complete fields but lacks signatures or receipts. Cause: The handover step did not sign off item by item according to the template, and missing items were not blocked before entering the next stage.

## How to verify the setup

Feature acceptance: Ask a question with original text support and check whether the cited content array and citation markers can point back to the original paragraphs; then ask a question with no matching materials and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. Record the tokens of the cited text and the number of array entries separately, and verify the original text snippet and source identifier in `quoteList`.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the selected knowledge base collections and their vector models, and confirm that the selected knowledge base uses the same vector model; open the search parameter panel and check the values item by item, and record the number of citations in `responseData` and the `quoteMaxToken` budget.
- Run a trial with a question that has no matching materials, and see that the cited content output is empty while the chain continues; then open the citation markers in the conversation, compare against the source documents to check whether each citation can point back to the original paragraphs, and verify the `quoteList` field.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
