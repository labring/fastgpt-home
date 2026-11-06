---
title: Citations and Source Traceability for Grade Entry and Credit Recognition: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c020-f010
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Citations | Review
meta_description: Grades and Credits: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Grade Entry and Credit Recognition: Trace Exceptions and Review Results

## What this category's data looks like

Grade entry and credit recognition involves three types of materials: transcripts, deferred examination applications, and makeup examination arrangements. A transcript records the course name, credits, score, and entry date; a deferred examination application contains the application reason, original examination date, and approval signature; a makeup examination arrangement contains the makeup examination time, location, and invigilation receipt. The materials come from academic affairs system exports, college submissions, and teacher confirmations, and are updated by semester and examination batch. When entering the knowledge base retrieval node, the three types of materials are retrieved as citation sources: transcripts are used to verify scores and credits, deferred examination applications are used to verify deferred examination eligibility and dates, and makeup examination arrangements are used to verify makeup examination records and signatures. Field characteristics include course name, credits, date, signature, and receipt. A common inconsistency is that the name, quantity, or date of the same record does not match across two materials, versions are not synchronized, or a signature or receipt is missing.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of citation content, each item containing the original text fragment and source identifier; the length may be 0. The exception list and review conclusion must be handled subsequently by an AI node, code node, or human. The citation array is not a discrepancy list, ledger, report, or authorization scope; the number of items is the array length, and `quoteMaxToken` is the content budget. The two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Whether the course name, credits, score, and entry date are consistent item by item with the deferred examination application and makeup examination arrangement | Compare the course name, credits, and date item by item in the citation array, open the citation marker to trace back to the original text paragraph, and verify the signature and receipt |
| Deferred examination application | Whether the application reason, original examination date, and approval signature match the transcript and makeup examination arrangement | Use the citation source identifier to locate the original text of the deferred examination application, verify the approval signature and date, and record inconsistent items |
| Makeup examination arrangement | Whether the makeup examination time, location, and invigilation receipt are synchronized in version with the transcript and deferred examination application | Check the length of the citation content array, trace back item by item to the original text of the makeup examination arrangement, verify the receipt and signature, and confirm items whose versions are not synchronized |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, and whether the search parameters are consistent with the values in the knowledge base retrieval section | Open the search parameter panel and verify item by item, check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and run a test with a question that has no match to confirm the array is empty while the pipeline runs through |

## Three common errors

- Symptom: The name, credits, or date of the same course does not match between the transcript and the makeup examination arrangement. Cause: The two materials are entered in different stages, versions are not synchronized, and the citation fragments each trace back to their own original text.
- Symptom: The deferred examination application lacks an approval signature or the makeup examination arrangement lacks an invigilation receipt. Cause: The signature process was not completed when the materials were submitted; the item can still be hit in the citation array, but the fields are incomplete.
- Symptom: The answer has content but the citation array is empty, or the citation fragments do not match the original text. Cause: No material was hit in this round, or a different material was hit; this cannot be directly attributed to length truncation.

## How to verify the setup

This feature's acceptance: ask a question with original text support, and verify whether the citation array and markers can trace back to the original text; then ask a question with no matching material, and confirm the array is empty while the pipeline runs through; at the same time, record the number of array items, and separately verify the tokens of the citation text and `quoteMaxToken`.

Business test: create an exception record, see whether the source material can be traced, verify the fields, dates, and signatures of the transcript, deferred examination application, and makeup examination arrangement, and confirm that the exception is supported by original records and, after the reviewer signs, is handed to the person in charge for handling.

- In the conversation, open the citation markers, compare them against the source documents, verify item by item whether the citation fragments are consistent with the original text paragraphs, and record the number of array items.
- Run a test with a question that has no matching material, check `quoteList` within `responseData`, confirm the output is empty while the pipeline continues, and then open the search parameter panel and verify item by item.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
