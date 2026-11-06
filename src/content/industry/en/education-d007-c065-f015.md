---
title: Knowledge Base Retrieval for Laboratory Hazardous Chemical Purchasing and Records: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c065-f015
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Retrieval | Review
meta_description: Lab Chemicals: review retrieval for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Laboratory Hazardous Chemical Purchasing and Records: Trace Exceptions and Review Results

## What this category's data looks like

Materials in the laboratory hazardous chemical procurement and ledger category include three core sources: hazardous chemical procurement applications, issuance registrations, and inventory ledgers. Procurement applications record product name, specification, quantity, application date, and approval signature; issuance registrations record the recipient, issued quantity, issuance date, and custodian signature; inventory ledgers record the balance quantity, inbound/outbound dates, and inventory count signature. The three materials are updated by batch and in chronological order, and differences are most likely to appear in four places: name, quantity, date, and signature. When entering the knowledge base retrieval service, procurement applications and issuance registrations serve as the baseline for anomaly comparison, while inventory ledgers serve as the balance reference. Each is recalled in fragment form for subsequent nodes or manual review to locate the correspondence and differences of the same record across the three materials.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The "anomaly list and review conclusions" are completed by subsequent nodes or manual review.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemical procurement application | Product name, specification, quantity, application date, and approval signature should be consistent with the corresponding record in the issuance registration | In the search test, switch `searchMode`, use the product name and date from the procurement application to recall candidates respectively, and check the `similarity` score and fragment content |
| Issuance registration | Issued quantity, issuance date, and custodian signature should correspond to the inbound/outbound records in the inventory ledger | Use the quantity and date from the issuance registration to construct a query, compare the order of the top few candidates before and after enabling rerank, and check the impact of `usingReRank` on sorting |
| Inventory ledger | Balance quantity, inbound/outbound dates, and inventory count signature should match the cumulative results of the procurement application and issuance registration | Use the balance quantity and date from the inventory ledger to recall, view the number of returned candidates, and separately record the array length and the tokens of the referenced text |
| Anomaly list and review conclusions | Each anomaly must be supported by the original records, and can only be handed over to the responsible person for handling after the reviewer signs | From the candidate fragments, locate the original text of the three materials corresponding to the anomalous record, and confirm that differences in all four places—name, quantity, date, and signature—have a source |

## Three common errors

- Phenomenon: The same hazardous chemical has different name spellings in the procurement application and issuance registration, so recalled candidates do not match. Cause: terminology in the materials is not unified, and the retrieval mode does not match the material form.
- Phenomenon: The inventory ledger version is not synchronized, and the balance quantity is inconsistent with the cumulative result of the issuance registration. Cause: ledger updates lag, and candidate fragments come from an old version of the materials.
- Phenomenon: The issuance registration lacks a custodian signature or the procurement application lacks a receipt, so the anomalous record cannot be closed. Cause: signature and receipt fields are missing, and the review conclusion lacks support from the original records.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten queries, compare candidates and scores, then toggle rerank on and off to observe the order of the top few results; switch `searchMode` to observe differences between semantic and full-text candidates, record the `similarity` score and number of candidates, check the order changes before and after enabling `usingReRank`, verify only the tokens of the referenced text for the citation limit, and record the array count separately.

Business test: create an anomalous record, see whether it can be traced back to the source materials, and confirm that differences in all four places—name, quantity, date, and signature—are supported by the original records.

- In the knowledge base search test, use the product names and dates from the three materials—procurement application, issuance registration, and inventory ledger—to recall separately, and compare the name, quantity, date, and signature fields of the same record across the three materials.
- Check the recalled candidates one by one against the original records, confirm that each difference in the anomaly list has a source, and after the reviewer signs, hand it over to the responsible person for handling.
