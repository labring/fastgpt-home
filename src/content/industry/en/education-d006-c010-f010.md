---
title: Citations and Source Traceability for School Timetables and After-School Scheduling: Track Progress and Check Statistics
slug: /en/industry/education-d006-c010-f010
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Citations | Progress
meta_description: School Timetables: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Timetables and After-School Scheduling: Track Progress and Check Statistics

## What this category's data looks like

In the scenario of primary and secondary school timetables and after-school service scheduling, the commonly kept materials include the master timetable, the teacher assignment table, the after-school service project table, as well as weekly records, receipts, and signature pages. The master timetable carries the skeleton of class periods and course categories for the whole school, the teacher assignment table carries the correspondence between teachers and periods, and the after-school service project table carries project names, number of participants, start and end dates, and fee basis. Materials are updated weekly, and separate tables are issued when there are schedule changes, substitute teaching, or project additions or removals. Field characteristics are concentrated in class, course name, teacher name, date, period, number of people, and signature or receipt number. When entering the knowledge base retrieval node, the master timetable is used to check class periods, the teacher assignment table is used to check teaching assignments and periods, the after-school service project table is used to check projects and numbers of people, and weekly records and signature pages are used to check exceptions and confirmations. Progress records and statistics verification require that recorded numbers match statistical numbers and that the basis is written in the header, while citation sources and traceability require that each citation can point back to the original text paragraph.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text fragment and a source identifier, and the length can be 0. The "progress table and statistical basis description" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Whether the fields of class, course name, date, period, and signature or receipt are complete, and whether they align item by item with the teacher assignment table | In the node, check the selected knowledge base collection and vector model, open the citation superscript to compare with the source document, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Teacher assignment table | Whether teacher name, assigned class, period, and date are consistent with the master timetable and the after-school service project table, and list separately entries missing signature or receipt | Run a trial with a question that has no matching material, see whether the citation array is empty while the chain continues, and check the source identifier of each citation in `quoteList` |
| After-school service project table | Whether project name, number of participants, start and end dates, and fee basis match the weekly records and receipts, and whether versions are synchronized | Open the search parameter panel and check the values item by item; when the citation upper limit is involved, check the tokens of the citation text, record the array length separately, and do not compare the number of items with `quoteMaxToken` for equality |

## Three common errors

- Symptom: the course name, period, or date of the same record does not match between the master timetable and the teacher assignment table. Cause: the two materials are maintained separately, versions are not synchronized, and signatures or receipts are missing; it is necessary to check item by item against the original text by date and class.
- Symptom: the number of people in the after-school service project table is inconsistent with the total in the weekly records. Cause: project additions or removals were not synchronized to the weekly records, the basis was not written in the header, and exception entries were not listed separately; it is necessary to check the project start and end dates and receipts.
- Symptom: there is no citation superscript in the answer, or the citation fragment does not match the original text. Cause: first check whether this round hit and which material was hit, then look at trimming; an empty citation array does not equal retrieval failure.

## How to verify the setup

Acceptance of this function: ask a question with original text support, check whether the citation array and superscript can point back to the original text, and record the array length and the source identifiers in `quoteList` within `responseData`; then ask a question with no matching material, and confirm that the array is empty while the chain runs through.

Business test: use one week's records to check the total, see whether the basis and exceptions are clearly written, whether recorded numbers match statistical numbers, and whether the basis is written in the header, and enter it into the weekly or monthly report.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel and check the values item by item; when the citation upper limit is involved, check the tokens of the citation text, and record the array length separately.
- Run a trial with a question that has no matching material, see whether the output is empty while the chain continues; in the conversation, open the citation superscript, compare with the source document, and confirm that each citation can point back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
