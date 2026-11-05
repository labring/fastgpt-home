---
title: Citations and Source Traceability for Public Vocational Skills Level Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c034-f010
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Citations | Intake
meta_description: Skills Certification: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Public Vocational Skills Level Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for Q&A acceptance and missing-item follow-up questions in social assessment of occupational skill level certification come from three types: the assessment implementation plan, the candidate registration form, and the assessor dispatch form. The assessment implementation plan provides the certified occupation, level, assessment method, and time schedule, and is the overall basis for acceptance conditions; the candidate registration form carries personal identity, declared level, years of work, and signature confirmation, and is the main form for item-by-item comparison of question items; the assessor dispatch form records assessor names, qualification certificate numbers, dispatch dates, and receipts, and is used to verify the compliance of the assessment process. When the three types of materials enter the knowledge base retrieval node, each is split by paragraph and attached with a source identifier; after a retrieval hit, they are returned as a cited content array for subsequent field comparison, ledger writing, and report generation. In terms of update rhythm, the implementation plan is adjusted by batch, registration forms are added one by one per candidate, and dispatch forms are supplemented by session, so the name, quantity, and date of the same record are easily mismatched across different materials, and unsynchronized versions or missing signatures and missing receipts are also common. Field characteristics are concentrated in three categories: dates, signatures, and quantities, and verification requires item-by-item reference back to the original text.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing an original text fragment and a source identifier, and the length may be 0. The acceptance record and the supplemented question items are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Assessment implementation plan | Check whether the certified occupation, level, assessment method, and date are consistent with the registration form and dispatch form | Open the citation superscript to compare against the source paragraph, record the field name, date, and signature position, and check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Candidate registration form | Check whether the declared level, years of work, signature, and receipt are complete, and whether the name, quantity, and date match the implementation plan | Compare the original text fragment and source identifier item by item; record missing signatures or receipts as items to be followed up |
| Assessor dispatch form | Check whether the assessor name, qualification certificate number, dispatch date, and receipt match the session in the implementation plan | Verify the cited fragment against the source document, and confirm that the source identifier in `quoteList` can refer back to the original text paragraph |
| Knowledge base retrieval node | Check whether the selected knowledge base uses the same vector model, and whether the search parameters are consistent with the values in the knowledge base retrieval section | Open the search parameter panel and check item by item, and run a test with a question that has no matching materials to see whether the citation array is empty while the chain still runs through |

## Three common errors

- Phenomenon: the same candidate name is written differently in the registration form and dispatch form, and the quantity and date do not match. Cause: the two materials are entered in different stages, and retrieval is performed without field-level comparison.
- Phenomenon: the implementation plan has been updated, but the registration form still references the old batch date. Cause: the version is not synchronized, and the old paragraph remains in the knowledge base and is hit.
- Phenomenon: the cited fragment does not match the original text, and there is no citation superscript in the answer. Cause: first check whether this round hit and which material was hit, then look at `quoteMaxToken` trimming, and do not directly attribute it to length.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, and check whether the citation array and superscript can refer back to the original text paragraph; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: raise a question missing key information, and see whether it asks a follow-up question before answering; the question items supplemented after the follow-up should correspond to specific material fields.

- Run a test with a question that has no matching materials, record the citation array length and the source identifiers in `quoteList` within `responseData`, and confirm that the chain continues when the array is empty.
- Open the citation superscript and compare item by item against the source document, check whether the cited fragment is consistent with the original text paragraph, and separately record the number of citations and the `quoteMaxToken` budget without making an equality comparison.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
