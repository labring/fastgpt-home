---
title: Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c014-f015
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Retrieval | Operations
meta_description: Pastoral Education: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Coordinate Operations and Application Handover

## What this category's data looks like

This page is intended for school moral education and homeroom teacher work scenarios. Material sources include thematic class meeting plans, student comprehensive quality records, and home visit records. The update cadence is weekly or per semester. Field characteristics are class, date, student name, item description, and signature or receipt. Thematic class meeting plans enter knowledge base retrieval as a source of candidate chunks, used to match class meeting themes and procedures; student comprehensive quality records serve as process materials, used to recall student performance and evaluation entries; home visit records serve as communication evidence, used to retrieve home visit time, subject, and feedback. The three types of materials each form independent segments in retrieval, and after question optimization, recall, merging, reranking, filtering, and limit truncation, candidate chunks and similarity scores are obtained, for subsequent nodes or manual generation of handover-ready deployment status and operation records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merging, reranking, filtering, and limit truncation). Handover-ready deployment status and operation records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Thematic class meeting plan | Class, date, theme, procedure, and signature are complete, and match the class and date in the home visit records | In the search test, switch `searchMode` to semantic, full-text, or hybrid, and compare the number of candidates and scores; verify the plan signature and receipt |
| Student comprehensive quality record | Student name, semester, item, date, and signature are complete, and the number of records with the same name matches those in the class meeting plans | Test once each with synonymous questions, and observe whether key fields are retained in candidates after `similarity` filtering; verify the number of records and signatures |
| Home visit record | Home visit subject, date, feedback, and receipt are complete, and the date matches that in the comprehensive quality records | Compare the ranking of the top few entries before and after enabling `usingReRank`; verify the receipt and date, and record the number of candidates and scores |
| Deployment status and operation records | Version, connection, and task records are consistent, and each item in the handover form is traceable | Check each item in the handover form once to see which record is missing; record the tokens and array count of the referenced text after `limit` truncation |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the class meeting plan and the home visit record. Cause: The two materials are updated independently, without cross-material verification.
- Phenomenon: The version of the comprehensive quality record is not synchronized, and the old and new versions exist at the same time. Cause: After updating, they were not uniformly replaced, and both are recalled during retrieval.
- Phenomenon: The home visit record lacks a signature or receipt, making it impossible to confirm during handover. Cause: When archiving the materials, the signature and receipt fields were not checked item by item.

## How to verify the setup

Acceptance of this feature: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle reranking on and off to observe the ranking of the top few entries; record the number of candidates and scores, and switch `searchMode` to observe recall differences.

Business test: Check each item in the handover form once to see which record is missing; verify whether version, connection, and task records are consistent.

- In the knowledge base search test, switch `searchMode` and compare the number of candidates and scores across semantic, full-text, and hybrid modes.
- Compare the ranking of the top few entries before and after enabling `usingReRank`, and check the tokens and array count of the referenced text after `similarity` filtering and `limit` truncation.
