---
title: Knowledge Base Retrieval for Teacher Qualification Exams and Certification: Track Progress and Check Statistics
slug: /en/industry/education-d006-c056-f015
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Retrieval | Progress
meta_description: Teacher Qualifications: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Teacher Qualification Exams and Certification: Track Progress and Check Statistics

## What this category's data looks like

Teacher qualification exam and certification materials mainly consist of written and interview registration forms, Mandarin proficiency certificates, and medical examination forms, supplemented by certification application forms, ID cards, and academic qualification certificates. The registration form contains name, ID number, exam subjects, exam district, and date signature; the Mandarin proficiency certificate contains grade, certificate number, test date, and issuing institution; the medical examination form contains examination items, conclusions, physician signature, and hospital receipt. Materials come from registration system exports, scans of original certificates, and medical examination receipts, updated by batch, with new additions and supplementary submissions coexisting within a week. When entering knowledge base retrieval, the registration form is used to verify subject and exam district criteria, the Mandarin proficiency certificate is used to verify grade and number, and the medical examination form is used to verify conclusions and signature receipts, each participating as candidate fragments in recall and reranking, for subsequent nodes to generate progress tables and statistical criteria descriptions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper limit trimming). The "progress table and statistical criteria description" is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Whether fields, dates, and signatures are consistent with the statistical criteria table header | In the search test, switch `searchMode` to hybrid, verify name, subject, exam district, date, and signature candidates, record the number of candidates and scores |
| Mandarin proficiency certificate | Whether grade, number, test date, and issuing institution match the registration form | Use a combined query of certificate number and name for recall, enable `usingReRank` to compare the ranking of the top few entries, verify grade and date |
| Medical examination form | Whether the medical examination conclusion, physician signature, and receipt are complete and dates do not conflict | Recall by hospital and batch, adjust `similarity` to observe filtered candidates, verify conclusion, signature, and receipt fields |
| Progress table and statistical criteria description | Whether recorded counts and statistical counts match, and whether criteria are written in the table header | Use one week's records to verify the total, check whether criteria and exceptions are clearly written, and record the number of citations separately by array length |

## Three common errors

- Phenomenon: The name, number, and date of the same record do not match between the registration form and the Mandarin proficiency certificate. Cause: The two material versions were not synchronized, and supplementary submissions were not backfilled.
- Phenomenon: The medical examination form lacks a physician signature or hospital receipt, but is counted as completed during statistics. Cause: The receipt was not archived, and the criteria did not list the signature as a required field.
- Phenomenon: There are many candidates but the top-ranked ones are irrelevant, and the answer lacks key paragraphs. Cause: The retrieval mode does not match the material form, and reranking is not enabled.

## How to verify the setup

Acceptance of this feature: Test once each with synonym-rewritten questions, compare candidates and scores, then toggle reranking on and off to observe the ranking of the top few entries.

Business test: Use one week's records to verify the total, and check whether criteria and exceptions are clearly written.

- In the search test, switch `searchMode` and compare the number of candidates and scores among semantic, full-text, and hybrid options.
- Before and after enabling `usingReRank`, observe the order of the top few entries once each, and use `similarity` to adjust filtering and verify the cited text tokens; record the array length separately.
