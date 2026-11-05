---
title: Citations and Source Traceability for Academic Journal Business Partnerships: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c070-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Partnerships | Citations | Review
meta_description: Journal Partnerships: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Journal Business Partnerships: Trace Exceptions and Review Results

## What this category's data looks like

Academic journal business cooperation management involves three core types of materials: business cooperation agreements, advertising review forms, and distribution cooperation materials. Business cooperation agreements record the partner name, cooperation term, revenue-sharing ratio, signing date, and signatures of both parties; advertising review forms record the advertiser, advertising content, review conclusion, review date, and reviewer signature; distribution cooperation materials record the distribution channel, distribution quantity, receipt date, and handler signature. The three types of materials are updated quarterly, and versions are synchronized with cooperation changes. When entering the citation sources and traceability function, the business cooperation agreement serves as the main record anchor, while the advertising review form and distribution cooperation materials serve as supporting materials, each retrieved and matched in the form of original text fragments, providing a traceable source basis for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The exception list and review conclusion are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Business cooperation agreement | Whether the partner name, cooperation term, revenue-sharing ratio, signing date, and signatures of both parties are complete, and whether they are consistent with the corresponding fields in the advertising review form and distribution cooperation materials | Open the citation marker to compare against the original paragraph, check the name, quantity, date, and signatures item by item, and record any inconsistencies |
| Advertising review form | Whether the advertiser, advertising content, review conclusion, review date, and reviewer signature are complete, and whether they match the partner name and date in the business cooperation agreement | Open the citation marker in the conversation, trace back to the original paragraph, and check whether the review date and signing date are consistent |
| Distribution cooperation materials | Whether the distribution channel, distribution quantity, receipt date, and handler signature are complete, and whether they match the revenue-sharing ratio and cooperation term in the business cooperation agreement | Check the quantity and date against the source document, check whether the receipt and signature are missing, and record whether the version is synchronized |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the output pipeline continues to work | Run a test with a question that has no matching materials, see whether the output is empty while the pipeline continues; check the `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` fields |

## Three common errors

- Phenomenon: The partner name, quantity, and date for the same record do not match between the business cooperation agreement and the advertising review form. Cause: The two materials were entered separately by different handlers and archived without cross-checking.
- Phenomenon: The version of the distribution cooperation materials is not synchronized, and the old distribution quantity is inconsistent with the new business cooperation agreement. Cause: After a cooperation change, only the main agreement was updated, and the supporting materials were not replaced in sync with the version.
- Phenomenon: The advertising review form lacks the reviewer signature, and the distribution cooperation materials lack the receipt. Cause: The review and distribution steps entered archiving without collecting all signatures and receipts according to the process.

## How to verify the setup

Acceptance of this function: ask a question with an original text basis, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline continues to work. Check the number of citations in `responseData` and the source identifier in `quoteList`; the number of citations is the array length, and `quoteMaxToken` is the citation content budget, and the two are not compared for equality.

Business test: create an exception record, see whether it can be traced back to the source material, and confirm that the exception is supported by the original record and, after the reviewer signs, is handed to the responsible person for handling.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base selected is a knowledge base with the same vector model, and check the selected collections and their vector models.
- Open the citation markers in the conversation, check item by item against the source document whether the cited fragments correspond to the original text, and record whether the number of items is consistent with the matched materials.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
