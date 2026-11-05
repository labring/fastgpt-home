---
title: Citations and Source Traceability for Corporate Sales and Product Training: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c042-f010
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Citations | Review
meta_description: Sales Training: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Sales and Product Training: Trace Exceptions and Review Results

## What this category's data looks like

For exception tracing and manual review in enterprise sales product training, the core materials are product manuals, sales sales language, and channel training schedules. Product manuals provide specifications, model numbers, version numbers, and effective dates, and serve as the field baseline; sales sales language carries wording, quantities, and commitment boundaries, and must be aligned item by item with the manuals; channel training schedules record sessions, attendees, instructors, and receipt signatures, and are the point where review responsibility lands. The three types of materials update at different rhythms: manuals are released with versions, sales language is adjusted with channels, and schedules roll forward by session. After entering the knowledge base retrieval node, manuals, sales language, and schedules are each cited as independent sources, and each entry in the cited content array contains the original text fragment and source identifier, and its length can be 0. During exception tracing, first see which material was hit in this round, then compare names, quantities, dates, and signatures to form an exception list and review conclusion, and hand it to the responsible person for handling.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing the original text fragment and source identifier, and its length can be 0. The exception list and review conclusion are then completed by subsequent AI nodes, code nodes, or humans: comparing fields, writing ledgers, and generating reports. The citation array is not a discrepancy list, ledger, report, or authorization scope; the number of entries is the array length, and `quoteMaxToken` is the content budget, and the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Fields, dates, and signatures: whether the model number, version number, and effective date are consistent with the sales sales language; if the version is not synchronized, it is an exception | Open the citation marker to trace back to the original manual paragraph, verify the name, quantity, and date; record `quoteMaxToken` and the number of array entries |
| Sales sales language | Fields, dates, and signatures: whether the name, quantity, and date of the same record do not match the manual, and whether the wording lacks a signature | Run the same question again, compare the sales language source identifier with the original text fragment, and confirm that the citation in `responseData` (non-streaming module results returned with detailed output enabled) corresponds to the original text |
| Channel training schedule | Fields, dates, and signatures: whether the session, attendees, instructor, and receipt signature are complete; if the signature or receipt is missing, it is an exception | Check the schedule source identifier and original text fragment, verify the signature and receipt; use a question with no match to confirm the array is empty while the pipeline still runs |
| Cited content output | The number of returned entries matches the materials hit; being empty is also normal and is not compared for equality | Run a question with no matching material and see that the output is empty while the pipeline continues; view the citation array in `quoteList` |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the product manual and the sales sales language. Cause: the two materials are updated separately, and no item-by-item comparison is made against the same version number and effective date, so the exception is not recorded.
- Symptom: the channel training schedule has sessions and attendees, but lacks an instructor signature or receipt. Cause: the review step does not list signatures and receipts as mandatory fields to verify, so the exception list lacks a point of responsibility.
- Symptom: there is no citation marker in the answer, or there is an answer but the citation array is empty. Cause: an empty citation array does not mean retrieval failed; an empty array is a normal output; you must first check whether this round hit anything and which material was hit.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support and check whether the citation array and markers can trace back to the original text; then ask a question with no matching material and confirm the array is empty while the pipeline still runs.

Business test: create an exception record, see whether it can be traced to the source material, compare names, quantities, dates, and signatures, and form an exception list and review conclusion.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base uses the same vector model, record `quoteMaxToken` and the number of array entries, and do not compare the two for equality.
- Open the citation markers in the conversation, compare `quoteList` within `responseData` against the source documents, and run a question with no match to confirm the array is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
