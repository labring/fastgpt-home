---
title: Citations and Source Traceability for Grade Entry and Credit Recognition: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c020-f010
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Citations | Versions
meta_description: Grades and Credits: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Grade Entry and Credit Recognition: Maintain Document Versions and Changes

## What this category's data looks like

This page focuses on the grade entry and credit recognition category, handling the versions and citation traceability of three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. A transcript is the primary record for credit recognition, with fields including course name, credits, grade, instructor signature, and date; a deferred examination application is a pre-process material, including the reason for application, original examination date, approval signature, and receipt; a make-up examination arrangement is a follow-up arrangement material, including make-up examination time, location, invigilator signature, and receipt. The three types of materials are often maintained separately by different stages, with different update rhythms: transcripts change as grades are published, deferred examination applications change as the approval flow progresses, and make-up examination arrangements change as examination affairs are adjusted. When the materials enter the knowledge base retrieval node, each serves as a citable original text fragment, and the cited content array brings out the source identifier for subsequent field comparison, ledger writing, and report generation. If the name, quantity, or date of the same record does not match across two materials, the versions are not synchronized, or signatures or receipts are missing, the citation and the original text cannot refer back to each other.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each item containing an original text fragment and a source identifier, and the length can be 0. The "version ledger and change record" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Fields include course name, credits, grade, instructor signature, and date; the name, quantity, and date of the same record in the deferred examination application and make-up examination arrangement must be consistent | Open the source identifiers one by one in the citation array, compare them against the original transcript paragraph, and check the fields and signature date in `quoteList` |
| Deferred examination application | Fields include the reason for application, original examination date, approval signature, and receipt; the course name and date must match those in the transcript | Search with the same course name, see whether the cited fragment refers back to the original deferred examination application, and check whether the signature and receipt are complete |
| Make-up examination arrangement | Fields include make-up examination time, location, invigilator signature, and receipt; the dates must be consistent with those in the transcript and deferred examination application | Check whether the number of citation items in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials, then check the date and signature in the original make-up examination arrangement |
| Knowledge base retrieval node | The selected knowledge bases use the same vector model; cited content is output as an array, and the length can be 0 | Check the selected collections and their vector models; run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; for the citation limit, check only the tokens of the cited text, and record the number of array items separately |

## Three common errors

- Symptom: the name or date of the same course does not match across two materials. Cause: the transcript, deferred examination application, and make-up examination arrangement are maintained separately, the versions are not synchronized, and the cited fragment refers back to only one of them.
- Symptom: the citation array is empty but the answer continues. Cause: no materials were hit in this round; an empty array is a normal output and does not mean retrieval failed. Check the hit situation first, then look at trimming.
- Symptom: the cited fragment does not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at `quoteMaxToken` trimming; do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis, check whether the citation array and footnote markers can refer back to the original text, and check the source identifiers in `quoteList` and `responseData`; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: change one piece of content and see whether the version number and citations update in sync.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, consistent with the values set in the knowledge base retrieval section; for the citation limit, check only the tokens of the cited text, and record the number of array items separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
