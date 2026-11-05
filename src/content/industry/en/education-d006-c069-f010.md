---
title: Citations and Source Traceability for Journal Publication Licensing and Annual Verification: Track Progress and Check Statistics
slug: /en/industry/education-d006-c069-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Licensing | Citations | Progress
meta_description: Journal Licensing: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Journal Publication Licensing and Annual Verification: Track Progress and Check Statistics

## What this category's data looks like

This page addresses progress records and statistical verification for journal publishing licenses and annual verification. Materials include the journal publishing license, annual verification form, and rectification report. The license provides the scope of permission and validity period, the annual verification form provides annual data and verification conclusions, and the rectification report provides issue items and completion status. When these three enter the knowledge base retrieval node, each is cited as an independent source, and the cited snippets retain the original paragraphs and source identifiers. The update cadence is archived weekly or monthly, and the field characteristics center on names, quantities, dates, signatures, and receipts. The same record may have different name spellings, different quantity calibers, and different date orders across the three materials. When versions are not synchronized, citations will point to the old version. When signatures or receipts are missing, the cited snippets cannot trace back to the complete process.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing the original snippet and source identifier, and the length can be 0. The progress table and statistical caliber description are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Journal publishing license | Whether the fields, dates, and signatures are consistent with the annual verification form | In the cited snippets, verify the license name, validity period, issuance date, and signature, and compare them item by item with the annual verification form |
| Annual verification form | Whether the name, quantity, and date of the same record match across the three materials | Open the citation marker to trace back to the original text, record the name, quantity, and date, and note the version and receipt status |
| Rectification report | Whether the issue items, completion dates, and signatures or receipts are complete | Verify the rectification items and completion dates in the cited snippets, and check whether signatures and receipts are missing |
| Cited content output | The number of returned entries matches the hit materials; empty is also normal | Run a trial with a question that has no matching materials, and see whether the array is empty while the chain continues; record the number of entries separately, and `quoteMaxToken` only verifies the citation text budget |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the license and the annual verification form. Cause: The two materials are maintained separately, and no field-level comparison has been made.
- Phenomenon: The citation points to an old version of the annual verification form, and the rectification report is not synchronized. Cause: The versions are not synchronized, and retrieval hits old materials.
- Phenomenon: The cited snippets lack signatures or receipts and cannot trace back to the complete process. Cause: Signatures and receipts were not completed when the materials were archived.

## How to verify the setup

Acceptance of this feature: ask a question with textual evidence, and verify whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. Check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the original snippets in `quoteList`.

Business test: use one week of records to verify the totals, and see whether the calibers and exceptions are clearly stated; the number of citations is the array length, and `quoteMaxToken` is the citation content budget, and the two are not compared for equality.

- Open the citation markers, compare against the source documents, and verify the name, quantity, date, and signature item by item.
- Run a trial with a question that has no matching materials, confirm that the array is empty while the chain continues, and record the number of entries.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
