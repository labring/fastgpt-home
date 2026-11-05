---
title: Knowledge Base Retrieval for School Mental Health Screening and Referrals: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c015-f015
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Retrieval | Multilingual
meta_description: Student Mental Health: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Mental Health Screening and Referrals: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses primary and secondary school mental health screening and referral scenarios. The materials include three types: psychological screening plans, interview records, and referral forms. Psychological screening plans specify scale selection, screening dimensions, warning levels, and referral criteria. After entering the knowledge base, they serve as terminology anchors for unifying scale names, dimension names, and level expressions. Interview records carry students' chief complaints, teachers' observations, and parents' feedback. After entering the knowledge base, they serve as the context source for terminology, used to confirm the actual wording of the same concept in different records. Referral forms record the referral reason, receiving institution, receipt, and signature. After entering the knowledge base, they serve as the grounding evidence for terminology, used to check whether names, quantities, dates, and signatures are consistent with the plan and interview records. The three types of materials update at different rhythms: plans update by semester or policy adjustment, interview records are generated with individual cases, and referral forms update with the referral process. In terms of field characteristics, plans focus on levels and standard items, interview records focus on time, subject, and description, and referral forms focus on number, date, signature, and receipt. During multilingual materials and terminology handling, it is necessary to ensure that the same term is written consistently throughout the entire text, and that the translated name can refer back to the original text.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode, merge, re-rank, filter, and limit trimming). "Unified terminology table and comparison draft" is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Scale names, dimension names, level expressions, and referral criteria are written consistently throughout the entire text, and the translated name can refer back to the original text | In the knowledge base search test, switch `searchMode`, test once each with synonymous questions, and record the number of candidates and scores; check whether the same term in the plan is written the same way in different paragraphs |
| Interview records | When the names, quantities, and dates of the same record in the plan and referral form do not match, first check hits and associations | After filtering with `similarity`, check whether the candidate snippets retain the key descriptions of the original text; check whether the dates and subjects in the interview records are consistent with the plan and referral form |
| Referral form | The referral reason, receiving institution, receipt, and signature fields are complete, and the version is synchronized with the plan | Compare the ranking of the top few items before and after enabling `usingReRank`; check whether the referral form number, date, signature, and receipt correspond to the plan and interview records |
| Knowledge base retrieval service | Candidate snippets and similarity scores are returned after mode, merge, re-rank, filter, and limit trimming | Check whether the returned candidates include both semantic and full-text results; `limit` controls the number of citations, and the tokens of the cited text are recorded separately, not compared for equality with the number of array items |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record in the plan and referral form do not match. Cause: Multilingual materials and terminology handling are not unified, the same concept is written differently in different materials, and associations are not checked after retrieval hits.
- Phenomenon: Versions are not synchronized, and after the plan is updated, interview records and referral forms still use old terminology. Cause: Materials update at different rhythms, the knowledge base is not re-imported or re-indexed by version, and retrieval still recalls old snippets.
- Phenomenon: The referral form lacks a signature or receipt, and the terminology table and comparison draft cannot refer back to the original text. Cause: The referral process fields are not completed, the candidate snippets returned by retrieval lack key evidence, and subsequent nodes or humans cannot generate a complete finished product based on them.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare candidates and scores, then toggle re-ranking to see the ranking of the top few items. Switch `searchMode` to observe the candidate differences among semantic, full-text, and hybrid; compare the order of the top few items before and after enabling `usingReRank`; after filtering with `similarity`, record the number of candidates and scores, `limit` controls the number of citations, and the tokens of the cited text are recorded separately.

Business test: sample three terms and check whether their writing is consistent throughout the entire text, confirm that the translated names can refer back to the original text, and check whether the fields, dates, and signatures of the psychological screening plan, interview records, and referral form correspond.

- In the knowledge base search test, switch `searchMode`, test once each with synonymous questions, record the number of candidates and scores, and compare the recall differences among semantic, full-text, and hybrid.
- Compare the ranking of the top few items before and after enabling `usingReRank`, and after filtering with `similarity`, check whether the candidate snippets retain the key descriptions of the original text; `limit` controls the number of citations and separately records the tokens of the cited text.
