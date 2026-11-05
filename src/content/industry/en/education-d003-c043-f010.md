---
title: Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c043-f010
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Citations | Intake
meta_description: Training Admissions: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Admissions and Inquiry Follow-Up: Handle Questions and Collect Missing Information

## What this category's data looks like

In the enrollment consultation conversion scenario at training institutions, materials are mainly of three types: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures provide course names, class types, class hours, start dates, and fee bases, and are the source for citing course information when answering consultations; consultation records carry consultation time, inquirer, intended course, items already asked, and items still to be filled in, and are used to determine missing items and generate follow-up questions; trial class schedules record trial class time, location, instructor, and available slots, and are used to confirm bookable time slots. Common fields across the three material types include names, quantities, dates, signatures, and receipts; the update cadence changes on a rolling basis with class-term adjustments, slot changes, and consultation progress, and version differences mostly appear as inconsistencies in the name, quantity, or date of the same record, as well as missing signatures or receipts. When the materials enter this feature, their roles differ: enrollment brochures serve as the source of course facts, consultation records serve as the basis for intake and follow-up questions, trial class schedules serve as the basis for scheduling and slots, retrieval results provide only cited snippets and source identifiers, and the intake record and the completed follow-up items are handled by subsequent steps.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. The intake record and the completed follow-up items are then handled by subsequent AI nodes, code nodes, or humans. Even if no content is found, the output pipeline still runs through; the citation results for the current round can be viewed in `responseData` (non-streaming module results returned with detailed output enabled), `quoteList` is used to locate the matched materials, `quoteMaxToken` is the citation content budget, and the number of citations is recorded separately by the array length.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the course name, class type, class hours, start date, and fee basis are consistent with the consultation records and trial class schedules, whether the versions are in sync, and whether signatures and receipts are complete | In the node, check the selected knowledge base collections and vector model, run a trial with a question that has no matching materials, see that the citation array is empty while the pipeline continues, and open `quoteList` to compare against the source documents |
| Consultation record | Whether the consultation time, inquirer, intended course, items already asked, and items still to be filled in are complete, whether the name, quantity, or date of the same record do not match across the two materials, and whether missing signatures or receipts are identified | Open the citation markers to compare against the original paragraphs, check whether each citation can be traced back to the consultation record, and record the number of citations and the `quoteMaxToken` budget as separate values |
| Trial class schedule | Whether the trial class time, location, instructor, and slots are consistent with the enrollment brochure and consultation records, and whether follow-up questions are asked before answering when versions are not in sync or dates do not match | Open the search parameter panel and check the values item by item, run a trial with a question that lacks key information to see whether follow-up questions are asked before answering, and confirm the citation array length in `responseData` |
| Citation content output | Whether the number of returned entries matches the matched materials, whether being empty is also normal, and whether mismatches between cited snippets and the original text are not directly attributed to length truncation | First check whether there was a match in the current round and which material was matched, then check truncation; do not compare the number of citations and `quoteMaxToken` for equality |

## Three common errors

- Symptom: the course name, quantity, or date of the same record do not match between the enrollment brochure and the consultation record. Cause: the two materials are not in sync in version, and when updating, only one place is changed while the other still retains the old basis.
- Symptom: the trial class time or slots do not match between the trial class schedule and the consultation record. Cause: after scheduling adjustments, the consultation record was not written back, and missing signatures or receipts caused the change to go unconfirmed.
- Symptom: there are no citation markers in the answer, or the cited snippets do not match the original text. Cause: no material was matched in the current round, another material was matched, or the cited text was truncated; first check the match, then check truncation.

## How to verify the setup

Acceptance of this feature: ask a question that has supporting text, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: raise a question that lacks key information, and see whether follow-up questions are asked before answering.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, and run a trial with a question that has no matching materials to see that the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
