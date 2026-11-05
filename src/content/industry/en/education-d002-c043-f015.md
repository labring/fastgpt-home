---
title: Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c043-f015
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Retrieval | Checks
meta_description: Training Admissions: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses material verification and discrepancy localization in the enrollment consultation conversion scenario of training institutions. The materials come from three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures are usually updated by batch or class type, with fields including course name, number of class hours, start date, fee description, and signature/seal; consultation records are generated per communication, with fields including consultee, intended course, communication date, follow-up person, and receipt; trial class schedules are updated weekly or by class session, with fields including trial time, instructor, venue, and sign-in signature. When these three types of materials enter the knowledge base retrieval and recall function, enrollment brochures serve as the baseline fragments for course specifications, consultation records serve as the comparison fragments for process traces, and trial class schedules serve as supplementary fragments for time and signature verification. Each is recalled as an independent document or segment for subsequent nodes or manual comparison of whether the name, quantity, date, and signature of the same object are consistent. In terms of update rhythm, brochures change with class type adjustments, consultation records are appended in real time with communication, and trial schedules change with class scheduling. Field characteristics are mainly short text, dates, and signature fields.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and upper limit trimming). The "discrepancy list" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Whether the same course name, number of class hours, start date, and signature/seal are consistent between the brochure and consultation records | In the search test, search using a combination of course name and date, switch `searchMode` to compare candidate fragments and `similarity`, and record the field values on the brochure side |
| Consultation record | Whether the consultee, intended course, communication date, and receipt signature match the brochure and trial class schedule | Search once each with synonymous questions, check the number of candidates and scores, and verify whether the name, quantity, and date in the consultation record are consistent with the brochure |
| Trial class schedule | Whether the trial time, instructor, venue, and sign-in signature are consistent with the date and course name in the consultation record | Retrieve trial class schedule fragments, turn `usingReRank` on and off to compare the ranking of the top few results, and verify the date and signature fields |
| Quoted content | Record the tokens of the trimmed quoted text and the number of array items separately; do not treat the number of items as `quoteMaxToken` | Check the number of returned quotes and the completeness of the content, and record the array length and quoted text tokens separately |

## Three common errors

- Phenomenon: The name or number of class hours of the same course does not match between the brochure and consultation records. Cause: The two materials are updated separately, not written back and verified against the same object, and versions are not synchronized.
- Phenomenon: The date in the trial class schedule is inconsistent with the communication date in the consultation record. Cause: After scheduling adjustments, the consultation record was not synchronized, lacking a unified date specification.
- Phenomenon: The consultation record or trial class schedule lacks a signature or receipt. Cause: The signature field was not collected during material generation, and it still cannot be completed after retrieval and recall.

## How to verify the setup

Acceptance of this function: Test once each with synonymously rewritten questions, compare candidate fragments and `similarity` scores, then toggle `usingReRank` to see the ranking of the top few results; at the same time switch `searchMode` to observe whether candidates include both semantic and full-text results.

Business test: Use one real record to find fields inconsistent with the ledger, and verify the name, quantity, date, and signature of that record in the enrollment brochure, consultation record, and trial class schedule.

- List the name, quantity, date, and signature of the brochure, consultation record, and trial class schedule field by field for the same object, mark inconsistent items, and write them back after confirmation by the reviewer.
- In the search test, record the number of candidates, scores, and quoted text tokens, record the array length separately, and do not compare the number of items as equal to the quoted content budget.
