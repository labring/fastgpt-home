---
title: Citations and Source Traceability for School Timetables and After-School Scheduling: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c010-f010
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Citations | Versions
meta_description: School Timetables: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Timetables and After-School Scheduling: Maintain Document Versions and Changes

## What this category's data looks like

Primary and secondary school timetables and after-school service scheduling involve three types of materials: the master timetable, the teacher assignment table, and the after-school service program table. Fields cover course name, assigned teacher, class, weekly class hours, class date, service program, number of participants, signatures, and receipts. Material sources include exports from the academic scheduling system, grade-level summary tables, after-school service registration receipts, and school affairs meeting minutes. The update rhythm proceeds by initial version setting at the start of the semester, mid-term adjustments, and end-of-term archiving. Each adjustment generates a new version number and retains the old version. When entering the knowledge base retrieval node, the three types of materials are each associated as independent documents. The master timetable serves as the school-wide period baseline, the teacher assignment table serves as the mapping between personnel and class hours, and the after-school service program table serves as the mapping between programs and participant counts. The node outputs only an array of cited content, while the ledger and change records are completed by subsequent steps.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content. Each entry contains an original text snippet and a source identifier, and the length may be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work. Even if no content is found, the output pipeline still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Fields include class, period, course name, weekly class hours, effective date, and signature column; the date and signature must correspond item by item | Retrieve the original text snippet of the master timetable, check the class and period fields, confirm that the effective date and signature column are complete, and record the number of citations |
| Teacher assignment table | Fields include teacher name, subject taught, class, weekly class hours, and change date; the weekly class hours for the same teacher in the two materials must be consistent | Compare the teacher assignment table with the master timetable, check whether teacher names and weekly class hours match, and check whether the change date and version number are synchronized |
| After-school service program table | Fields include program name, number of participants, service date, receipt, and signature; the program name and participant count must be consistent with the registration receipt | Open the citation marker to point back to the original paragraph, check the program name, number of participants, service date, and receipt signature, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Search parameters and citation budget | The search parameter values are consistent with the knowledge base retrieval section; `quoteMaxToken` only constrains the length of the cited text | Open the search parameter panel and check item by item, record the array length separately, and do not compare the length with `quoteMaxToken` for equality |

## Three common errors

- Symptom: The name or weekly class hours of the same course do not match between the master timetable and the teacher assignment table. Cause: The two materials were exported separately without field comparison, and the version numbers were not updated in sync.
- Symptom: The number of participants in the after-school service program table is inconsistent with the number of registration receipts, and signatures or receipts are missing. Cause: Receipt collection and program table aggregation belong to different steps, and changes were not backfilled.
- Symptom: The cited snippet does not match the original text, and there is no citation marker in the answer. Cause: First check whether this round hit anything and which material was hit, then look at trimming; do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this feature: ask a timetable question that has an original-text basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching material, confirm that the array is empty while the pipeline runs through, and check the citation records in `quoteList`.

Business test: change one piece of content and see whether the version number and citations are updated in sync

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model
- Run a trial with a question that has no matching material, see that the output is empty while the pipeline continues, and record the array length separately

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
