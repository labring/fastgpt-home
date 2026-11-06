---
title: Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c026-f015
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Retrieval | Multilingual
meta_description: Degree Certificates: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of degree conferral and certificate information reporting. Materials include three types: degree application forms, thesis review forms, and defense resolutions. Sources are paper or electronic documents submitted by training units, and the update cadence rolls with batches and review rounds. Field characteristics center on name, student ID, degree category, date, and signature fields. The same record must keep names, quantities, and dates consistent across the three materials. When materials enter the knowledge base retrieval and recall function, each plays a different role: the degree application form provides applicant identity and degree category fields, the thesis review form provides review conclusions and reviewer signatures, and the defense resolution provides defense dates and resolution signatures. Multilingual materials and terminology processing require the same term to be consistent throughout and translated names to be traceable back to the source text. The retrieval step needs to recall corresponding fragments from the three types of materials for subsequent generation of a unified terminology list and a comparison draft.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The unified terminology list and comparison draft are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether fields, dates, and signatures are complete, and whether the name and quantity of the same record are consistent with other materials | Switch `searchMode` in the search test and check whether candidates cover name, student ID, degree category, and signature fields |
| Thesis review form | Whether review conclusions, reviewer signatures, and dates correspond to the defense resolution | Compare the order of the top few candidates before and after enabling rerank, record the number of candidates and scores, and confirm that review conclusion fragments are included |
| Defense resolution | Whether the defense date, resolution signature, and degree application form date match, and whether versions are synchronized | Test once each with synonymous rewritten questions, check whether candidates include both semantic and full-text results, and inspect signature and receipt fragments |
| Unified terminology list and comparison draft | Whether the same term is written consistently throughout and whether translated names can be traced back to the source text | Sample three terms and check their spelling throughout, and verify the impact of `similarity` and `usingReRank` on candidate ranking |

## Three common errors

- Phenomenon: The date or name of the same record does not match between the degree application form and the defense resolution. Cause: The versions of the two materials are not synchronized, and retrieval recall does not hit both sources at the same time.
- Phenomenon: The review conclusions or signature fields of the thesis review form and defense resolution are missing. Cause: Submitted materials lack signatures or receipts, and candidate fragments do not cover the corresponding fields.
- Phenomenon: The same term is written inconsistently across different materials, and translated names cannot be traced back to the source text. Cause: Multilingual materials do not unify terminology, and retrieval candidates do not retain key fragments after similarity filtering and citation upper-limit trimming.

## How to verify the setup

Acceptance for this feature: test once each with synonymous rewritten questions, compare the number of candidates and scores, then toggle rerank on and off to inspect the ordering of the top few, and confirm the impact of `similarity`, `limit`, `usingReRank`, and `searchMode` on results.

Business test: sample three terms and check whether their spelling is consistent throughout, verify whether translated names can be traced back to the source text, and confirm that the same term is written uniformly in the degree application form, thesis review form, and defense resolution.

- In the knowledge base search test, switch between semantic, full-text, or hybrid modes, compare the number of candidates and scores, and record the tokens and array length of the cited text; do not compare the two for equality.
- Check the fields, dates, and signatures of the degree application form, thesis review form, and defense resolution, and confirm that the name, quantity, and date of the same record are consistent, versions are synchronized, and receipts are complete.
