---
title: Citations and Source Traceability for Grade Entry and Credit Recognition: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c020-f010
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Citations | Operations
meta_description: Grades and Credits: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Grade Entry and Credit Recognition: Coordinate Operations and Application Handover

## What this category's data looks like

Grade entry and credit recognition involve three types of materials: transcripts, deferred examination applications, and make-up examination arrangements. Transcripts record the course name, credits, grade, and entry date, and require the teacher's signature and the academic affairs receipt; deferred examination applications record the course, reason for deferral, application date, and approval signature; make-up examination arrangements record the make-up course, time, location, and invigilator's signature. During deployment, operations, and application handover, these three types of materials enter the knowledge base retrieval node and each plays a different role: transcripts are used to verify credits and grade fields, deferred examination applications are used to verify deferral eligibility and the approval chain, and make-up examination arrangements are used to verify make-up examination time and examination room information. The material update cadence is centralized archiving after entry each semester, while deferred and make-up examination arrangements are updated on a rolling basis with the approval process. Field characteristics include course name, credits, grade, date, signature, and receipt. The same record may have inconsistent names, quantities, or dates across different materials, versions may be out of sync, or signatures and receipts may be missing, so item-by-item comparison is required during handover.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. "Handover-ready deployment status and operation records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Whether the course name, credits, grade, entry date, teacher's signature, and academic affairs receipt are complete, and whether they match the same course name, quantity, and date in the deferred examination application and make-up examination arrangement | Retrieve the course in the knowledge base retrieval node, verify the fields and signatures in the cited fragments, open the citation marker to trace back to the original paragraph, and record the number of array items and the `quoteMaxToken` budget |
| Deferred examination application | Whether the course name, reason for deferral, application date, approval signature, and receipt are complete, and whether they match the same record name and date in the transcript and make-up examination arrangement | Retrieve the original deferred examination application, compare the course name and date item by item, confirm that the cited fragments match the original text, and check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Make-up examination arrangement | Whether the make-up course, time, location, invigilator's signature, and receipt are complete, and whether they match the same course name, quantity, and date in the transcript and deferred examination application | Retrieve the original make-up examination arrangement, verify the time, location, and signature, use `quoteList` to view the citation source identifier, and confirm that the number of array items matches the hit materials |
| Associated knowledge base and search parameters | Whether the selected knowledge base uses the same vector model, and whether the search parameter values are consistent with the knowledge base retrieval section | Open the search parameter panel and verify item by item, run a trial query with no matching materials, and confirm that the citation array is empty while the chain continues |

## Three common errors

- Symptom: The name, quantity, or date of the same course does not match between the transcript and the make-up examination arrangement. Cause: The two materials were entered at different times, versions are out of sync, and fields were not compared item by item during handover.
- Symptom: The deferred examination application lacks an approval signature or academic affairs receipt. Cause: The approval process was not completed before archiving, the handover form did not list signature items, and the next shift cannot confirm the scope of authorization.
- Symptom: The cited fragments do not match the original text, or the answer has content but the citation array is empty. Cause: This round did not hit that material, or the hit material is irrelevant to the question; an empty array is a normal output.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through, and record the number of array items and the `quoteMaxToken` budget; the two are not compared for equality.

Business test: verify item by item once according to the handover form, see which record is missing, check whether the version, connection, and task record are consistent, and confirm that the fields, dates, and signatures of the transcript, deferred examination application, and make-up examination arrangement are complete.

- In the knowledge base retrieval node, verify the selected collections and their vector models, open the search parameter panel and verify the values item by item, run a trial query with no matching materials, and record the length of the citation array in `responseData`.
- In the conversation, open the citation markers, check against the source documents whether each citation can trace back to the original paragraph, use `quoteList` to view the source identifier, and compare item by item the fields, dates, and signatures of the transcript, deferred examination application, and make-up examination arrangement.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
