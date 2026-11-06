---
title: Citations and Source Traceability for Grade Entry and Credit Recognition: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c020-f010
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Citations | Handover
meta_description: Grades and Credits: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Grade Entry and Credit Recognition: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Grade entry and credit recognition involves three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts are submitted by the course instructor, and their fields include course name, credits, grade, grade point, entry date, and instructor signature; deferred examination applications are initiated by the student and approved by the department, and their fields include course, reason for deferral, original examination date, and approver signature; make-up examination arrangements are scheduled by the academic affairs office, and their fields include make-up examination course, time, location, invigilation, and receipt. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source fragment, to be used for subsequent field comparison, ledger writing, and report generation. The update cadence advances by semester and examination round, and versions and dates must be kept in sync. Common field characteristics: the course name, credits, and examination date of the same course must be consistent across different materials, and signatures and receipts are indispensable.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The material drafts that can be issued and the handoff records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Course name, credits, grade, grade point, entry date, and instructor signature are complete; consistent with the same course name, credits, and date in the deferred examination application and make-up examination arrangement | Open the citation marker and check the fields and dates against the source document; inspect the original text fragment in `quoteList` to confirm the referenced paragraph |
| Deferred examination application | Course, reason for deferral, original examination date, approver signature, and receipt are complete; version and date are in sync with the transcript and make-up examination arrangement | Use the search parameter panel to check the values; verify whether the cited fragment covers the approval signature and receipt fields |
| Make-up examination arrangement | Make-up examination course, time, location, invigilation, and receipt are complete; the course name, quantity, and date match those in the transcript and deferred examination application | Compare the courses and dates in the citation array one by one; record the number of array entries, and also check the tokens budget `quoteMaxToken` of the cited text |
| Knowledge base retrieval node | The selected knowledge base uses the same vector model; the cited content is output as an array, and the length may be 0 | In the node, check the selected collection and vector model; run a test with a question that has no matching materials, and see that the output is empty while the chain continues, with `responseData` (non-streaming module results returned with detailed output enabled) returned normally |

## Three common errors

- Symptom: the name, credits, and date of the same course do not match between the transcript and the make-up examination arrangement. Cause: during material drafting, the same source fragment was not used as the baseline, and the citation did not refer back to the original text.
- Symptom: the version of the deferred examination application was not synced, and the approval signature or receipt is missing. Cause: the handoff record was not updated along with the materials, and the responsible person and date were not checked together.
- Symptom: there is no citation marker in the answer, or the cited fragment does not match the original text. Cause: without first checking whether this round had a hit and which material was hit, the issue was directly attributed to length truncation.

## How to verify the setup

Acceptance for this feature: ask a question that has original-text support, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: draft one according to the template and complete one handoff, and see whether missing items are blocked.

- Open the citation marker and check against the source document whether each citation can refer back to the original text paragraph; record the number of array entries, and also check the tokens budget `quoteMaxToken` of the cited text; do not compare the two for equality.
- Run a test with a question that has no matching materials, and confirm that the citation array is empty while the output chain continues; in the node, check the selected knowledge base and vector model, and check the search parameter values item by item.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
