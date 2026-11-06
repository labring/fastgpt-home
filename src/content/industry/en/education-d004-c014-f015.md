---
title: Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c014-f015
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Retrieval | Handover
meta_description: Pastoral Education: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Moral Education and Class Teacher Work: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses school moral education and homeroom teacher work. Materials include three types: themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans contain activity objectives, procedures, dates, and homeroom teacher signatures; student comprehensive quality records contain student names, evaluation dimensions, quantities, and semester dates; home visit records contain home visit subjects, times, communication points, and parent receipts. The three types of materials are drafted by homeroom teachers or the moral education office, updated weekly or per semester, with complete field requirements, clear responsible persons, and consistent versions and dates. When materials enter the knowledge base retrieval service, each serves as a candidate fragment source: themed class meeting plans provide activity design references, student comprehensive quality records provide evaluation field samples, and home visit records provide handover and receipt formats. Retrieval results are used by subsequent nodes or manual drafting to produce signable materials and handover records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). Signable material drafts and handover records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Fields complete: activity objectives, procedures, dates, homeroom teacher signature; version and date consistent | In the search test, switch `searchMode` to semantic, full-text, or hybrid, and compare whether candidate fragments cover the plan fields; enable `usingReRank` to observe changes in the ranking of the top few results |
| Student comprehensive quality record | Name, quantity, and date consistent across the three material types; missing signature or receipt is blocked | Use synonym-rewritten questions to retrieve student names and evaluation dimensions, record the number of candidates and `similarity` scores; check whether returned fragments contain quantity and date |
| Home visit record | Home visit subject, time, communication points, and parent receipt fields complete; unsynchronized versions can be detected | Retrieve the home visit record handover template, verify whether returned candidates contain the receipt field; adjust `limit` to observe changes in the number of candidates, and confirm that quoted text tokens are recorded separately |
| Knowledge base retrieval service | Candidate fragments and similarity scores are returned after pattern, merge, rerank, filter, and limit trimming | In the search test, check whether multi-path merged results contain both semantic and full-text candidates; compare the order of the top few results before and after enabling rerank, and confirm similarity filtering and quoted limit trimming |

## Three common errors

- Symptom: The same student's name or date does not match between the comprehensive quality record and the home visit record. Cause: The two materials were drafted separately, without field verification and version synchronization.
- Symptom: The themed class meeting plan lacks the homeroom teacher's signature or the parent receipt is missing. Cause: The handover record did not set required signature fields, and the next step did not block missing items at sign-off.
- Symptom: The same question phrased differently cannot recall the key passage. Cause: The retrieval mode does not match the material form, or question optimization and rerank were not performed.

## How to verify the setup

Feature acceptance: Test once each with synonym-rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` to see the ranking of the top few results; switch `searchMode` to check the number of candidates and scores, and record quoted text tokens separately.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, switch retrieval modes and compare whether candidate fragments cover material fields and dates.
- Check the number and scores of returned candidates, and confirm that key original fragments are still retained after quoted limit trimming.
