---
title: Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c045-f015
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Retrieval | Multilingual
meta_description: Training Compliance: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Off-Campus Training Registration and Compliance: Handle Multilingual Materials and Terminology

## What this category's data looks like

Off-campus training compliance filing and penalty response materials come from three types of texts: school operating licenses, course filing materials, and fee disclosure. They include approval receipts and signature pages, and are updated on a rolling basis with filing batches and rectification notices. Field characteristics: institution name, course name, number of class hours, fee items, effective date, signature and receipt number. In multilingual materials and terminology handling scenarios, the school operating license provides the entity's qualifications and permitted scope, course filing materials provide course entries and class-hour definitions, and fee disclosure provides amounts and refund rules; after the three enter the knowledge base, each becomes an independent retrieval source. The terminology list and the comparison draft need to keep the same term written consistently across these sources and be able to refer back to the original paragraphs.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The unified terminology list and comparison draft are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Institution name, permitted scope, effective date, and signature receipt should be consistent between the license and course filing materials | In the search test, switch `searchMode`, test once each with synonymous questions, record the number of candidates and scores, and check how the license fields and filing material fields are written |
| Course filing materials | Course name, number of class hours, and course start date should be consistent between the same filing batch and subsequent versions | Compare the ranking of the top few results before and after enabling `usingReRank`, check whether course entry candidates cover both semantic and full-text results, and check whether the quantities and dates match |
| Fee disclosure | Fee items, amount definitions, refund rules, and disclosure date should be consistent between the disclosure and filing materials | Adjust `similarity` to observe candidate changes, record the number of returned results according to `limit`, and check whether fee fields and signature receipts are synchronized |
| Terminology list and comparison draft | The same term should be written consistently throughout, and the translated name should be able to refer back to the original paragraph | Sample three terms and check their spelling throughout, check whether the candidate cited text retains key fragments of the original text, and record the citation array length and cited text tokens |

## Three common errors

- Phenomenon: The same institution name is written differently in the license and course filing materials. Cause: The terminology list was not unified when the two were entered, retrieval candidates hit different sources, and no cross-material comparison was performed.
- Phenomenon: The number of class hours and fee dates do not match between the disclosure and filing materials. Cause: Versions were not synchronized, the old disclosure was still recalled, and candidate snippets were not filtered by effective date.
- Phenomenon: Signature pages or receipts are missing, but candidate snippets are still returned as complete records. Cause: Scanned materials were not supplemented with signatures, retrieval only recalled by text similarity, and signature and receipt fields were not checked.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few results; record the number of candidates and scores, and check the return differences under `similarity`, `limit`, `searchMode`, and `usingReRank`.

Business test: sample three terms and check whether their spelling is consistent throughout, check whether the translated names can refer back to the original paragraphs, and confirm that the citation array length and cited text tokens are recorded separately.

- In the knowledge base search test, retrieve the same term once each with two question formulations, record the number of candidates and scores, and check whether the writing is consistent across the school operating license, course filing materials, and fee disclosure.
- Compare the order of the top few candidates before and after enabling rerank, check whether the hybrid retrieval results include both semantic and full-text sources, and check whether signature and receipt fields appear in the cited text.
