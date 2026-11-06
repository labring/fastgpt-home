---
title: Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c038-f015
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Retrieval | Versions
meta_description: Continuing Education: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Continuing Education Training Hour Recognition: Maintain Document Versions and Changes

## What this category's data looks like

Continuing education credit recognition materials usually consist of course filing forms, study certificates, and credit recognition forms, with fields covering course name, credit hours, study start and end dates, signatures, and receipts. Course filing forms come from the filing stage of the educational institution, study certificates are issued by the teaching provider, and credit recognition forms are compiled by the recognizing unit. The update cadence changes with course batches, policy adjustments, and supplementary receipts. When these three types of materials enter the knowledge base retrieval and recall function, they respectively assume the roles of course basis, learning facts, and recognition conclusion. During retrieval, the retrieval mode must be matched to the material form, and the traceable relationship between the current version and old versions must be retained to allow citation synchronization.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit trimming). The "version ledger and change records" are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Fields include course name, credit hours, filing date, and signature, and must be aligned item by item with the study certificate | In the search test, switch `searchMode`, compare semantic, full-text, and hybrid recall candidates, and check whether the filing form fields are consistent with the study certificate |
| Study certificate | Name, quantity, and date must correspond to the credit recognition form; missing signature or receipt is regarded as inconsistent | Retrieve once each with synonymous questions, check the number of candidates and the `similarity` score, and confirm whether key chunks are retained |
| Credit recognition form | The recognition conclusion must be consistent with the current version, old versions must be traceable, and citations must be synchronized | Compare the top few rankings before and after enabling `usingReRank`, and check the cited text tokens and array count separately |
| Version ledger and change records | The current version is unique; after changing one piece of content, the version number and citations are updated synchronously | After trimming by `limit` in the knowledge base search test, check the number of candidates and the completeness of the cited content |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the course filing form and the study certificate. Cause: The two materials are maintained separately, without field-level alignment and receipt verification.
- Symptom: The credit recognition form has been updated, but the old version is still retrieved and cited. Cause: The version ledger is not synchronized, the current version is not unique, and the traceability relationship of old versions is missing.
- Symptom: The study certificate lacks a signature or receipt, but the recognition form has already been compiled. Cause: Before the materials enter retrieval, the signature and receipt fields were not verified, and the candidate chunks do not cover the key paragraphs.

## How to verify the setup

This function acceptance: test once each with synonymously rewritten questions, compare the number of candidates and the `similarity` score, then toggle rerank to observe the ranking of the top few, and check the cited text tokens under `searchMode` and `limit`, recording the array count separately.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- In the knowledge base search test, switch `searchMode`, compare semantic, full-text, and hybrid recall candidates, and confirm that the material form matches the mode.
- Compare the order of the top few before and after enabling `usingReRank`, check the cited text tokens after `similarity` filtering and `limit` trimming, and record the array count separately.
