---
title: Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c026-f015
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Retrieval | Operations
meta_description: Degree Certificates: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Degree Awards and Certificate Information Reporting: Coordinate Operations and Application Handover

## What this category's data looks like

This page focuses on the degree conferral and certificate information reporting scenario; the materials include three types: degree application forms, thesis review forms, and defense resolutions. The degree application form carries the applicant's basic information and degree category; the thesis review form carries the review conclusion and the reviewer's signature; the defense resolution carries the defense conclusion, voting result, and the signature of the defense committee. The three types of materials enter the knowledge base according to the batch reporting rhythm, and their field characteristics are concentrated in four categories: name, quantity, date, and signature receipt. When the materials enter the knowledge base retrieval and recall function, each participates in recall as an independent fragment: the degree application form corresponds to the applicant identity and degree level fragment, the thesis review form corresponds to the review opinion and conclusion fragment, and the defense resolution corresponds to the voting and resolution fragment. The retrieval service matches the retrieval mode according to the material form, and after merging, reranking, filtering, and truncating multiple candidate paths, outputs candidate fragments and similarity scores for subsequent nodes or manual generation of reporting records and handover forms.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merging, reranking, filtering, and upper-limit truncation). The handover-ready deployment status and operation records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the fields, dates, and signatures align item by item with the thesis review form and defense resolution | In the knowledge base search test, search the applicant name and degree category, compare candidate fragments and similarity scores, and record `searchMode`, `similarity`, and the number of candidates |
| Thesis review form | Whether the review conclusion, reviewer signature, and date are consistent with the defense resolution | Switch retrieval modes to compare candidates, compare the ranking of the top few entries before and after enabling reranking, and check the number of candidates under `usingReRank` and `limit` |
| Defense resolution | Whether the voting result, defense committee signature, and resolution date are consistent with the application form and review form | Check the defense resolution fragments item by item according to the handover form, confirm that signatures and receipt records are complete, and record the cited text tokens and array count |
| Deployment status and operation records | Whether version, connection, and task records are consistent | Check the retrieval node version, connection status, and task records, confirm the three are consistent, and then hand over to operations or the next shift |

## Three common errors

- Symptom: The name and date of the same applicant do not match between the degree application form and the defense resolution. Cause: The two materials were stored separately without association verification, and after retrieval hits, the fields were not compared item by item.
- Symptom: The thesis review form version was not synchronized, and retrieval returned the old review conclusion. Cause: After the material was updated, it did not re-enter the retrieval process, and the candidate fragments still came from the old version.
- Symptom: The defense resolution lacks a signature or receipt, and the record is found to be missing during handover form verification. Cause: The signature and receipt fields were not validated when the material was stored, and the retrieval candidates cannot fill in this information.

## How to verify the setup

This function acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle reranking on and off to observe the ranking of the top few entries.

Business test: check item by item once according to the handover form, and see which record is missing.

- In the knowledge base search test, switch `searchMode`, compare candidate fragments and similarity scores under the semantic, full-text, and hybrid modes, and record the number of candidates.
- Enable and disable reranking, compare the ranking of the top few entries before and after `usingReRank`, and check the cited text tokens and array count under `limit` and `similarity`.
