---
title: Knowledge Base Retrieval for School Mental Health Screening and Referrals: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c015-f015
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Retrieval | Access
meta_description: Student Mental Health: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Mental Health Screening and Referrals: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the primary and secondary school mental health screening and referral scenario, involving three types of materials: screening plans, interview records, and referral forms. Screening plans are updated by school psychology teachers each semester, with fields including screening dimensions, tool name, administration date, and responsible person's signature; interview records are filled in by homeroom teachers or psychology teachers on each occasion, including interviewee, time, key points, and signatures of both parties; referral forms are initiated by psychology teachers and received by parents or supervisors, including referral reason, receiving party, date, and receipt signature. When these three types of materials enter the knowledge base retrieval and recall function, they respectively serve as the basis for plans, process documentation, and transfer credentials, and the retrieval results are used to support the determination of the authorization scope of the external entry point and the subsequent generation of business deliverables. The update rhythm is centralized upload at the beginning of the semester and supplementary entry by event during the semester.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The external entry points and authorization scope are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Screening plan | The screening dimensions, tool name, administration date, and responsible person's signature must be consistent with the names, quantities, and dates in the interview records and referral forms | In the knowledge base search test, search with the same plan name, check whether the fields and signatures in the returned candidate snippets are complete, and record the number of candidates and scores |
| Interview record | The interviewee, time, key points, and signatures of both parties must be consistent with the names and dates in the corresponding records of the screening plan and referral form | Search with a combination of interviewee and date, switch `searchMode` to compare the candidate differences among semantic, full-text, and hybrid modes |
| Referral form | The referral reason, receiving party, date, and receipt signature must match the names, quantities, and dates in the screening plan and interview records | Search with the referral reason, compare the top few rankings before and after enabling `usingReRank`, and use `similarity` to observe the candidates retained after filtering |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the screening plan and the interview record. Cause: The two materials are entered separately without cross-checking, and the candidate snippets hit by retrieval contradict each other.
- Phenomenon: The referral form lacks a receipt signature or the interview record lacks signatures of both parties. Cause: Signatures were not backfilled after the materials were circulated, and the snippets returned by retrieval appear complete but have no signature fields.
- Phenomenon: The screening plan version is not synchronized, and the old and new versions are recalled at the same time. Cause: The old file was not replaced during upload, and after multi-path merging the candidates are mixed together, so the top-ranked ones are not necessarily the latest version.

## How to verify the setup

Acceptance of this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the top few rankings; also switch `searchMode` to observe the candidate differences among semantic, full-text, and hybrid, record the number of candidates and scores, and use `similarity` and `limit` to observe the quoted text after filtering and trimming.

Business test: Access once with a restricted identity to see whether the visible scope matches the settings; unauthorized access must be invisible, and the entry points and authorization scope opened to parents or supervisors must match the visitor's identity.

- In the knowledge base search test, search separately by the same plan name, interviewee, and referral reason, check the fields, dates, and signatures in the returned candidate snippets one by one, and record the number of candidates and scores.
- Run once with rerank enabled and once disabled, compare the top few rankings; switch `searchMode` among the three options, observe whether the candidates include both semantic and full-text results, and separately record the tokens and array count of the quoted text.
