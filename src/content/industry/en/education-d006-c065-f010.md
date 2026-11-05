---
title: Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Track Progress and Check Statistics
slug: /en/industry/education-d006-c065-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Citations | Progress
meta_description: Lab Chemicals: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Track Progress and Check Statistics

## What this category's data looks like

This page focuses on laboratory hazardous chemicals procurement and ledgers, and the materials come from three types of documents: hazardous chemicals procurement applications, usage registrations, and inventory ledgers. Procurement applications record the product name, specification, requested quantity, supplier, arrival date, and approval signature; usage registrations record the user, purpose, quantity used, date of use, and custodian signature; inventory ledgers record the balance quantity, inbound and outbound dates, handler, and review signature. When these three types of materials enter the knowledge base retrieval node, each serves as a traceable original-text source: procurement applications support procurement progress entries, usage registrations support consumption progress entries, and inventory ledgers support balance verification entries. The update cadence is weekly collection and monthly aggregation, and the field characteristics use product name, quantity, date, and signature as verification anchors; the name, quantity, and date of the same record in two materials need to be aligned item by item.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original-text snippet and a source identifier, and the length can be 0. The progress table and statistical scope description are completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazardous chemicals procurement application | Whether the product name, specification, requested quantity, arrival date, and approval signature match the inbound entries in the inventory ledger | Open the citation markers one by one in the citation array, trace back to the original paragraph in the procurement application, verify the fields and signature, and record the source identifier in `detail` |
| Usage registration | Whether the user, purpose, quantity used, date of use, and custodian signature match the outbound entries in the inventory ledger | Run a trial with one week of records, verify that the number of citation items matches the hit materials, and verify the original-text snippet of each citation in `responseData` (non-streaming module results returned with detailed output enabled) |
| Inventory ledger | Whether the balance quantity, inbound and outbound dates, handler, and review signature are consistent with both the procurement application and the usage registration | Open the search parameter panel and verify the values item by item; when the citation limit is involved, verify only the tokens of the citation text, and record the array item count separately |
| Progress table and statistical scope description | Whether the recorded count matches the statistical count, whether the scope is written in the header, and whether exceptions are clearly stated | Compare the weekly record total with the statistical count, put the scope and exceptions in the header, record the number of citation items by array length, and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record do not match between the procurement application and the inventory ledger. Cause: the two materials are entered separately and are not aligned item by item by product name, quantity, and date.
- Phenomenon: the versions of the usage registration and inventory ledger are not synchronized, and the cited snippets do not match the original text. Cause: after the materials are updated, they are not re-collected, and retrieval hits paragraphs from the old version.
- Phenomenon: the procurement application lacks an approval signature, and the usage registration lacks a custodian signature or receipt. Cause: signatures are not backfilled during document circulation, and the cited snippets cannot trace back to the complete original text.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support and verify whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline still runs through, that the number of citation items is recorded by array length, and that `quoteMaxToken` is only used as the citation content budget.

Business test: use one week of records to verify the total, check whether the scope and exceptions are clearly stated, whether the recorded count matches the statistical count, and whether the scope is written in the header.

- Open the citation markers, compare them with the source documents, verify item by item whether the cited snippets are consistent with the original paragraphs, and record `quoteList` and the source identifier.
- Run a trial with a question that has no matching materials, observe that the output is empty while the pipeline continues, and then verify whether the selected knowledge base uses the same vector model.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
