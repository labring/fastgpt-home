---
title: Knowledge Base Retrieval for New Employee Onboarding and Training: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c040-f015
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Retrieval | Checks
meta_description: Employee Onboarding: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for New Employee Onboarding and Training: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the corporate new employee onboarding training scenario. Materials come from three types of documents: onboarding training plans, course sign-in sheets, and job descriptions. They are updated in batches by the training, HR, and hiring departments, in sync with onboarding batches. Field characteristics include name, course name, planned date, sign-in date, signature or acknowledgment status, job title, and responsibility ID. When materials enter the knowledge base retrieval and recall function, the onboarding training plan serves as the master ledger, the course sign-in sheet serves as the execution record, and the job description serves as the job baseline; the three use the same object as the anchor and respectively assume the comparison roles of plan, sign-in, and job criteria.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The discrepancy list is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Whether the course name, planned date, and signature status in the plan are consistent with the sign-in sheet | In the search test, retrieve using a combination of course name and date, switch `searchMode` to compare candidates, and record the number of candidates and scores |
| Course sign-in sheet | Whether the name, sign-in date, quantity, and acknowledgment in the sign-in records match the plan | Retrieve using the same name and course name, compare the order of the top few results before and after enabling `usingReRank`, and check the date and signature fields in the candidate chunks |
| Job description | Whether the job title, responsibility ID, and job criteria in the plan are the same version | Retrieve using the job title, observe whether candidates retain key original text chunks after `similarity` filtering, and separately record the cited text tokens and array count |
| Discrepancy list | Whether the name, quantity, and date of the same object are consistent across the two materials | Compare the candidate chunks field by field against the ledger, write inconsistent fields into the discrepancy list for the reviewer to confirm and write back |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match across the two materials. Cause: The plan and sign-in sheet are updated in different batches, and fields are not aligned to the same object.
- Symptom: Versions are not synchronized, and the job description and plan criteria are inconsistent. Cause: Materials are maintained separately, lacking unified version markers and write-back confirmation.
- Symptom: Signatures or acknowledgments are missing, but candidate chunks are still recalled. Cause: Retrieval only outputs candidates and scores; signature status must be determined manually in the discrepancy list.

## How to verify the setup

This feature acceptance: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ordering of the top few results; at the same time, switch `searchMode` and observe changes in the number of candidates and scores after `similarity` filtering.

Business test: Use one real record to find fields inconsistent with the ledger, write them into the discrepancy list for the reviewer to confirm and write back.

- In the search test, retrieve the same object using two phrasings, record the number of candidates and scores, and separately record the cited text tokens and array count.
- Compare the ordering of the top few results before and after enabling `usingReRank`, check the name, quantity, date, and signature fields in the candidate chunks, and write inconsistent fields into the discrepancy list.
