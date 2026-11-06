---
title: Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c014-f015
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Retrieval | Review
meta_description: Pastoral Education: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses school moral education and homeroom teacher work, and the materials come from themed class meeting plans, student comprehensive quality records, and home visit records. These materials are updated by semester and by month, and their fields include activity name, number of participants, date, and signature or receipt. When entering knowledge base retrieval and recall, themed class meeting plans provide activity design and sign-in requirements, student comprehensive quality records provide process evaluation and quantitative definitions, and home visit records provide time, subject, and receipt status. The three types of materials jointly support anomaly tracing: if the name, quantity, or date of the same record does not match across two materials, or if versions are not synchronized, or signatures and receipts are missing, it is necessary to return to the original records for verification. The retrieval service first splits the materials into candidate chunks and gives similarity scores, and on this basis staff form an anomaly list and review conclusions, which are then handed to the person in charge for handling.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), and outputs candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The anomaly list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Check whether the activity name, number of participants, date, and signature column are consistent with the student comprehensive quality records | In the search test, retrieve once each with synonymous questions, record the number of candidates and scores, and check whether the chunks returned under `searchMode` by semantic, full-text, or hybrid search contain the signature column |
| Student comprehensive quality records | Check whether the name, quantity, and date of the same record match the class meeting plan and home visit records | Search once each with rerank enabled and disabled, compare the order of the first few items before and after `usingReRank`, and check whether chunks with key fields are retained |
| Home visit records | Check whether the home visit date, subject, receipt status, and signature are complete, and whether versions are synchronized | Adjust `similarity` to observe changes in low-scoring candidates, and check the number of cited items after `limit` trimming and the completeness of key paragraphs in the original text |
| Anomaly list and review conclusions | Check whether each anomaly is supported by original records and whether the reviewer has signed | Trace from candidate chunks back to the source materials, record the number of items in the citation array, and separately check the token budget of the cited text |

## Three common errors

- Symptom: the same activity name is written differently in the class meeting plan and the student comprehensive quality records, and the date or number of participants does not match. Cause: the two materials are maintained separately, without field alignment and version synchronization.
- Symptom: home visit records lack signatures or receipts, yet the anomaly list is still generated. Cause: the review step only looks at retrieval candidates and does not return to the original records to check signature and receipt status.
- Symptom: when the same question is phrased differently, the key paragraphs cannot be recalled. Cause: the retrieval mode does not match the material form, or similarity filtering and citation limit trimming are too tight.

## How to verify the setup

This feature's acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to inspect the ordering of the first few items; at the same time record the number of candidates and scores, and check the effects of `searchMode`, `usingReRank`, `similarity`, and `limit`.

Business test: create an anomaly record, see whether it can be traced back to the source materials, and confirm that the anomaly list and review conclusions are supported by original records and signed by the reviewer.

- In the search test, retrieve the themed class meeting plan, student comprehensive quality records, and home visit records separately with synonymous questions, record the number of candidates and scores, and check whether chunks with key fields are complete.
- Search once each before and after enabling rerank, and compare the order of the first few items; adjust similarity and the citation limit, separately record the number of items in the citation array, and check the token budget of the cited text.
