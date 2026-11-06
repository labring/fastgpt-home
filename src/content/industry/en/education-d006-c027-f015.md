---
title: Knowledge Base Retrieval for Graduate Employment Contracts and Destination Statistics: Track Progress and Check Statistics
slug: /en/industry/education-d006-c027-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Retrieval | Progress
meta_description: Graduate Destinations: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Employment Contracts and Destination Statistics: Track Progress and Check Statistics

## What this category's data looks like

The materials for progress records and statistical verification of university employment contract signing and graduation destination statistics come from employment agreements, graduation destination registration forms, and employer certificates, with progress tables and statistical scope descriptions updated weekly. Employment agreements provide signing entity and date fields, graduation destination registration forms provide destination category and registration status fields, and employer certificates provide acceptance opinion and receipt fields. When these three types of materials enter the knowledge base retrieval service, they serve as sources of candidate snippets; the retrieval node only outputs candidate snippets and similarity scores, while progress tables and statistical scope descriptions are completed by subsequent nodes or manually. Field characteristics include signature fields, date fields, name fields, and quantity fields; the update rhythm is weekly aggregation, and the version is based on the latest receipt.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). Progress tables and statistical scope descriptions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | The signing entity name, signing date, and signature field must be consistent with the registration form, and receipts must be complete | In the knowledge base search test, switch `searchMode`, use synonymous questions to retrieve agreement snippets, compare the number of candidates and `similarity` scores, and verify the name and date fields |
| Graduation destination registration form | The destination category, registration status, and date must correspond to the agreement and employer certificate, and versions must be synchronized | Compare the top few rankings before and after enabling `usingReRank`, check whether the registration form snippets cover the quantity and date of the same record, and record the number of candidates |
| Employer certificate | The acceptance opinion, receipt signature, and date must be consistent with the agreement and registration form; missing signatures must be marked as exceptions | Use full-text recall to retrieve certificate snippets, verify the receipt and signature fields, adjust `limit` to observe the cited text tokens and array count, and record them separately |
| Progress table and statistical scope description | The recorded count and statistical count must match, the scope must be written in the header, and exceptions must be clearly stated | Use one week's records to verify the totals, check whether the header scope and exception notes are complete, and confirm the source against candidate snippets and scores |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the agreement and the registration form. Cause: The two materials are entered separately and versions are not synchronized, so retrieval candidates do not cover all fields of the same record.
- Phenomenon: Employer certificates lack signatures or receipts but are still counted in statistics. Cause: Materials are not fully collected, the progress table does not mark exceptions, and retrieval snippets do not highlight missing signature fields.
- Phenomenon: There are many candidates but the top-ranked ones are irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too loose.

## How to verify the setup

Acceptance for this feature: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank to observe the top few rankings; switch `searchMode` and adjust `limit`, record the number of candidates and `similarity`, and record cited text tokens and array count separately.

Business test: Use one week's records to verify the totals, check whether the scope and exceptions are clearly stated, check whether the progress table's recorded count and statistical count match, and whether the header states the scope.

- In the knowledge base search test, switch `searchMode`, use synonymous questions to retrieve agreements and registration forms, compare the number of candidates and `similarity` scores, and verify the name, quantity, and date fields.
- Compare the top few rankings before and after enabling `usingReRank`, adjust `limit` to observe cited text tokens and array count, and check whether exceptions for missing signatures or receipts are marked.
