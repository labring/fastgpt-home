---
title: Citations and Source Traceability for Academic Journal Business Partnerships: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c070-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Partnerships | Citations | Checks
meta_description: Journal Partnerships: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Journal Business Partnerships: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on material verification and discrepancy location in academic journal business cooperation management, involving three types of sources: business cooperation agreements, advertising review forms, and distribution cooperation materials. Business cooperation agreements record the partner, cooperation term, revenue-sharing ratio, and signing date, and are usually updated by the journal's business department annually or by project cycle; advertising review forms record the advertiser, advertising content, review date, and signature, and are submitted by the advertising review position before each issue's layout; distribution cooperation materials record the distribution channel, distribution quantity, settlement date, and receipt, and are collected by the distribution department monthly or quarterly. When the three types of materials enter the knowledge base retrieval node, each participates in citation output as an independent source: business cooperation agreements provide the cooperation entity and term fields, advertising review forms provide the advertisement name, quantity, and review date fields, and distribution cooperation materials provide the distribution quantity, settlement date, and receipt fields. The name, quantity, and date of the same record in two materials need to be compared field by field; unsynchronized versions, missing signatures, or missing receipts are common discrepancy points.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text fragment and source identifier, and the length can be 0. The discrepancy list is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Business cooperation agreement | Whether the name, quantity, and date of the same record in the two materials are consistent; whether the signature and signing date are complete | Locate the original text fragment of the business cooperation agreement in the citation array, verify the partner name, cooperation term, revenue-sharing quantity, and signing date, compare field by field with the ledger, and record inconsistent fields |
| Advertising review form | Whether the name, quantity, and date of the same record in the two materials are consistent; whether the versions are synchronized; missing signature or receipt | Locate the original text fragment of the advertising review form in the citation array, verify the advertisement name, advertisement quantity, review date, and signature field, and cross-compare with the business cooperation agreement or distribution cooperation materials |
| Distribution cooperation materials | Whether the name, quantity, and date of the same record in the two materials are consistent; whether the receipts are complete | Locate the original text fragment of the distribution cooperation materials in the citation array, verify the distribution channel, distribution quantity, settlement date, and receipt, compare field by field with the ledger, and record discrepancies |
| Knowledge base retrieval node | The citation content is output as an array, and the length can be 0; even if no content is found, the output chain still runs through | Check whether the associated knowledge base uses the same vector model, verify the search parameter values, inspect the number of entries in the citation array and the `quoteMaxToken` budget, and confirm that the citation fragments in `responseData` (non-streaming module results returned with detailed output enabled) can be traced back to the original text |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record in the business cooperation agreement and distribution cooperation materials do not match. Cause: The two materials are entered by different positions at different times, the field definitions are not unified, and the versions are not synchronized.
- Phenomenon: The advertising review form lacks a signature or receipt, and the citation fragment cannot cover the signature field. Cause: The signature page was not collected completely when the materials were archived, or the scanned copy omitted the receipt page, so the retrieved hit fragment is incomplete.
- Phenomenon: There is an answer but the citation array is empty, or the citation fragment does not match the original text. Cause: No material was hit in this round, or the hit material is inconsistent with the record the question points to; trimming occurs after the hit, not before the hit.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and footnote markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. Check the number of citations and the `quoteList` field in `responseData`, record the array length and the `quoteMaxToken` budget, and do not compare the two for equality.

Business test: use a real record to find fields inconsistent with the ledger, verify item by item the name, quantity, date, signature, and receipt in the business cooperation agreement, advertising review form, and distribution cooperation materials, form a discrepancy list, submit it to the reviewer for confirmation, and write it back.

- Turn on citation footnote markers, check item by item against the source documents whether the citation fragments can be traced back to the original paragraphs, and record the fragments and source identifiers that do not match
- Run a trial with a question that has no matching materials, confirm that the citation array is empty while the output chain continues, and separately record the number of array entries and the `quoteMaxToken` budget

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
