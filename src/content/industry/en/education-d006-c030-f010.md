---
title: Citations and Source Traceability for Vocational School Student Internships: Track Progress and Check Statistics
slug: /en/industry/education-d006-c030-f010
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Citations | Progress
meta_description: Student Internships: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational School Student Internships: Track Progress and Check Statistics

## What this category's data looks like

This category's data covers three types of materials in vocational school student internship management: internship agreements, internship plans, and internship logs. The internship agreement records the student, the position, the start and end dates, and signatures and seals; the internship plan lists the rotation arrangement, the mentor, and the week numbers; the internship log is filled in day by day with tasks, work hours, and the mentor's signature. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source: the agreement is used to check the position and term, the plan is used to check the week numbers and rotations, and the log is used to check attendance and tasks. The update cadence is weekly archiving, and the version is based on the signed receipt. Field characteristics center on four types: name, quantity, date, and signature. The same record is often written differently across materials, so each cited snippet must be traced back to the original paragraph one by one, and on that basis the fields are compared, the ledger is written, and the progress table and statistical scope statement are generated.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original snippet and the source identifier, and the length can be 0. The "progress table and statistical scope statement" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | The fields include student name, position name, start and end dates, and signatures and seals; the dates must match the plan week numbers | Open the citation marker to trace back to the original paragraph of the agreement, and check the name, position, dates, and signatures; record the number of citations, i.e. the array length; for the tokens of the cited text, look at `quoteMaxToken` separately |
| Internship plan | The fields include rotation week numbers, mentor, and planned headcount; the quantity must be consistent with the total attendance in the logs | Open the citation marker in the conversation to compare against the original plan text, and check the week numbers and headcount; use `responseData` (non-streaming module results returned with detailed output enabled) to view the node return structure and confirm that the citation array matches the hit materials |
| Internship log | The fields include daily tasks, work hours, and mentor signature; the dates must be consistent with the agreement's start and end dates and the plan week numbers | Trace back to the original log paragraph one by one, and check the tasks, work hours, dates, and signatures; if the cited snippet does not match the original text, first check which material was hit in this round, then look at the trimming situation in `quoteList` |

## Three common errors

- Symptom: the same student's name or position name is written inconsistently in the agreement and the log. Cause: the unified field template was not used at entry, the two materials are maintained separately, and the versions are not synchronized.
- Symptom: the rotation week numbers in the plan do not match the attendance dates in the log. Cause: the log was not backfilled after the plan was adjusted, or the log was not checked against the latest plan version when supplementary entries were made.
- Symptom: the log lacks the mentor's signature or the agreement lacks the receipt. Cause: paper signatures were not archived in time, pages were missed when uploading scans, and the cited snippet cannot trace back to the complete original text.

## How to verify the setup

Acceptance for this feature: ask a question that has a basis in the original text, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs. The number of citations is the array length, `quoteMaxToken` is the budget for cited content, and the two are not compared for equality; when the citation upper limit is involved, check the tokens of the cited text, and record the array count separately.

Business test: reconcile the totals using one week of records, and see whether the scope and exceptions are clearly stated.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a trial with a query that has no matching material, and see that the output is empty while the pipeline continues; then open the citation markers to compare against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
