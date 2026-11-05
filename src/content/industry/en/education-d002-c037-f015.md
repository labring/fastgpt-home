---
title: Knowledge Base Retrieval for Vocational Training Subsidy Applications: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c037-f015
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Retrieval | Checks
meta_description: Training Subsidies: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational Training Subsidy Applications: Compare Documents and Locate Differences

## What this category's data looks like

This category's data looks like this: Vocational training subsidy applications involve three types of materials: training class filing, attendance records, and completion assessment forms. Class filing is submitted by the training institution before the class starts, and includes the training occupation name, class start date, student roster, and the signature of the person in charge; attendance records are generated daily and include student name, attendance date, and the student's own signature; completion assessment forms are compiled after the assessment and include student name, assessment subject, score, and assessor signature. The three types of materials update at different rhythms: filing precedes training, attendance is generated in class, and assessment forms are added after completion, so fields must be aligned item by item in name, quantity, date, and signature. When the materials enter the knowledge base retrieval service, each is recalled as an independent fragment, used to locate field discrepancies for the same record across different materials and to provide candidate evidence for subsequently generating a discrepancy list.

## Configuration and implementation checks

Configuration and implementation checks: The knowledge base retrieval service (retrieval node and search test) only outputs candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming); the discrepancy list must be continued by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing | Check whether the name, class start date, and signature of the person in charge are consistent with the ledger | Recall by occupation name and date in the search test, record the number of candidates and scores, and verify the signature field |
| Attendance records | Check whether student name, attendance date, and the student's own signature are aligned day by day | Switch `searchMode` to hybrid mode for recall, and compare the attendance fields of the same student on different dates |
| Completion assessment form | Check whether student name, assessment subject, and assessor signature correspond to the filing roster | After enabling rerank, take the top few candidates, verify the assessment subject and signature, and record the `similarity` score |
| Ledger record | Check whether the name, quantity, and date of the same record are consistent across the two types of materials | Use one real record to retrieve the two types of materials separately, compare candidate fragment fields, and mark inconsistent items |

## Three common errors

- Symptom: The same student's name is written differently in the attendance records and the completion assessment form. Cause: Entry was not unified according to the filing roster, versions were not synchronized, and fields do not match after recall.
- Symptom: The number of students in the class filing is inconsistent with the cumulative number of people in the attendance records. Cause: Mid-course additions or withdrawals were not written back to the filing, the two material versions are not synchronized, and the discrepancy is carried into the candidates.
- Symptom: The completion assessment form lacks the assessor's signature or receipt. Cause: The signature field was omitted when adding records after the assessment, and the fragments returned by retrieval cannot support review confirmation.

## How to verify the setup

How to verify the setup: Acceptance for this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ordering of the top few; record the number of candidates and scores, verify the order changes before and after the `usingReRank` switch, and check the returned results under the `limit` and `similarity` values.

Business test: Use one real record to find fields inconsistent with the ledger, hand them to the reviewer for confirmation, and write them back.

- In the search test, switch retrieval modes, compare the number of candidates and scores for the same question, and record the fragment containing the discrepant field.
- Take the top few candidates before and after enabling rerank, verify the name, quantity, date, and signature fields, mark inconsistent items, and hand them to the reviewer.
