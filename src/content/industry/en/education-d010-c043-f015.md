---
title: Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c043-f015
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Retrieval | Operations
meta_description: Training Admissions: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Coordinate Operations and Application Handover

## What this category's data looks like

In the enrollment consultation conversion scenario at training institutions, the materials entering knowledge base retrieval include three categories: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures provide course names, class types, start dates, and fee descriptions, and are the main source of candidate chunks; consultation records carry parent consultation times, intended courses, receptionists, and receipt signatures, and are used to verify the names and dates of the same record; trial class schedules record trial times, instructors, quotas, and confirmation status, and are used to verify quantities and signatures. The three categories of materials are updated by class or batch, and their fields include course names, dates, quantities, signatures, and version numbers. After the materials enter the retrieval node, each participates in recall as a candidate chunk and does not directly generate business documents.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The handover-ready deployment state and operation records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Course name, class type, start date, and fee fields are complete, and match the consultation records item by item | In the search test, switch `searchMode` and compare the number of candidates and scores across the semantic, full-text, and hybrid modes |
| Consultation record | The name, quantity, and date of the same record match across the brochure and trial class schedule, and signatures and receipts are not missing | Check the name, quantity, date, and signature item by item according to the handover form, and record the location of missing items |
| Trial class schedule | Trial time, instructor, quota, and confirmation status are consistent with the brochure and consultation records, and the version number is synchronized | Check the version number and date, confirm the order changes of the top few items before and after reranking, and record the `usingReRank` switch status |
| Retrieval node and search test | Candidate chunks and similarity scores are reproducible, and key original chunks are still retained after filtering and limit trimming | Test once each with synonym-rewritten questions, record the number of candidates and scores, and separately record the cited text tokens and array length |

## Three common errors

- Symptom: The name, quantity, and date of the same course do not match between the brochure and the consultation record. Cause: The two materials are updated separately, and signatures and receipts are not checked against the same batch.
- Symptom: The trial class schedule and brochure versions are not synchronized, and the candidates returned by retrieval point to an old class. Cause: The version number is not synchronized after the materials are updated, and the retrieval node still recalls based on old chunks.
- Symptom: The consultation record lacks a signature or receipt, and it cannot be confirmed during handover form verification. Cause: The signature is not completed during the record circulation step, causing the handover status and operation records to be inconsistent.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle reranking to observe the ordering of the top few items; switch `searchMode` and adjust `similarity` and `limit`, and record the number of candidates and scores.

Business test: check item by item once according to the handover form to see which record is missing; check the names, quantities, dates, and signatures of the enrollment brochure, consultation records, and trial class schedule, and confirm that the version, connections, and task records are consistent.

- In the search test, switch `searchMode` and compare the number of candidates and scores across the semantic, full-text, and hybrid modes, and confirm that after multi-route merging the candidates include both semantic and full-text results.
- Enable and disable `usingReRank` and compare the ordering of the top few items; adjust `similarity` and `limit`, record the cited text tokens and array length, and confirm that key original chunks are still retained after trimming.
