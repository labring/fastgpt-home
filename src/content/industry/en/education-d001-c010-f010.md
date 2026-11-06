---
title: Citations and Source Traceability for School Timetables and After-School Scheduling: Find Supporting Evidence
slug: /en/industry/education-d001-c010-f010
page_type: 行业问题页
application_area: education
meta_title: School Timetables | Citations | Evidence
meta_description: School Timetables: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Timetables and After-School Scheduling: Find Supporting Evidence

## What this category's data looks like

This page's material comes from primary and secondary school timetable and after-school service scheduling scenarios, involving three types: the master timetable, the teacher assignment table, and the after-school service program table. The master timetable records class, day of the week, period, and course name; the teacher assignment table records teacher name, class taught, and subject; the after-school service program table records program name, number of participants, venue, and time slot. All three types of material carry a date and a signature field, and some include a parent receipt. After the material enters the knowledge base retrieval node, each acts as an independent source participating in vector search, and the citation output returns the original text snippet and source identifier according to the hit material. The update cadence is mainly per-semester or monthly adjustment; the name, quantity, and date of the same record in two materials may not match, and when versions are not synchronized or signatures are missing, the basis entry needs to point back to the specific source document to determine the current version.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The "basis entry that can point back to the original text" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Master timetable | Fields include class, day of the week, period, course name, date, and signature; determine whether the current version is consistent with the teacher assignment table | Open the citation superscript, compare against the original text of the master timetable, check the date and signature field, and record the number of citations |
| Teacher assignment table | Fields include teacher name, class taught, and subject; determine whether the name and quantity of the same record match between the master timetable and the assignment table | Compare the cited snippet with the original text item by item, check whether the subject and class are consistent, and look at the source identifier returned by `quoteList` |
| After-school service program table | Fields include program name, number of participants, venue, and time slot; determine whether versions are synchronized and whether receipts are complete | Check the differences in program name and number of participants between the two materials, and look at the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Search parameters | Values are consistent with the settings in the knowledge base retrieval section; determine that the cited content budget and the number of array entries are each independent | Open the search parameters panel and check item by item; `quoteMaxToken` only checks the tokens of the cited text, and the number of entries is recorded separately |

## Three common errors

- Symptom: the same program name is written differently in the master timetable and the after-school service program table. Cause: the two materials were entered separately, and name alignment was not performed.
- Symptom: the date of the teacher assignment table is earlier than the adjustment date of the master timetable, and the basis entry points to an old version. Cause: versions were not synchronized, and the update was not written back.
- Symptom: the after-school service program table lacks a parent receipt or the signature field is blank, and the basis entry cannot confirm that it is in effect. Cause: the receipt was not archived, and the signature step was omitted.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis, and check whether the citation array and superscript can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline runs through.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check that the number of citations and `quoteMaxToken` are not compared for equality.

- In the conversation, open the citation superscript, compare against the source document item by item, and check whether the original text snippet and source identifier are consistent.
- Run a trial with a question that has no matching material, see that the citation array is empty while the output pipeline continues, and record the number of array entries.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
