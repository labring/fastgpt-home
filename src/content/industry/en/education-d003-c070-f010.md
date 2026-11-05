---
title: Citations and Source Traceability for Academic Journal Business Partnerships: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c070-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Partnerships | Citations | Intake
meta_description: Journal Partnerships: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Journal Business Partnerships: Handle Questions and Collect Missing Information

## What this category's data looks like

Academic journal business cooperation management involves three types of materials: business cooperation agreements, advertising review forms, and distribution cooperation materials. Business cooperation agreements record the partner name, cooperation period, distribution quantity, revenue-sharing ratio, and signatures of both parties; advertising review forms record the advertiser, issue period, advertising content, review opinion, and reviewer signature; distribution cooperation materials record distribution channels, coverage scope, distribution quantity, receipts, and dates. The three types of materials play different roles during inquiry intake: business cooperation agreements are used to verify the cooperation entity and authorization boundaries, advertising review forms are used to verify advertising publication compliance, and distribution cooperation materials are used to verify distribution quantity and receipts. Materials are updated by issue period or contract cycle, and their field characteristics are that multiple versions coexist, signature fields and receipt fields are prone to be missing, and the name, quantity, and date of the same record may be inconsistent across different materials. When materials enter the knowledge base retrieval node, they are retrieved as citation sources, outputting a cited content array for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each item containing an original text snippet and a source identifier, and the length can be 0. The "intake record and items to be completed" is then handled by subsequent AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Business cooperation agreement | Check whether the partner name, cooperation period, distribution quantity, revenue-sharing ratio, signatures of both parties, and date are complete, and whether the name, quantity, and date of the same record are consistent between the agreement and the distribution cooperation materials | In the knowledge base retrieval node, view the cited content array, trace each item back to the original paragraph, and check the agreement signature field and date field; use `responseData` (non-streaming module results returned with detailed output enabled) to view the node output structure, and use `quoteList` to expand a single citation source |
| Advertising review form | Check whether the advertiser, issue period, advertising content, review opinion, reviewer signature, and date are complete, and whether the name, quantity, and date of the same advertising record are consistent between the review form and the business cooperation agreement | In the conversation, open the citation marker, compare it with the original text of the advertising review form, and check the review opinion and signature field; confirm that the cited snippet matches the original text, and record the number of citations |
| Distribution cooperation materials | Check whether the distribution channels, coverage scope, distribution quantity, receipts, and date are complete, whether the version is synchronized with the current issue period, and whether receipts are missing | Run a trial with a question that has no matching materials, and see that the cited content array is empty while the chain continues; use `quoteMaxToken` to check the tokens budget for the cited text, and record the number of array items separately |

## Three common errors

- Phenomenon: The same partner name is written differently in the business cooperation agreement and the distribution cooperation materials, and the quantity and date also do not match. Cause: The two materials were entered in different steps, and no field comparison was performed.
- Phenomenon: The advertising review form lacks the reviewer signature or receipt, and the distribution cooperation materials lack receipts. Cause: The signature and receipt steps were not closed-loop, and completeness was not verified when the materials were archived.
- Phenomenon: There is no citation marker in the answer, or the cited snippet does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis, check whether the cited content array and citation markers can trace back to the original text, and confirm that each citation can trace back to the original paragraph; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: ask a question missing key information, see whether it first follows up before answering, whether the missing item is identified and followed up, whether the answer has a material basis, and then transfer it to the handler.

- In the knowledge base retrieval node, check the selected collections and their vector models, and confirm that the selected knowledge bases use the same vector model; open the search parameter panel and check the values item by item.
- Run a trial with a question that has no matching materials, and record the length of the cited content array; use `quoteMaxToken` to check the tokens budget for the cited text, record the number of array items separately, and do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
