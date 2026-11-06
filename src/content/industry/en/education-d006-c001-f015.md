---
title: Knowledge Base Retrieval for Daily Kindergarten Care Management: Track Progress and Check Statistics
slug: /en/industry/education-d006-c001-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Retrieval | Progress
meta_description: Kindergarten Care: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Daily Kindergarten Care Management: Track Progress and Check Statistics

## What this category's data looks like

Kindergarten childcare daily life management operates around three types of materials: daily life schedules, morning and afternoon check records, and child health observation records. The daily life schedule provides time periods and activity segments; the morning and afternoon check records register attendance, body temperature, and abnormalities by date; the health observation records supplement observation items such as water intake, meals, naps, mood, and bowel movements, with signatures or receipts attached. Materials are produced daily and summarized weekly, with fields including child name, class, date, activity segment name, quantity, abnormality description, and signature. When entering knowledge base retrieval and recall, the three types of materials are each split and indexed as independent sources; the schedule provides the activity segment definitions, the morning and afternoon check records provide the attendance and abnormality baseline, and the health observation records provide process details. Together, the three support progress records and statistical verification.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and limit trimming). The "progress table and statistical definition description" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Fields include time period, activity segment, responsible person, and date, and match the activity segment names and dates in the morning and afternoon check records | In the search test, search by activity segment name, check whether the date and signature fields of the candidate chunks are complete, and record the number of candidates and scores |
| Morning and afternoon check records | Fields include child name, class, date, attendance, and abnormality description, and match the quantities and dates in the health observation records | Test once each with synonymous questions, compare candidates and scores, and check whether the names and quantities in the two materials are consistent |
| Child health observation records | Fields include observation items, quantities, abnormality description, and signature, and the version is synchronized with the schedule | Switch `searchMode` to semantic, full-text, and hybrid, and compare candidates; toggle re-ranking to see the ordering of the top few entries, and confirm that key chunks are still present after `similarity` filtering |
| Knowledge base retrieval service | Outputs candidate chunks and similarity scores, after merge, re-rank, filter, and limit trimming | Check the order before and after toggling `usingReRank`, record the number of candidates and scores, and record the tokens of the cited text and the number of array entries separately |

## Three common errors

- Symptom: The activity segment names, quantities, and dates of the same record do not match between the schedule and the morning and afternoon check records. Cause: The two materials are indexed separately and fields are not aligned to the same definition.
- Symptom: The version of the health observation records is not synchronized, and the retrieved chunks are inconsistent with the current schedule. Cause: After updating, they were not re-split and re-indexed, and old chunks are still being recalled.
- Symptom: The morning and afternoon check records lack signatures or receipts, making it impossible to confirm during statistical verification. Cause: The signature field was not checked when archiving the materials, and the retrieval candidates also lack this field.

## How to verify the setup

Feature acceptance: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle re-ranking to see the ordering of the top few entries; switch `searchMode` and `similarity`, `limit`, `usingReRank`, and record the number of candidates and scores.

Business test: Use one week of records to verify the totals, and check whether the definitions and exceptions are clearly written.

- Verify the names, quantities, and signature fields of the schedule, morning and afternoon check records, and health observation records one by one by date and class.
- In the search test, switch `searchMode`, compare the number of candidates and scores for semantic, full-text, and hybrid, and record the tokens of the cited text.
