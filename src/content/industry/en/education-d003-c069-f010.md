---
title: Citations and Source Traceability for Journal Publication Licensing and Annual Verification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c069-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Licensing | Citations | Intake
meta_description: Journal Licensing: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Publication Licensing and Annual Verification: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on journal publication license and annual verification materials; the core materials are the journal publication license, the annual verification form, and the rectification report. When these three types of materials enter Q&A intake and missing-item follow-up, their roles differ: the license provides the entity name, licensed scope, validity period, and issue date; the annual verification form provides the verification year, reported data, signature, and receipt; the rectification report provides problem items, rectification measures, completion date, and seal. Material sources are business system exports and paper scans, and the update cadence is synchronized with the annual verification cycle and rectification milestones. Field characteristics are concentrated in four items: name, quantity, date, and signature. It is common for the same record to have inconsistent name spellings across two materials, different quantity calibers, dates spanning months or years, unsynchronized versions, or missing signatures or receipts. Intake records and follow-up question items need field-by-field comparison, and citation sources and traceability are used to refer back to the original text passages.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each entry containing the original text snippet and source identifier; the length may be 0. Intake records and follow-up question items must be handled downstream by AI nodes, code nodes, or humans. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Journal publication license | Fields: entity name, licensed scope, validity period, issue date, signature; compare with the annual verification form to see whether the name and date are consistent | Open the citation marker to refer back to the original passage in the license, verify the name, date, and signature fields; record the number of entries in the citation array |
| Annual verification form | Fields: verification year, reported data, quantity, signature, receipt; compare with the license for name and validity period, and with the rectification report for problem items | Verify whether the cited snippet corresponds to the original text, and check whether quantity, date, and signature items are missing; use `quoteList` to inspect the returned structure |
| Rectification report | Fields: problem items, rectification measures, completion date, seal; compare with the annual verification form for problem items and completion date | Verify the citation source identifier, and check whether the rectification measures and completion date are missing a signature or receipt; use `responseData` (non-streaming module results returned with detailed output enabled) to inspect the citation array |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model; the number of cited content outputs matches the hit materials, and being empty is also normal | Verify the selected collection and vector model; run a trial with a question that has no matching materials to confirm the array is empty while the pipeline still runs through |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the license and the annual verification form. Cause: the two materials use different reporting calibers, and no field-level comparison was performed.
- Symptom: the rectification report version is not synchronized, and the completion date cannot correspond to the problem items in the verification form. Cause: the material update cadence is inconsistent, and the old version is still in the knowledge base.
- Symptom: the cited snippet does not match the original text, and a signature or receipt is missing. Cause: first check whether this round hit anything and which material was hit, then look at trimming; do not directly attribute it to length trimming.

## How to verify the setup

This feature's acceptance: ask a question that has original-text support, and verify whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, and confirm the array is empty while the pipeline still runs through.

Business test: submit a question missing key information and see whether it asks a follow-up before answering.

- Verify whether the associated knowledge base uses the same vector model, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching materials, confirm the citation array is empty while the output pipeline continues, record the number of array entries, and record the `quoteMaxToken` budget separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
