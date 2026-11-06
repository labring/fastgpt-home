---
title: Citations and Source Traceability for Academic Journal Business Partnerships: Track Progress and Check Statistics
slug: /en/industry/education-d006-c070-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Partnerships | Citations | Progress
meta_description: Journal Partnerships: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Journal Business Partnerships: Track Progress and Check Statistics

## What this category's data looks like

Academic journal business cooperation management involves three types of materials: business cooperation agreements, advertising review forms, and distribution cooperation materials. Business cooperation agreements state the partner name, revenue-sharing basis, signing date, and signatures of both parties; advertising review forms record the advertiser, issue period, number of pages, and review receipt; distribution cooperation materials register the distribution channel, print run, settlement cycle, and receipt evidence. The three types of materials are updated weekly or monthly, and their field characteristics fall into four categories: name, quantity, date, and signature. After entering the knowledge base retrieval node, the three types of materials are retrieved as original text fragments in the associated knowledge base, each serving the role of source identifier: agreements provide the cooperation framework and basis, review forms provide individual advertising records, and distribution materials provide the channel and quantity basis. When fields are inconsistent, the original text fragment back-reference shall prevail.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. Even if no content is found, the output chain will still complete. The "Progress Table and Statistical Basis Description" is completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Business cooperation agreement | Whether fields, dates, and signatures are complete; whether the name, quantity, and date are consistent between the two materials | Open the citation marker to back-reference the original agreement text, verify the signing date and signatures of both parties; record the number of citations |
| Advertising review form | Whether the advertiser, issue period, number of pages, and review receipt correspond; whether versions are synchronized | Compare against the original text fragment of the review form, verify the issue period and number of pages; check whether the receipt is missing |
| Distribution cooperation materials | Whether the distribution channel, print run, settlement cycle, and receipt evidence are complete; missing signature or receipt | Back-reference the original distribution materials, verify the print run and receipt evidence; confirm the citation source identifier |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model; the cited content is output as an array, and the length may be 0 | Verify the selected collection and vector model; run a test with a non-matching question and see whether the array is empty while the chain continues |

## Three common errors

- Phenomenon: The name and quantity of the same record do not match between the agreement and the review form. Cause: The two materials are maintained separately, and no field-level comparison has been made.
- Phenomenon: The version of the distribution materials is not synchronized, resulting in two sets of print runs and settlement cycles. Cause: The update rhythms differ, and the old version remains in the knowledge base.
- Phenomenon: The review form lacks a signature or receipt, and the cited fragment cannot back-reference the complete original text. Cause: The scanned copy is incomplete, and the source identifier points to a missing page.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and verify whether the citation array and markers can back-reference the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain completes. Check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifier in `quoteList`; `quoteMaxToken` is the citation content budget, and the number of array items is recorded separately.

Business test: use one week of records to verify the totals, see whether the basis and exceptions are clearly stated, and whether the number of records matches the statistical count.

- In the node, verify the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item.
- Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, and check the citation markers against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
