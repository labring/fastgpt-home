---
title: Knowledge Base Retrieval for Graduate Employment Contracts and Destination Statistics: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c027-f015
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Retrieval | Review
meta_description: Graduate Destinations: review retrieval for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Graduate Employment Contracts and Destination Statistics: Trace Exceptions and Review Results

## What this category's data looks like

The raw materials for this category of university employment signing and graduation destination statistics are mainly three types: employment agreements, graduation destination registration forms, and employer certificates. They are usually collected in batches by cohort and department, updated centrally once per cohort, with supplementary entries and re-signings inserted at any time. Employment agreements focus on the signing parties, position, and seals; graduation destination registration forms focus on destination category, employer name, and date; employer certificates focus on acceptance intent and receipt. When these three types of materials enter the knowledge base retrieval service, each serves as an independent fragment source and can be recalled by field, used to compare whether the name, quantity, date, and signature of the same record are consistent, and to provide original record support for anomaly tracing.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The anomaly list and review conclusions are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | The signing parties' names, position, signing date, and seals must be consistent with the registration form | In the search test, search using employer name plus cohort, record the number of candidates and scores, and check the seal position in the original text |
| Graduation destination registration form | The destination category, employer name, quantity, and date must match the agreement | Switch `searchMode` to hybrid mode, compare semantic and full-text candidates, and see whether the same record is hit by both |
| Employer certificate | The acceptance intent, receipt, and signature date must be synchronized with the registration form version | Compare the order of the top few results before and after enabling `usingReRank`, and check whether the certificate fragment is ranked at the front |
| Anomaly record | Supported by original records and signed by the reviewer | After filtering by `similarity`, take candidates, check the tokens of the cited text and the number of array entries, and record them separately |

## Three common errors

- Phenomenon: The employer name and signing date for the same graduate do not match between the agreement and the registration form. Cause: The two materials were entered in batches without field-level comparison, and retrieval only recalls by fragment.
- Phenomenon: The registration form has been re-signed, but the employer certificate is still the old version. Cause: The versions were not synchronized, and the old fragment remains in the knowledge base and is recalled as a candidate.
- Phenomenon: The agreement lacks a signature or the certificate lacks a receipt, yet the anomaly list is still generated. Cause: The review only looks at candidate scores and does not return to the original text to check the seal and receipt positions.

## How to verify the setup

Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and similarity scores, then toggle rerank on and off to see the ordering of the top few results; also record the number of candidates and the tokens of the cited text.

Business test: create an anomaly record and see whether it can be traced back to the source material.

- Search using a combination of employer name, cohort, and date, and check whether the candidate fragments cover the three types of materials: agreements, registration forms, and certificates.
- For the same record, switch retrieval modes and toggle rerank on and off separately, record changes in the number of candidates and scores, and confirm that key fragments have not been trimmed out.
