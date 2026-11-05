---
title: Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c048-f010
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Citations | Review
meta_description: Joint Education: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the establishment and annual report scenarios of Chinese-foreign cooperative education institutions. Materials include establishment applications, cooperation agreements, articles of association, as well as annual report receipts and signature pages. The establishment application carries fields such as institution name, education level, cooperating parties, proposed majors, and dates; the cooperation agreement carries the names of both parties, contribution amounts, validity period, and signing date; the articles of association carry the governance structure, decision-making procedures, and signature fields. When the three types of materials enter knowledge base retrieval, each is split and indexed as an independent source, and cited snippets point back to specific paragraphs. In terms of update cadence, establishment-stage materials are uploaded in batches as approval progresses, while annual report materials are submitted annually and may replace older versions; when versions are not synchronized, the same field may have different values across different materials. Field characteristics are concentrated in four categories: names, quantities, dates, and signatures. When signatures or receipts are missing, record completeness is impaired, and tracing requires returning to the original paragraphs for comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. Even if no content is retrieved, the output pipeline still runs through. The "exception list and review conclusions" are completed afterward by subsequent AI nodes, code nodes, or manual work; the citation array itself is not a discrepancy list or ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Whether the name, date, and signature fields are consistent with the cooperation agreement and articles of association | Open the citation markers one by one, compare them against the source document paragraphs, and record inconsistent fields and the materials in which they appear |
| Cooperation agreement | Whether the cooperating party names, contribution amounts, and validity period match the articles of association and application | Check the number of citations and the matched materials, verify whether the cited text is complete under the `quoteMaxToken` budget, and record the array length separately |
| Articles of association | Whether the governance clauses, decision-making procedures, and signature fields are synchronized with the application and agreement | Compare version dates and signature pages; when signatures or receipts are missing, mark them in the review conclusions as pending supplementation |
| Annual report receipt | Whether the receipt date and submitted fields correspond to the material version for that year | Use the citation array in `responseData` (non-streaming module results returned with detailed output enabled) to point back to the original text and confirm that the cited snippets match the original paragraphs |

## Three common errors

- Phenomenon: The same institution name is written differently in the establishment application and the cooperation agreement. Cause: The two materials were drafted by different cooperating parties, and field alignment was not performed.
- Phenomenon: Contribution amounts or dates do not match across the two materials. Cause: Versions were not synchronized, and the old version remains in the knowledge base and is hit by retrieval.
- Phenomenon: Cited snippets do not match the original text, and there are no citation markers in the answer. Cause: First check whether this round hit anything and which material was hit, then look at truncation; do not directly attribute it to length truncation.

## How to verify the setup

Acceptance of this feature: ask a question that has source support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: create an exception record, see whether the source material can be traced, and record the citation sources and signature status in the review conclusions.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item; run a test with a query that has no matching materials, and see whether the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
