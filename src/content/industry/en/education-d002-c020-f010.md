---
title: Citations and Source Traceability for Grade Entry and Credit Recognition: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c020-f010
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Citations | Checks
meta_description: Grades and Credits: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Grade Entry and Credit Recognition: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on three types of materials in grade entry and credit recognition scenarios: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts are usually exported from the academic affairs system or compiled by the school/department, with fields including course name, credits, grade, examination date, and instructor signature; deferred examination applications are submitted by students and approved by the counselor and the course-offering school/department, with fields including application reason, original examination date, proposed deferred examination date, and approval signature; make-up examination arrangements are published by the academic affairs office or the course-offering school/department, with fields including make-up examination course, make-up examination time, examination room, invigilation signature, and receipt. The three types of materials update at different rhythms: transcripts update with entry batches, deferred examination applications update with approval flow, and make-up examination arrangements update with scheduling adjustments. When materials enter this feature, transcripts serve as the basis for recognition, deferred examination applications serve as status explanations, and make-up examination arrangements serve as evidence of time and session, each assuming a different comparison role, used to locate name, quantity, and date discrepancies for the same record across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Course name, credits, grade, examination date, and instructor signature are consistent across the three types of materials | Retrieve the original text paragraph of the transcript, verify the course name, credit count, examination date, and signature field, and record fields that are inconsistent with the ledger |
| Deferred examination application | Application reason, original examination date, proposed deferred examination date, and approval signature match the transcript and make-up examination arrangement | Compare the original examination date in the deferred examination application with that in the transcript, then verify it against the make-up examination time in the make-up examination arrangement, and flag entries whose versions are not synchronized or whose signatures are missing |
| Make-up examination arrangement | Make-up examination course, make-up examination time, examination room, invigilation signature, and receipt are consistent across the three types of materials | Verify whether the course and count in the make-up examination arrangement are consistent with the course name and count in the transcript, and check whether the receipt and signature are complete |
| Knowledge base retrieval node | Cited content is output as an array, the length can be 0, and the search parameters are consistent with the values in the knowledge base retrieval section | Check the number of entries in the citation array and the `quoteList` source identifier in `responseData` (non-streaming module results returned with detailed output enabled), verify the `quoteMaxToken` budget against the tokens of the cited text, and record the number of array entries separately |

## Three common errors

- Symptom: The course name, credit count, or examination date of the same record does not match between the transcript and the deferred examination application. Cause: The two materials are entered at different stages, their field definitions and update timings differ, and no field-by-field comparison was performed.
- Symptom: The make-up examination arrangement has been adjusted, but the deferred examination application still shows the original examination date, and the versions are not synchronized. Cause: After the scheduling change, the related materials were not written back, and the retrieved citation snippets come from the old version.
- Symptom: The transcript lacks the instructor signature, and the make-up examination arrangement lacks the invigilation receipt. Cause: Signatures and receipts were omitted during the flow, and the citation snippets cannot point back to the complete approval chain.

## How to verify the setup

Feature acceptance: ask a question that has textual evidence, and check whether the citation array and footnote markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business testing: use a real record to find fields inconsistent with the ledger, hand them to the reviewer for confirmation, and write them back.

- Turn on the conversation citation footnote markers, compare against the source document, and verify whether the citation snippets are consistent with the original text paragraphs.
- Check the citation array length and the `quoteList` source identifier in `responseData`, verify the `quoteMaxToken` budget, and record the number of array entries separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
