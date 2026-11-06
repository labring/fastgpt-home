---
title: Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c021-f015
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Retrieval | Checks
meta_description: Graduation Eligibility: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of student status changes and graduation eligibility review. Materials include leave/resumption applications, major transfer applications, and graduation review checklists, sourced from academic affairs system exports, scanned documents submitted by departments, and historical ledgers. The update cadence of such materials follows semester batches, with fields concentrated on name, student ID, change type, change date, course count, signature, and receipt. When entering knowledge base retrieval, leave/resumption applications and major transfer applications serve as the original evidence for change facts, while graduation review checklists serve as the baseline for ledger comparison. The three types of materials each form candidate snippets for subsequent verification of whether name, count, date, and signature are consistent.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave/resumption application | Whether name, change date, and signature are consistent with the ledger | In the search test, switch `searchMode`, use name plus change type for recall, record the number of candidates and `similarity` scores, and verify the signature field and receipt |
| Major transfer application | Whether name, count, and date match the graduation review checklist | Before and after enabling `usingReRank`, observe the order of the top few results each time, and compare the transferred-to major, course count, and effective date |
| Graduation review checklist | Whether the version is synchronized, missing signature or receipt | Test once each with synonymous questions, see whether candidates cover two versions of the same record, and check the tokens and array length of the referenced text after `limit` trimming |
| Knowledge base retrieval service | Whether candidate snippets and similarity scores are reproducible | Repeat retrieval with a fixed question, record the number of candidates and scores, and confirm that the multi-path merged results include both semantic and full-text sources |

## Three common errors

- Phenomenon: The change date for the same record does not match between the leave/resumption application and the ledger. Cause: The two material versions are not synchronized, and the old version remains in the knowledge base.
- Phenomenon: The course count is inconsistent between the major transfer application and the graduation review checklist. Cause: Candidate recall only hit one material and did not cover the other.
- Phenomenon: The graduation review checklist is missing a signature or receipt. Cause: The scanned document was not completed, and the referenced snippet returned by retrieval does not include the signature field.

## How to verify the setup

Acceptance of this feature: Test once each with synonymously rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` to observe the ranking of the top few results, and record the number of candidates and the tokens of the referenced text after `limit` trimming.

Business test: Use a real record to find fields inconsistent with the ledger, submit to the reviewer for confirmation, and write back.

- In the search test, initiate retrieval for the same record using name, student ID, and change type respectively, record the number of candidates and scores, and mark the materials not covered.
- For the hit snippets, verify name, count, date, and signature field by field, write discrepancies into the discrepancy list, and note the source material and version.
