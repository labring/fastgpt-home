---
title: Knowledge Base Retrieval for School Mental Health Screening and Referrals: Find Supporting Evidence
slug: /en/industry/education-d001-c015-f015
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Retrieval | Evidence
meta_description: Student Mental Health: review retrieval for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Mental Health Screening and Referrals: Find Supporting Evidence

## What this category's data looks like

In the scenario of mental health screening and referral in primary and secondary schools, materials include three types: psychological screening plans, interview records, and referral forms. A psychological screening plan contains screening dimensions, scale names, administration dates, and the signature of the person in charge; an interview record contains the student code, interview date, problem description, and the interviewer's signature; a referral form contains the reason for referral, the receiving party, the referral date, the receipt, and signatures of both parties. These materials are updated by semester or event milestone, and version numbers and dates must be kept in sync. When entering the knowledge base retrieval and recall function, the psychological screening plan serves as the source of screening basis, the interview record serves as corroboration of the individual situation, and the referral form serves as the credential for the referral process, each carrying a different retrieval role. The name, quantity, or date of the same record may not match across two materials; if versions are not synchronized or signatures/receipts are missing, material consistency must be verified before retrieval.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and upper-limit truncation). Basis items that can be traced back to the original text are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Screening dimensions, scale names, administration dates, and the signature of the person in charge are complete, and it is the current version | In the search test, switch `searchMode` to hybrid, check whether candidate chunks contain the dimensions and dates from the original plan text, and record the number of candidate items and scores |
| Interview record | The student code, interview date, problem description, and interviewer's signature match the original text, and do not conflict with the dates of the screening plan | Test once each with synonymous questions, see whether candidates hit the original interview record text, and check the `similarity` score and the ranking before and after enabling `usingReRank` |
| Referral form | The reason for referral, receiving party, referral date, receipt, and signatures of both parties are complete, and the name and quantity are consistent with the interview record | Check whether candidate chunks contain the receipt and signature fields from the original referral form text, use `limit` to control the token budget of the cited text, and separately record the array length and the tokens of the cited text |
| Knowledge base retrieval service | Candidate chunks and similarity scores come from this institution's materials and can be traced back to the original text | In the search test, compare the three modes semantic, full-text, and hybrid, and see whether candidates include both semantic and full-text results |

## Three common errors

- Symptom: the name or date of the same student does not match between the screening plan and the interview record. Cause: the two materials were entered separately, no cross-material consistency check was performed, and the retrieval hit was cited directly.
- Symptom: a referral form lacks a receipt or signature but is still recalled as valid basis. Cause: material versions were not synchronized, the old version was not marked invalid, and retrieval did not filter by the current version.
- Symptom: the same question cannot be recalled when phrased differently, or there are many candidates but the top-ranked ones are irrelevant. Cause: question optimization did not cover synonymous expressions, re-ranking was not enabled, or the similarity filter threshold does not match the material form.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidate chunks and `similarity` scores, then toggle `usingReRank` on and off to see changes in the ranking of the top few items, and use `searchMode` and `limit` to check the number of returned items and the tokens of the cited text.

Business test: ask a basis question that spans materials, see whether the answer gives a traceable source, and check whether that source can be traced back to the original item in the psychological screening plan, interview record, or referral form.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, and hybrid, compare candidate chunks and scores, and record the number of candidate items.
- Enable and disable `usingReRank`, compare the order of the top few candidates, and check the `similarity` scores and the tokens of the cited text after `limit` truncation.
