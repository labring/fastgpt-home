---
title: Knowledge Base Retrieval for Laboratory Hazardous Chemical Purchasing and Records: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c065-f015
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Retrieval | Access
meta_description: Lab Chemicals: review retrieval for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Laboratory Hazardous Chemical Purchasing and Records: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on laboratory hazardous chemical procurement and ledgers, covering three types of materials: hazardous chemical procurement applications, requisition registrations, and inventory ledgers. Procurement applications include product name, specification, quantity, application date, and approval signature; requisition registrations include requisitioner, requisitioned quantity, requisition date, purpose, and receipt; inventory ledgers include balance quantity, inbound/outbound dates, and custodian signature. Materials are updated by batch and by month, and the latest signed document prevails as the version. When entering the knowledge base retrieval service, procurement applications, requisition registrations, and inventory ledgers each participate in recall as independent segments, respectively assuming the roles of application basis, circulation voucher, and balance verification. Retrieval results only provide candidate segments and similarity scores, and do not directly generate authorization scopes or external entry points.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate segments and similarity scores (after mode, merge, rerank, filter, and upper-limit trimming). "External entry points and authorization scopes" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemical procurement application | Whether the product name, specification, quantity, application date, and approval signature are complete | In the search test, switch `searchMode`, and check whether the names, quantities, and dates in the application segments and ledger segments are consistent |
| Requisition registration | Whether the requisitioner, requisitioned quantity, requisition date, purpose, and receipt signature correspond | Test once each with synonymous questions, observe the number of candidates and scores, and check whether segments with missing receipts are recalled |
| Inventory ledger | Whether the balance quantity, inbound/outbound dates, and custodian signature match the application and requisition records | Compare the ranking of the top few items before and after enabling `usingReRank`, and check the key original text segments retained after `similarity` filtering |
| External service entry point | Whether the visitor identity matches the visible scope, and whether unauthorized access is invisible | Access once with a restricted identity, check whether the visible scope matches the setting, and record the number of citations and cited text tokens |

## Three common errors

- Phenomenon: The name, quantity, and date of the same hazardous chemical do not match across two materials. Cause: The versions of the procurement application and requisition registration are not synchronized, and the retrieval segments are recalled independently.
- Phenomenon: The requisition registration lacks a signature or receipt, but the ledger shows it has been requisitioned. Cause: The materials are updated at different paces, and old-version segments are still recalled and ranked at the top.
- Phenomenon: There are many candidates, but the ones ranked at the top are irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and rerank or similarity filtering trimming is not enabled or is excessive.

## How to verify the setup

Acceptance for this feature: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few items; record `searchMode`, `similarity`, `usingReRank`, and the number of citations.

Business test: Access once with a restricted identity, check whether the visible scope matches the setting, and verify and record cited text tokens and array counts separately.

- In the search test, switch `searchMode`, and compare candidate segments and similarity scores under the three modes: semantic, full-text, and hybrid.
- Compare the order of the top few items before and after enabling `usingReRank`, and check the tokens and array counts of the cited text after `similarity` filtering.
