---
title: Knowledge Base Retrieval for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c015-f015
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Retrieval | Handover
meta_description: Student Mental Health: review retrieval for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: psychological screening plans, interview records, and referral forms. The psychological screening plan is drafted by the school psychological teacher and contains fields for screening targets, tools, time, and responsible persons; the interview record is filled in by the interviewer and contains the student's pseudonym, interview date, observation points, and signature; the referral form is initiated by the referrer and contains the reason for referral, receiving party, receipt, and signatures of both parties. The three types of materials serve as candidate snippet sources in the knowledge base retrieval service, respectively taking on the roles of plan basis, process evidence, and handover credential. The update rhythm is: revise the plan before each semester's screening, add records on the same day after interviews, and collect receipts within three days after referral. Field characteristics center on names, quantities, dates, version numbers, and signature fields; versions and dates must be aligned document by document.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The material drafts and handover records that can be issued are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The plan fields are complete; screening targets, tools, time, responsible persons, version number, and date are consistent; no signature field is blank | Switch `searchMode` in the search test to compare candidates, check whether the plan snippet contains the version number and date, and record the number of candidates and scores |
| Interview record | The record name, student pseudonym, and interview date are consistent with the corresponding items in the referral form; the interviewer's signature and receipt are complete | Retrieve once each with synonymous questions, compare candidates and scores, and check whether the name and date in the record snippet align with the plan |
| Referral form | The referral reason, receiving party, receipt, and signatures of both parties are complete; the referral date does not conflict with the interview date | Compare the ranking of the top few items before and after enabling `usingReRank`, and check whether the referral form snippet contains the receipt and signature fields |
| Retrieval parameters | After `similarity` filtering, key original snippets are still retained; after `limit` trimming, the number of candidates and the tokens of quoted text are recorded separately | Adjust `similarity` and `limit`, observe changes in the number of candidates and scores, record the array length separately, and do not compare `quoteMaxToken` |

## Three common errors

- Phenomenon: The pseudonym and date for the same student do not match between the interview record and the referral form. Cause: The two materials were drafted separately, without backfilling and checking against the same record name and date.
- Phenomenon: The plan has been revised, but the interview record and referral form still reference the old version. Cause: The version number was not synchronized, old snippets were mixed into retrieval candidates, and filtering by date and version was not performed.
- Phenomenon: The referral form lacks the receiving party's signature or receipt. Cause: The handover step did not sign off item by item according to the field checklist, and missing items were not blocked.

## How to verify the setup

Acceptance of this function: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few items; at the same time switch `searchMode` and adjust `similarity` and `limit`, recording the number of candidates and scores.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the search test, retrieve once each with synonymous questions, compare the number of candidates and scores, and confirm that key snippets have not been trimmed away.
- Check the names, quantities, dates, version numbers, and signature fields of the three types of materials one by one; return missing items for supplementary entry before signing off.
