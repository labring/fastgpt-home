---
title: Knowledge Base Retrieval for Training Provider Scheduling and Lesson Records: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c044-f015
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Retrieval | Checks
meta_description: Training Schedules: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Scheduling and Lesson Records: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the course scheduling and attendance deduction scenario in training institutions. Materials include three types: class schedules, attendance deduction records, and schedule change requests. Sources are academic affairs system exports, scanned paper signed documents, and teacher-submitted receipts. The update cadence is once after daily scheduling, once after each attendance deduction, and once after schedule change approval. Field characteristics include course name, student name, number of class hours, class date, teacher signature, and receipt status. When entering knowledge base retrieval, the class schedule serves as the primary ledger providing baseline fields, attendance deduction records serve as evidence of actual occurrence, and schedule change requests serve as the basis for changes. Together, the three constitute the verification objects. The retrieval service splits each material into candidate chunks for subsequent nodes or manual comparison of whether names, quantities, and dates are consistent, and to locate discrepant fields.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is completed by subsequent nodes or manually. The retrieval service is only responsible for providing candidates and scores; it does not generate statistical tables or business documents.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Names, quantities, dates, and signature fields are consistent with attendance deduction records and schedule change requests | In the search test, switch `searchMode` to semantic, full-text, or hybrid, and compare whether the class schedule fields in candidate chunks align with the ledger |
| Attendance deduction record | Names, quantities, dates, and receipt fields are consistent with the class schedule and schedule change requests | Retrieve once each with synonymous questions, observe the number of candidates and scores, then enable rerank to compare the ordering of the top few results |
| Schedule change request | Names, quantities, dates, and signature fields are consistent with the class schedule and attendance deduction records | Check whether candidates include both semantic and full-text results, and verify whether the request form date and signature receipt are missing items |
| Retrieval candidates | Candidate chunks cover the fields to be verified and similarity scores are comparable | Adjust `similarity` and `limit` to observe changes in the number of candidates, and separately record the referenced text tokens and array count |

## Three common errors

- Symptom: The number of class hours for the same student is inconsistent between the class schedule and the attendance deduction record. Cause: The two material versions were not synchronized, or the quantity field was overwritten during entry.
- Symptom: The date on the schedule change request does not match the class schedule and attendance deduction record. Cause: The ledger was not written back after schedule change approval, resulting in the date fields of the three materials being independent.
- Symptom: The attendance deduction record lacks a teacher signature or receipt. Cause: The scanned paper document omitted the signature page, or the receipt was not supplemented after teacher submission, so retrieval candidates cannot cover this field.

## How to verify the setup

Feature acceptance: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the top few results; also switch `searchMode` and adjust `similarity` and `limit`, recording the number of candidates and referenced text tokens.

Business test: Use one real record to find a field inconsistent with the ledger, submit it to the reviewer for confirmation, and write it back.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, or hybrid, and compare whether candidate chunks cover the names, quantities, dates, and signature fields of the class schedule, attendance deduction records, and schedule change requests.
- Adjust `similarity` and `limit` to observe changes in the number of candidates, compare the ordering of the top few results before and after enabling rerank, and separately record the referenced text tokens and array count.
