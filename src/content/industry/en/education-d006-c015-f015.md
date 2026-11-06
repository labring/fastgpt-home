---
title: Knowledge Base Retrieval for School Mental Health Screening and Referrals: Track Progress and Check Statistics
slug: /en/industry/education-d006-c015-f015
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Retrieval | Progress
meta_description: Student Mental Health: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for School Mental Health Screening and Referrals: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: psychological screening plans, interview records, and referral forms. Psychological screening plans are issued by the school psychology center at the beginning of each semester and contain fields such as screening subjects, tools, time, and responsible persons; interview records are filled in by psychology teachers on each occasion and contain date, student identifier, interview points, preliminary judgment, and signature; referral forms are initiated by psychology teachers or homeroom teachers and contain referral destination, receipt, date, and signatures of both parties. The update cadence is once per semester for screening plans, while interview records and referral forms are updated in real time as events occur. After the three types of materials enter the knowledge base retrieval service, each serves as a candidate fragment source to support field verification and date alignment for the progress table and statistical scope description, and does not directly produce statistical results.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit truncation). The "progress table and statistical scope description" is completed subsequently by downstream nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Fields include screening subjects, tools, time, and responsible persons; the date must be consistent with the first day of interview records and referral forms | In the knowledge base search test, switch `searchMode`, use semantic, full-text, and hybrid recall respectively for the plan name, and verify the date fields and signature columns of the returned candidates |
| Interview record | The name, quantity, and date of the same record in the screening plan and referral form must match; missing signatures or receipts must be flagged | Test once each with synonymous rewritten questions, check whether the candidate fragments cover the same student identifier and interview date, and record the number of candidates and the `similarity` score |
| Referral form | Referral destination, receipt, and signatures of both parties must be complete; the version must be synchronized with the interview record | Enable and disable `usingReRank` to compare the ranking of the top few items, confirm that the referral form date and receipt fields are not lost due to truncation, and record the number of candidates separately |

## Three common errors

- Phenomenon: The name and date of the same student in the screening plan and interview record do not match. Cause: The two materials are entered separately, versions are not synchronized, and retrieval candidates each take one segment.
- Phenomenon: A referral form lacks a signature or receipt but is still counted in statistics. Cause: Candidate fragments only recall the main text, and the signature column and receipt fields do not enter the cited content.
- Phenomenon: There are many candidates but the top-ranked ones are irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and no rerank secondary sorting is performed.

## How to verify the setup

Acceptance of this feature: Test once each with synonymous rewritten questions, compare candidate fragments and `similarity` scores, then toggle `usingReRank` to see the ranking of the top few items; record the number of candidates and `limit`, and view cited text tokens separately, without comparing them for equality with the array count.

Business test: Use one week of records to verify the totals, check whether the scope and exceptions are clearly written; compare the fields, dates, and signatures of screening plans, interview records, and referral forms one by one, and confirm that the record count and statistical count match.

- In the knowledge base search test, switch `searchMode`, use semantic, full-text, and hybrid recall respectively for the same student identifier, and verify whether the candidate fragments include both semantic and full-text results.
- Enable and disable `usingReRank` to compare the ranking of the top few items, confirm that key original text fragments are still retained after similarity filtering and citation limit truncation, and record the number of candidates separately.
