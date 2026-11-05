---
title: Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c054-f015
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Retrieval | Access
meta_description: Self-Study Exams: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Self-Study Exam Records and Graduation Review: Manage Authorized Access and External Services

## What this category's data looks like

The materials for self-study examination registration and graduation review include three categories: registration archives, course qualification certificates, and graduation application forms. They originate from provincial examination office business systems and archival records of host institutions. The update cadence rolls with examination sessions and graduation batches. Field characteristics center on name, examination registration number, course code, score, date, and signature field. Registration archives are the ledger of identity and enrollment status; course qualification certificates are the proof of individual subject scores; graduation application forms are the application vehicle for graduation conclusions. When the three enter knowledge base retrieval, each plays a different role: registration archives are used to confirm the visitor's identity and the scope of registration they belong to; course qualification certificates are used to verify course names, quantities, and dates; graduation application forms are used to verify whether signatures and receipts are complete. The retrieval side is only responsible for recalling fragments relevant to the question and giving similarity scores. The authorization scope and external entry points are determined separately by subsequent nodes or manually based on the recall results.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). "External entry points and authorization scope" are completed subsequently by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration archives | Whether identity and enrollment status fields, dates, and signatures are consistent with course qualification certificates and graduation application forms | In the search test, use a restricted identity to ask about the same registration, switch `searchMode` to semantic, full-text, and hybrid, record the number of candidates and scores, and check whether visible fragments fall only within the authorized scope |
| Course qualification certificates | Whether course names, quantities, and dates match between the two materials, and whether versions are synchronized | Retrieve once each with synonymous questions, compare the ranking of the top few entries before and after enabling `usingReRank`, and see whether course names and dates are consistent with the registration archives |
| Graduation application forms | Whether signatures and receipts are complete, and whether names and dates match with course qualification certificates | Retrieve fragments related to graduation applications, check whether the signature field and receipt fields are complete, and record the number of candidates and scores under the `similarity` threshold |
| External entry points and authorization scope | Whether the visitor's identity matches the visible scope, and whether unauthorized content is invisible | Access once with a restricted identity, see whether the returned candidates contain only registration, qualification certificate, and application form fragments within the authorized scope, and separately record the number of citations after `limit` trimming |

## Three common errors

- Phenomenon: The name, quantity, and date of the same course do not match between the two materials. Cause: The versions of the registration archives and course qualification certificates are not synchronized, and retrieval hits fragments from different versions.
- Phenomenon: The graduation application form lacks a signature or receipt. Cause: The signature field was not completed at the time of archiving, and retrieval only recalled the main text but not the signature page.
- Phenomenon: Changing the phrasing results in failure to recall the same record. Cause: The question optimization does not match the recall mode, and the candidates do not cover the corresponding fragments.

## How to verify the setup

Acceptance of this feature: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to see the ranking of the top few entries; at the same time, switch `searchMode` and `usingReRank`, record the number of candidates and scores, and separately record the number of citations after `similarity` filtering.

Business test: Access once with a restricted identity and see whether the visible scope matches the setting.

- In the search test, run one retrieval each for registration archives, course qualification certificates, and graduation application forms, record the number of candidates and scores, and check whether names, quantities, dates, and signatures are consistent.
- Access the external entry point with a restricted identity, check whether unauthorized fragments are invisible, and separately record the number of entries in the citation array and the tokens of the citation text.
