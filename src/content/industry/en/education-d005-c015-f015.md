---
title: Knowledge Base Retrieval for School Mental Health Screening and Referrals: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c015-f015
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Retrieval | Versions
meta_description: Student Mental Health: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Mental Health Screening and Referrals: Maintain Document Versions and Changes

## What this category's data looks like

This page focuses on the category of mental health screening and referral in primary and secondary schools. Materials include three types: psychological screening plans, interview records, and referral forms. Sources are school psychological centers, homeroom teacher reports, and district-level referral receipts. The update rhythm is maintained on a rolling basis according to screening at the beginning of the semester, interviews during the semester, and referral summaries at the end of the semester. Field characteristics center on name, student ID, screening scale score, interview date, referral destination, signature, and receipt number. When materials enter the knowledge base retrieval and recall function, the screening plan serves as the rule basis, interview records serve as process evidence, and referral forms serve as destination proof. Each of the three plays a role in field verification and version traceability, jointly supporting the generation of version ledgers and change records.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether fields, dates, and signatures are consistent with interview records | In the search test, switch `searchMode` and check whether the plan name, scale version, and screening date match the interview records |
| Interview record | Whether the name, quantity, and date of the same record are inconsistent between the plan and the referral form | Compare the top few candidates before and after enabling rerank to see whether the interview date and referral form date are synchronized |
| Referral form | Missing signature or receipt, version not synchronized | Check the number and scores of candidates after `similarity` filtering to confirm whether the referral form signature and receipt number appear in the cited snippets |
| Version ledger | Current version is unique, old versions are traceable, citations are synchronized | Change one piece of plan content, see whether the version number and citations are updated synchronously, and use `limit` to control the number of candidates and then separately record the array length |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record are inconsistent between the screening plan and the interview record. Cause: Materials are maintained separately, versions are not synchronized, and retrieval hits snippets from different sources.
- Phenomenon: The referral form lacks a signature or receipt, and the old version is still recalled in the knowledge base. Cause: Change records do not cover the signature and receipt fields, and the old version has not been removed.
- Phenomenon: There are many candidates but the ones ranked first are irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too broad.

## How to verify the setup

Acceptance of this function: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few.

Business test: Change one piece of content and see whether the version number and citations are updated synchronously.

- In the search test, switch `searchMode` and compare candidate snippets and scores under the three modes: semantic, full-text, and hybrid.
- Check the tokens and array length of the cited text, record them separately, and do not use `quoteMaxToken` and the number of items for equality comparison.
